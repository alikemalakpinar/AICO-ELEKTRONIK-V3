import type { Metadata } from 'next';
import { getTranslations, type Locale } from '@/lib/i18n';
import HomePageClient from './HomePageClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com';

// Generate metadata for SEO - full OpenGraph + Twitter + alternates
export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const t = getTranslations(params.lang);

  return {
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    keywords: t.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${params.lang}`,
      languages: {
        tr: `${BASE_URL}/tr`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      url: `${BASE_URL}/${params.lang}`,
      siteName: 'AICO Elektronik',
      locale: params.lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: params.lang === 'tr' ? 'en_US' : 'tr_TR',
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AICO Elektronik - Industrial IoT & Engineering Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
  };
}

// Server Component - passes data to client
export default function HomePage({ params }: { params: { lang: Locale } }) {
  return <HomePageClient lang={params.lang} />;
}
