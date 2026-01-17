import { Metadata } from 'next';
import MiningIoTClient from './MiningIoTClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://aicoelektronik.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'tr'
    ? 'MineGuard - Maden Guvenligi | AICO Elektronik'
    : 'MineGuard - Mining Safety | AICO Elektronik';

  const description = lang === 'tr'
    ? 'Isci takip, gaz algilama ve acil durum yonetimi. Maden guvenligi icin uctan uca IoT cozumu.'
    : 'Worker tracking, gas detection, and emergency management. End-to-end IoT solution for mining safety.';

  return {
    title,
    description,
    keywords: lang === 'tr'
      ? ['maden guvenligi', 'isci takip', 'gaz algilama', 'IoT', 'acil durum yonetimi', 'yeraltı izleme']
      : ['mining safety', 'worker tracking', 'gas detection', 'IoT', 'emergency management', 'underground monitoring'],
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
      canonical: `${BASE_URL}/${lang}/solutions/mining-iot`,
      languages: {
        'tr': `${BASE_URL}/tr/solutions/mining-iot`,
        'en': `${BASE_URL}/en/solutions/mining-iot`,
        'x-default': `${BASE_URL}/en/solutions/mining-iot`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/solutions/mining-iot`,
      siteName: 'AICO Elektronik',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: lang === 'tr' ? 'en_US' : 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og/mineguard.png`,
          width: 1200,
          height: 630,
          alt: lang === 'tr' ? 'MineGuard - Maden Güvenlik Sistemi' : 'MineGuard - Mining Safety System',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/mineguard.png`],
    },
  };
}

export default async function MiningIoTPage({ params }: PageProps) {
  const { lang } = await params;
  return <MiningIoTClient lang={lang} />;
}
