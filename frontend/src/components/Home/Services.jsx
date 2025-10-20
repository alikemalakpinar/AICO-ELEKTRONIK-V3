import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { services } from '../../mock';
import { getLocalizedValue } from '../../utils/i18n';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const Services = ({ lang }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 opacity-[0.02] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-4">
            {lang === 'tr' ? 'HİZMETLERİMİZ' : 'OUR SERVICES'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-6">
            {lang === 'tr' ? 'End-to-End Elektronik Çözümler' : 'End-to-End Electronics Solutions'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'tr' 
              ? 'Tasarımdan üretime, PCB üretiminden dizgiye - ihtiyacınız olan her şey tek çatı altında'
              : 'From design to production, PCB manufacturing to assembly - everything you need under one roof'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, idx) => {
            const IconComponent = Icons[service.icon];
            return (
              <div
                key={service.id}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border-2 border-gray-200 hover:border-[#1554F6] hover:shadow-2xl transition-all duration-500 overflow-hidden"
                style={{
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    {IconComponent && <IconComponent className="text-white" size={32} />}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-[#0A0E27] mb-3 group-hover:text-[#1554F6] transition-colors duration-300">
                    {getLocalizedValue(service, 'title', lang)}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {getLocalizedValue(service, 'desc', lang)}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3">
                        <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">
                          {lang === 'tr' ? feature.tr : feature.en}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={`/${lang}/services/${service.id}`}
                    className="inline-flex items-center text-[#1554F6] font-semibold group-hover:gap-2 transition-all duration-300"
                  >
                    {lang === 'tr' ? 'Detaylı Bilgi' : 'Learn More'}
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:from-[#0E3CC7] hover:to-[#0284C7] text-white px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/${lang}/services/instant-quote`}>
                <Icons.Zap className="mr-2" size={20} />
                {lang === 'tr' ? 'Anında Teklif Alın' : 'Get Instant Quote'}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-[#1554F6] text-[#1554F6] hover:bg-[#1554F6] hover:text-white px-8 py-6 text-lg rounded-2xl transition-all duration-300"
            >
              <Link to={`/${lang}/services`}>
                {lang === 'tr' ? 'Tüm Hizmetler' : 'All Services'}
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
