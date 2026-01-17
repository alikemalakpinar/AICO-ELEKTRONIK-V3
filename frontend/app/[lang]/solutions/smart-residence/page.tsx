import type { Metadata } from 'next';
import SmartResidenceClient from './SmartResidenceClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://aicoelektronik.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'tr'
    ? 'Akilli Rezidans Cozumleri | AICO Elektronik'
    : 'Smart Residence Solutions | AICO Elektronik';

  const description = lang === 'tr'
    ? 'Merkezi yonetim, olceklenebilir guc. 500+ daire icin bina otomasyon sistemleri.'
    : 'Central management, scalable power. Building automation systems for 500+ units.';

  return {
    title,
    description,
    keywords: lang === 'tr'
      ? ['akilli bina', 'rezidans otomasyon', 'bina yonetimi', 'enerji yonetimi', 'IoT', 'akilli yasam']
      : ['smart building', 'residence automation', 'building management', 'energy management', 'IoT', 'smart living'],
    authors: [{ name: 'AICO Elektronik' }],
    creator: 'AICO Elektronik',
    publisher: 'AICO Elektronik',
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
    alternates: {
      canonical: `${BASE_URL}/${lang}/solutions/smart-residence`,
      languages: {
        'tr': `${BASE_URL}/tr/solutions/smart-residence`,
        'en': `${BASE_URL}/en/solutions/smart-residence`,
        'x-default': `${BASE_URL}/en/solutions/smart-residence`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/solutions/smart-residence`,
      siteName: 'AICO Elektronik',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: lang === 'tr' ? 'en_US' : 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og/smart-residence.png`,
          width: 1200,
          height: 630,
          alt: lang === 'tr' ? 'Akıllı Rezidans Çözümleri' : 'Smart Residence Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/smart-residence.png`],
    },
  };
}

export default async function SmartResidencePage({ params }: PageProps) {
  const { lang } = await params;
  return <SmartResidenceClient lang={lang} />;
}
