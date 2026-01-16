import type { Metadata } from 'next';
import { getTranslations, type Locale } from '@/lib/i18n';
import HomePageClient from './HomePageClient';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const t = getTranslations(params.lang);

  return {
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    openGraph: {
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      locale: params.lang === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

// Server Component - passes data to client
export default function HomePage({ params }: { params: { lang: Locale } }) {
  return <HomePageClient lang={params.lang} />;
}
