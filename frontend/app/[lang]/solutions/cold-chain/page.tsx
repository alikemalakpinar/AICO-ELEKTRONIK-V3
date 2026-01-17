import { Metadata } from 'next';
import ColdChainClient from './ColdChainClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === 'tr'
      ? 'ColdTrack - Soguk Zincir Yonetimi | AICO Elektronik'
      : 'ColdTrack - Cold Chain Management | AICO Elektronik',
    description: lang === 'tr'
      ? 'Gercek zamanli sicaklik izleme ve lojistik yonetimi. Ilaç, gida ve hassas urunler icin soguk zincir kontrolu.'
      : 'Real-time temperature monitoring and logistics management. Cold chain control for pharmaceuticals, food, and sensitive products.',
  };
}

export default async function ColdChainPage({ params }: PageProps) {
  const { lang } = await params;
  return <ColdChainClient lang={lang} />;
}
