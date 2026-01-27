/**
 * API client utility for AICO Elektronik
 *
 * Same-Origin Proxy Architecture:
 * - All API calls use relative URLs (/api/...)
 * - nginx proxies /api/ requests to the FastAPI backend
 * - No NEXT_PUBLIC_* env vars needed for API calls
 * - Same Docker image works across all environments (staging/prod)
 *
 * Server-Side Rendering:
 * - Uses INTERNAL_API_URL env var (Docker internal network)
 * - Bypasses nginx for faster SSR data fetching
 */

type FetchOptions = RequestInit & {
  timeout?: number;
};

/**
 * Get the API base URL.
 * - Server-side (SSR/SSG): Uses INTERNAL_API_URL for Docker internal network
 * - Client-side: Uses empty string (relative URL) so nginx proxies to backend
 *
 * This architecture ensures:
 * 1. No build-time API URL freezing
 * 2. Same image works across staging/prod
 * 3. Proper rate limiting with real client IP (X-Forwarded-For)
 */
function getApiBaseUrl(): string {
  // Server-side rendering - use internal Docker network
  if (typeof window === 'undefined') {
    return process.env.INTERNAL_API_URL || 'http://backend:8001';
  }

  // Client-side - always use relative URL (nginx proxies to backend)
  return '';
}

/**
 * Fetch wrapper with timeout and error handling
 */
export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options;
  const baseUrl = getApiBaseUrl();

  // Ensure endpoint starts with /api/
  const normalizedEndpoint = endpoint.startsWith('/api/')
    ? endpoint
    : `/api${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

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
        response.status
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
 * Custom API error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * API endpoints
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
}

export interface ConfigItem {
  key: string;
  value: unknown;
}
