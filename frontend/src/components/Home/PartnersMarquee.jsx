import React from 'react';
import { motion } from 'framer-motion';

const PartnersMarquee = ({ lang = 'tr' }) => {
  // Partner/client logos - grayscale for professional look
  const partners = [
    { name: 'Aselsan', logo: '/assets/partners/aselsan.svg' },
    { name: 'Havelsan', logo: '/assets/partners/havelsan.svg' },
    { name: 'TAI', logo: '/assets/partners/tai.svg' },
    { name: 'Roketsan', logo: '/assets/partners/roketsan.svg' },
    { name: 'TÜBİTAK', logo: '/assets/partners/tubitak.svg' },
    { name: 'Arçelik', logo: '/assets/partners/arcelik.svg' },
    { name: 'Vestel', logo: '/assets/partners/vestel.svg' },
    { name: 'Otokar', logo: '/assets/partners/otokar.svg' }
  ];

  // Duplicate for seamless loop
  const allPartners = [...partners, ...partners];

  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            {lang === 'tr' ? 'Bize Güvenen Kurumlar' : 'Trusted By Industry Leaders'}
          </p>
        </div>

        {/* Scrolling Marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />

          {/* Scrolling container */}
          <motion.div
            className="flex items-center gap-16"
            animate={{ x: [0, -50 * partners.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear"
              }
            }}
          >
            {allPartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 h-12 px-6 flex items-center justify-center"
              >
                {/* Fallback to text if logo doesn't load */}
                <div className="relative group">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 w-auto object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span
                    className="hidden text-lg font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Static fallback grid if animations fail */}
        <noscript>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center justify-items-center mt-4">
            {partners.map((partner, idx) => (
              <div key={idx} className="text-slate-400 font-semibold">
                {partner.name}
              </div>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
};

export default PartnersMarquee;
