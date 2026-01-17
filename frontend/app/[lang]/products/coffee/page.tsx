import { Metadata } from 'next';
import CoffeeClient from './CoffeeClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === 'tr'
      ? 'AICO Coffee - Akilli Kahve Makinesi | AICO Elektronik'
      : 'AICO Coffee - Smart Coffee Machine | AICO Elektronik',
    description: lang === 'tr'
      ? 'IoT baglantili premium kahve deneyimi. Uygulama kontrolu, kisisellestirilmis tarifler ve uzaktan yonetim.'
      : 'IoT-connected premium coffee experience. App control, personalized recipes, and remote management.',
  };
}

export default async function CoffeePage({ params }: PageProps) {
  const { lang } = await params;
  return <CoffeeClient lang={lang} />;
}
