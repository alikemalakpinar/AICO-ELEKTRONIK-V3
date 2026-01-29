// ===========================================
// AICO Engineering - Type Definitions
// Industrial-Grade Type System v3.0
// ===========================================

// =============================================
// API Response Envelope Types
// Every API response MUST use these wrappers.
// =============================================

/** Standard success envelope for single-item responses */
export interface ApiResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

/** Standard success envelope for paginated list responses */
export interface ApiPaginatedResponse<T> {
  success: true;
  items: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
  timestamp: string;
}

/** Standard error envelope — discriminated by `success: false` */
export interface ApiErrorResponse {
  success: false;
  error: true;
  message: string;
  details: ApiErrorDetail[];
  timestamp: string;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
  code: ApiErrorCode;
}

/**
 * Discriminated union for all API responses.
 * Consumers must narrow via `response.success` before accessing data.
 */
export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

/** Exhaustive error codes matching backend error taxonomy */
export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'RATE_LIMITED'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INTERNAL_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'TIMEOUT';

/** HTTP status code type guard */
export type HttpStatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 408 | 429 | 500 | 503;

// =============================================
// Domain Types - Projects
// =============================================

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  description: string;
  seoDescription: string;
  fullDetailText: string;
  challenge: string;
  solution: string;
  techStack: TechStackItem[];
  stats: ProjectStat[];
  specs: ProjectSpec[];
  tags: string[];
  images: ProjectImage[];
  featured: boolean;
  cta?: {
    text: string;
    link: string;
  };
}

export type ProjectCategory =
  | 'embedded'
  | 'industrial'
  | 'saas'
  | 'iot'
  | 'consumer';

export interface TechStackItem {
  name: string;
  icon?: string;
  category: 'hardware' | 'software' | 'protocol' | 'platform';
}

// =============================================
// Domain Types - Services
// =============================================

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  href?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  services: Service[];
}

// =============================================
// Domain Types - Contact
// =============================================

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
}

export type ContactSubject =
  | 'new-project'
  | 'consultation'
  | 'technical-support'
  | 'other';

// =============================================
// Domain Types - Health & System
// =============================================

/** Health check status — discriminated union */
export type HealthStatus =
  | { status: 'healthy'; timestamp: string }
  | { status: 'degraded'; error: string; timestamp: string }
  | { status: 'unhealthy'; error: string; timestamp: string };

/** Rate limit info returned in response headers */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetSeconds: number;
}

// =============================================
// UI State Types
// =============================================

export interface CategoryFilter {
  id: string;
  label: string;
}

/**
 * Loading state discriminated union.
 * Components MUST handle all three states.
 */
export type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string; code?: ApiErrorCode };

// =============================================
// Locale Types
// =============================================

export type Locale = 'tr' | 'en';

export interface LocalizedContent<T> {
  tr: T;
  en: T;
}

// =============================================
// 3D / Visualization Types
// =============================================

/** Device capability tier for 3D rendering decisions */
export type DeviceCapabilityTier = 'high' | 'medium' | 'low' | 'minimal';

/** Canvas configuration derived from device capability */
export interface CanvasConfig {
  dpr: number | [number, number];
  frameloop: 'always' | 'demand' | 'never';
  shadows: boolean;
  antialias: boolean;
  powerPreference: 'high-performance' | 'low-power' | 'default';
}
