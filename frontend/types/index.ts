// ===========================================
// AICO Engineering - Type Definitions
// ===========================================

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

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: 'new-project' | 'consultation' | 'technical-support' | 'other';
  message: string;
}

export interface CategoryFilter {
  id: string;
  label: string;
}

// Locale types
export type Locale = 'tr' | 'en';

export interface LocalizedContent<T> {
  tr: T;
  en: T;
}
