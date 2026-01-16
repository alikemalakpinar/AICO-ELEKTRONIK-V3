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
            console.warn('[API] Unauthorized - token cleared');
          }
          break;
        case 403:
          console.error('[API] Forbidden:', data);
          toast.error('Bu islem icin yetkiniz yok');
          break;
        case 404:
          console.error('[API] Not Found:', error.config?.url);
          break;
        case 429:
          // Rate limited
          const retryAfter = error.response.headers['retry-after'] || 60;
          toast.error(`Cok fazla istek. ${retryAfter} saniye bekleyin.`);
          break;
        case 500:
        case 502:
        case 503:
          console.error('[API] Server Error:', data);
          toast.error('Sunucu hatasi. Lutfen daha sonra tekrar deneyin.');
          break;
        default:
          console.error(`[API] Error ${status}:`, data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('[API] No response received:', error.request);
      toast.error('Sunucuya ulasilamiyor. Internet baglantinizi kontrol edin.');
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
 * Projects/Portfolio API endpoints
 */
export const projectsApi = {
  /**
   * Get all projects
   * @param {Object} params - Filter params (featured, industry)
   * @returns {Promise<Array>} Projects list
   */
  getAll: (params = {}) => api.get('/projects', { params }),

  /**
   * Get featured projects
   * @returns {Promise<Array>} Featured projects
   */
  getFeatured: () => api.get('/projects', { params: { featured: true } }),

  /**
   * Get single project by slug
   * @param {string} slug - Project slug
   * @returns {Promise<Object>} Project data
   */
  getBySlug: (slug) => api.get(`/projects/${slug}`),

  /**
   * Get projects by industry
   * @param {string} industry - Industry name
   * @returns {Promise<Array>} Projects in industry
   */
  getByIndustry: (industry) => api.get(`/projects/industry/${industry}`),
};

/**
 * Contact/Consultation API endpoints
 */
export const contactApi = {
  /**
   * Submit a consultation request
   * @param {Object} data - Consultation form data
   * @returns {Promise<Object>} Created request
   */
  submitConsultation: (data) => api.post('/contact/consultation', data),

  /**
   * Submit info request (legacy endpoint)
   * @param {Object} data - Request data
   * @returns {Promise<Object>} Created request
   */
  submitInfoRequest: (data) => api.post('/contact/request-info', data),
};

/**
 * Configuration API endpoints
 */
export const configApi = {
  /**
   * Get site configuration
   * @returns {Promise<Object>} Site config
   */
  getSiteConfig: () => api.get('/config/site.config'),

  /**
   * Get all available technologies
   * @returns {Promise<Array>} Technologies list
   */
  getTechnologies: () => api.get('/technologies'),

  /**
   * Get all industries served
   * @returns {Promise<Array>} Industries list
   */
  getIndustries: () => api.get('/industries'),
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
