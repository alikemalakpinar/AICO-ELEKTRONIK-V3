import React from 'react';
import { referenceLogos } from '../../mock';
import { useTranslation } from '../../utils/i18n';
import { Award, TrendingUp } from 'lucide-react';

const References = ({ lang }) => {
  const t = useTranslation(lang);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-semibold mb-4">
            <Award size={16} className="mr-2" />
            {lang === 'tr' ? 'GÜVENİLİR ORTAK' : 'TRUSTED PARTNER'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-6">
            {t.references.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {lang === 'tr' 
              ? 'Dünyanın önde gelen şirketlerinin güvendiği teknoloji ortağı'
              : 'Technology partner trusted by world\'s leading companies'}
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1554F6] mb-1">500+</div>
              <div className="text-sm text-gray-600">{lang === 'tr' ? 'Aktif Müşteri' : 'Active Clients'}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#10B981] mb-1">98%</div>
              <div className="text-sm text-gray-600">{lang === 'tr' ? 'Memnuniyet' : 'Satisfaction'}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#F59E0B] mb-1">25+</div>
              <div className="text-sm text-gray-600">{lang === 'tr' ? 'Yıl Tecrübe' : 'Years Experience'}</div>
            </div>
          </div>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {referenceLogos.map((logo, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-8 flex items-center justify-center hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#1554F6] hover:-translate-y-1"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="max-w-full h-auto grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <TrendingUp className="text-green-500" size={20} />
            <span className="text-sm font-medium">
              {lang === 'tr' 
                ? 'Ve 500+ diğer önde gelen şirket' 
                : 'And 500+ other leading companies'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
