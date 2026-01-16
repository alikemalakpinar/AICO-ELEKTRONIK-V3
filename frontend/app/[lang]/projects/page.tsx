import type { Metadata } from 'next';
import { getTranslations, type Locale } from '@/lib/i18n';
import ProjectsClient from './ProjectsClient';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const t = getTranslations(params.lang);
  const title =
    params.lang === 'tr'
      ? 'Muhendislik Portfolyosu | AICO Elektronik'
      : 'Engineering Portfolio | AICO Elektronik';
  const description =
    params.lang === 'tr'
      ? 'Ar-Ge calismalarimizdaki muhendislik yaklasimimizi ve sonuclari kesfedin. Villa, rezidans ve endustriyel projeler.'
      : 'Discover our engineering approach and results in our R&D projects. Villa, residence, and industrial projects.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: params.lang === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default function ProjectsPage({ params }: { params: { lang: Locale } }) {
  return <ProjectsClient lang={params.lang} />;
}
