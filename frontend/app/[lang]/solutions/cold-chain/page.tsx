import { Metadata } from 'next';
import ColdChainClient from './ColdChainClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://aicoelektronik.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'tr'
    ? 'ColdTrack - Soğuk Zincir Yönetimi | AICO Elektronik'
    : 'ColdTrack - Cold Chain Management | AICO Elektronik';

  const description = lang === 'tr'
    ? 'Gercek zamanli sicaklik izleme ve lojistik yonetimi. Ilaç, gida ve hassas urunler icin soguk zincir kontrolu.'
    : 'Real-time temperature monitoring and logistics management. Cold chain control for pharmaceuticals, food, and sensitive products.';

  return {
    title,
    description,
    keywords: lang === 'tr'
      ? ['soguk zincir', 'sicaklik izleme', 'lojistik', 'filo takip', 'GPS', 'HACCP', 'GDP']
      : ['cold chain', 'temperature monitoring', 'logistics', 'fleet tracking', 'GPS', 'HACCP', 'GDP'],
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
      canonical: `${BASE_URL}/${lang}/solutions/cold-chain`,
      languages: {
        'tr': `${BASE_URL}/tr/solutions/cold-chain`,
        'en': `${BASE_URL}/en/solutions/cold-chain`,
        'x-default': `${BASE_URL}/en/solutions/cold-chain`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/solutions/cold-chain`,
      siteName: 'AICO Elektronik',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: lang === 'tr' ? 'en_US' : 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og/coldtrack.png`,
          width: 1200,
          height: 630,
          alt: lang === 'tr' ? 'ColdTrack - Soğuk Zincir Yönetimi' : 'ColdTrack - Cold Chain Management',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/coldtrack.png`],
    },
  };
}

export default async function ColdChainPage({ params }: PageProps) {
  const { lang } = await params;
  return <ColdChainClient lang={lang} />;
}
