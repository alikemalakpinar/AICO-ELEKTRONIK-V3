import type { Metadata } from 'next';
import { locales, getTranslations, type Locale } from '@/lib/i18n';
import { Toaster } from 'sonner';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import PremiumFooter from '@/components/premium/PremiumFooter';

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Generate metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const t = getTranslations(params.lang);

  return {
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        tr: '/tr',
        en: '/en',
      },
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const lang = params.lang;

  return (
    <div className="flex min-h-screen flex-col bg-onyx-900">
      {/* Premium Navbar */}
      <PremiumNavbar lang={lang} />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Premium Footer */}
      <PremiumFooter lang={lang} />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0A0A0A',
            color: '#F8FAFC',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </div>
  );
}
