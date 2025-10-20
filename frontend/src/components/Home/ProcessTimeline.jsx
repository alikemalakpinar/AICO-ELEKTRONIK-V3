import React from 'react';
import { Upload, Search, Cpu, PackageCheck, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

const ProcessTimeline = ({ lang }) => {
  const content = {
    tr: {
      title: 'PCB Üretim Süreci',
      subtitle: 'Gerber\'den teslimata kadar 5 adımda hızlı ve şeffaf süreç',
      cta: 'Hemen Başla',
      steps: [
        {
          icon: Upload,
          title: 'Gerber Yükle',
          desc: 'Gerber dosyanızı sisteme yükleyin, otomatik DFM kontrol başlasın',
          time: '30 saniye',
          color: 'from-blue-500 to-cyan-500'
        },
        {
          icon: Search,
          title: 'DFM Kontrol',
          desc: 'Otomatik DFM analizinde uyarılar ve öneriler alın',
          time: '1 dakika',
          color: 'from-cyan-500 to-teal-500'
        },
        {
          icon: Cpu,
          title: 'Üretim',
          desc: 'IPC Class II/III standartlarında üretim başlasın',
          time: '7-10 gün',
          color: 'from-teal-500 to-green-500'
        },
        {
          icon: PackageCheck,
          title: 'Kalite Kontrol',
          desc: 'E-test, AOI ve manuel kontroller tamamlansın',
          time: '1 gün',
          color: 'from-green-500 to-emerald-500'
        },
        {
          icon: Truck,
          title: 'Teslimat',
          desc: 'Güvenli ambalajla kargoya verilsin, takip numarası iletilsin',
          time: '1-2 gün',
          color: 'from-emerald-500 to-lime-500'
        }
      ]
    },
    en: {
      title: 'PCB Manufacturing Process',
      subtitle: 'Fast and transparent process in 5 steps from Gerber to delivery',
      cta: 'Get Started',
      steps: [
        {
          icon: Upload,
          title: 'Upload Gerber',
          desc: 'Upload your Gerber file, automatic DFM check starts',
          time: '30 seconds',
          color: 'from-blue-500 to-cyan-500'
        },
        {
          icon: Search,
          title: 'DFM Check',
          desc: 'Receive warnings and suggestions from automatic DFM analysis',
          time: '1 minute',
          color: 'from-cyan-500 to-teal-500'
        },
        {
          icon: Cpu,
          title: 'Manufacturing',
          desc: 'Production starts according to IPC Class II/III standards',
          time: '7-10 days',
          color: 'from-teal-500 to-green-500'
        },
        {
          icon: PackageCheck,
          title: 'Quality Control',
          desc: 'E-test, AOI and manual inspections completed',
          time: '1 day',
          color: 'from-green-500 to-emerald-500'
        },
        {
          icon: Truck,
          title: 'Delivery',
          desc: 'Shipped with secure packaging, tracking number provided',
          time: '1-2 days',
          color: 'from-emerald-500 to-lime-500'
        }
      ]
    }
  };

  const t = content[lang] || content.tr;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-lime-500 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {t.steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary hover:shadow-2xl transition-all group">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-bold text-primary mb-2">
                        {step.time}
                      </div>
                      <h3 className="font-bold text-lg text-[#0A0E27] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow (Desktop) */}
                  {idx < t.steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-8 -right-4 w-8 h-8 items-center justify-center">
                      <ArrowRight className="text-gray-300" size={24} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href={`/${lang}/instant-quote`}>
            <button className="px-8 py-4 bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 mx-auto">
              {t.cta}
              <CheckCircle2 size={20} />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
