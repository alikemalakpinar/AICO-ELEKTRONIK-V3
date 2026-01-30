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
    streetAddress: 'Yukarı Dudullu Mah, Necip Fazıl Blv No:44/38',
    addressLocality: 'Ümraniye',
    addressRegion: 'Istanbul',
    postalCode: '34775',
    addressCountry: 'TR',
  },
  geo: {
    latitude: 41.0082,
    longitude: 29.1264,
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com'}/images/logo.png`,
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
  const t = getTranslations(lang);

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${COMPANY_INFO.url}/#organization`,
    name: COMPANY_INFO.name,
    description: t.meta.jsonLd.companyDescription,
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
      name: t.meta.jsonLd.offerCatalogName,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t.meta.jsonLd.smartVillaService,
            description: t.meta.jsonLd.smartVillaServiceDesc,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t.meta.jsonLd.fireWarningService,
            description: t.meta.jsonLd.fireWarningServiceDesc,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t.meta.jsonLd.predictiveService,
            description: t.meta.jsonLd.predictiveServiceDesc,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t.meta.jsonLd.coldChainService,
            description: t.meta.jsonLd.coldChainServiceDesc,
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
