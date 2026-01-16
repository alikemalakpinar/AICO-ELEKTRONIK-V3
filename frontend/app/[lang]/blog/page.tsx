import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { FileText } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title: params.lang === 'tr' ? 'Blog | AICO Elektronik' : 'Blog | AICO Elektronik',
  };
}

export default function BlogPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;

  return (
    <div className="min-h-screen bg-onyx-900 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
          <span className="w-8 h-px bg-engineer-500" />
          BLOG
        </span>
        <h1 className="text-hero-md font-bold text-offwhite-400 mb-6">
          {lang === 'tr' ? 'Muhendislik Yazilari' : 'Engineering Articles'}
        </h1>

        <div className="p-8 bg-onyx-800/50 border border-white/5 rounded-2xl text-center">
          <FileText size={48} className="text-offwhite-800 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-offwhite-400 mb-4">
            {lang === 'tr' ? 'Yakindan' : 'Coming Soon'}
          </h2>
          <p className="text-offwhite-700">
            {lang === 'tr'
              ? 'Muhendislik icerikleri yakinda burada yayinlanacak.'
              : 'Engineering content will be published here soon.'}
          </p>
        </div>
      </div>
    </div>
  );
}
