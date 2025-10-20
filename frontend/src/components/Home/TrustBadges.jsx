import React from 'react';
import { Award, Shield, Zap, Users, CheckCircle2, Star } from 'lucide-react';

const TrustBadges = ({ lang }) => {
  const content = {
    tr: {
      title: 'Neden Aico Elektronik?',
      subtitle: 'Türkiye\'nin güvenilir PCB üretim partneri',
      badges: [
        {
          icon: Award,
          number: '25+',
          label: 'Yıl Deneyim',
          desc: 'Sektörde öncü'
        },
        {
          icon: Users,
          number: '10.000+',
          label: 'Tamamlanan Proje',
          desc: 'Başarılı teslimat'
        },
        {
          icon: Shield,
          number: '%98',
          label: 'Zamanında Teslimat',
          desc: 'Müşteri memnuniyeti'
        },
        {
          icon: Zap,
          number: '24-48h',
          label: 'Hızlı Prototip',
          desc: 'Ekspres üretim'
        },
        {
          icon: CheckCircle2,
          number: 'ISO 9001',
          label: 'Sertifikalı Üretim',
          desc: 'Kalite garantisi'
        },
        {
          icon: Star,
          number: '4.8/5',
          label: 'Müşteri Puanı',
          desc: '237 değerlendirme'
        }
      ],
      certifications: [
        { name: 'ISO 9001:2015', color: 'blue' },
        { name: 'CE Belgeli', color: 'green' },
        { name: 'RoHS Uyumlu', color: 'purple' },
        { name: 'REACH', color: 'orange' },
        { name: 'IPC-A-610 Class 2/3', color: 'red' }
      ]
    },
    en: {
      title: 'Why Aico Electronics?',
      subtitle: 'Turkey\'s trusted PCB manufacturing partner',
      badges: [
        {
          icon: Award,
          number: '25+',
          label: 'Years Experience',
          desc: 'Industry leader'
        },
        {
          icon: Users,
          number: '10,000+',
          label: 'Projects Completed',
          desc: 'Successful delivery'
        },
        {
          icon: Shield,
          number: '98%',
          label: 'On-Time Delivery',
          desc: 'Customer satisfaction'
        },
        {
          icon: Zap,
          number: '24-48h',
          label: 'Fast Prototype',
          desc: 'Express production'
        },
        {
          icon: CheckCircle2,
          number: 'ISO 9001',
          label: 'Certified Production',
          desc: 'Quality guaranteed'
        },
        {
          icon: Star,
          number: '4.8/5',
          label: 'Customer Rating',
          desc: '237 reviews'
        }
      ],
      certifications: [
        { name: 'ISO 9001:2015', color: 'blue' },
        { name: 'CE Certified', color: 'green' },
        { name: 'RoHS Compliant', color: 'purple' },
        { name: 'REACH', color: 'orange' },
        { name: 'IPC-A-610 Class 2/3', color: 'red' }
      ]
    }
  };

  const t = content[lang] || content.tr;

  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
    red: 'from-red-500 to-rose-500'
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {t.badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-3xl font-bold text-[#0A0E27] mb-1">
                  {badge.number}
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  {badge.label}
                </div>
                <div className="text-xs text-gray-500">{badge.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
            {lang === 'tr' ? 'Sertifikalar & Standartlar' : 'Certifications & Standards'}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {t.certifications.map((cert, idx) => (
              <div
                key={idx}
                className={`px-6 py-3 rounded-xl bg-gradient-to-r ${colorClasses[cert.color]} text-white font-semibold text-sm shadow-lg hover:scale-105 transition-transform`}
              >
                {cert.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
