import type { Metadata } from 'next';
import { getTranslations, type Locale } from '@/lib/i18n';
import SmartResidenceClient from './SmartResidenceClient';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const title =
    params.lang === 'tr'
      ? 'Akilli Rezidans Cozumleri | AICO Elektronik'
      : 'Smart Residence Solutions | AICO Elektronik';
  const description =
    params.lang === 'tr'
      ? 'Merkezi yonetim, olceklenebilir guc. 500+ daire icin bina otomasyon sistemleri.'
      : 'Central management, scalable power. Building automation systems for 500+ units.';

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

export default function SmartResidencePage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <SmartResidenceClient lang={params.lang} />;
}
