import type { Metadata, Viewport } from 'next';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

// Default metadata
export const metadata: Metadata = {
  title: {
    default: 'AICO Elektronik | Muhendislik Showroom',
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
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    siteName: 'AICO Elektronik',
    title: 'AICO Elektronik | Muhendislik Showroom',
    description:
      'Akilli yasam teknolojileri ve endustriyel otomasyon cozumleri.',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AICO Elektronik - Muhendislik Showroom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AICO Elektronik | Muhendislik Showroom',
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
    { media: '(prefers-color-scheme: light)', color: '#050505' },
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
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-onyx-900 text-offwhite-400 min-h-screen">
        {children}
      </body>
    </html>
  );
}
