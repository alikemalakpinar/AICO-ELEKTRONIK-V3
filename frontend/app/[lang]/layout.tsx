import type { Metadata } from 'next';
import { locales, getTranslations, type Locale } from '@/lib/i18n';
import { Toaster } from 'sonner';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import PremiumFooter from '@/components/premium/PremiumFooter';
import PerformanceOptimizedEffects from '@/components/premium/PerformanceOptimizedEffects';
import { AudioProvider } from '@/components/premium/AudioProvider';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { fontVariables } from '@/lib/fonts';
import { HomePageStructuredData } from '@/components/seo/StructuredData';
import '../globals.css';

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com';

  return {
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    alternates: {
      canonical: `${baseUrl}/${params.lang}`,
      languages: {
        tr: `${baseUrl}/tr`,
        en: `${baseUrl}/en`,
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
    <html lang={lang} className={`${fontVariables} dark`} suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <HomePageStructuredData lang={lang} />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inline script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('aico-color-mode');
                  if (!mode) {
                    var cookie = document.cookie.match(/aico-color-mode=([^;]+)/);
                    mode = cookie ? cookie[1] : null;
                  }
                  if (!mode) {
                    mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(mode);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen overflow-x-hidden transition-colors duration-300">
        {/* Theme Provider for light/dark mode + product themes */}
        <ThemeProvider>
          {/* Audio Provider for site-wide sounds */}
          <AudioProvider>
            {/* Premium Cinematic Effects - Performance Optimized */}
            {/* Respects prefers-reduced-motion, disabled on mobile, lazy loaded */}
            <PerformanceOptimizedEffects enableNoise={true} enableCursor={true} />

            {/* Page Content */}
            <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
              {/* Premium Navbar */}
              <PremiumNavbar lang={lang} />

              {/* Main Content */}
              <main className="flex-1">{children}</main>

              {/* Premium Footer */}
              <PremiumFooter lang={lang} />

              {/* Toast Notifications - Theme Adaptive */}
              <Toaster
                position="top-right"
                toastOptions={{
                  className: 'toast-adaptive',
                  style: {
                    background: 'hsl(var(--card))',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))',
                  },
                }}
              />
            </div>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
