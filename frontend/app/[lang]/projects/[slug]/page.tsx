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

// Generate metadata
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug, params.lang);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | AICO Engineering`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      locale: params.lang === 'tr' ? 'tr_TR' : 'en_US',
      images: project.images[0]
        ? [{ url: project.images[0].src, alt: project.images[0].alt }]
        : [],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug, params.lang);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} lang={params.lang} />;
}
