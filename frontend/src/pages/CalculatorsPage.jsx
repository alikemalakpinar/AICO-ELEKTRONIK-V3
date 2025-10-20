import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { calculatorTools } from '../mock';
import { getLocalizedValue } from '../utils/i18n';
import { ArrowRight } from 'lucide-react';

const CalculatorsPage = ({ lang }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0E1A2B] mb-4">
            {lang === 'tr' ? 'Hesaplama Araçları' : 'Calculation Tools'}
          </h1>
          <p className="text-lg text-[#374151] max-w-3xl">
            {lang === 'tr'
              ? 'Mühendisler için profesyonel hesaplama araçları. Doğru ürün seçimi ve boyutlandırma için kullanın.'
              : 'Professional calculation tools for engineers. Use for accurate product selection and sizing.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Calculator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorTools.map((tool) => {
            const IconComponent = Icons[tool.icon];
            return (
              <Link
                key={tool.id}
                to={`/${lang}/calculators/${tool.id}`}
                className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#1554F6] hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-[#1554F6] rounded-xl flex items-center justify-center mb-4">
                    {IconComponent && <IconComponent className="text-white" size={32} />}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0E1A2B] mb-3 group-hover:text-[#1554F6] transition-colors duration-200">
                    {getLocalizedValue(tool, 'title', lang)}
                  </h3>
                  <p className="text-[#374151] leading-relaxed">
                    {getLocalizedValue(tool, 'desc', lang)}
                  </p>
                </div>
                <div className="flex items-center text-[#1554F6] font-semibold">
                  <span>{lang === 'tr' ? 'Hesapla' : 'Calculate'}</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-200" size={20} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#0E1A2B] mb-4">
            {lang === 'tr' ? 'Nasıl Kullanılır?' : 'How to Use?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 bg-[#1554F6] text-white rounded-lg flex items-center justify-center font-bold mb-3">1</div>
              <h3 className="font-semibold text-[#0E1A2B] mb-2">
                {lang === 'tr' ? 'Parametreleri Girin' : 'Enter Parameters'}
              </h3>
              <p className="text-sm text-[#374151]">
                {lang === 'tr'
                  ? 'Uygulamanızın teknik gereksinimlerini girin'
                  : 'Enter your application technical requirements'}
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-[#1554F6] text-white rounded-lg flex items-center justify-center font-bold mb-3">2</div>
              <h3 className="font-semibold text-[#0E1A2B] mb-2">
                {lang === 'tr' ? 'Sonuçları Alın' : 'Get Results'}
              </h3>
              <p className="text-sm text-[#374151]">
                {lang === 'tr'
                  ? 'Anlık hesaplama ve öneriler görün'
                  : 'View instant calculations and recommendations'}
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-[#1554F6] text-white rounded-lg flex items-center justify-center font-bold mb-3">3</div>
              <h3 className="font-semibold text-[#0E1A2B] mb-2">
                {lang === 'tr' ? 'PDF İndirin' : 'Download PDF'}
              </h3>
              <p className="text-sm text-[#374151]">
                {lang === 'tr'
                  ? 'Sonuçları PDF olarak kaydedin veya paylaşın'
                  : 'Save or share results as PDF'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;
