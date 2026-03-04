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
        ? 'Gizlilik Politikası | AICO Elektronik'
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
        <h1 className="text-fluid-3xl font-bold text-offwhite-400 mb-8 heading-flex">
          {lang === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
        </h1>

        <div className="space-y-8">
          <p className="text-offwhite-600 text-sm">
            {lang === 'tr'
              ? 'Son güncelleme: Ocak 2025'
              : 'Last updated: January 2025'}
          </p>

          <div className="p-6 bg-onyx-800/50 border border-white/5 rounded-2xl space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-offwhite-400 mb-3">
                {lang === 'tr' ? '1. Veri Toplama' : '1. Data Collection'}
              </h2>
              <p className="text-offwhite-700 text-sm leading-relaxed">
                {lang === 'tr'
                  ? 'AICO Elektronik olarak, web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda bazı bilgilerinizi topluyoruz. Bu bilgiler iletişim formlarından gelen veriler, kullanım istatistikleri ve cihaz bilgilerini içerebilir.'
                  : 'As AICO Elektronik, we collect some of your information when you visit our website and use our services. This information may include data from contact forms, usage statistics, and device information.'}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-offwhite-400 mb-3">
                {lang === 'tr' ? '2. Veri Kullanımı' : '2. Data Usage'}
              </h2>
              <p className="text-offwhite-700 text-sm leading-relaxed">
                {lang === 'tr'
                  ? 'Toplanan veriler, hizmet kalitemizi iyileştirmek, sizinle iletişim kurmak ve yasal yükümlülüklerimizi yerine getirmek için kullanılır.'
                  : 'Collected data is used to improve our service quality, communicate with you, and fulfill our legal obligations.'}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-offwhite-400 mb-3">
                {lang === 'tr' ? '3. Veri Güvenliği' : '3. Data Security'}
              </h2>
              <p className="text-offwhite-700 text-sm leading-relaxed">
                {lang === 'tr'
                  ? 'Verilerinizin güvenliği bizim için önemlidir. Endüstri standardı şifreleme ve güvenlik protokollerini kullanarak bilgilerinizi koruyoruz.'
                  : 'The security of your data is important to us. We protect your information using industry-standard encryption and security protocols.'}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-offwhite-400 mb-3">
                {lang === 'tr' ? '4. Çerezler' : '4. Cookies'}
              </h2>
              <p className="text-offwhite-700 text-sm leading-relaxed">
                {lang === 'tr'
                  ? 'Web sitemiz, deneyiminizi geliştirmek için çerezler kullanır. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.'
                  : 'Our website uses cookies to enhance your experience. You can manage your cookie preferences from your browser settings.'}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-offwhite-400 mb-3">
                {lang === 'tr' ? '5. İletişim' : '5. Contact'}
              </h2>
              <p className="text-offwhite-700 text-sm leading-relaxed">
                {lang === 'tr'
                  ? 'Gizlilik politikamız hakkında sorularınız için info@aicoelektronik.com adresinden bize ulaşabilirsiniz.'
                  : 'For questions about our privacy policy, you can reach us at info@aicoelektronik.com.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
