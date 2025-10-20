import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Award, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from '../../utils/i18n';

const PremiumHero = ({ lang }) => {
  const t = useTranslation(lang);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: Zap,
      value: t.hero.stats.projects,
      label: t.hero.stats.projectsLabel,
      color: '#1554F6'
    },
    {
      icon: Shield,
      value: t.hero.stats.experience,
      label: t.hero.stats.experienceLabel,
      color: '#10B981'
    },
    {
      icon: Award,
      value: t.hero.stats.delivery,
      label: t.hero.stats.deliveryLabel,
      color: '#F59E0B'
    },
    {
      icon: TrendingUp,
      value: t.hero.stats.satisfaction,
      label: t.hero.stats.satisfactionLabel,
      color: '#8B5CF6'
    }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 opacity-[0.03] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-indigo-500 opacity-[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500 opacity-[0.02] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium">
              <Zap size={16} className="mr-2" />
              {lang === 'tr' ? '25 Yıldır Endüstri Lideri' : 'Industry Leader for 25 Years'}
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-[#0A0E27] mb-6 leading-tight">
                {t.hero.title.split(',').map((part, idx) => (
                  <span key={idx} className="block">
                    {part}
                    {idx === 0 && ','}
                  </span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                {t.hero.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:from-[#0E3CC7] hover:to-[#0284C7] text-white px-8 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/${lang}/products`}>
                  {t.hero.cta1}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={22} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-2 border-[#1554F6] text-[#1554F6] hover:bg-[#1554F6] hover:text-white px-8 py-7 text-lg rounded-2xl transition-all duration-300"
              >
                <Link to={`/${lang}/services/instant-quote`}>
                  <Zap className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={22} />
                  {t.hero.cta2}
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              {['ISO 9001', 'CE', 'RoHS', 'IPC-A-610'].map((badge, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-gray-600">
                  <Shield size={18} className="text-green-600" />
                  <span className="font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={idx}
                    className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
                    style={{
                      animationDelay: `${idx * 0.1}s`
                    }}
                  >
                    {/* Gradient Background on Hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                      style={{ 
                        background: `linear-gradient(135deg, ${stat.color}, transparent)`
                      }}
                    />
                    
                    {/* Icon */}
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${stat.color}10`
                      }}
                    >
                      <IconComponent 
                        size={28} 
                        style={{ color: stat.color }}
                      />
                    </div>

                    {/* Value */}
                    <div className="text-4xl font-bold text-[#0A0E27] mb-2">
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-sm text-gray-600 leading-snug">
                      {stat.label}
                    </div>

                    {/* Hover Indicator */}
                    <div 
                      className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 opacity-10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24">
        <svg className="w-full h-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50C240 20 480 80 720 50C960 20 1200 80 1440 50V100H0V50Z" fill="white" fillOpacity="0.5"/>
          <path d="M0 70C240 85 480 55 720 70C960 85 1200 55 1440 70V100H0V70Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default PremiumHero;
