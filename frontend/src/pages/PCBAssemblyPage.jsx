import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, Eye, CheckCircle2, Zap, Shield, Clock, Award,
  ArrowRight, Play, Settings, Layers, Box, Factory,
  Thermometer, Microscope, Radio, Gauge, ChevronRight,
  Package, Truck, FileCheck, Users, Star, TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const PCBAssemblyPage = ({ lang }) => {
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeServiceModel, setActiveServiceModel] = useState('turnkey');

  const content = {
    tr: {
      hero: {
        badge: 'SMT & THT UZMANLIĞI',
        title: 'Hassas PCB Dizgi',
        titleHighlight: 'Hizmetleri',
        subtitle: 'Mikron düzeyinde hassasiyet, %99.8 ilk geçiş verimi. 01005\'den BGA\'ya her komponent türünde uzman ekip ve son teknoloji ekipman parkı.',
        stats: [
          { value: '50M+', label: 'Yıllık Placement' },
          { value: '99.8%', label: 'İlk Geçiş Verimi' },
          { value: '01005', label: 'Min. Komponent' },
          { value: '24 Saat', label: 'Hızlı Prototip' }
        ],
        cta: 'Ücretsiz DFM Analizi Al',
        ctaSecondary: 'Tesis Turu İzle'
      },
      capabilities: {
        title: 'Dizgi Yeteneklerimiz',
        subtitle: 'Her karmaşıklık seviyesinde mükemmel sonuç',
        items: [
          {
            icon: Cpu,
            title: '01005 & 0201 Dizgi',
            desc: 'Mikro boyutlu pasif komponentler için özel makineler ve optik doğrulama',
            specs: ['01005 (0.4x0.2mm)', '0201 (0.6x0.3mm)', '±25μm hassasiyet']
          },
          {
            icon: Layers,
            title: 'BGA & μBGA',
            desc: 'Ball Grid Array komponentler için X-ray kontrol ve özel reflow profilleri',
            specs: ['0.3mm pitch', '2000+ ball', 'X-ray inspection']
          },
          {
            icon: Box,
            title: 'QFN & DFN',
            desc: 'Pad-less paketler için özel stencil tasarımı ve ıslanma kontrolü',
            specs: ['0.4mm pitch', 'Exposed pad', 'Void kontrolü']
          },
          {
            icon: Settings,
            title: 'Çift Taraflı SMT',
            desc: 'Her iki yüzde eş zamanlı yerleştirme ve reflow optimizasyonu',
            specs: ['Top & Bottom', 'Selective wave', 'THT kombinasyon']
          },
          {
            icon: Shield,
            title: 'Conformal Coating',
            desc: 'Nem, toz ve kimyasal koruma için seçmeli kaplama',
            specs: ['Akrilik', 'Silikon', 'Poliüretan']
          },
          {
            icon: Thermometer,
            title: 'Lead-Free & Leaded',
            desc: 'RoHS uyumlu kurşunsuz ve özel uygulamalar için kurşunlu proses',
            specs: ['SAC305', 'Sn63/Pb37', 'Profil optimize']
          }
        ]
      },
      process: {
        title: 'Üretim Sürecimiz',
        subtitle: '8 adımda kaliteli üretim',
        steps: [
          {
            number: '01',
            title: 'DFM Analizi',
            desc: 'Gerber ve BOM dosyalarınız AI destekli sistemimizle analiz edilir. Potansiyel sorunlar tespit edilir.',
            duration: '2 Saat',
            icon: FileCheck
          },
          {
            number: '02',
            title: 'Stencil Hazırlık',
            desc: 'Lazer kesim stencil üretimi. Nano-coating ile lehim pastası bırakma performansı optimize edilir.',
            duration: '4 Saat',
            icon: Layers
          },
          {
            number: '03',
            title: 'Serigrafi',
            desc: 'Otomatik lehim pastası baskı. SPI (Solder Paste Inspection) ile %100 kontrol.',
            duration: '30 dk/panel',
            icon: Factory
          },
          {
            number: '04',
            title: 'SMT Yerleştirme',
            desc: 'Yüksek hızlı pick & place makineleri ile mikron hassasiyetinde komponent yerleştirme.',
            duration: '45 dk/panel',
            icon: Cpu
          },
          {
            number: '05',
            title: 'Reflow',
            desc: '10 zonlu konveksiyon fırın. Ürüne özel profil optimizasyonu ve azot atmosfer seçeneği.',
            duration: '8 dk/panel',
            icon: Thermometer
          },
          {
            number: '06',
            title: 'AOI Kontrol',
            desc: '3D AOI ile her komponentin pozisyon, polarite ve lehim kalitesi kontrolü.',
            duration: '2 dk/panel',
            icon: Eye
          },
          {
            number: '07',
            title: 'X-Ray İnceleme',
            desc: 'BGA, QFN gibi gizli bağlantılı komponentler için X-ray muayene.',
            duration: 'Gerektiğinde',
            icon: Microscope
          },
          {
            number: '08',
            title: 'ICT/FCT Test',
            desc: 'In-Circuit Test ve Fonksiyonel Test ile elektriksel doğrulama.',
            duration: '1 dk/kart',
            icon: Radio
          }
        ]
      },
      equipment: {
        title: 'Ekipman Parkımız',
        subtitle: 'Dünya lideri markalarla donatılmış üretim hattı',
        items: [
          { name: 'Fuji NXT III', category: 'Pick & Place', spec: '40,000 CPH' },
          { name: 'Koh Young 3D SPI', category: 'Pasta İnceleme', spec: '100% kontrol' },
          { name: 'Omron VT-S730', category: '3D AOI', spec: '0201 capable' },
          { name: 'Nikon XT V 160', category: 'X-Ray', spec: 'CT tarama' },
          { name: 'Heller 1913', category: 'Reflow Fırın', spec: '10 zon, N2' },
          { name: 'DEK Horizon', category: 'Stencil Printer', spec: '±12.5μm' }
        ]
      },
      serviceModels: {
        title: 'Hizmet Modelleri',
        subtitle: 'Projenize uygun esnek çözümler',
        models: {
          turnkey: {
            title: 'Turnkey',
            subtitle: 'Anahtar Teslim Çözüm',
            desc: 'Komponent tedarikinden teste kadar tüm süreci biz yönetiyoruz.',
            benefits: [
              'Tek noktadan yönetim',
              'Tedarik zinciri optimizasyonu',
              'Stok riski yok',
              'Hızlı termin'
            ],
            recommended: true
          },
          consigned: {
            title: 'Consigned',
            subtitle: 'Müşteri Malzemesi',
            desc: 'Sizin tedarik ettiğiniz komponentlerle üretim yapıyoruz.',
            benefits: [
              'Maliyet kontrolü sizde',
              'Özel tedarikçi kullanımı',
              'Kit kontrolü dahil',
              'Esnek planlama'
            ],
            recommended: false
          },
          partial: {
            title: 'Partial Turnkey',
            subtitle: 'Kısmi Anahtar Teslim',
            desc: 'Kritik komponentleri siz, gerisini biz tedarik ediyoruz.',
            benefits: [
              'Hibrit yaklaşım',
              'Kritik parça kontrolü',
              'Optimize maliyet',
              'Risk paylaşımı'
            ],
            recommended: false
          }
        }
      },
      quality: {
        title: 'Kalite Güvencesi',
        subtitle: 'Sıfır hata hedefli üretim',
        metrics: [
          { label: 'İlk Geçiş Verimi', value: '99.8%', icon: TrendingUp },
          { label: 'Zamanında Teslimat', value: '98.5%', icon: Clock },
          { label: 'Müşteri Memnuniyeti', value: '4.9/5', icon: Star },
          { label: 'Aktif Müşteri', value: '200+', icon: Users }
        ],
        certifications: ['ISO 9001:2015', 'IPC-A-610 Class 3', 'RoHS', 'REACH', 'UL Listed', 'IATF 16949']
      },
      cta: {
        title: 'Projenizi Konuşalım',
        subtitle: 'Ücretsiz DFM analizi ve rekabetçi teklif için dosyalarınızı yükleyin',
        button: 'BOM & Gerber Yükle',
        buttonSecondary: 'Mühendisimizi Arayın'
      }
    },
    en: {
      hero: {
        badge: 'SMT & THT EXPERTISE',
        title: 'Precision PCB Assembly',
        titleHighlight: 'Services',
        subtitle: 'Micron-level precision, 99.8% first-pass yield. Expert team and state-of-the-art equipment for every component type from 01005 to BGA.',
        stats: [
          { value: '50M+', label: 'Annual Placements' },
          { value: '99.8%', label: 'First Pass Yield' },
          { value: '01005', label: 'Min. Component' },
          { value: '24 Hours', label: 'Quick Prototype' }
        ],
        cta: 'Get Free DFM Analysis',
        ctaSecondary: 'Watch Facility Tour'
      },
      capabilities: {
        title: 'Assembly Capabilities',
        subtitle: 'Perfect results at every complexity level',
        items: [
          {
            icon: Cpu,
            title: '01005 & 0201 Assembly',
            desc: 'Specialized machines and optical verification for micro-sized passive components',
            specs: ['01005 (0.4x0.2mm)', '0201 (0.6x0.3mm)', '±25μm accuracy']
          },
          {
            icon: Layers,
            title: 'BGA & μBGA',
            desc: 'X-ray inspection and custom reflow profiles for Ball Grid Array components',
            specs: ['0.3mm pitch', '2000+ balls', 'X-ray inspection']
          },
          {
            icon: Box,
            title: 'QFN & DFN',
            desc: 'Custom stencil design and wetting control for pad-less packages',
            specs: ['0.4mm pitch', 'Exposed pad', 'Void inspection']
          },
          {
            icon: Settings,
            title: 'Double-Sided SMT',
            desc: 'Simultaneous placement on both sides with reflow optimization',
            specs: ['Top & Bottom', 'Selective wave', 'THT combo']
          },
          {
            icon: Shield,
            title: 'Conformal Coating',
            desc: 'Selective coating for moisture, dust and chemical protection',
            specs: ['Acrylic', 'Silicone', 'Polyurethane']
          },
          {
            icon: Thermometer,
            title: 'Lead-Free & Leaded',
            desc: 'RoHS compliant lead-free and leaded process for special applications',
            specs: ['SAC305', 'Sn63/Pb37', 'Profile optimize']
          }
        ]
      },
      process: {
        title: 'Our Production Process',
        subtitle: 'Quality production in 8 steps',
        steps: [
          {
            number: '01',
            title: 'DFM Analysis',
            desc: 'Your Gerber and BOM files are analyzed with our AI-powered system. Potential issues are identified.',
            duration: '2 Hours',
            icon: FileCheck
          },
          {
            number: '02',
            title: 'Stencil Preparation',
            desc: 'Laser-cut stencil production. Nano-coating optimizes solder paste release performance.',
            duration: '4 Hours',
            icon: Layers
          },
          {
            number: '03',
            title: 'Screen Printing',
            desc: 'Automatic solder paste printing. 100% control with SPI (Solder Paste Inspection).',
            duration: '30 min/panel',
            icon: Factory
          },
          {
            number: '04',
            title: 'SMT Placement',
            desc: 'Component placement with micron precision using high-speed pick & place machines.',
            duration: '45 min/panel',
            icon: Cpu
          },
          {
            number: '05',
            title: 'Reflow',
            desc: '10-zone convection oven. Product-specific profile optimization and nitrogen atmosphere option.',
            duration: '8 min/panel',
            icon: Thermometer
          },
          {
            number: '06',
            title: 'AOI Inspection',
            desc: '3D AOI checks position, polarity and solder quality of every component.',
            duration: '2 min/panel',
            icon: Eye
          },
          {
            number: '07',
            title: 'X-Ray Inspection',
            desc: 'X-ray examination for hidden connection components like BGA, QFN.',
            duration: 'As needed',
            icon: Microscope
          },
          {
            number: '08',
            title: 'ICT/FCT Test',
            desc: 'Electrical verification with In-Circuit Test and Functional Test.',
            duration: '1 min/board',
            icon: Radio
          }
        ]
      },
      equipment: {
        title: 'Our Equipment',
        subtitle: 'Production line equipped with world-leading brands',
        items: [
          { name: 'Fuji NXT III', category: 'Pick & Place', spec: '40,000 CPH' },
          { name: 'Koh Young 3D SPI', category: 'Paste Inspection', spec: '100% inspection' },
          { name: 'Omron VT-S730', category: '3D AOI', spec: '0201 capable' },
          { name: 'Nikon XT V 160', category: 'X-Ray', spec: 'CT scanning' },
          { name: 'Heller 1913', category: 'Reflow Oven', spec: '10 zone, N2' },
          { name: 'DEK Horizon', category: 'Stencil Printer', spec: '±12.5μm' }
        ]
      },
      serviceModels: {
        title: 'Service Models',
        subtitle: 'Flexible solutions for your project',
        models: {
          turnkey: {
            title: 'Turnkey',
            subtitle: 'Complete Solution',
            desc: 'We manage the entire process from component procurement to testing.',
            benefits: [
              'Single point management',
              'Supply chain optimization',
              'No inventory risk',
              'Fast lead time'
            ],
            recommended: true
          },
          consigned: {
            title: 'Consigned',
            subtitle: 'Customer Materials',
            desc: 'We produce with components you provide.',
            benefits: [
              'Cost control with you',
              'Use your suppliers',
              'Kit inspection included',
              'Flexible planning'
            ],
            recommended: false
          },
          partial: {
            title: 'Partial Turnkey',
            subtitle: 'Hybrid Solution',
            desc: 'You provide critical components, we procure the rest.',
            benefits: [
              'Hybrid approach',
              'Critical part control',
              'Optimized cost',
              'Risk sharing'
            ],
            recommended: false
          }
        }
      },
      quality: {
        title: 'Quality Assurance',
        subtitle: 'Zero defect targeted production',
        metrics: [
          { label: 'First Pass Yield', value: '99.8%', icon: TrendingUp },
          { label: 'On-Time Delivery', value: '98.5%', icon: Clock },
          { label: 'Customer Satisfaction', value: '4.9/5', icon: Star },
          { label: 'Active Customers', value: '200+', icon: Users }
        ],
        certifications: ['ISO 9001:2015', 'IPC-A-610 Class 3', 'RoHS', 'REACH', 'UL Listed', 'IATF 16949']
      },
      cta: {
        title: "Let's Discuss Your Project",
        subtitle: 'Upload your files for free DFM analysis and competitive quote',
        button: 'Upload BOM & Gerber',
        buttonSecondary: 'Call Our Engineer'
      }
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        {/* Animated Background */}
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6">
                <Cpu className="w-4 h-4 mr-2" />
                {t.hero.badge}
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-2">
                {t.hero.title}
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
                {t.hero.titleHighlight}
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/25">
                  <Link to={`/${lang}/instant-quote`}>
                    {t.hero.cta}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-6 text-lg rounded-xl">
                  <Play className="mr-2 w-5 h-5" />
                  {t.hero.ctaSecondary}
                </Button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {t.hero.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.capabilities.title}</h2>
            <p className="text-xl text-gray-600">{t.capabilities.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.capabilities.items.map((cap, idx) => {
              const IconComponent = cap.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0E27] mb-3">{cap.title}</h3>
                  <p className="text-gray-600 mb-4">{cap.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cap.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.process.title}</h2>
            <p className="text-xl text-gray-600">{t.process.subtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Process Steps List */}
            <div className="space-y-4">
              {t.process.steps.map((step, idx) => {
                const IconComponent = step.icon;
                const isActive = activeProcess === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveProcess(idx)}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                          : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-lg font-bold ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                            <span className="text-blue-500 mr-2">{step.number}</span>
                            {step.title}
                          </h3>
                          <span className={`text-sm ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                            {step.duration}
                          </span>
                        </div>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-gray-600 mt-2"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90 text-blue-500' : 'text-gray-400'}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Active Process Detail */}
            <motion.div
              key={activeProcess}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 lg:p-12 text-white sticky top-8"
            >
              <div className="mb-8">
                <span className="text-6xl font-bold text-blue-400/30">{t.process.steps[activeProcess].number}</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">{t.process.steps[activeProcess].title}</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">{t.process.steps[activeProcess].desc}</p>
              <div className="flex items-center gap-2 text-blue-400">
                <Clock className="w-5 h-5" />
                <span>{t.process.steps[activeProcess].duration}</span>
              </div>

              {/* Progress indicator */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{lang === 'tr' ? 'İlerleme' : 'Progress'}</span>
                  <span>{Math.round(((activeProcess + 1) / t.process.steps.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeProcess + 1) / t.process.steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.equipment.title}</h2>
            <p className="text-xl text-gray-600">{t.equipment.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.equipment.items.map((eq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {eq.category}
                  </span>
                  <Gauge className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0E27] mb-2">{eq.name}</h3>
                <p className="text-gray-600">{eq.spec}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Models Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.serviceModels.title}</h2>
            <p className="text-xl text-gray-600">{t.serviceModels.subtitle}</p>
          </motion.div>

          {/* Model Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {Object.keys(t.serviceModels.models).map((key) => (
              <button
                key={key}
                onClick={() => setActiveServiceModel(key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeServiceModel === key
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.serviceModels.models[key].title}
              </button>
            ))}
          </div>

          {/* Active Model Detail */}
          <motion.div
            key={activeServiceModel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className={`relative rounded-3xl p-8 lg:p-12 ${
              t.serviceModels.models[activeServiceModel].recommended
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                : 'bg-gray-100'
            }`}>
              {t.serviceModels.models[activeServiceModel].recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 font-semibold rounded-full text-sm">
                  {lang === 'tr' ? 'ÖNERİLEN' : 'RECOMMENDED'}
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className={`text-3xl font-bold mb-2 ${
                  t.serviceModels.models[activeServiceModel].recommended ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.serviceModels.models[activeServiceModel].subtitle}
                </h3>
                <p className={`text-lg ${
                  t.serviceModels.models[activeServiceModel].recommended ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {t.serviceModels.models[activeServiceModel].desc}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {t.serviceModels.models[activeServiceModel].benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${
                      t.serviceModels.models[activeServiceModel].recommended ? 'text-white' : 'text-green-500'
                    }`} />
                    <span className={t.serviceModels.models[activeServiceModel].recommended ? 'text-white' : 'text-gray-700'}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t.quality.title}</h2>
            <p className="text-xl text-gray-300">{t.quality.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {t.quality.metrics.map((metric, idx) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
                >
                  <IconComponent className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-gray-400">{metric.label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {t.quality.certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full"
              >
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.cta.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{t.cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/25">
                <Link to={`/${lang}/instant-quote`}>
                  <Package className="mr-2 w-5 h-5" />
                  {t.cta.button}
                </Link>
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl">
                <Truck className="mr-2 w-5 h-5" />
                {t.cta.buttonSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PCBAssemblyPage;
