import React from 'react';
import { referenceLogos } from '../../mock';
import { useTranslation } from '../../utils/i18n';

const References = ({ lang }) => {
  const t = useTranslation(lang);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0E1A2B] mb-2">
            {t.references.title}
          </h2>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {referenceLogos.map((logo, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="max-w-full h-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default References;
