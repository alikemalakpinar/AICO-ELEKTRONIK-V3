/**
 * API client utility for AICO Elektronik v3
 *
 * All endpoints target /api/v1/ — versioned for schema evolution.
 *
 * Same-Origin Proxy Architecture:
 * - All API calls use relative URLs (/api/v1/...)
 * - nginx proxies /api/ requests to the FastAPI backend
 * - No NEXT_PUBLIC_* env vars needed for API calls
 * - Same Docker image works across all environments (staging/prod)
 *
 * Server-Side Rendering:
 * - Uses INTERNAL_API_URL env var (Docker internal network)
 * - Bypasses nginx for faster SSR data fetching
 */

import type { ApiResult, ApiErrorCode, HttpStatusCode } from '@/types';

type FetchOptions = RequestInit & {
  timeout?: number;
};

/** API version prefix — single source of truth */
const API_VERSION = '/api/v1' as const;

/**
 * Get the API base URL.
 * - Server-side (SSR/SSG): Uses INTERNAL_API_URL for Docker internal network
 * - Client-side: Uses empty string (relative URL) so nginx proxies to backend
 */
function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.INTERNAL_API_URL || 'http://backend:8001';
  }
  return '';
}

/**
 * Fetch wrapper with timeout, error handling, and v1 prefix enforcement.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options;
  const baseUrl = getApiBaseUrl();

  // Normalize: ensure endpoint uses /api/v1/ prefix
  let normalizedEndpoint: string;
  if (endpoint.startsWith('/api/v1/')) {
    normalizedEndpoint = endpoint;
  } else if (endpoint.startsWith('/api/')) {
    // Migrate legacy /api/ calls to /api/v1/
    normalizedEndpoint = endpoint.replace('/api/', '/api/v1/');
  } else {
    normalizedEndpoint = `${API_VERSION}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  }

  const url = `${baseUrl}${normalizedEndpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status as HttpStatusCode
      );
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408);
    }

    throw error;
  }
}

/**
 * Custom API error class with typed status codes
 */
export class ApiError extends Error {
  public readonly code: ApiErrorCode;

  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = statusToErrorCode(statusCode);
  }
}

/** Map HTTP status codes to typed error codes */
function statusToErrorCode(status: number): ApiErrorCode {
  switch (status) {
    case 400: return 'VALIDATION_ERROR';
    case 401: return 'UNAUTHORIZED';
    case 403: return 'FORBIDDEN';
    case 404: return 'NOT_FOUND';
    case 408: return 'TIMEOUT';
    case 429: return 'RATE_LIMITED';
    case 503: return 'SERVICE_UNAVAILABLE';
    default: return 'INTERNAL_ERROR';
  }
}

/**
 * API endpoints — all routed through /api/v1/
 */
export const api = {
  // Projects
  getProjects: (params?: { featured?: boolean; industry?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.featured !== undefined) searchParams.set('featured', String(params.featured));
    if (params?.industry) searchParams.set('industry', params.industry);
    const query = searchParams.toString();
    return apiFetch<Project[]>(`/projects${query ? `?${query}` : ''}`);
  },

  getProject: (slug: string) =>
    apiFetch<Project>(`/projects/${slug}`),

  getProjectsByIndustry: (industry: string) =>
    apiFetch<Project[]>(`/projects/industry/${industry}`),

  // Technologies & Industries
  getTechnologies: () => apiFetch<string[]>('/technologies'),
  getIndustries: () => apiFetch<string[]>('/industries'),

  // Contact
  submitConsultation: (data: ConsultationRequest) =>
    apiFetch<ConsultationResponse>('/contact/consultation', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Config
  getConfig: (key: string) => apiFetch<ConfigItem>(`/config/${key}`),
  getAllConfigs: () => apiFetch<ConfigItem[]>('/config'),

  // Health
  getHealth: () => apiFetch<HealthResponse>('/health'),
};

// Types
export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  hero_image: string;
  client_industry: string;
  challenge_text: string;
  solution_text: string;
  approach_text?: string;
  technologies: string[];
  phases: ProjectPhase[];
  results_text: string;
  metrics?: Record<string, string>;
  gallery_images: string[];
  pcb_layers?: string[];
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  schema_version?: number;
}

export interface ProjectPhase {
  title: string;
  description: string;
  image_url?: string;
}

export interface ConsultationRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
}

export interface ConsultationResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  created_at: string;
  schema_version?: number;
}

export interface ConfigItem {
  key: string;
  value: unknown;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}
