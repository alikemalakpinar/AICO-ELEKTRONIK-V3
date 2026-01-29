import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title:
      params.lang === 'tr'
        ? 'Gizlilik Politikasi | AICO Elektronik'
        : 'Privacy Policy | AICO Elektronik',
  };
}

export default function PrivacyPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;

  return (
    <div className="min-h-screen bg-onyx-900 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
          <span className="w-8 h-px bg-engineer-500" />
          {lang === 'tr' ? 'YASAL' : 'LEGAL'}
        </span>
        <h1 className="text-hero-sm font-bold text-offwhite-400 mb-8">
          {lang === 'tr' ? 'Gizlilik Politikasi' : 'Privacy Policy'}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-offwhite-600 mb-6">
            {lang === 'tr'
              ? 'Son guncelleme: Ocak 2025'
              : 'Last updated: January 2025'}
          </p>

          <h2 className="text-xl font-semibold text-offwhite-400 mt-8 mb-4">
            {lang === 'tr' ? '1. Veri Toplama' : '1. Data Collection'}
          </h2>
          <p className="text-offwhite-700 mb-4">
            {lang === 'tr'
              ? 'AICO Elektronik olarak, web sitemizi ziyaret ettiginizde ve hizmetlerimizi kullandiginizda bazi bilgilerinizi topluyoruz. Bu bilgiler iletisim formlarindan gelen veriler, kullanim istatistikleri ve cihaz bilgilerini icerebilir.'
              : 'As AICO Elektronik, we collect some of your information when you visit our website and use our services. This information may include data from contact forms, usage statistics, and device information.'}
          </p>

          <h2 className="text-xl font-semibold text-offwhite-400 mt-8 mb-4">
            {lang === 'tr' ? '2. Veri Kullanimi' : '2. Data Usage'}
          </h2>
          <p className="text-offwhite-700 mb-4">
            {lang === 'tr'
              ? 'Toplanan veriler, hizmet kalitemizi iyilestirmek, sizinle iletisim kurmak ve yasal yukumluluklerimizi yerine getirmek icin kullanilir.'
              : 'Collected data is used to improve our service quality, communicate with you, and fulfill our legal obligations.'}
          </p>

          <h2 className="text-xl font-semibold text-offwhite-400 mt-8 mb-4">
            {lang === 'tr' ? '3. İletişim' : '3. Contact'}
          </h2>
          <p className="text-offwhite-700 mb-4">
            {lang === 'tr'
              ? 'Gizlilik politikamiz hakkinda sorulariniz icin info@aicoelektronik.com adresinden bize ulasabilirsiniz.'
              : 'For questions about our privacy policy, you can reach us at info@aicoelektronik.com.'}
          </p>
        </div>
      </div>
    </div>
  );
}
