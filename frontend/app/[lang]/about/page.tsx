import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import AboutPageClient from './AboutPageClient';

interface AboutPageProps {
  params: { lang: Locale };
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const lang = params.lang;
  const isTR = lang === 'tr';

  return {
    title: isTR ? 'Hakkimizda | AICO Elektronik' : 'About Us | AICO Elektronik',
    description: isTR
      ? 'AICO Elektronik - Akilli yasam teknolojileri ve endustriyel IoT cozumleri.'
      : 'AICO Elektronik - Smart living technologies and industrial IoT solutions.',
  };
}

export default function AboutPage({ params }: AboutPageProps) {
  return <AboutPageClient lang={params.lang} />;
}
