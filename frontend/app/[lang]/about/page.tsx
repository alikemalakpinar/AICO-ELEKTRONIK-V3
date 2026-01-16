import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, type Locale } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const title =
    params.lang === 'tr'
      ? 'Hakkimizda | AICO Elektronik'
      : 'About Us | AICO Elektronik';
  const description =
    params.lang === 'tr'
      ? '20+ yillik muhendislik tutkusu. Villa, rezidans ve endustriyel projeler icin akilli yasam cozumleri.'
      : '20+ years of engineering passion. Smart living solutions for villa, residence, and industrial projects.';

  return { title, description };
}

export default function AboutPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const t = getTranslations(lang);

  return (
    <div className="min-h-screen bg-onyx-900 pt-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
            <span className="w-8 h-px bg-engineer-500" />
            {lang === 'tr' ? 'HAKKIMIZDA' : 'ABOUT US'}
          </span>
          <h1 className="text-hero-md font-bold text-offwhite-400 mb-6">
            {t.about.title}
          </h1>
          <p className="text-xl text-offwhite-700">{t.about.subtitle}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-20">
          <p className="text-offwhite-600 leading-relaxed">
            {lang === 'tr'
              ? 'AICO Elektronik, 2004 yilindan bu yana akilli yasam teknolojileri ve endustriyel otomasyon alaninda faaliyet gostermektedir. Misyonumuz, teknolojiyi gorunmez kilarak yasam kalitesini artirmaktir.'
              : 'AICO Elektronik has been operating in smart living technologies and industrial automation since 2004. Our mission is to improve quality of life by making technology invisible.'}
          </p>
          <p className="text-offwhite-600 leading-relaxed">
            {lang === 'tr'
              ? 'Muhendislik ekibimiz, her projede Challenge-Approach-Impact metodolojisini kullanarak, musterilerimize olcuelebilir sonuclar sunar. Startup ruhuyla degil, 100M$+ ciro yapan kurumsal firmalarin agirligiyla calisiyoruz.'
              : 'Our engineering team delivers measurable results to our clients using the Challenge-Approach-Impact methodology in every project. We work not with a startup spirit, but with the weight of corporate companies with $100M+ turnover.'}
          </p>
        </div>

        {/* CTA */}
        <div className="border-t border-white/5 pt-12 pb-20">
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-lg transition-all duration-300"
          >
            <span>{t.nav.engineeringRequest}</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
