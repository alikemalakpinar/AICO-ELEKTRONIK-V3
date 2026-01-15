"""
File upload API endpoints with S3 presigned URL support.
Supports both S3 upload and direct server upload fallback.
"""

from fastapi import APIRouter, HTTPException, UploadFile, File, Depends, Request
from typing import Optional, Dict, Any
import os
import uuid
import aiofiles
import zipfile
import io
from datetime import datetime, timedelta
from pathlib import Path

# Try to import boto3 for S3 support
try:
    import boto3
    from botocore.exceptions import ClientError
    HAS_BOTO3 = True
except ImportError:
    HAS_BOTO3 = False

from models.schemas import (
    PresignedUrlRequest, PresignedUrlResponse,
    FileAnalysisResult, ErrorResponse
)
from middleware.rate_limiter import check_upload_rate_limit

router = APIRouter(prefix="/api/upload", tags=["File Upload"])

# Configuration
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "/tmp/aico-uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

S3_BUCKET = os.getenv("S3_BUCKET", "aico-gerber-files")
S3_REGION = os.getenv("S3_REGION", "eu-central-1")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

# Allowed file extensions
ALLOWED_EXTENSIONS = {
    '.zip', '.rar', '.7z', '.tar.gz', '.tar',
    '.gbr', '.gtl', '.gbl', '.gts', '.gbs', '.gto', '.gbo',
    '.drl', '.xln', '.exc',
    '.csv', '.xlsx', '.xls', '.txt'
}


def get_s3_client():
    """Get S3 client if configured."""
    if not HAS_BOTO3 or not AWS_ACCESS_KEY or not AWS_SECRET_KEY:
        return None

    return boto3.client(
        's3',
        region_name=S3_REGION,
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY
    )


def validate_file_extension(filename: str) -> bool:
    """Check if file extension is allowed."""
    ext = Path(filename).suffix.lower()
    # Handle double extensions like .tar.gz
    if filename.lower().endswith('.tar.gz'):
        return True
    return ext in ALLOWED_EXTENSIONS


def generate_file_key(filename: str) -> str:
    """Generate unique S3 key for file."""
    timestamp = datetime.utcnow().strftime('%Y/%m/%d')
    unique_id = uuid.uuid4().hex[:12]
    safe_filename = "".join(c for c in filename if c.isalnum() or c in '._-')
    return f"uploads/{timestamp}/{unique_id}/{safe_filename}"


async def analyze_gerber_files(file_path: Path) -> Dict[str, Any]:
    """
    Analyze uploaded Gerber/archive files.
    Extracts layer info, board dimensions, etc.
    """
    analysis = {
        "file_count": 0,
        "file_types": [],
        "warnings": []
    }

    try:
        # If it's a ZIP file, analyze contents
        if file_path.suffix.lower() == '.zip':
            with zipfile.ZipFile(file_path, 'r') as zf:
                file_list = zf.namelist()
                analysis["file_count"] = len(file_list)

                # Categorize files
                gerber_files = []
                drill_files = []
                bom_files = []

                for f in file_list:
                    ext = Path(f).suffix.lower()
                    if ext in {'.gbr', '.gtl', '.gbl', '.gts', '.gbs', '.gto', '.gbo'}:
                        gerber_files.append(f)
                        analysis["file_types"].append("gerber")
                    elif ext in {'.drl', '.xln', '.exc'}:
                        drill_files.append(f)
                        analysis["file_types"].append("drill")
                    elif ext in {'.csv', '.xlsx', '.xls'}:
                        bom_files.append(f)
                        analysis["file_types"].append("bom")

                # Estimate layers from Gerber files
                layer_indicators = {
                    'gtl': 'top', 'gbl': 'bottom',
                    'g1': 'inner1', 'g2': 'inner2', 'g3': 'inner3', 'g4': 'inner4'
                }
                detected_layers = set()
                for gf in gerber_files:
                    for indicator, layer in layer_indicators.items():
                        if indicator in gf.lower():
                            detected_layers.add(layer)

                if detected_layers:
                    if 'inner4' in detected_layers:
                        analysis["layers"] = 6
                    elif 'inner2' in detected_layers:
                        analysis["layers"] = 4
                    elif 'top' in detected_layers and 'bottom' in detected_layers:
                        analysis["layers"] = 2
                    else:
                        analysis["layers"] = 1

                # Remove duplicates
                analysis["file_types"] = list(set(analysis["file_types"]))

                # Warnings
                if not gerber_files:
                    analysis["warnings"].append("No Gerber files detected in archive")
                if not drill_files:
                    analysis["warnings"].append("No drill files detected")

        else:
            analysis["file_count"] = 1
            analysis["file_types"] = [Path(file_path).suffix.lower().replace('.', '')]

    except Exception as e:
        analysis["warnings"].append(f"Analysis error: {str(e)}")

    return analysis


# =====================================================
# API ENDPOINTS
# =====================================================

@router.post("/presigned-url", response_model=PresignedUrlResponse)
async def get_presigned_upload_url(
    request: PresignedUrlRequest,
    rate_limit: bool = Depends(check_upload_rate_limit)
):
    """
    Get a presigned URL for direct S3 upload.
    Client uploads directly to S3, bypassing the server.
    """
    # Validate filename
    if not validate_file_extension(request.file_name):
        raise HTTPException(
            status_code=400,
            detail="Invalid file extension. Allowed: ZIP, RAR, Gerber files"
        )

    s3_client = get_s3_client()
    if not s3_client:
        # S3 not configured, return error suggesting direct upload
        raise HTTPException(
            status_code=503,
            detail={
                "error": True,
                "message": "S3 not configured. Use /api/upload/direct endpoint.",
                "fallback": "/api/upload/direct"
            }
        )

    file_key = generate_file_key(request.file_name)

    try:
        # Generate presigned URL
        presigned_url = s3_client.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': S3_BUCKET,
                'Key': file_key,
                'ContentType': request.content_type
            },
            ExpiresIn=3600  # 1 hour
        )

        return PresignedUrlResponse(
            upload_url=presigned_url,
            file_key=file_key,
            expires_in=3600
        )

    except ClientError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate upload URL: {str(e)}"
        )


@router.post("/direct")
async def direct_upload(
    file: UploadFile = File(...),
    rate_limit: bool = Depends(check_upload_rate_limit)
):
    """
    Direct file upload to server (fallback when S3 not available).
    """
    # Validate file
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    if not validate_file_extension(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Invalid file extension"
        )

    # Check file size (read in chunks)
    file_size = 0
    chunks = []

    while True:
        chunk = await file.read(1024 * 1024)  # 1MB chunks
        if not chunk:
            break
        file_size += len(chunk)
        chunks.append(chunk)

        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Maximum size: {MAX_FILE_SIZE // (1024*1024)}MB"
            )

    # Generate unique filename
    file_key = generate_file_key(file.filename)
    local_path = UPLOAD_DIR / file_key.replace('/', '_')

    # Save file
    try:
        async with aiofiles.open(local_path, 'wb') as f:
            for chunk in chunks:
                await f.write(chunk)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save file: {str(e)}"
        )

    # Analyze file
    try:
        analysis = await analyze_gerber_files(local_path)
    except Exception as e:
        analysis = {"warnings": [f"Analysis failed: {str(e)}"]}

    return {
        "success": True,
        "file_key": file_key,
        "file_name": file.filename,
        "file_size": file_size,
        "analysis": analysis,
        "uploaded_at": datetime.utcnow().isoformat()
    }


@router.post("/analyze")
async def analyze_uploaded_file(
    file_key: str
):
    """
    Analyze a previously uploaded file.
    """
    # Check local storage first
    local_path = UPLOAD_DIR / file_key.replace('/', '_')

    if local_path.exists():
        analysis = await analyze_gerber_files(local_path)
        return FileAnalysisResult(
            file_key=file_key,
            **analysis
        )

    # Try S3
    s3_client = get_s3_client()
    if s3_client:
        try:
            # Download from S3 temporarily
            temp_path = UPLOAD_DIR / f"temp_{uuid.uuid4().hex}"
            s3_client.download_file(S3_BUCKET, file_key, str(temp_path))

            analysis = await analyze_gerber_files(temp_path)

            # Clean up temp file
            temp_path.unlink(missing_ok=True)

            return FileAnalysisResult(
                file_key=file_key,
                **analysis
            )
        except ClientError:
            pass

    raise HTTPException(
        status_code=404,
        detail="File not found"
    )


@router.get("/status/{file_key:path}")
async def get_upload_status(file_key: str):
    """
    Check status of an uploaded file.
    """
    # Check local
    local_path = UPLOAD_DIR / file_key.replace('/', '_')
    if local_path.exists():
        stats = local_path.stat()
        return {
            "exists": True,
            "location": "local",
            "size": stats.st_size,
            "uploaded_at": datetime.fromtimestamp(stats.st_mtime).isoformat()
        }

    # Check S3
    s3_client = get_s3_client()
    if s3_client:
        try:
            response = s3_client.head_object(Bucket=S3_BUCKET, Key=file_key)
            return {
                "exists": True,
                "location": "s3",
                "size": response['ContentLength'],
                "uploaded_at": response['LastModified'].isoformat()
            }
        except ClientError:
            pass

    return {"exists": False}


@router.delete("/{file_key:path}")
async def delete_uploaded_file(file_key: str):
    """
    Delete an uploaded file.
    """
    deleted = False

    # Try local
    local_path = UPLOAD_DIR / file_key.replace('/', '_')
    if local_path.exists():
        local_path.unlink()
        deleted = True

    # Try S3
    s3_client = get_s3_client()
    if s3_client:
        try:
            s3_client.delete_object(Bucket=S3_BUCKET, Key=file_key)
            deleted = True
        except ClientError:
            pass

    if not deleted:
        raise HTTPException(status_code=404, detail="File not found")

    return {"deleted": True, "file_key": file_key}
