import React from 'react';
import { getTranslations, type Locale } from '@/lib/i18n';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com';

// Organization Schema - for company pages
interface OrganizationSchemaProps {
  lang?: Locale;
}

export function OrganizationSchema({ lang = 'tr' }: OrganizationSchemaProps) {
  const t = getTranslations(lang);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AICO Elektronik',
    alternateName: 'AICO Engineering Solutions',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/logo-dark.svg`,
    description: t.meta.jsonLd.companyDescription,
    foundingDate: '2020',
    founders: [{
      '@type': 'Person',
      name: 'AICO Team',
    }],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yukarı Dudullu Mah, Necip Fazıl Blv No:44/38',
      addressLocality: 'Ümraniye, Istanbul',
      postalCode: '34775',
      addressCountry: 'TR',
    },
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+90-532-621-0601',
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
  lang?: Locale;
}

export function WebSiteSchema({ lang = 'tr' }: WebSiteSchemaProps) {
  const t = getTranslations(lang);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AICO Elektronik',
    url: BASE_URL,
    description: t.meta.jsonLd.websiteDescription,
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

// SoftwareApplication Schema - for IoT/software solution pages
interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem?: string;
  url: string;
  screenshot?: string;
  features?: string[];
  offers?: {
    priceCurrency?: string;
    price?: string;
  };
}

export function SoftwareApplicationSchema({
  name,
  description,
  applicationCategory,
  operatingSystem = 'Cross-platform',
  url,
  screenshot,
  features = [],
  offers,
}: SoftwareApplicationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem,
    url,
    screenshot: screenshot || `${BASE_URL}/assets/og-image.jpg`,
    publisher: {
      '@type': 'Organization',
      name: 'AICO Elektronik',
      url: BASE_URL,
    },
    ...(features.length > 0 && {
      featureList: features.join(', '),
    }),
    ...(offers && {
      offers: {
        '@type': 'Offer',
        priceCurrency: offers.priceCurrency || 'USD',
        price: offers.price || '0',
        availability: 'https://schema.org/InStock',
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// LocalBusiness Schema - for contact pages
interface LocalBusinessSchemaProps {
  lang?: Locale;
}

export function LocalBusinessSchema({ lang = 'tr' }: LocalBusinessSchemaProps) {
  const t = getTranslations(lang);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#organization`,
    name: 'AICO Elektronik',
    description: t.meta.jsonLd.orgDescription,
    url: BASE_URL,
    logo: `${BASE_URL}/assets/logo-dark.svg`,
    image: `${BASE_URL}/assets/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0082,
      longitude: 28.9784,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
