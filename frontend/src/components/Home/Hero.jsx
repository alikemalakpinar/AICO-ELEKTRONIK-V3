import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from '../../utils/i18n';

const Hero = ({ lang }) => {
  const t = useTranslation(lang);

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-[#0E1A2B] mb-6 leading-tight">
            {t.hero.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#374151] mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-[#1554F6] hover:bg-[#0E3CC7] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link to={`/${lang}/products`}>
                {t.hero.cta1}
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-[#1554F6] text-[#1554F6] hover:bg-[#1554F6] hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-200"
            >
              <Link to={`/${lang}/contact`}>
                {t.hero.cta2}
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#374151]">
            {t.hero.proof.split('|').map((proof, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle2 size={18} className="text-[#0E9F6E]" />
                <span>{proof.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#1554F6] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0E9F6E] opacity-5 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;
