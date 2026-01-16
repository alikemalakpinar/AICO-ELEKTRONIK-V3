import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

type Locale = 'tr' | 'en';

interface PageProps {
  params: { lang: Locale };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isTurkish = params.lang === 'tr';

  return {
    title: isTurkish ? 'Musteri Paneli' : 'Customer Dashboard',
    description: isTurkish
      ? 'AICO Akilli Yasam Sistemleri - Musteri Kontrol Paneli'
      : 'AICO Smart Living Systems - Customer Control Dashboard',
  };
}

export function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default function DashboardPage({ params }: PageProps) {
  return <DashboardClient lang={params.lang} />;
}
