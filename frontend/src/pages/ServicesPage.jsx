import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { services } from '../mock';
import { getLocalizedValue } from '../utils/i18n';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

const ServicesPage = ({ lang }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
            {lang === 'tr' ? 'HİZMETLERİMİZ' : 'OUR SERVICES'}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0A0E27] mb-6">
            {lang === 'tr' ? 'End-to-End Elektronik Çözümler' : 'End-to-End Electronics Solutions'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'tr'
              ? 'Tasarımdan üretime, PCB üretiminden dizgiye - ihtiyaçlarınızın tamamını karşılıyoruz'
              : 'From design to production, PCB manufacturing to assembly - we cover all your needs'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const IconComponent = Icons[service.icon];
              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#1554F6] hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      {IconComponent && <IconComponent className="text-white" size={36} />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-3xl font-bold text-[#0A0E27] mb-4 group-hover:text-[#1554F6] transition-colors duration-300">
                      {getLocalizedValue(service, 'title', lang)}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {getLocalizedValue(service, 'desc', lang)}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-3">
                          <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            {lang === 'tr' ? feature.tr : feature.en}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to={`/${lang}/services/${service.id}`}
                      className="inline-flex items-center text-[#1554F6] font-semibold text-lg group-hover:gap-2 transition-all duration-300"
                    >
                      {lang === 'tr' ? 'Detaylı Bilgi' : 'Learn More'}
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#0A0E27] mb-6">
            {lang === 'tr' ? 'Projenizi Birlikte Hayata Geçirelim' : 'Let\'s Bring Your Project to Life'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {lang === 'tr'
              ? 'Uzman ekibimiz, projelerinizde size yardımcı olmaya hazır'
              : 'Our expert team is ready to help with your projects'}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:from-[#0E3CC7] hover:to-[#0284C7] text-white px-10 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Link to={`/${lang}/contact`}>
              <Zap className="mr-2" size={22} />
              {lang === 'tr' ? 'Anında Teklif Alın' : 'Get Instant Quote'}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;