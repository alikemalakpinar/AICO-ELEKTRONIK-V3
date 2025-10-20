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
      certifications: ['ISO 9001:2015', 'CE', 'RoHS', 'REACH', 'IPC-A-610']
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
      certifications: ['ISO 9001:2015', 'CE', 'RoHS', 'REACH', 'IPC-A-610']
    }
  };

  const t = content[lang] || content.tr;

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-3 lg:mb-4">
            {t.title}
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {t.badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-[#1554F6] flex items-center justify-center mb-3 lg:mb-4">
                  <Icon className="text-white" size={20} />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-[#0A0E27] mb-1">
                  {badge.number}
                </div>
                <div className="text-xs lg:text-sm font-semibold text-gray-700 mb-1">
                  {badge.label}
                </div>
                <div className="text-xs text-gray-500">{badge.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
          <h3 className="text-center text-base lg:text-lg font-semibold text-gray-900 mb-4 lg:mb-6">
            {lang === 'tr' ? 'Sertifikalar & Standartlar' : 'Certifications & Standards'}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
            {t.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="px-4 lg:px-6 py-2 lg:py-3 rounded-lg bg-[#1554F6] text-white font-medium text-sm shadow-sm"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
