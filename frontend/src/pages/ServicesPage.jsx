import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Zap, Cpu, Layers, Factory,
  Settings, Shield, Microscope, Box, Radio, Thermometer,
  Clock, Award, TrendingUp, Users, Star, ChevronRight,
  Play, Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';

const ServicesPage = ({ lang }) => {
  const [activeService, setActiveService] = useState(null);

  const content = {
    tr: {
      hero: {
        badge: 'HİZMETLERİMİZ',
        title: 'End-to-End Elektronik',
        titleHighlight: 'Çözümler',
        subtitle: 'Tasarımdan üretime, PCB üretiminden dizgiye - 25 yıllık tecrübeyle tüm elektronik üretim ihtiyaçlarınızı karşılıyoruz.',
        stats: [
          { value: '500+', label: 'Tamamlanan Proje' },
          { value: '99.8%', label: 'Kalite Oranı' },
          { value: '24 Saat', label: 'Hızlı Prototip' },
          { value: '15+', label: 'Ülke İhracat' }
        ]
      },
      services: [
        {
          id: 'pcb-manufacturing',
          icon: Layers,
          title: 'PCB Üretim',
          subtitle: 'Yüksek Kaliteli Baskılı Devre Kartı',
          desc: 'Tek ve çok katmanlı, rigid, flex ve rigid-flex PCB üretimi. HDI, impedans kontrollü ve özel malzeme seçenekleri.',
          color: 'blue',
          features: [
            '1-30 katman kapasitesi',
            'HDI (microvia, laser drill)',
            'Impedans kontrollü tasarım',
            'Flex ve rigid-flex PCB',
            'Ağır bakır (6oz+)',
            'ENIG, HASL, OSP yüzey işlemleri'
          ],
          specs: [
            { label: 'Min. İz Genişliği', value: '3 mil' },
            { label: 'Min. Via', value: '0.15mm' },
            { label: 'Max. Katman', value: '30' },
            { label: 'Prototip Süresi', value: '24 saat' }
          ],
          link: '/services/pcb-manufacturing'
        },
        {
          id: 'pcb-assembly',
          icon: Cpu,
          title: 'PCB Dizgi (SMT/THT)',
          subtitle: 'Hassas Komponent Yerleştirme',
          desc: 'Yüksek hızlı SMT hattı, THT ve karma montaj. 01005\'den BGA\'ya her boyutta komponent kapasitesi.',
          color: 'green',
          features: [
            '01005 & 0201 yerleştirme',
            'BGA, QFN, QFP montaj',
            'X-Ray & 3D AOI kontrol',
            'Seçmeli dalga lehimleme',
            'Conformal coating',
            'ICT/FCT test entegrasyonu'
          ],
          specs: [
            { label: 'Min. Komponent', value: '01005' },
            { label: 'Günlük Kapasite', value: '100K+' },
            { label: 'İlk Geçiş Verimi', value: '%99.8' },
            { label: 'Hızlı Prototip', value: '48 saat' }
          ],
          link: '/services/pcb-assembly'
        },
        {
          id: 'box-build',
          icon: Box,
          title: 'Kutu Montaj',
          subtitle: 'Tam Ürün Entegrasyonu',
          desc: 'Kablo harness, mekanik montaj, entegrasyon ve test. Anahtar teslim ürün çözümleri.',
          color: 'purple',
          features: [
            'Kablo harness üretimi',
            'Mekanik montaj',
            'Enclosure entegrasyonu',
            'Fonksiyonel test',
            'Etiketleme ve paketleme',
            'Özel ambalaj çözümleri'
          ],
          specs: [
            { label: 'Tip', value: 'Full Turnkey' },
            { label: 'Test', value: '100%' },
            { label: 'Takip', value: 'Lot bazlı' },
            { label: 'Paketleme', value: 'Özel' }
          ],
          link: '/services/box-build'
        },
        {
          id: 'engineering',
          icon: Settings,
          title: 'Mühendislik Hizmetleri',
          subtitle: 'Tasarım ve Danışmanlık',
          desc: 'DFM analizi, tasarım optimizasyonu, reverse engineering ve ürün geliştirme desteği.',
          color: 'cyan',
          features: [
            'DFM/DFA analizi',
            'Tasarım optimizasyonu',
            'SI/PI simülasyonu',
            'Termal analiz',
            'BOM optimizasyonu',
            'Reverse engineering'
          ],
          specs: [
            { label: 'DFM Raporu', value: '2 saat' },
            { label: 'Simulasyon', value: 'HyperLynx' },
            { label: 'Termal', value: 'FloTHERM' },
            { label: 'CAD', value: 'Altium/OrCAD' }
          ],
          link: '/services/engineering'
        },
        {
          id: 'testing',
          icon: Microscope,
          title: 'Test ve Kalite',
          subtitle: 'Kapsamlı Doğrulama',
          desc: 'ICT, FCT, çevresel testler ve kalite güvence hizmetleri. IPC Class 3 standardında üretim.',
          color: 'orange',
          features: [
            'In-Circuit Test (ICT)',
            'Fonksiyonel Test (FCT)',
            'X-Ray muayene',
            'Çevresel testler',
            'Güvenilirlik testleri',
            'Failure analysis'
          ],
          specs: [
            { label: 'ICT', value: 'Teradyne' },
            { label: 'X-Ray', value: 'Nikon CT' },
            { label: 'AOI', value: '3D Omron' },
            { label: 'Sertifikasyon', value: 'IPC Class 3' }
          ],
          link: '/services/testing'
        },
        {
          id: 'supply-chain',
          icon: Factory,
          title: 'Tedarik Zinciri',
          subtitle: 'Komponent Yönetimi',
          desc: 'Global tedarikçi ağı, stok yönetimi, alternatif parça önerisi ve anti-counterfeit kontrol.',
          color: 'yellow',
          features: [
            'Global tedarikçi ağı',
            'JIT stok yönetimi',
            'Alternatif parça bulma',
            'Anti-counterfeit kontrol',
            'EOL yönetimi',
            'Konsinyasyon programı'
          ],
          specs: [
            { label: 'Tedarikçi', value: '200+' },
            { label: 'Lead Time', value: '3-5 gün' },
            { label: 'Doğrulama', value: '100%' },
            { label: 'Kontrol', value: 'AS6081' }
          ],
          link: '/services/supply-chain'
        }
      ],
      process: {
        title: 'Çalışma Sürecimiz',
        steps: [
          { number: '01', title: 'Görüşme & Analiz', desc: 'Proje ihtiyaçlarınızı detaylı olarak anlıyoruz' },
          { number: '02', title: 'DFM & Teklif', desc: 'Ücretsiz DFM analizi ve rekabetçi fiyat teklifi' },
          { number: '03', title: 'Prototip', desc: '24-48 saat içinde hızlı prototip üretimi' },
          { number: '04', title: 'Seri Üretim', desc: 'Onay sonrası sorunsuz seri üretime geçiş' },
          { number: '05', title: 'Test & Teslimat', desc: '%100 test edilmiş ürünlerin zamanında teslimi' }
        ]
      },
      industries: {
        title: 'Hizmet Verdiğimiz Sektörler',
        items: [
          'Otomotiv & Ulaşım',
          'Tıbbi Cihazlar',
          'Endüstriyel Otomasyon',
          'Telekomünikasyon',
          'Tüketici Elektroniği',
          'Savunma & Havacılık',
          'Enerji & Güç Sistemleri',
          'IoT & Akıllı Sistemler'
        ]
      },
      cta: {
        title: 'Projenizi Değerlendirelim',
        subtitle: 'Ücretsiz DFM analizi ve rekabetçi teklif için dosyalarınızı yükleyin',
        button: 'Anında Teklif Al',
        buttonSecondary: 'Mühendisimizi Arayın'
      }
    },
    en: {
      hero: {
        badge: 'OUR SERVICES',
        title: 'End-to-End Electronics',
        titleHighlight: 'Solutions',
        subtitle: 'From design to production, PCB manufacturing to assembly - we cover all your electronics manufacturing needs with 25 years of experience.',
        stats: [
          { value: '500+', label: 'Completed Projects' },
          { value: '99.8%', label: 'Quality Rate' },
          { value: '24 Hours', label: 'Quick Prototype' },
          { value: '15+', label: 'Export Countries' }
        ]
      },
      services: [
        {
          id: 'pcb-manufacturing',
          icon: Layers,
          title: 'PCB Manufacturing',
          subtitle: 'High-Quality Printed Circuit Boards',
          desc: 'Single and multi-layer, rigid, flex and rigid-flex PCB production. HDI, impedance controlled and special material options.',
          color: 'blue',
          features: [
            '1-30 layer capacity',
            'HDI (microvia, laser drill)',
            'Impedance controlled design',
            'Flex and rigid-flex PCB',
            'Heavy copper (6oz+)',
            'ENIG, HASL, OSP surface finishes'
          ],
          specs: [
            { label: 'Min. Trace Width', value: '3 mil' },
            { label: 'Min. Via', value: '0.15mm' },
            { label: 'Max. Layer', value: '30' },
            { label: 'Prototype Time', value: '24 hours' }
          ],
          link: '/services/pcb-manufacturing'
        },
        {
          id: 'pcb-assembly',
          icon: Cpu,
          title: 'PCB Assembly (SMT/THT)',
          subtitle: 'Precision Component Placement',
          desc: 'High-speed SMT line, THT and mixed assembly. Component capacity from 01005 to BGA.',
          color: 'green',
          features: [
            '01005 & 0201 placement',
            'BGA, QFN, QFP assembly',
            'X-Ray & 3D AOI inspection',
            'Selective wave soldering',
            'Conformal coating',
            'ICT/FCT test integration'
          ],
          specs: [
            { label: 'Min. Component', value: '01005' },
            { label: 'Daily Capacity', value: '100K+' },
            { label: 'First Pass Yield', value: '99.8%' },
            { label: 'Quick Prototype', value: '48 hours' }
          ],
          link: '/services/pcb-assembly'
        },
        {
          id: 'box-build',
          icon: Box,
          title: 'Box Build',
          subtitle: 'Complete Product Integration',
          desc: 'Cable harness, mechanical assembly, integration and testing. Turnkey product solutions.',
          color: 'purple',
          features: [
            'Cable harness production',
            'Mechanical assembly',
            'Enclosure integration',
            'Functional test',
            'Labeling and packaging',
            'Custom packaging solutions'
          ],
          specs: [
            { label: 'Type', value: 'Full Turnkey' },
            { label: 'Test', value: '100%' },
            { label: 'Tracking', value: 'Lot based' },
            { label: 'Packaging', value: 'Custom' }
          ],
          link: '/services/box-build'
        },
        {
          id: 'engineering',
          icon: Settings,
          title: 'Engineering Services',
          subtitle: 'Design and Consulting',
          desc: 'DFM analysis, design optimization, reverse engineering and product development support.',
          color: 'cyan',
          features: [
            'DFM/DFA analysis',
            'Design optimization',
            'SI/PI simulation',
            'Thermal analysis',
            'BOM optimization',
            'Reverse engineering'
          ],
          specs: [
            { label: 'DFM Report', value: '2 hours' },
            { label: 'Simulation', value: 'HyperLynx' },
            { label: 'Thermal', value: 'FloTHERM' },
            { label: 'CAD', value: 'Altium/OrCAD' }
          ],
          link: '/services/engineering'
        },
        {
          id: 'testing',
          icon: Microscope,
          title: 'Test and Quality',
          subtitle: 'Comprehensive Verification',
          desc: 'ICT, FCT, environmental tests and quality assurance services. IPC Class 3 standard production.',
          color: 'orange',
          features: [
            'In-Circuit Test (ICT)',
            'Functional Test (FCT)',
            'X-Ray inspection',
            'Environmental tests',
            'Reliability tests',
            'Failure analysis'
          ],
          specs: [
            { label: 'ICT', value: 'Teradyne' },
            { label: 'X-Ray', value: 'Nikon CT' },
            { label: 'AOI', value: '3D Omron' },
            { label: 'Certification', value: 'IPC Class 3' }
          ],
          link: '/services/testing'
        },
        {
          id: 'supply-chain',
          icon: Factory,
          title: 'Supply Chain',
          subtitle: 'Component Management',
          desc: 'Global supplier network, inventory management, alternative part suggestions and anti-counterfeit control.',
          color: 'yellow',
          features: [
            'Global supplier network',
            'JIT inventory management',
            'Alternative part sourcing',
            'Anti-counterfeit control',
            'EOL management',
            'Consignment program'
          ],
          specs: [
            { label: 'Suppliers', value: '200+' },
            { label: 'Lead Time', value: '3-5 days' },
            { label: 'Verification', value: '100%' },
            { label: 'Control', value: 'AS6081' }
          ],
          link: '/services/supply-chain'
        }
      ],
      process: {
        title: 'Our Work Process',
        steps: [
          { number: '01', title: 'Meeting & Analysis', desc: 'We understand your project needs in detail' },
          { number: '02', title: 'DFM & Quote', desc: 'Free DFM analysis and competitive pricing' },
          { number: '03', title: 'Prototype', desc: 'Quick prototype production within 24-48 hours' },
          { number: '04', title: 'Mass Production', desc: 'Smooth transition to mass production after approval' },
          { number: '05', title: 'Test & Delivery', desc: 'On-time delivery of 100% tested products' }
        ]
      },
      industries: {
        title: 'Industries We Serve',
        items: [
          'Automotive & Transportation',
          'Medical Devices',
          'Industrial Automation',
          'Telecommunications',
          'Consumer Electronics',
          'Defense & Aerospace',
          'Energy & Power Systems',
          'IoT & Smart Systems'
        ]
      },
      cta: {
        title: "Let's Evaluate Your Project",
        subtitle: 'Upload your files for free DFM analysis and competitive quote',
        button: 'Get Instant Quote',
        buttonSecondary: 'Call Our Engineer'
      }
    }
  };

  const t = content[lang] || content.tr;

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-indigo-600',
    cyan: 'from-cyan-500 to-teal-500',
    orange: 'from-orange-500 to-amber-500',
    yellow: 'from-yellow-400 to-orange-500'
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.hero.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-2">
              {t.hero.title}
            </h1>
            <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
              {t.hero.titleHighlight}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {t.hero.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {t.services.map((service, idx) => {
              const IconComponent = service.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Content Side */}
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[service.color]} rounded-2xl flex items-center justify-center mb-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-[#0A0E27] mb-2">{service.title}</h2>
                    <p className="text-lg text-blue-600 font-medium mb-4">{service.subtitle}</p>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{service.desc}</p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild className={`bg-gradient-to-r ${colorClasses[service.color]} hover:opacity-90 text-white px-6 py-5 rounded-xl`}>
                      <Link to={`/${lang}${service.link}`}>
                        {lang === 'tr' ? 'Detaylı Bilgi' : 'Learn More'}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                  </div>

                  {/* Specs Card */}
                  <div className={!isEven ? 'lg:col-start-1' : ''}>
                    <div className={`bg-gradient-to-br ${colorClasses[service.color]} rounded-3xl p-8 lg:p-10 text-white`}>
                      <h3 className="text-2xl font-bold mb-6">
                        {lang === 'tr' ? 'Teknik Özellikler' : 'Technical Specs'}
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        {service.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-white/70 text-sm mb-1">{spec.label}</div>
                            <div className="text-2xl font-bold">{spec.value}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/20">
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="w-10 h-10 bg-white/20 rounded-full border-2 border-white/50 flex items-center justify-center text-sm font-bold">
                                {i === 1 ? 'A' : i === 2 ? 'B' : 'C'}
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="font-semibold">200+ {lang === 'tr' ? 'Mutlu Müşteri' : 'Happy Customers'}</div>
                            <div className="text-white/70 text-sm flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              4.9/5 {lang === 'tr' ? 'Ortalama Puan' : 'Average Rating'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.process.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {t.process.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-5xl font-bold text-blue-100 mb-4">{step.number}</div>
                  <h3 className="text-lg font-bold text-[#0A0E27] mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
                {idx < t.process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t.industries.title}</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.industries.items.map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-white font-medium">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t.cta.title}</h2>
            <p className="text-xl text-white/90 mb-8">{t.cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg">
                <Link to={`/${lang}/instant-quote`}>
                  <Zap className="mr-2 w-5 h-5" />
                  {t.cta.button}
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                <Link to={`/${lang}/contact`}>
                  {t.cta.buttonSecondary}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
