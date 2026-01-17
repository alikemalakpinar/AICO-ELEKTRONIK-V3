import { Metadata } from 'next';
import FireSafetyClient from './FireSafetyClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://aicoelektronik.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'tr'
    ? 'FireLink - Yangın Güvenlik Kartı | AICO Elektronik'
    : 'FireLink - Fire Safety Card | AICO Elektronik';

  const description = lang === 'tr'
    ? 'Termal izleme ve erken uyarı sistemi. PCB seviyesinde sıcaklık takibi ile yangın riskini minimuma indirin. ±0.5°C hassasiyet.'
    : 'Thermal monitoring and early warning system. Minimize fire risk with PCB-level temperature tracking. ±0.5°C accuracy.';

  return {
    title,
    description,
    keywords: lang === 'tr'
      ? ['yangın güvenliği', 'termal izleme', 'PCB sıcaklık', 'erken uyarı sistemi', 'endüstriyel güvenlik', 'IoT']
      : ['fire safety', 'thermal monitoring', 'PCB temperature', 'early warning system', 'industrial safety', 'IoT'],
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
      canonical: `${BASE_URL}/${lang}/solutions/fire-safety`,
      languages: {
        'tr': `${BASE_URL}/tr/solutions/fire-safety`,
        'en': `${BASE_URL}/en/solutions/fire-safety`,
        'x-default': `${BASE_URL}/en/solutions/fire-safety`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/solutions/fire-safety`,
      siteName: 'AICO Elektronik',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: lang === 'tr' ? 'en_US' : 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og/firelink.png`,
          width: 1200,
          height: 630,
          alt: lang === 'tr' ? 'FireLink - Yangın Güvenlik Sistemi' : 'FireLink - Fire Safety System',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/firelink.png`],
    },
  };
}

export default async function FireSafetyPage({ params }: PageProps) {
  const { lang } = await params;
  return <FireSafetyClient lang={lang} />;
}
