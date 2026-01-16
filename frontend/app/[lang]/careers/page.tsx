import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, type Locale } from '@/lib/i18n';
import { ArrowRight, Briefcase } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title: params.lang === 'tr' ? 'Kariyer | AICO Elektronik' : 'Careers | AICO Elektronik',
  };
}

export default function CareersPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const t = getTranslations(lang);

  return (
    <div className="min-h-screen bg-onyx-900 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
          <span className="w-8 h-px bg-engineer-500" />
          {lang === 'tr' ? 'KARIYER' : 'CAREERS'}
        </span>
        <h1 className="text-hero-md font-bold text-offwhite-400 mb-6">
          {lang === 'tr' ? 'Ekibimize Katilin' : 'Join Our Team'}
        </h1>
        <p className="text-xl text-offwhite-700 mb-12">
          {lang === 'tr'
            ? 'Muhendislik tutkusuyla dolu bir ekipte yerinizi alin.'
            : 'Take your place in a team full of engineering passion.'}
        </p>

        <div className="p-8 bg-onyx-800/50 border border-white/5 rounded-2xl text-center">
          <Briefcase size={48} className="text-offwhite-800 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-offwhite-400 mb-4">
            {lang === 'tr' ? 'Acik Pozisyonlar' : 'Open Positions'}
          </h2>
          <p className="text-offwhite-700 mb-6">
            {lang === 'tr'
              ? 'Su an acik pozisyonumuz bulunmamaktadir. CV\'nizi gondermek icin iletisime gecebilirsiniz.'
              : 'We currently have no open positions. You can contact us to send your CV.'}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-lg transition-colors"
          >
            <span>{t.nav.contact}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
