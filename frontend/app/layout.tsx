import type { Metadata, Viewport } from 'next';
import { fontVariables } from '@/lib/fonts';
import NoiseOverlay from '@/components/premium/NoiseOverlay';
import CustomCursor from '@/components/premium/CustomCursor';
import { AudioProvider } from '@/components/premium/AudioProvider';
import { MotionProvider } from '@/components/premium/MotionProvider';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { OrganizationSchema, WebSiteSchema } from '@/components/seo';
import './globals.css';

// Default metadata
export const metadata: Metadata = {
  title: {
    default: 'AICO Elektronik | Muhendislik Çözümleri',
    template: '%s | AICO Elektronik',
  },
  description:
    'Akilli yasam teknolojileri ve endustriyel otomasyon cozumleri. Villa, rezidans ve fabrika projeleri icin muhendislik danismanligi.',
  keywords: [
    'akilli ev',
    'smart home',
    'otomasyon',
    'muhendislik',
    'IoT',
    'akilli villa',
    'akilli rezidans',
    'bina otomasyonu',
    'enerji yonetimi',
  ],
  authors: [{ name: 'AICO Elektronik' }],
  creator: 'AICO Elektronik',
  publisher: 'AICO Elektronik',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com'
  ),
  alternates: {
    canonical: './',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    siteName: 'AICO Elektronik',
    title: 'AICO Elektronik | Muhendislik Çözümleri',
    description:
      'Akilli yasam teknolojileri ve endustriyel otomasyon cozumleri.',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AICO Elektronik - Muhendislik Çözümleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AICO Elektronik | Muhendislik Çözümleri',
    description:
      'Akilli yasam teknolojileri ve endustriyel otomasyon cozumleri.',
    images: ['/assets/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${fontVariables} dark`} suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <OrganizationSchema lang="tr" />
        <WebSiteSchema lang="tr" />

        {/* Preconnect to Fontshare CDN (Satoshi + General Sans fonts) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
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
            {/* Optimized Framer Motion Provider - reduces bundle by ~30KB */}
            <MotionProvider features="domMax">
              {/* Premium Cinematic Effects */}
              <NoiseOverlay />
              <CustomCursor />

              {/* Page Content */}
              {children}
            </MotionProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
