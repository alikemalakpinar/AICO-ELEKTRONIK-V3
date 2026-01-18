import { Locale } from '@/lib/i18n';

interface StructuredDataProps {
  lang: Locale;
}

export function OrganizationSchema({ lang }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'AICO Elektronik',
    alternateName: 'AICO Elektronik Muhendislik',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/assets/logo.png`,
      width: 512,
      height: 512,
    },
    description:
      lang === 'tr'
        ? 'Akilli yasam teknolojileri ve endustriyel otomasyon cozumleri. Villa, rezidans ve fabrika projeleri icin muhendislik danismanligi.'
        : 'Smart living technologies and industrial automation solutions. Engineering consultancy for villa, residence, and factory projects.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+90-850-840-86-00',
        contactType: 'customer service',
        availableLanguage: ['Turkish', 'English'],
      },
      {
        '@type': 'ContactPoint',
        email: 'info@aicoelektronik.com',
        contactType: 'customer service',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/aicoelektronik',
      'https://twitter.com/aicoelektronik',
      'https://github.com/aicoelektronik',
    ],
    foundingDate: '2010',
    knowsAbout: [
      'Smart Home Automation',
      'Industrial IoT',
      'Fire Safety Systems',
      'Cold Chain Monitoring',
      'Mining Safety',
      'PCB Design',
      'Embedded Systems',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema({ lang }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'AICO Elektronik',
    description:
      lang === 'tr'
        ? 'Muhendislik cozumleri ve otomasyon sistemleri'
        : 'Engineering solutions and automation systems',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${lang}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema({ lang }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'AICO Elektronik',
    image: `${baseUrl}/assets/og-image.jpg`,
    url: baseUrl,
    telephone: '+90-850-840-86-00',
    email: 'info@aicoelektronik.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0082,
      longitude: 28.9784,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
    areaServed: [
      {
        '@type': 'Country',
        name: 'Turkey',
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 41.0082,
          longitude: 28.9784,
        },
        geoRadius: '5000',
      },
    ],
    serviceType: [
      lang === 'tr' ? 'Akilli Ev Sistemleri' : 'Smart Home Systems',
      lang === 'tr' ? 'Endustriyel Otomasyon' : 'Industrial Automation',
      lang === 'tr' ? 'IoT Cozumleri' : 'IoT Solutions',
      lang === 'tr' ? 'Muhendislik Danismanligi' : 'Engineering Consultancy',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined structured data for the homepage
export function HomePageStructuredData({ lang }: StructuredDataProps) {
  return (
    <>
      <OrganizationSchema lang={lang} />
      <WebsiteSchema lang={lang} />
      <LocalBusinessSchema lang={lang} />
    </>
  );
}
