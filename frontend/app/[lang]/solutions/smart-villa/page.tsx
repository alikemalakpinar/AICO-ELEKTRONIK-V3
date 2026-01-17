import type { Metadata } from 'next';
import SmartVillaClient from './SmartVillaClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://aicoelektronik.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'tr'
    ? 'Akilli Villa Cozumleri | AICO Elektronik'
    : 'Smart Villa Solutions | AICO Elektronik';

  const description = lang === 'tr'
    ? 'Kisisel luks, gorunmez teknoloji. Villa projeniz icin algoritmik sistemler ve akilli yasam cozumleri.'
    : 'Personal luxury, invisible technology. Algorithmic systems and smart living solutions for your villa project.';

  return {
    title,
    description,
    keywords: lang === 'tr'
      ? ['akilli villa', 'ev otomasyonu', 'luks yasam', 'akilli ev', 'IoT', 'villa otomasyonu']
      : ['smart villa', 'home automation', 'luxury living', 'smart home', 'IoT', 'villa automation'],
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
      canonical: `${BASE_URL}/${lang}/solutions/smart-villa`,
      languages: {
        'tr': `${BASE_URL}/tr/solutions/smart-villa`,
        'en': `${BASE_URL}/en/solutions/smart-villa`,
        'x-default': `${BASE_URL}/en/solutions/smart-villa`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/solutions/smart-villa`,
      siteName: 'AICO Elektronik',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: lang === 'tr' ? 'en_US' : 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og/smart-villa.png`,
          width: 1200,
          height: 630,
          alt: lang === 'tr' ? 'Akıllı Villa Çözümleri' : 'Smart Villa Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/smart-villa.png`],
    },
  };
}

export default async function SmartVillaPage({ params }: PageProps) {
  const { lang } = await params;
  return <SmartVillaClient lang={lang} />;
}
