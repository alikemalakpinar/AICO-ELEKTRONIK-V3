/**
 * API Client - Centralized Axios configuration
 * Provides consistent API access with error handling, retries, and logging
 */

import axios from 'axios';
import { toast } from 'sonner';

// Base configuration
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10);

// Create axios instance
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ============================================
// Request Interceptor
// ============================================
api.interceptors.request.use(
  (config) => {
    // Add timestamp to requests for debugging
    config.metadata = { startTime: new Date() };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    }

    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// ============================================
// Response Interceptor
// ============================================
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata?.startTime;

    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] Response ${response.status} (${duration}ms):`, response.data);
    }

    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('[API] Bad Request:', data);
          break;
        case 401:
          // Unauthorized - clear token and redirect
          localStorage.removeItem('authToken');
          if (!window.location.pathname.includes('/login')) {
            // Could redirect to login here
            console.warn('[API] Unauthorized - token cleared');
          }
          break;
        case 403:
          console.error('[API] Forbidden:', data);
          toast.error('Bu işlem için yetkiniz yok');
          break;
        case 404:
          console.error('[API] Not Found:', error.config?.url);
          break;
        case 429:
          // Rate limited
          const retryAfter = error.response.headers['retry-after'] || 60;
          toast.error(`Çok fazla istek. ${retryAfter} saniye bekleyin.`);
          break;
        case 500:
        case 502:
        case 503:
          console.error('[API] Server Error:', data);
          toast.error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
          break;
        default:
          console.error(`[API] Error ${status}:`, data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('[API] No response received:', error.request);
      toast.error('Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.');
    } else {
      // Error in request setup
      console.error('[API] Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

// ============================================
// API Methods
// ============================================

/**
 * Quote API endpoints
 */
export const quoteApi = {
  /**
   * Calculate pricing for PCB/SMT order
   * @param {Object} options - PCB and SMT options
   * @returns {Promise<Object>} Pricing breakdown
   */
  calculate: (options) => api.post('/quote/calculate', options),

  /**
   * Get complete analysis with DFM score
   * @param {Object} options - PCB and SMT options
   * @returns {Promise<Object>} Analysis with suggestions
   */
  completeAnalysis: (options) => api.post('/quote/complete-analysis', options),

  /**
   * Save a quote for later
   * @param {Object} quoteData - Quote to save
   * @returns {Promise<Object>} Saved quote with ID
   */
  save: (quoteData) => api.post('/quote/save', quoteData),

  /**
   * Get saved quote by ID
   * @param {string} quoteId - Quote ID
   * @returns {Promise<Object>} Quote data
   */
  get: (quoteId) => api.get(`/quote/${quoteId}`),

  /**
   * List saved quotes
   * @param {Object} params - Pagination params
   * @returns {Promise<Object>} Quotes list
   */
  list: (params = {}) => api.get('/quote', { params }),
};

/**
 * Configuration API endpoints
 */
export const configApi = {
  /**
   * Get all form options
   * @returns {Promise<Object>} Form configuration
   */
  getFormOptions: () => api.get('/config/form-options'),

  /**
   * Get surface finish options
   * @returns {Promise<Array>} Finish options
   */
  getFinishes: () => api.get('/config/finishes'),

  /**
   * Get color options
   * @returns {Promise<Array>} Color options
   */
  getColors: () => api.get('/config/colors'),

  /**
   * Get pricing factors
   * @returns {Promise<Object>} Pricing multipliers
   */
  getPricingFactors: () => api.get('/config/pricing-factors'),
};

/**
 * Upload API endpoints
 */
export const uploadApi = {
  /**
   * Get presigned URL for S3 upload
   * @param {string} fileName - File name
   * @param {string} contentType - MIME type
   * @returns {Promise<Object>} Presigned URL data
   */
  getPresignedUrl: (fileName, contentType) =>
    api.post('/upload/presigned-url', { file_name: fileName, content_type: contentType }),

  /**
   * Direct file upload (fallback)
   * @param {File} file - File to upload
   * @param {Function} onProgress - Progress callback
   * @returns {Promise<Object>} Upload result
   */
  directUpload: (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post('/upload/direct', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
  },

  /**
   * Analyze uploaded file
   * @param {string} fileKey - File key from upload
   * @returns {Promise<Object>} Analysis result
   */
  analyze: (fileKey) => api.post('/upload/analyze', { file_key: fileKey }),

  /**
   * Check upload status
   * @param {string} fileKey - File key
   * @returns {Promise<Object>} Status info
   */
  getStatus: (fileKey) => api.get(`/upload/status/${fileKey}`),
};

/**
 * Health check
 */
export const healthApi = {
  check: () => api.get('/health'),
  detailed: () => api.get('/health/detailed'),
  version: () => api.get('/version'),
};

// Export default instance for custom requests
export default api;

// ============================================
// Utility Functions
// ============================================

/**
 * Upload file with automatic S3/direct fallback
 * @param {File} file - File to upload
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>} Upload result
 */
export async function uploadFile(file, onProgress) {
  try {
    // Try S3 presigned URL first
    const { data: presignedData } = await uploadApi.getPresignedUrl(
      file.name,
      file.type || 'application/octet-stream'
    );

    // Upload directly to S3
    await axios.put(presignedData.upload_url, file, {
      headers: { 'Content-Type': file.type },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return {
      success: true,
      fileKey: presignedData.file_key,
      method: 's3',
    };
  } catch (error) {
    // Fallback to direct upload
    console.log('[Upload] S3 failed, falling back to direct upload');
    const { data } = await uploadApi.directUpload(file, onProgress);
    return {
      success: true,
      fileKey: data.file_key,
      method: 'direct',
      analysis: data.analysis,
    };
  }
}
