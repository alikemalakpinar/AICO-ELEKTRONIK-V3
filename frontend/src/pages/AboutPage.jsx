import React from 'react';
import { Award, Users, Target, TrendingUp, CheckCircle2, Calendar } from 'lucide-react';

const AboutPage = ({ lang }) => {
  const content = {
    tr: {
      hero: {
        badge: 'HAKKIMIZDA',
        title: 'Güvenilir Teknoloji Ortağınız',
        subtitle: 'Endüstriyel güç elektroniği ve LED sürücülerde 25 yıllık uzmanlık'
      },
      vision: {
        title: 'Vizyon',
        text: 'Kritik uygulamalarda en güvenilir güç çözümleri ortağı olmak ve elektronik sektörünün geleceğini şekillendirmek.'
      },
      mission: {
        title: 'Misyon',
        text: 'Enerjiyi verimli ve güvenli yöneten, sürdürülebilir ürünler geliştirerek müşterilerimize değer katmak.'
      },
      values: {
        title: 'Değerlerimiz',
        items: [
          { icon: 'Award', title: 'Kalite', desc: 'Her üründe mükemmellik standardı' },
          { icon: 'Users', title: 'Müşteri Odaklılık', desc: 'İhtiyaçlarınız her zaman önceliğimiz' },
          { icon: 'Target', title: 'İnovasyon', desc: 'Sürekli gelişim ve yenilikçilik' },
          { icon: 'TrendingUp', title: 'Sürdürülebilirlik', desc: 'Çevre dostu üretim anlayışı' }
        ]
      },
      timeline: {
        title: 'Tarihçemiz',
        events: [
          { year: '1999', title: 'Kuruluş', desc: 'Ankara\'da güç elektroniği alanında faaliyete başladık' },
          { year: '2005', title: 'İlk İhracat', desc: 'Avrupa pazarına açıldık' },
          { year: '2012', title: 'ISO 9001', desc: 'Kalite yönetim sistemimizi sertifikalandırdık' },
          { year: '2018', title: 'Yeni Tesis', desc: '5000m² modern üretim tesisi' },
          { year: '2024', title: 'Ar-Ge Merkezi', desc: 'Yeni nesil ürünler için Ar-Ge merkezi kurduk' }
        ]
      },
      certifications: {
        title: 'Sertifikalar ve Kalite',
        items: ['ISO 9001:2015', 'CE', 'RoHS', 'REACH', 'IPC-A-610', 'UL Listed']
      }
    },
    en: {
      hero: {
        badge: 'ABOUT US',
        title: 'Your Trusted Technology Partner',
        subtitle: '25 years of expertise in industrial power electronics and LED drivers'
      },
      vision: {
        title: 'Vision',
        text: 'To be the most reliable power solutions partner in critical applications and shape the future of the electronics industry.'
      },
      mission: {
        title: 'Mission',
        text: 'To add value to our customers by developing sustainable products that manage energy efficiently and safely.'
      },
      values: {
        title: 'Our Values',
        items: [
          { icon: 'Award', title: 'Quality', desc: 'Excellence standard in every product' },
          { icon: 'Users', title: 'Customer Focus', desc: 'Your needs are always our priority' },
          { icon: 'Target', title: 'Innovation', desc: 'Continuous improvement and innovation' },
          { icon: 'TrendingUp', title: 'Sustainability', desc: 'Environmentally friendly production' }
        ]
      },
      timeline: {
        title: 'Our History',
        events: [
          { year: '1999', title: 'Foundation', desc: 'Started operations in Ankara in power electronics' },
          { year: '2005', title: 'First Export', desc: 'Entered European market' },
          { year: '2012', title: 'ISO 9001', desc: 'Quality management system certified' },
          { year: '2018', title: 'New Facility', desc: '5000m² modern production facility' },
          { year: '2024', title: 'R&D Center', desc: 'Established R&D center for next-gen products' }
        ]
      },
      certifications: {
        title: 'Certifications and Quality',
        items: ['ISO 9001:2015', 'CE', 'RoHS', 'REACH', 'IPC-A-610', 'UL Listed']
      }
    }
  };

  const t = content[lang] || content.tr;
  const icons = { Award, Users, Target, TrendingUp };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
            {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0A0E27] mb-6">{t.hero.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border-2 border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-[#0A0E27] mb-4">{t.vision.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t.vision.text}</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-8 border-2 border-indigo-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-2xl flex items-center justify-center mb-6">
                <Award className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-[#0A0E27] mb-4">{t.mission.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t.mission.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#0A0E27] text-center mb-12">{t.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.items.map((value, idx) => {
              const IconComponent = icons[value.icon];
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    {IconComponent && <IconComponent className="text-[#1554F6]" size={28} />}
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0E27] mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#0A0E27] text-center mb-16">{t.timeline.title}</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#1554F6] to-[#8B5CF6]"></div>
            {t.timeline.events.map((event, idx) => (
              <div key={idx} className={`relative flex items-center mb-12 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="text-2xl font-bold text-[#1554F6] mb-2">{event.year}</div>
                    <h3 className="text-xl font-bold text-[#0A0E27] mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#1554F6] rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#0A0E27] mb-12">{t.certifications.title}</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {t.certifications.items.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-2xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="text-green-500" size={24} />
                  <span className="text-lg font-semibold text-[#0A0E27]">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;