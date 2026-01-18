import type { Metadata } from 'next';
import SmartApartmentClient from './SmartApartmentClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://aicoelektronik.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'tr'
    ? 'Akilli Apartman Cozumleri | AICO Elektronik'
    : 'Smart Apartment Solutions | AICO Elektronik';

  const description = lang === 'tr'
    ? 'Ortak alan yonetimi, iletisim ve guvenlik. Modern apartman yasami icin akilli sistemler.'
    : 'Common area management, communication and security. Smart systems for modern apartment living.';

  return {
    title,
    description,
    keywords: lang === 'tr'
      ? ['akilli apartman', 'bina otomasyon', 'ortak alan yonetimi', 'apartman guvenligi', 'IoT', 'akilli yasam']
      : ['smart apartment', 'building automation', 'common area management', 'apartment security', 'IoT', 'smart living'],
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
      canonical: `${BASE_URL}/${lang}/solutions/smart-apartment`,
      languages: {
        'tr': `${BASE_URL}/tr/solutions/smart-apartment`,
        'en': `${BASE_URL}/en/solutions/smart-apartment`,
        'x-default': `${BASE_URL}/en/solutions/smart-apartment`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/solutions/smart-apartment`,
      siteName: 'AICO Elektronik',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: lang === 'tr' ? 'en_US' : 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og/smart-apartment.png`,
          width: 1200,
          height: 630,
          alt: lang === 'tr' ? 'Akilli Apartman Cozumleri' : 'Smart Apartment Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/smart-apartment.png`],
    },
  };
}

export default async function SmartApartmentPage({ params }: PageProps) {
  const { lang } = await params;
  return <SmartApartmentClient lang={lang} />;
}
