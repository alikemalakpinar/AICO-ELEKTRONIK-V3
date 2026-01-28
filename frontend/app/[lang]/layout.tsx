import type { Metadata } from 'next';
import { locales, getTranslations, type Locale } from '@/lib/i18n';
import { Toaster } from 'sonner';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import PremiumFooter from '@/components/premium/PremiumFooter';
import Script from 'next/script';

// Company Information for SEO
const COMPANY_INFO = {
  name: 'AICO Elektronik',
  phone: '+90 532 621 06 01',
  address: {
    streetAddress: 'Yukari Dudullu Mah, Necip Fazil Blv No:44/38',
    addressLocality: 'Umraniye',
    addressRegion: 'Istanbul',
    postalCode: '34775',
    addressCountry: 'TR',
  },
  geo: {
    latitude: 41.0082,
    longitude: 29.1264,
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  url: 'https://aico.com.tr',
  logo: 'https://aico.com.tr/images/logo.png',
};

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
  const baseUrl = COMPANY_INFO.url;

  return {
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    keywords: t.meta.keywords,
    authors: [{ name: 'AICO Elektronik' }],
    creator: 'AICO Elektronik',
    publisher: 'AICO Elektronik',
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
    alternates: {
      canonical: `${baseUrl}/${params.lang}`,
      languages: {
        tr: `${baseUrl}/tr`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: params.lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: params.lang === 'tr' ? 'en_US' : 'tr_TR',
      url: `${baseUrl}/${params.lang}`,
      siteName: 'AICO Elektronik',
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AICO Elektronik - Industrial IoT & Engineering Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      images: [`${baseUrl}/images/og-image.jpg`],
    },
    verification: {
      google: 'google-site-verification-code',
    },
    category: 'technology',
  };
}

// JSON-LD Structured Data for LocalBusiness
function generateJsonLd(lang: Locale) {
  const isEnglish = lang === 'en';

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${COMPANY_INFO.url}/#organization`,
    name: COMPANY_INFO.name,
    description: isEnglish
      ? 'Industrial IoT, factory fire detection, vibration analysis and smart living solutions provider with 20+ years of engineering experience.'
      : 'Endustriyel IoT, fabrika yangin algilama, vibrasyon analizi ve akilli yasam cozumleri saglayicisi. 20+ yillik muhendislik deneyimi.',
    url: COMPANY_INFO.url,
    logo: COMPANY_INFO.logo,
    image: COMPANY_INFO.logo,
    telephone: COMPANY_INFO.phone,
    email: 'info@aico.com.tr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.streetAddress,
      addressLocality: COMPANY_INFO.address.addressLocality,
      addressRegion: COMPANY_INFO.address.addressRegion,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: COMPANY_INFO.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_INFO.geo.latitude,
      longitude: COMPANY_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$$$',
    currenciesAccepted: 'TRY, USD, EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    sameAs: [
      'https://www.linkedin.com/company/aico-elektronik',
      'https://twitter.com/aicoelektronik',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEnglish ? 'Industrial IoT Solutions' : 'Endustriyel IoT Cozumleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEnglish ? 'Smart Villa Automation' : 'Akilli Villa Otomasyonu',
            description: isEnglish
              ? 'Complete smart home automation for luxury villas'
              : 'Luks villalar icin komple akilli ev otomasyonu',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEnglish ? 'Industrial Air Quality Monitoring' : 'Endustriyel Hava Kalitesi Izleme',
            description: isEnglish
              ? 'CO2, TVOC, PM2.5 monitoring for factories'
              : 'Fabrikalar icin CO2, TVOC, PM2.5 izleme',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEnglish ? 'Predictive Maintenance' : 'Kestirimci Bakim',
            description: isEnglish
              ? 'Vibration analysis and machine health monitoring'
              : 'Vibrasyon analizi ve makine sagligi izleme',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEnglish ? 'Cold Chain Monitoring' : 'Soguk Zincir Izleme',
            description: isEnglish
              ? 'Real-time temperature tracking for logistics'
              : 'Lojistik icin gercek zamanli sicaklik takibi',
          },
        },
      ],
    },
  };

  return localBusiness;
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const lang = params.lang;
  const jsonLd = generateJsonLd(lang);

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      {/* JSON-LD Structured Data */}
      <Script
        id="json-ld-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />

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
  );
}
