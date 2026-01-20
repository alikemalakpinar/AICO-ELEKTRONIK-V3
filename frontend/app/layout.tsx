import type { Metadata, Viewport } from 'next';
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
    { media: '(prefers-color-scheme: light)', color: '#050505' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Root layout - delegates html/body to locale layout for proper lang attribute
// This allows dynamic lang attribute based on the [lang] route segment
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
