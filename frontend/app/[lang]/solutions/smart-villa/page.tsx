import type { Metadata } from 'next';
import { getTranslations, type Locale } from '@/lib/i18n';
import SmartVillaClient from './SmartVillaClient';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const t = getTranslations(params.lang);
  const title =
    params.lang === 'tr'
      ? 'Akilli Villa Cozumleri | AICO Elektronik'
      : 'Smart Villa Solutions | AICO Elektronik';
  const description =
    params.lang === 'tr'
      ? 'Kisisel luks, gorunmez teknoloji. Villa projeniz icin algoritmik sistemler ve akilli yasam cozumleri.'
      : 'Personal luxury, invisible technology. Algorithmic systems and smart living solutions for your villa project.';

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

export default function SmartVillaPage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <SmartVillaClient lang={params.lang} />;
}
