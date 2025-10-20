import React from 'react';
import { Briefcase, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';

const CareersPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      title: 'Kariyer Fırsatları',
      subtitle: 'Aico ailesine katılın, yeteneklerinizi geliştirin',
      why: {
        title: 'Neden Aico?',
        items: [
          { icon: Users, title: 'Uzman Ekip', desc: '25 yıllık deneyim' },
          { icon: Briefcase, title: 'Kariyer Gelişimi', desc: 'Eğitim ve ilerleme' },
          { icon: MapPin, title: 'Merkezi Konum', desc: 'ODTU Teknokent' },
          { icon: Clock, title: 'Esnek Çalışma', desc: 'Hibrit model' }
        ]
      },
      openings: {
        title: 'Açık Pozisyonlar',
        jobs: [
          { title: 'PCB Tasarım Mühendisi', location: 'Ankara', type: 'Tam Zamanlı', dept: 'Mühendislik' },
          { title: 'SMT Operasyon Uzmanı', location: 'Ankara', type: 'Tam Zamanlı', dept: 'Üretim' },
          { title: 'Kalite Kontrol Mühendisi', location: 'Ankara', type: 'Tam Zamanlı', dept: 'Kalite' },
          { title: 'Satış Mühendisi', location: 'Ankara/İstanbul', type: 'Tam Zamanlı', dept: 'Satış' }
        ]
      },
      apply: 'Başvuru için CV\'nizi info@aicoelektronik.com adresine gönderebilirsiniz.'
    },
    en: {
      title: 'Career Opportunities',
      subtitle: 'Join the Aico family, develop your talents',
      why: {
        title: 'Why Aico?',
        items: [
          { icon: Users, title: 'Expert Team', desc: '25 years experience' },
          { icon: Briefcase, title: 'Career Development', desc: 'Training and growth' },
          { icon: MapPin, title: 'Central Location', desc: 'METU Technopolis' },
          { icon: Clock, title: 'Flexible Work', desc: 'Hybrid model' }
        ]
      },
      openings: {
        title: 'Open Positions',
        jobs: [
          { title: 'PCB Design Engineer', location: 'Ankara', type: 'Full-Time', dept: 'Engineering' },
          { title: 'SMT Operation Specialist', location: 'Ankara', type: 'Full-Time', dept: 'Production' },
          { title: 'Quality Control Engineer', location: 'Ankara', type: 'Full-Time', dept: 'Quality' },
          { title: 'Sales Engineer', location: 'Ankara/Istanbul', type: 'Full-Time', dept: 'Sales' }
        ]
      },
      apply: 'Send your CV to info@aicoelektronik.com to apply.'
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#1554F6] to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl opacity-90">{t.subtitle}</p>
        </div>
      </div>

      {/* Why Aico */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.why.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.why.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#1554F6] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.openings.title}</h2>
          <div className="space-y-4">
            {t.openings.jobs.map((job, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#1554F6] transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} /> {job.dept}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-[#1554F6] hover:bg-blue-700">
                    {lang === 'tr' ? 'Başvur' : 'Apply'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8">{t.apply}</p>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
