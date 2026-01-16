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
        ? 'Kullanim Sartlari | AICO Elektronik'
        : 'Terms of Service | AICO Elektronik',
  };
}

export default function TermsPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;

  return (
    <div className="min-h-screen bg-onyx-900 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
          <span className="w-8 h-px bg-engineer-500" />
          {lang === 'tr' ? 'YASAL' : 'LEGAL'}
        </span>
        <h1 className="text-hero-sm font-bold text-offwhite-400 mb-8">
          {lang === 'tr' ? 'Kullanim Sartlari' : 'Terms of Service'}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-offwhite-600 mb-6">
            {lang === 'tr'
              ? 'Son guncelleme: Ocak 2025'
              : 'Last updated: January 2025'}
          </p>

          <h2 className="text-xl font-semibold text-offwhite-400 mt-8 mb-4">
            {lang === 'tr' ? '1. Kabul' : '1. Acceptance'}
          </h2>
          <p className="text-offwhite-700 mb-4">
            {lang === 'tr'
              ? 'Bu web sitesini kullanarak, asagidaki kullanim sartlarini kabul etmis sayilirsiniz.'
              : 'By using this website, you agree to the following terms of service.'}
          </p>

          <h2 className="text-xl font-semibold text-offwhite-400 mt-8 mb-4">
            {lang === 'tr' ? '2. Hizmetler' : '2. Services'}
          </h2>
          <p className="text-offwhite-700 mb-4">
            {lang === 'tr'
              ? 'AICO Elektronik, akilli yasam teknolojileri ve muhendislik danismanligi hizmetleri sunmaktadir. Hizmet kapsamlari proje bazli belirlenir.'
              : 'AICO Elektronik provides smart living technologies and engineering consultancy services. Service scopes are determined on a project basis.'}
          </p>

          <h2 className="text-xl font-semibold text-offwhite-400 mt-8 mb-4">
            {lang === 'tr' ? '3. Fikri Mulkiyet' : '3. Intellectual Property'}
          </h2>
          <p className="text-offwhite-700 mb-4">
            {lang === 'tr'
              ? 'Bu web sitesindeki tum icerikler AICO Elektronik\'e aittir ve izinsiz kullanilamaz.'
              : 'All content on this website belongs to AICO Elektronik and cannot be used without permission.'}
          </p>
        </div>
      </div>
    </div>
  );
}
