import type { Metadata } from 'next';
import { getTranslations, type Locale } from '@/lib/i18n';
import PredictiveMaintenanceClient from './PredictiveMaintenanceClient';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const isEnglish = params.lang === 'en';

  return {
    title: isEnglish
      ? 'VibrationGuard - Predictive Maintenance | AICO Elektronik'
      : 'VibrationGuard - Kestirimci Bakim | AICO Elektronik',
    description: isEnglish
      ? 'Industry 4.0 predictive maintenance system. FFT vibration analysis, ML-based failure prediction, 2-week advance warning for motor and bearing faults.'
      : 'Industry 4.0 kestirimci bakim sistemi. FFT titresim analizi, ML tabanli ariza tahmini, motor ve rulman arizalari icin 2 hafta onceden uyari.',
    openGraph: {
      title: isEnglish
        ? 'VibrationGuard - Predictive Maintenance'
        : 'VibrationGuard - Kestirimci Bakim',
      description: isEnglish
        ? 'Predict machine failures 2 weeks in advance with AI-powered vibration analysis.'
        : 'AI destekli titresim analizi ile makine arizalarini 2 hafta onceden tahmin edin.',
    },
  };
}

export default function PredictiveMaintenancePage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <PredictiveMaintenanceClient lang={params.lang} />;
}
