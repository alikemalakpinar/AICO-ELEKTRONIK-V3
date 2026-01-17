import { Metadata } from 'next';
import MiningIoTClient from './MiningIoTClient';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === 'tr'
      ? 'MineGuard - Maden Guvenligi | AICO Elektronik'
      : 'MineGuard - Mining Safety | AICO Elektronik',
    description: lang === 'tr'
      ? 'Isci takip, gaz algilama ve acil durum yonetimi. Maden guvenligi icin uctan uca IoT cozumu.'
      : 'Worker tracking, gas detection, and emergency management. End-to-end IoT solution for mining safety.',
  };
}

export default async function MiningIoTPage({ params }: PageProps) {
  const { lang } = await params;
  return <MiningIoTClient lang={lang} />;
}
