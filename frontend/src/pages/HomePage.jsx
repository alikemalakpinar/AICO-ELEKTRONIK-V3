import React from 'react';
import { Helmet } from 'react-helmet-async';
import PremiumHero from '../components/Home/PremiumHero';
import PartnersMarquee from '../components/Home/PartnersMarquee';
import TrustBadges from '../components/Home/TrustBadges';
import Services from '../components/Home/Services';
import IoTProducts from '../components/Home/IoTProducts';
import ProcessTimeline from '../components/Home/ProcessTimeline';
import Calculators from '../components/Home/Calculators';
import Testimonials from '../components/Home/Testimonials';
import References from '../components/Home/References';
import Newsletter from '../components/Home/Newsletter';

const HomePage = ({ lang }) => {
  const meta = {
    tr: {
      title: 'Aico Elektronik | Endüstriyel IoT Çözümleri & PCB Üretim',
      description: 'Türkiye\'nin önde gelen endüstriyel elektronik çözümleri sağlayıcısı. Akıllı tarım, madencilik güvenliği, makine analizi ve PCB üretim hizmetleri. ISO 9001 sertifikalı, 25+ yıl deneyim.',
      keywords: 'akıllı tarım, endüstriyel IoT, madenci takip sistemi, makine ses analizi, PCB üretim, elektronik dizgi, yangın tespit, soğuk hava deposu'
    },
    en: {
      title: 'Aico Electronics | Industrial IoT Solutions & PCB Manufacturing',
      description: 'Turkey\'s leading industrial electronics solutions provider. Smart agriculture, mining safety, machine analysis and PCB manufacturing services. ISO 9001 certified, 25+ years experience.',
      keywords: 'smart agriculture, industrial IoT, mining tracking system, machine sound analysis, PCB manufacturing, electronics assembly, fire detection, cold storage'
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
        <link rel="canonical" href={`https://www.aicoelektronik.com/${lang}`} />
      </Helmet>

      <div>
        <PremiumHero lang={lang} />
        <PartnersMarquee lang={lang} />
        <TrustBadges lang={lang} />
        <Services lang={lang} />
        <IoTProducts lang={lang} />
        <ProcessTimeline lang={lang} />
        <Calculators lang={lang} />
        <Testimonials lang={lang} />
        <References lang={lang} />
        <Newsletter lang={lang} />
      </div>
    </>
  );
};

export default HomePage;
