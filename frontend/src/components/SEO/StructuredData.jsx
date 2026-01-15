import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Schema.org Structured Data Components for SEO
 * Includes Organization, LocalBusiness, Service, and Product schemas
 */

// Base organization data
const ORGANIZATION_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://aicoelektronik.com/#organization",
  "name": "Aico Elektronik",
  "alternateName": "AICO Electronics",
  "url": "https://aicoelektronik.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://aicoelektronik.com/assets/logos/logo.png",
    "width": 512,
    "height": 512
  },
  "image": "https://aicoelektronik.com/assets/images/factory.jpg",
  "description": "Türkiye'nin lider PCB üretim ve SMT montaj hizmetleri sağlayıcısı. Endüstriyel IoT çözümleri ve AI destekli üretim.",
  "foundingDate": "2015",
  "founders": [
    {
      "@type": "Person",
      "name": "Ali Kemal Akpınar"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Organize Sanayi Bölgesi",
    "addressLocality": "İstanbul",
    "addressRegion": "İstanbul",
    "postalCode": "34000",
    "addressCountry": "TR"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+90-212-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["Turkish", "English"],
      "areaServed": ["TR", "EU", "US"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+90-212-XXX-XXXX",
      "contactType": "sales",
      "availableLanguage": ["Turkish", "English"]
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/aico-elektronik",
    "https://twitter.com/aicoelektronik",
    "https://www.facebook.com/aicoelektronik"
  ],
  "areaServed": [
    {
      "@type": "Country",
      "name": "Turkey"
    },
    {
      "@type": "Country",
      "name": "Germany"
    },
    {
      "@type": "Country",
      "name": "United States"
    }
  ]
};

// Local business data with expanded details
const LOCAL_BUSINESS_DATA = {
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  "@id": "https://aicoelektronik.com/#localbusiness",
  "name": "Aico Elektronik",
  "image": "https://aicoelektronik.com/assets/images/storefront.jpg",
  "priceRange": "₺₺-₺₺₺",
  "telephone": "+90-212-XXX-XXXX",
  "email": "info@aicoelektronik.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Organize Sanayi Bölgesi",
    "addressLocality": "İstanbul",
    "addressRegion": "İstanbul",
    "postalCode": "34000",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.0082,
    "longitude": 28.9784
  },
  "url": "https://aicoelektronik.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "hasMap": "https://maps.google.com/?q=Aico+Elektronik+Istanbul",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "currenciesAccepted": "TRY, EUR, USD"
};

// PCB Manufacturing Service Schema
const PCB_SERVICE_DATA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://aicoelektronik.com/services/pcb-manufacturing#service",
  "serviceType": "PCB Manufacturing",
  "name": "Profesyonel PCB Üretim Hizmeti",
  "description": "1-12 katman PCB üretimi, prototipten seri üretime. HASL, ENIG, OSP kaplama seçenekleri. 3-15 iş günü termin.",
  "provider": {
    "@id": "https://aicoelektronik.com/#organization"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Turkey"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "PCB Üretim Seçenekleri",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Prototip PCB",
          "description": "1-10 adet, 3-5 iş günü"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "TRY",
          "minPrice": 250
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Küçük Seri PCB",
          "description": "10-100 adet, 7-10 iş günü"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "TRY",
          "minPrice": 500
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Seri Üretim",
          "description": "100+ adet, özel fiyatlandırma"
        }
      }
    ]
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.8",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "Industry Review"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
};

// SMT Assembly Service Schema
const SMT_SERVICE_DATA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://aicoelektronik.com/services/smt-assembly#service",
  "serviceType": "SMT Assembly",
  "name": "SMT Montaj ve Dizgi Hizmeti",
  "description": "Tam otomatik SMT dizgi hattı, 01005 - BGA desteği. AOI ve X-Ray kalite kontrol. Turnkey ve consigned seçenekleri.",
  "provider": {
    "@id": "https://aicoelektronik.com/#organization"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Turkey"
  }
};

// Website Schema with Search Action
const WEBSITE_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://aicoelektronik.com/#website",
  "url": "https://aicoelektronik.com",
  "name": "Aico Elektronik",
  "description": "PCB üretim ve SMT montaj hizmetleri",
  "publisher": {
    "@id": "https://aicoelektronik.com/#organization"
  },
  "inLanguage": ["tr", "en"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://aicoelektronik.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// FAQ Schema for common questions
const FAQ_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "PCB üretimi ne kadar sürer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prototip PCB'ler 3-5 iş günü, standart siparişler 7-10 iş günü, ekonomik seçenek 12-15 iş gününde teslim edilir. Acil siparişler için ekspres hizmet mevcuttur."
      }
    },
    {
      "@type": "Question",
      "name": "Minimum sipariş adedi nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prototip siparişleri için minimum 1 adet PCB üretimi yapılabilir. Seri üretim için minimum 50 adet önerilir."
      }
    },
    {
      "@type": "Question",
      "name": "Hangi dosya formatlarını kabul ediyorsunuz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gerber RS-274X, Excellon Drill, ODB++, IPC-2581 ve birçok CAD formatını kabul ediyoruz. ZIP veya RAR olarak yükleyebilirsiniz."
      }
    },
    {
      "@type": "Question",
      "name": "Fiyat teklifi nasıl alınır?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Online fiyat hesaplama aracımızı kullanarak anında teklif alabilirsiniz. Gerber dosyanızı yükleyin, özellikleri seçin ve fiyatı görün."
      }
    }
  ]
};

// Breadcrumb List Schema
export const BreadcrumbSchema = ({ items }) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
};

// Product Schema for specific PCB configurations
export const ProductSchema = ({ product }) => {
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Aico Elektronik"
    },
    "manufacturer": {
      "@id": "https://aicoelektronik.com/#organization"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "TRY",
      "price": product.price,
      "priceValidUntil": product.validUntil,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@id": "https://aicoelektronik.com/#organization"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productData)}
      </script>
    </Helmet>
  );
};

// Main structured data component
const StructuredData = ({ pageType = 'home', pageData = {} }) => {
  const getSchemas = () => {
    const schemas = [ORGANIZATION_DATA, WEBSITE_DATA];

    switch (pageType) {
      case 'home':
        schemas.push(LOCAL_BUSINESS_DATA, PCB_SERVICE_DATA, SMT_SERVICE_DATA, FAQ_DATA);
        break;
      case 'quote':
        schemas.push(PCB_SERVICE_DATA);
        break;
      case 'services':
        schemas.push(PCB_SERVICE_DATA, SMT_SERVICE_DATA);
        break;
      case 'contact':
        schemas.push(LOCAL_BUSINESS_DATA);
        break;
      default:
        break;
    }

    return schemas;
  };

  return (
    <Helmet>
      {getSchemas().map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;
