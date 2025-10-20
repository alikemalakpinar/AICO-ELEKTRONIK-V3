import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { productCategories } from '../../mock';
import { getLocalizedValue } from '../../utils/i18n';
import { useTranslation } from '../../utils/i18n';
import { ArrowRight } from 'lucide-react';

const Categories = ({ lang }) => {
  const t = useTranslation(lang);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-4">
            {lang === 'tr' ? 'ÜRÜN KATEGORİLERİ' : 'PRODUCT CATEGORIES'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-6">
            {t.categories.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'tr' 
              ? 'Endüstriyel kalitede güç elektroniği ürünleri - yüksek verimlilik ve güvenilirlik'
              : 'Industrial-grade power electronics products - high efficiency and reliability'}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, idx) => {
            const IconComponent = Icons[category.icon];
            return (
              <Link
                key={category.id}
                to={`/${lang}/products/${category.id}`}
                className="group relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] bg-opacity-10 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                      {IconComponent && (
                        <IconComponent 
                          className="text-[#1554F6] group-hover:text-[#1554F6] transition-colors duration-300" 
                          size={32} 
                        />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#0A0E27] group-hover:text-white mb-3 transition-colors duration-300">
                    {getLocalizedValue(category, 'title', lang)}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 group-hover:text-white/90 mb-4 transition-colors duration-300 leading-relaxed">
                    {getLocalizedValue(category, 'desc', lang)}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 group-hover:border-white/20 transition-colors duration-300">
                    <span className="text-sm font-semibold text-[#1554F6] group-hover:text-white transition-colors duration-300">
                      {category.count} {lang === 'tr' ? 'ürün' : 'products'}
                    </span>
                    <div className="flex items-center space-x-2 text-[#1554F6] group-hover:text-white transition-all duration-300">
                      <span className="text-sm font-semibold">{lang === 'tr' ? 'Keşfet' : 'Explore'}</span>
                      <ArrowRight 
                        className="group-hover:translate-x-1 transition-transform duration-300" 
                        size={18} 
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
