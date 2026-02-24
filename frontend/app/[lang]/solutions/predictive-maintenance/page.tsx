import type { Metadata } from 'next';
import { getTranslations, type Locale } from '@/lib/i18n';
import { ProductSchema } from '@/components/seo';
import PredictiveMaintenanceClient from './PredictiveMaintenanceClient';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://aicoelektronik.com';

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
  const isEn = params.lang === 'en';
  return (
    <>
      <ProductSchema
        name={isEn ? 'VibrationGuard - Predictive Maintenance' : 'VibrationGuard - Kestirimci Bakım'}
        description={isEn
          ? 'FFT vibration analysis and ML-based failure prediction with 2-week advance warning.'
          : 'FFT titreşim analizi ve ML tabanlı arıza tahmini, 2 hafta önceden uyarı.'}
        category="Industrial IoT"
        url={`${BASE_URL}/${params.lang}/solutions/predictive-maintenance`}
        features={isEn
          ? ['FFT Analysis', 'ML Prediction', '2-Week Advance Warning', 'Real-Time Dashboard']
          : ['FFT Analiz', 'ML Tahmin', '2 Hafta Önceden Uyarı', 'Gerçek Zamanlı Dashboard']}
      />
      <PredictiveMaintenanceClient lang={params.lang} />
    </>
  );
}
