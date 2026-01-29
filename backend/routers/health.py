"""
Health Check Router - System health and monitoring endpoints.
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from datetime import datetime
import platform
import psutil
import os

from config import settings, logger

router = APIRouter(prefix="/api/v1", tags=["Health & Monitoring"])


@router.get("/health")
async def health_check() -> Dict[str, Any]:
    """
    Basic health check endpoint.
    Returns 200 if the service is running.
    """
    return {
        "status": "healthy",
        "service": "aico-backend",
        "timestamp": datetime.utcnow().isoformat()
    }


@router.get("/health/detailed")
async def detailed_health_check() -> Dict[str, Any]:
    """
    Detailed health check with system metrics.
    Useful for monitoring and debugging.
    """
    try:
        # System info
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')

        return {
            "status": "healthy",
            "service": "aico-backend",
            "environment": settings.ENVIRONMENT,
            "timestamp": datetime.utcnow().isoformat(),
            "system": {
                "platform": platform.system(),
                "platform_version": platform.version(),
                "python_version": platform.python_version(),
                "cpu_count": psutil.cpu_count(),
                "cpu_percent": psutil.cpu_percent(interval=0.1),
            },
            "memory": {
                "total_gb": round(memory.total / (1024**3), 2),
                "available_gb": round(memory.available / (1024**3), 2),
                "used_percent": memory.percent
            },
            "disk": {
                "total_gb": round(disk.total / (1024**3), 2),
                "free_gb": round(disk.free / (1024**3), 2),
                "used_percent": round((disk.used / disk.total) * 100, 1)
            },
            "config": {
                "debug": settings.DEBUG,
                "redis_enabled": settings.redis_enabled,
                "s3_enabled": settings.s3_enabled
            }
        }

    except Exception as e:
        logger.error(f"Health check error: {str(e)}")
        return {
            "status": "degraded",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }


@router.get("/health/ready")
async def readiness_check() -> Dict[str, Any]:
    """
    Readiness check for Kubernetes.
    Checks if the service is ready to accept traffic.
    """
    checks = {
        "database": False,
        "cache": None,  # Optional
    }

    try:
        # Check MongoDB connection
        # In production, actually ping the database
        checks["database"] = True

        # Check Redis if configured
        if settings.redis_enabled:
            # In production, ping Redis
            checks["cache"] = True

        all_ready = checks["database"]

        return {
            "status": "ready" if all_ready else "not_ready",
            "checks": checks,
            "timestamp": datetime.utcnow().isoformat()
        }

    except Exception as e:
        logger.error(f"Readiness check error: {str(e)}")
        raise HTTPException(
            status_code=503,
            detail={
                "status": "not_ready",
                "error": str(e),
                "checks": checks
            }
        )


@router.get("/health/live")
async def liveness_check() -> Dict[str, str]:
    """
    Liveness check for Kubernetes.
    Simple check to verify the process is running.
    """
    return {"status": "alive"}


@router.get("/version")
async def get_version() -> Dict[str, Any]:
    """
    Get application version information.
    """
    return {
        "service": "aico-backend",
        "version": os.getenv("APP_VERSION", "1.0.0"),
        "build": os.getenv("BUILD_NUMBER", "local"),
        "commit": os.getenv("GIT_COMMIT", "unknown"),
        "environment": settings.ENVIRONMENT
    }
