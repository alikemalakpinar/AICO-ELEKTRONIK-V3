import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { sectors } from '../../mock';
import { getLocalizedValue } from '../../utils/i18n';
import { useTranslation } from '../../utils/i18n';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const Sectors = ({ lang }) => {
  const t = useTranslation(lang);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0E1A2B] mb-4">
            {t.sectors.title}
          </h2>
          <p className="text-lg text-[#374151] max-w-2xl mx-auto">
            {t.sectors.subtitle}
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sectors.map((sector) => {
            const IconComponent = Icons[sector.icon];
            return (
              <div
                key={sector.id}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-[#1554F6] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {IconComponent && <IconComponent className="text-[#1554F6]" size={32} />}
                </div>
                <h3 className="text-lg font-semibold text-[#0E1A2B]">
                  {getLocalizedValue(sector, 'title', lang)}
                </h3>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#1554F6] text-[#1554F6] hover:bg-[#1554F6] hover:text-white px-6 rounded-xl transition-all duration-200"
          >
            <Link to={`/${lang}/solutions`}>
              {t.sectors.cta}
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Sectors;
