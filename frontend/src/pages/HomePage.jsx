import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PartnersMarquee from '../components/Home/PartnersMarquee';
import TrustBadges from '../components/Home/TrustBadges';
import Services from '../components/Home/Services';
import IoTProducts from '../components/Home/IoTProducts';
import ProcessTimeline from '../components/Home/ProcessTimeline';
import Calculators from '../components/Home/Calculators';
import Testimonials from '../components/Home/Testimonials';
import References from '../components/Home/References';
import Newsletter from '../components/Home/Newsletter';
import AICOBot from '../components/AICOBot';

// Lazy load heavy 3D components
const InteractivePCBHero = lazy(() => import('../components/3D/InteractivePCBHero'));

// Hero Loading Fallback with premium animation
const HeroFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center">
    <div className="text-center">
      <motion.div
        className="w-20 h-20 mx-auto mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="8" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="70 200" strokeLinecap="round" />
        </svg>
      </motion.div>
      <motion.p
        className="text-gray-400 text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        AICO Elektronik
      </motion.p>
    </div>
  </div>
);

const HomePage = ({ lang }) => {
  const meta = {
    tr: {
      title: 'Aico Elektronik | Endüstriyel IoT Çözümleri & AI Destekli PCB Üretim',
      description: 'Türkiye\'nin önde gelen endüstriyel elektronik çözümleri sağlayıcısı. AI destekli PCB tasarım analizi, gerçek zamanlı DFM kontrolü, akıllı tedarik zinciri yönetimi. ISO 9001 sertifikalı, 25+ yıl deneyim.',
      keywords: 'akıllı tarım, endüstriyel IoT, madenci takip sistemi, makine ses analizi, PCB üretim, elektronik dizgi, yangın tespit, soğuk hava deposu, AI destekli üretim'
    },
    en: {
      title: 'Aico Electronics | Industrial IoT Solutions & AI-Powered PCB Manufacturing',
      description: 'Turkey\'s leading industrial electronics solutions provider. AI-powered PCB design analysis, real-time DFM checks, intelligent supply chain management. ISO 9001 certified, 25+ years experience.',
      keywords: 'smart agriculture, industrial IoT, mining tracking system, machine sound analysis, PCB manufacturing, electronics assembly, fire detection, cold storage, AI-powered manufacturing'
    }
  };

  const t = meta[lang] || meta.tr;

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="keywords" content={t.keywords} />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.aicoelektronik.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://www.aicoelektronik.com/${lang}`} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Aico Elektronik",
            "url": "https://www.aicoelektronik.com",
            "logo": "https://www.aicoelektronik.com/logo.png",
            "description": t.description,
            "foundingDate": "1999",
            "numberOfEmployees": "50-100",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Istanbul",
              "addressCountry": "TR"
            },
            "sameAs": [
              "https://www.linkedin.com/company/aico-elektronik",
              "https://twitter.com/aicoelektronik"
            ]
          })}
        </script>
      </Helmet>

      <div className="overflow-hidden">
        {/* 3D Interactive Hero */}
        <Suspense fallback={<HeroFallback />}>
          <InteractivePCBHero lang={lang} />
        </Suspense>

        {/* Partners Marquee */}
        <PartnersMarquee lang={lang} />

        {/* Trust Badges */}
        <TrustBadges lang={lang} />

        {/* Services Section */}
        <Services lang={lang} />

        {/* IoT Products */}
        <IoTProducts lang={lang} />

        {/* Process Timeline */}
        <ProcessTimeline lang={lang} />

        {/* Engineering Calculators */}
        <Calculators lang={lang} />

        {/* Customer Testimonials */}
        <Testimonials lang={lang} />

        {/* References/Partners */}
        <References lang={lang} />

        {/* Newsletter */}
        <Newsletter lang={lang} />

        {/* AI Assistant Bot */}
        <AICOBot lang={lang} />
      </div>
    </>
  );
};

export default HomePage;
