import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { calculatorTools } from '../../mock';
import { getLocalizedValue } from '../../utils/i18n';
import { useTranslation } from '../../utils/i18n';
import { ArrowRight, Sparkles } from 'lucide-react';

const Calculators = ({ lang }) => {
  const t = useTranslation(lang);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 opacity-[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-[0.02] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-sm font-semibold mb-4">
            <Sparkles size={16} className="mr-2" />
            {lang === 'tr' ? 'MÜHENDİSLİK ARAÇLARI' : 'ENGINEERING TOOLS'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-6">
            {t.calculators.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.calculators.subtitle}
          </p>
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {calculatorTools.map((tool, idx) => {
            const IconComponent = Icons[tool.icon];
            
            const gradients = [
              'from-blue-500 to-cyan-500',
              'from-purple-500 to-pink-500',
              'from-orange-500 to-red-500'
            ];

            return (
              <Link
                key={tool.id}
                to={`/${lang}/calculators/${tool.id}`}
                className="group relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${gradients[idx]} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {IconComponent && <IconComponent className="text-white" size={36} />}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#0A0E27] group-hover:text-white mb-4 transition-colors duration-300">
                    {getLocalizedValue(tool, 'title', lang)}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 group-hover:text-white/90 mb-6 leading-relaxed transition-colors duration-300">
                    {getLocalizedValue(tool, 'desc', lang)}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-[#1554F6] group-hover:text-white font-semibold transition-colors duration-300">
                    <span className="text-sm">{lang === 'tr' ? 'Hesapla' : 'Calculate'}</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={18} />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Calculators;
