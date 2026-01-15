import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, File, X, CheckCircle2, AlertCircle,
  Loader2, FileArchive, FileText, FileSpreadsheet
} from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// File type icons
const getFileIcon = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  switch (ext) {
    case 'zip':
    case 'rar':
    case '7z':
      return FileArchive;
    case 'csv':
    case 'xlsx':
    case 'xls':
      return FileSpreadsheet;
    default:
      return FileText;
  }
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Upload states
const UPLOAD_STATUS = {
  IDLE: 'idle',
  UPLOADING: 'uploading',
  SUCCESS: 'success',
  ERROR: 'error',
  ANALYZING: 'analyzing'
};

const FileUploader = ({
  onUploadComplete,
  onAnalysisComplete,
  lang = 'tr',
  maxSize = 50 * 1024 * 1024, // 50MB
  acceptedTypes = {
    'application/zip': ['.zip'],
    'application/x-zip-compressed': ['.zip'],
    'application/x-rar-compressed': ['.rar'],
    'application/x-rar': ['.rar'],
  }
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.IDLE);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const content = {
    tr: {
      dropzone: {
        title: 'Gerber, BOM veya PnP dosyalarınızı yükleyin',
        subtitle: 'ZIP veya RAR formatında sürükleyin veya tıklayın',
        maxSize: `Maksimum dosya boyutu: ${formatFileSize(maxSize)}`,
        selectFile: 'Dosya Seç',
        replace: 'Dosyayı Değiştir'
      },
      status: {
        uploading: 'Yükleniyor...',
        analyzing: 'Dosya analiz ediliyor...',
        success: 'Yükleme başarılı',
        error: 'Yükleme hatası'
      },
      formats: {
        title: 'Desteklenen Formatlar',
        gerber: 'Gerber (.gbr, .gtl, .gbl)',
        drill: 'Drill (.drl, .xln)',
        bom: 'BOM (.csv, .xlsx)',
        pnp: 'Pick & Place (.csv, .txt)'
      },
      errors: {
        tooLarge: 'Dosya çok büyük',
        invalidType: 'Geçersiz dosya formatı',
        uploadFailed: 'Yükleme başarısız'
      }
    },
    en: {
      dropzone: {
        title: 'Upload your Gerber, BOM or PnP files',
        subtitle: 'Drag and drop ZIP or RAR files',
        maxSize: `Maximum file size: ${formatFileSize(maxSize)}`,
        selectFile: 'Select File',
        replace: 'Replace File'
      },
      status: {
        uploading: 'Uploading...',
        analyzing: 'Analyzing file...',
        success: 'Upload successful',
        error: 'Upload error'
      },
      formats: {
        title: 'Supported Formats',
        gerber: 'Gerber (.gbr, .gtl, .gbl)',
        drill: 'Drill (.drl, .xln)',
        bom: 'BOM (.csv, .xlsx)',
        pnp: 'Pick & Place (.csv, .txt)'
      },
      errors: {
        tooLarge: 'File too large',
        invalidType: 'Invalid file format',
        uploadFailed: 'Upload failed'
      }
    }
  };

  const t = content[lang] || content.tr;

  // Get presigned URL for S3 upload
  const getPresignedUrl = async (fileName, contentType) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/upload/presigned-url`, {
        file_name: fileName,
        content_type: contentType
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get presigned URL:', error);
      throw new Error('Yükleme URL\'si alınamadı');
    }
  };

  // Upload file to S3 using presigned URL
  const uploadToS3 = async (file, presignedUrl) => {
    try {
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
    } catch (error) {
      console.error('S3 upload failed:', error);
      throw new Error('Dosya yüklenemedi');
    }
  };

  // Analyze uploaded file
  const analyzeFile = async (fileKey) => {
    try {
      setUploadStatus(UPLOAD_STATUS.ANALYZING);
      const response = await axios.post(`${BACKEND_URL}/api/upload/analyze`, {
        file_key: fileKey
      });
      return response.data;
    } catch (error) {
      console.error('File analysis failed:', error);
      throw new Error('Dosya analizi başarısız');
    }
  };

  // Main upload handler
  const handleUpload = async (file) => {
    setUploadStatus(UPLOAD_STATUS.UPLOADING);
    setUploadProgress(0);
    setErrorMessage(null);

    try {
      // Step 1: Get presigned URL
      const { upload_url, file_key } = await getPresignedUrl(file.name, file.type || 'application/octet-stream');

      // Step 2: Upload to S3
      await uploadToS3(file, upload_url);

      setUploadStatus(UPLOAD_STATUS.SUCCESS);

      // Step 3: Analyze file (optional, can be async)
      try {
        const analysis = await analyzeFile(file_key);
        setAnalysisResult(analysis);

        if (onAnalysisComplete) {
          onAnalysisComplete(analysis);
        }
      } catch (analysisError) {
        // Analysis failure shouldn't block upload success
        console.warn('Analysis failed:', analysisError);
      }

      if (onUploadComplete) {
        onUploadComplete({
          fileName: file.name,
          fileKey: file_key,
          fileSize: file.size,
          uploadedAt: new Date().toISOString()
        });
      }

      toast.success(t.status.success);

    } catch (error) {
      setUploadStatus(UPLOAD_STATUS.ERROR);
      setErrorMessage(error.message || t.errors.uploadFailed);
      toast.error(error.message || t.errors.uploadFailed);
    }
  };

  // Fallback upload (direct to backend if S3 not configured)
  const handleDirectUpload = async (file) => {
    setUploadStatus(UPLOAD_STATUS.UPLOADING);
    setUploadProgress(0);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/upload/direct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      setUploadStatus(UPLOAD_STATUS.SUCCESS);

      if (response.data.analysis) {
        setAnalysisResult(response.data.analysis);
        if (onAnalysisComplete) {
          onAnalysisComplete(response.data.analysis);
        }
      }

      if (onUploadComplete) {
        onUploadComplete({
          fileName: file.name,
          fileKey: response.data.file_key,
          fileSize: file.size,
          uploadedAt: new Date().toISOString()
        });
      }

      toast.success(t.status.success);

    } catch (error) {
      setUploadStatus(UPLOAD_STATUS.ERROR);
      setErrorMessage(error.response?.data?.detail || t.errors.uploadFailed);
      toast.error(error.response?.data?.detail || t.errors.uploadFailed);
    }
  };

  // Dropzone configuration
  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setErrorMessage(t.errors.tooLarge);
        toast.error(t.errors.tooLarge);
      } else {
        setErrorMessage(t.errors.invalidType);
        toast.error(t.errors.invalidType);
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFiles([{
        file,
        name: file.name,
        size: file.size,
        type: file.type
      }]);

      // Try presigned URL upload first, fallback to direct upload
      try {
        await handleUpload(file);
      } catch (error) {
        console.log('Falling back to direct upload');
        await handleDirectUpload(file);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxSize,
    multiple: false,
    disabled: uploadStatus === UPLOAD_STATUS.UPLOADING || uploadStatus === UPLOAD_STATUS.ANALYZING
  });

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFiles([]);
    setUploadStatus(UPLOAD_STATUS.IDLE);
    setUploadProgress(0);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-4">
      {/* Dropzone Area */}
      <motion.div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-300 overflow-hidden
          ${isDragActive && !isDragReject ? 'border-blue-500 bg-blue-50' : ''}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
          ${!isDragActive && !isDragReject ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50' : ''}
          ${uploadStatus === UPLOAD_STATUS.SUCCESS ? 'border-green-500 bg-green-50' : ''}
          ${uploadStatus === UPLOAD_STATUS.ERROR ? 'border-red-500 bg-red-50' : ''}
          ${(uploadStatus === UPLOAD_STATUS.UPLOADING || uploadStatus === UPLOAD_STATUS.ANALYZING) ? 'pointer-events-none opacity-75' : ''}
        `}
        whileHover={{ scale: uploadStatus === UPLOAD_STATUS.IDLE ? 1.01 : 1 }}
        whileTap={{ scale: uploadStatus === UPLOAD_STATUS.IDLE ? 0.99 : 1 }}
      >
        <input {...getInputProps()} />

        {/* Background Animation */}
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600"
          />
        )}

        {/* Upload Icon Animation */}
        <motion.div
          animate={isDragActive ? { y: [0, -10, 0] } : { y: 0 }}
          transition={{ duration: 1, repeat: isDragActive ? Infinity : 0 }}
          className="mb-4"
        >
          {uploadStatus === UPLOAD_STATUS.UPLOADING || uploadStatus === UPLOAD_STATUS.ANALYZING ? (
            <Loader2 className="w-14 h-14 mx-auto text-blue-500 animate-spin" />
          ) : uploadStatus === UPLOAD_STATUS.SUCCESS ? (
            <CheckCircle2 className="w-14 h-14 mx-auto text-green-500" />
          ) : uploadStatus === UPLOAD_STATUS.ERROR ? (
            <AlertCircle className="w-14 h-14 mx-auto text-red-500" />
          ) : (
            <Upload className={`w-14 h-14 mx-auto ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
          )}
        </motion.div>

        {/* Status Text */}
        <AnimatePresence mode="wait">
          {uploadStatus === UPLOAD_STATUS.UPLOADING && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <p className="text-lg font-medium text-blue-600">{t.status.uploading}</p>
              <Progress value={uploadProgress} className="w-full max-w-xs mx-auto h-2" />
              <p className="text-sm text-gray-500">{uploadProgress}%</p>
            </motion.div>
          )}

          {uploadStatus === UPLOAD_STATUS.ANALYZING && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <p className="text-lg font-medium text-blue-600">{t.status.analyzing}</p>
              <div className="flex items-center justify-center gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {uploadStatus === UPLOAD_STATUS.IDLE && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-lg font-medium text-gray-700 mb-2">{t.dropzone.title}</p>
              <p className="text-sm text-gray-500 mb-4">{t.dropzone.subtitle}</p>
              <Button
                type="button"
                className="hover:bg-blue-600"
                onClick={(e) => e.stopPropagation()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {t.dropzone.selectFile}
              </Button>
              <p className="text-xs text-gray-400 mt-3">{t.dropzone.maxSize}</p>
            </motion.div>
          )}

          {uploadStatus === UPLOAD_STATUS.ERROR && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-lg font-medium text-red-600 mb-2">{t.status.error}</p>
              <p className="text-sm text-red-500">{errorMessage}</p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              >
                Tekrar Dene
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Uploaded Files List */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && uploadStatus === UPLOAD_STATUS.SUCCESS && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4"
          >
            {uploadedFiles.map((item, idx) => {
              const FileIcon = getFileIcon(item.name);
              return (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <FileIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(item.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <button
                      onClick={removeFile}
                      className="p-1 hover:bg-green-200 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Results Preview */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Dosya Analizi Tamamlandı
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {analysisResult.layers && (
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-gray-500">Katman</p>
                  <p className="font-bold text-blue-600">{analysisResult.layers}</p>
                </div>
              )}
              {analysisResult.board_size && (
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-gray-500">Boyut</p>
                  <p className="font-bold text-blue-600">
                    {analysisResult.board_size.width}x{analysisResult.board_size.height}mm
                  </p>
                </div>
              )}
              {analysisResult.component_count !== undefined && (
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-gray-500">Bileşen</p>
                  <p className="font-bold text-blue-600">{analysisResult.component_count}</p>
                </div>
              )}
              {analysisResult.file_count && (
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-gray-500">Dosya</p>
                  <p className="font-bold text-blue-600">{analysisResult.file_count}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Supported Formats Info */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{t.formats.title}</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '📋', text: t.formats.gerber },
            { icon: '🔩', text: t.formats.drill },
            { icon: '📊', text: t.formats.bom },
            { icon: '📍', text: t.formats.pnp }
          ].map((format, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <span>{format.icon}</span>
              <span>{format.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
