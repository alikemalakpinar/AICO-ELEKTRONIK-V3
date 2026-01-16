import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs, PROJECTS } from '@/lib/data/projects';
import type { Locale } from '@/types';
import ProjectDetailClient from './ProjectDetailClient';

interface ProjectDetailPageProps {
  params: {
    lang: Locale;
    slug: string;
  };
}

// Generate static params for all projects
export async function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];

  // TR slugs
  PROJECTS.tr.forEach((project) => {
    params.push({ lang: 'tr', slug: project.slug });
  });

  // EN slugs
  PROJECTS.en.forEach((project) => {
    params.push({ lang: 'en', slug: project.slug });
  });

  return params;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug, params.lang);

  if (!project) {
    return {
      title: 'Project Not Found | AICO Engineering',
      description: 'The requested project could not be found.',
    };
  }

  const siteName = 'AICO Engineering';
  const baseUrl = 'https://aico.com.tr';

  return {
    title: `${project.title} | ${siteName}`,
    description: project.seoDescription,
    keywords: project.tags.join(', '),
    authors: [{ name: 'AICO Engineering' }],
    creator: 'AICO Engineering',
    publisher: 'AICO Engineering',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: project.title,
      description: project.seoDescription,
      url: `${baseUrl}/${params.lang}/projects/${project.slug}`,
      siteName,
      type: 'article',
      locale: params.lang === 'tr' ? 'tr_TR' : 'en_US',
      images: project.images[0]
        ? [
            {
              url: project.images[0].src,
              alt: project.images[0].alt,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      publishedTime: `${project.year}-01-01`,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.seoDescription,
      images: project.images[0] ? [project.images[0].src] : [],
    },
    alternates: {
      canonical: `${baseUrl}/${params.lang}/projects/${project.slug}`,
      languages: {
        'tr-TR': `${baseUrl}/tr/projects/${project.slug}`,
        'en-US': `${baseUrl}/en/projects/${project.slug}`,
      },
    },
    category: project.category,
  };
}

// JSON-LD structured data
function generateJsonLd(project: ReturnType<typeof getProjectBySlug>, lang: Locale) {
  if (!project) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.seoDescription,
    image: project.images[0]?.src,
    author: {
      '@type': 'Organization',
      name: 'AICO Engineering',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AICO Engineering',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aico.com.tr/assets/logos/aico-logo.png',
      },
    },
    datePublished: `${project.year}-01-01`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aico.com.tr/${lang}/projects/${project.slug}`,
    },
    keywords: project.tags.join(', '),
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug, params.lang);

  if (!project) {
    notFound();
  }

  const jsonLd = generateJsonLd(project, params.lang);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProjectDetailClient project={project} lang={params.lang} />
    </>
  );
}
