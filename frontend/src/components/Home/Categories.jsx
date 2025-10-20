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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0E1A2B] mb-4">
            {t.categories.title}
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((category) => {
            const IconComponent = Icons[category.icon];
            return (
              <Link
                key={category.id}
                to={`/${lang}/products/${category.id}`}
                className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#1554F6] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1554F6] bg-opacity-10 rounded-xl flex items-center justify-center group-hover:bg-[#1554F6] transition-colors duration-300">
                    {IconComponent && (
                      <IconComponent className="text-[#1554F6] group-hover:text-white transition-colors duration-300" size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#0E1A2B] mb-2 group-hover:text-[#1554F6] transition-colors duration-200">
                      {getLocalizedValue(category, 'title', lang)}
                    </h3>
                    <p className="text-sm text-[#374151] mb-3">
                      {getLocalizedValue(category, 'desc', lang)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#9CA3AF]">{category.count} {lang === 'tr' ? 'ürün' : 'products'}</span>
                      <ArrowRight className="text-[#1554F6] opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
