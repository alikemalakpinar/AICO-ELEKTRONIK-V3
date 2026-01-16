import type { Metadata } from 'next';
import type { Locale } from '@/types';
import ServicesPageClient from './ServicesPageClient';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const siteName = 'AICO Engineering';
  const baseUrl = 'https://aico.com.tr';

  const meta = {
    tr: {
      title: 'Muhendislik Hizmetleri | PCB Tasarim & Gomulu Yazilim',
      description:
        'Profesyonel PCB tasarimi, gomulu yazilim gelistirme, prototipleme ve danismanlik hizmetleri. Altium Designer, STM32, ESP32 uzmanlik alanlari.',
    },
    en: {
      title: 'Engineering Services | PCB Design & Embedded Software',
      description:
        'Professional PCB design, embedded software development, prototyping and consulting services. Altium Designer, STM32, ESP32 expertise.',
    },
  };

  return {
    title: meta[params.lang].title,
    description: meta[params.lang].description,
    openGraph: {
      title: meta[params.lang].title,
      description: meta[params.lang].description,
      url: `${baseUrl}/${params.lang}/services`,
      siteName,
      type: 'website',
      locale: params.lang === 'tr' ? 'tr_TR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta[params.lang].title,
      description: meta[params.lang].description,
    },
    alternates: {
      canonical: `${baseUrl}/${params.lang}/services`,
      languages: {
        'tr-TR': `${baseUrl}/tr/services`,
        'en-US': `${baseUrl}/en/services`,
      },
    },
  };
}

export default function ServicesPage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <ServicesPageClient lang={params.lang} />;
}
