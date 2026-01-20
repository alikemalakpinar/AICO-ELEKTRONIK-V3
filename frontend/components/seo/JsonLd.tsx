import React from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aico-elektronik.com';

// Organization Schema - for company pages
interface OrganizationSchemaProps {
  lang?: 'tr' | 'en';
}

export function OrganizationSchema({ lang = 'tr' }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AICO Elektronik',
    alternateName: 'AICO Engineering Solutions',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/logo-dark.svg`,
    description: lang === 'tr'
      ? 'Muhendislik ve IoT cozumleri sunan yenilikci teknoloji firmasi. Akilli yasam, yangin guvenligi, soguk zincir ve maden IoT sistemleri.'
      : 'Innovative technology company providing engineering and IoT solutions. Smart living, fire safety, cold chain, and mining IoT systems.',
    foundingDate: '2020',
    founders: [{
      '@type': 'Person',
      name: 'AICO Team',
    }],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+90-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['Turkish', 'English'],
    }],
    sameAs: [
      'https://www.linkedin.com/company/aico-elektronik',
      'https://twitter.com/aicoelektronik',
      'https://github.com/aico-elektronik',
    ],
    knowsAbout: [
      'IoT Systems',
      'Fire Safety Systems',
      'Cold Chain Monitoring',
      'Mining Safety',
      'Smart Home Automation',
      'Electronic Engineering',
      'Embedded Systems',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema - for solution/product pages
interface ProductSchemaProps {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  category?: string;
  url: string;
  features?: string[];
}

export function ProductSchema({
  name,
  description,
  image,
  brand = 'AICO Elektronik',
  category,
  url,
  features = [],
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || `${BASE_URL}/assets/og-image.jpg`,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    category,
    url,
    manufacturer: {
      '@type': 'Organization',
      name: 'AICO Elektronik',
    },
    ...(features.length > 0 && {
      additionalProperty: features.map((feature, index) => ({
        '@type': 'PropertyValue',
        name: `Feature ${index + 1}`,
        value: feature,
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article/Project Schema - for case studies and blog posts
interface ArticleSchemaProps {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  url: string;
  keywords?: string[];
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = 'AICO Elektronik Team',
  url,
  keywords = [],
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || `${BASE_URL}/assets/og-image.jpg`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AICO Elektronik',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/logo-dark.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema - for FAQ sections
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema - for service offerings
interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string[];
  serviceType?: string;
  url: string;
}

export function ServiceSchema({
  name,
  description,
  provider = 'AICO Elektronik',
  areaServed = ['Turkey', 'Europe', 'Middle East'],
  serviceType,
  url,
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: BASE_URL,
    },
    areaServed: areaServed.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    serviceType,
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema - for site-wide search
interface WebSiteSchemaProps {
  lang?: 'tr' | 'en';
}

export function WebSiteSchema({ lang = 'tr' }: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AICO Elektronik',
    url: BASE_URL,
    description: lang === 'tr'
      ? 'AICO Elektronik - Muhendislik ve IoT Cozumleri'
      : 'AICO Elektronik - Engineering and IoT Solutions',
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/${lang}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
