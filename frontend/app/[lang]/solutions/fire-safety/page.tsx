import { Metadata } from 'next';
import FireSafetyClient from './FireSafetyClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === 'tr'
      ? 'FireLink - Yangin Guvenlik Karti | AICO Elektronik'
      : 'FireLink - Fire Safety Card | AICO Elektronik',
    description: lang === 'tr'
      ? 'Termal izleme ve erken uyari sistemi. PCB seviyesinde sicaklik takibi ile yangin riskini minimuma indirin.'
      : 'Thermal monitoring and early warning system. Minimize fire risk with PCB-level temperature tracking.',
  };
}

export default async function FireSafetyPage({ params }: PageProps) {
  const { lang } = await params;
  return <FireSafetyClient lang={lang} />;
}
