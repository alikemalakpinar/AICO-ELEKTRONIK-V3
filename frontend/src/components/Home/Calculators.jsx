import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { calculatorTools } from '../../mock';
import { getLocalizedValue } from '../../utils/i18n';
import { useTranslation } from '../../utils/i18n';
import { ArrowRight } from 'lucide-react';

const Calculators = ({ lang }) => {
  const t = useTranslation(lang);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0E1A2B] mb-4">
            {t.calculators.title}
          </h2>
          <p className="text-lg text-[#374151] max-w-2xl mx-auto">
            {t.calculators.subtitle}
          </p>
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {calculatorTools.map((tool) => {
            const IconComponent = Icons[tool.icon];
            return (
              <Link
                key={tool.id}
                to={`/${lang}/calculators/${tool.id}`}
                className="group bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-[#1554F6] hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="w-14 h-14 bg-[#1554F6] rounded-xl flex items-center justify-center mb-4">
                    {IconComponent && <IconComponent className="text-white" size={28} />}
                  </div>
                  <h3 className="text-xl font-bold text-[#0E1A2B] mb-2 group-hover:text-[#1554F6] transition-colors duration-200">
                    {getLocalizedValue(tool, 'title', lang)}
                  </h3>
                  <p className="text-sm text-[#374151]">
                    {getLocalizedValue(tool, 'desc', lang)}
                  </p>
                </div>
                <div className="flex items-center text-[#1554F6] font-medium">
                  <span className="text-sm">{lang === 'tr' ? 'Hesapla' : 'Calculate'}</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Calculators;
