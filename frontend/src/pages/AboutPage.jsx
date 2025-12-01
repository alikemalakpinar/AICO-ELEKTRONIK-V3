import React from 'react';
import { motion } from 'framer-motion';
import {
  Award, Users, Target, TrendingUp, CheckCircle2, Calendar,
  Globe, Lightbulb, Heart, Shield, Rocket, Building,
  MapPin, Phone, Mail, ArrowRight, Play, Star, Zap,
  Factory, Cpu, Sparkles, Eye
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = ({ lang }) => {
  const content = {
    tr: {
      hero: {
        badge: 'HAKKIMIZDA',
        title: 'Geleceğin Elektronik',
        titleHighlight: 'Teknolojisini Şekillendiriyoruz',
        subtitle: '25 yılı aşkın deneyim, 500+ başarılı proje ve 50.000m² üretim alanıyla Türkiye\'nin öncü endüstriyel elektronik çözümleri sağlayıcısı.',
        stats: [
          { value: '1999', label: 'Kuruluş Yılı', icon: Calendar },
          { value: '500+', label: 'Başarılı Proje', icon: Rocket },
          { value: '50K m²', label: 'Üretim Alanı', icon: Factory },
          { value: '150+', label: 'Uzman Kadro', icon: Users }
        ],
        cta: 'Hikayemizi Keşfedin',
        ctaSecondary: 'Tesis Turu İzle'
      },
      story: {
        title: 'Hikayemiz',
        subtitle: 'Küçük bir atölyeden global oyuncuya',
        paragraphs: [
          'AICO Elektronik, 1999 yılında Ankara\'da küçük bir güç elektroniği atölyesi olarak kuruldu. Kurucumuz Mühendis Ahmet Yıldırım\'ın vizyonu, endüstriyel uygulamalar için güvenilir ve yenilikçi elektronik çözümler üretmekti.',
          'İlk yıllarımızda yerel sanayinin ihtiyaçlarına odaklanırken, 2005 yılında Avrupa pazarına açıldık. Bu süreçte ISO 9001 kalite yönetim sistemini benimseyerek, süreçlerimizi uluslararası standartlara taşıdık.',
          'Bugün, 50.000m² modern üretim tesisi, 150+ uzman mühendis ve teknisyen kadrosu ve 500+ başarılı projeyle sektörün öncülerinden biriyiz. Endüstriyel IoT, akıllı tarım, madencilik güvenliği ve enerji yönetimi alanlarında sunduğumuz çözümlerle müşterilerimizin dijital dönüşüm yolculuğuna eşlik ediyoruz.'
        ]
      },
      visionMission: {
        vision: {
          title: 'Vizyon',
          icon: Eye,
          text: 'Kritik endüstriyel uygulamalarda güvenilir teknoloji ortağı olarak global ölçekte tanınan, inovasyon lideri bir şirket olmak.',
          points: [
            'Global marka bilinirliği',
            'Sürdürülebilir büyüme',
            'Teknoloji liderliği'
          ]
        },
        mission: {
          title: 'Misyon',
          icon: Target,
          text: 'Enerjiyi verimli yöneten, çevre dostu ve güvenilir elektronik sistemler geliştirerek müşterilerimize ve topluma değer katmak.',
          points: [
            'Müşteri odaklı çözümler',
            'Çevre bilinci',
            'Toplumsal katkı'
          ]
        }
      },
      values: {
        title: 'Değerlerimiz',
        subtitle: 'Bizi biz yapan ilkeler',
        items: [
          {
            icon: Award,
            title: 'Kalite Tutkusu',
            desc: 'Her üründe mükemmellik standardı. ISO 9001, IPC-A-610 Class 3 sertifikasyonlarıyla kanıtlanmış kalite.',
            color: 'blue'
          },
          {
            icon: Lightbulb,
            title: 'Sürekli İnovasyon',
            desc: 'Ar-Ge\'ye yıllık ciromuzun %8\'ini ayırıyoruz. Yeni teknolojileri takip ediyor, uygulamaya geçiriyoruz.',
            color: 'yellow'
          },
          {
            icon: Heart,
            title: 'Müşteri Odaklılık',
            desc: 'Müşterilerimizin ihtiyaçları her zaman önceliğimiz. 7/24 teknik destek ve proaktif iletişim.',
            color: 'red'
          },
          {
            icon: Shield,
            title: 'Güvenilirlik',
            desc: '25 yıllık deneyim ve %99.5 zamanında teslimat oranı. Verilen sözler mutlaka tutulur.',
            color: 'green'
          },
          {
            icon: Globe,
            title: 'Sürdürülebilirlik',
            desc: 'Çevre dostu üretim süreçleri, RoHS uyumlu ürünler ve karbon ayak izi azaltma hedefleri.',
            color: 'cyan'
          },
          {
            icon: Users,
            title: 'Takım Ruhu',
            desc: 'Birlikte başarıyoruz. Çeşitlilik ve kapsayıcılığa değer veren, gelişime açık çalışma ortamı.',
            color: 'purple'
          }
        ]
      },
      timeline: {
        title: 'Tarihçemiz',
        subtitle: '25 yılda kat ettiğimiz yol',
        events: [
          {
            year: '1999',
            title: 'Kuruluş',
            desc: 'Ankara\'da 200m² atölyede güç elektroniği üretimine başladık. 5 kişilik ekiple ilk adımı attık.',
            milestone: true
          },
          {
            year: '2003',
            title: 'İlk Büyük Proje',
            desc: 'Ulusal bir enerji şirketi için 10.000 adet LED sürücü ürettik. İlk seri üretim deneyimimiz.',
            milestone: false
          },
          {
            year: '2005',
            title: 'Avrupa\'ya Açılış',
            desc: 'Almanya ve İtalya\'ya ilk ihracatlar. Uluslararası kalite standartlarına geçiş.',
            milestone: true
          },
          {
            year: '2010',
            title: 'Yeni Tesis',
            desc: '5.000m² modern üretim tesisine taşındık. SMT hatları ve AOI sistemleri kuruldu.',
            milestone: false
          },
          {
            year: '2012',
            title: 'ISO 9001 Sertifikası',
            desc: 'Kalite yönetim sistemimizi TÜV tarafından sertifikalandırdık.',
            milestone: true
          },
          {
            year: '2016',
            title: 'IoT Dönüşümü',
            desc: 'Endüstriyel IoT çözümlerine odaklandık. Akıllı tarım ve madencilik projeleri başladı.',
            milestone: false
          },
          {
            year: '2018',
            title: 'Mega Tesis',
            desc: '50.000m² entegre üretim tesisi açıldı. Kapasitemiz 10 kat arttı.',
            milestone: true
          },
          {
            year: '2021',
            title: 'Ar-Ge Merkezi',
            desc: 'T.C. Sanayi Bakanlığı onaylı Ar-Ge Merkezi statüsü kazandık.',
            milestone: true
          },
          {
            year: '2024',
            title: 'AI Entegrasyonu',
            desc: 'Yapay zeka destekli üretim süreçleri ve akıllı kalite kontrol sistemleri devreye alındı.',
            milestone: true
          }
        ]
      },
      certifications: {
        title: 'Sertifikalar ve Akreditasyonlar',
        subtitle: 'Uluslararası standartlarda kalite güvencesi',
        items: [
          { name: 'ISO 9001:2015', desc: 'Kalite Yönetim Sistemi', authority: 'TÜV Rheinland' },
          { name: 'ISO 14001:2015', desc: 'Çevre Yönetim Sistemi', authority: 'TÜV Rheinland' },
          { name: 'IATF 16949', desc: 'Otomotiv Kalite Standardı', authority: 'TÜV SÜD' },
          { name: 'IPC-A-610 Class 3', desc: 'Elektronik Montaj Standardı', authority: 'IPC' },
          { name: 'CE Marking', desc: 'Avrupa Uygunluk', authority: 'EU' },
          { name: 'UL Listed', desc: 'Güvenlik Sertifikası', authority: 'Underwriters Laboratories' },
          { name: 'RoHS', desc: 'Zararlı Madde Kısıtlaması', authority: 'EU Directive' },
          { name: 'REACH', desc: 'Kimyasal Güvenlik', authority: 'EU Regulation' }
        ]
      },
      facilities: {
        title: 'Tesislerimiz',
        subtitle: 'Dünya standartlarında üretim kapasitesi',
        items: [
          {
            title: 'SMT Üretim Hattı',
            desc: '3 adet yüksek hızlı SMT hattı, günlük 100.000+ komponent yerleştirme kapasitesi',
            icon: Cpu
          },
          {
            title: 'THT ve Montaj',
            desc: 'Seçmeli dalga lehimleme, manuel montaj ve kablo harness üretimi',
            icon: Factory
          },
          {
            title: 'Test ve Kalite',
            desc: 'AOI, X-Ray, ICT, FCT ve çevresel test laboratuvarı',
            icon: Eye
          },
          {
            title: 'Ar-Ge Merkezi',
            desc: '30+ mühendisten oluşan Ar-Ge ekibi, prototip ve simülasyon laboratuvarı',
            icon: Lightbulb
          }
        ]
      },
      team: {
        title: 'Yönetim Ekibimiz',
        subtitle: 'Deneyimli liderler, vizyoner yaklaşım',
        members: [
          {
            name: 'Ahmet Yıldırım',
            role: 'Kurucu & CEO',
            bio: '30+ yıl elektronik sektörü deneyimi. ODTÜ Elektrik-Elektronik Mühendisliği.',
            image: null
          },
          {
            name: 'Elif Kaya',
            role: 'COO',
            bio: 'Operasyonlar ve tedarik zinciri uzmanı. 15 yıl üretim yönetimi deneyimi.',
            image: null
          },
          {
            name: 'Mehmet Demir',
            role: 'CTO',
            bio: 'Ar-Ge ve inovasyon lideri. IoT ve yapay zeka çözümleri mimarı.',
            image: null
          },
          {
            name: 'Zeynep Arslan',
            role: 'CFO',
            bio: 'Finans ve strateji uzmanı. Uluslararası büyüme stratejileri.',
            image: null
          }
        ]
      },
      cta: {
        title: 'Projenizi Birlikte Hayata Geçirelim',
        subtitle: 'Elektronik üretim ihtiyaçlarınız için uzman ekibimizle görüşün',
        button: 'İletişime Geçin',
        buttonSecondary: 'Tesis Turu Talep Et'
      }
    },
    en: {
      hero: {
        badge: 'ABOUT US',
        title: 'Shaping the Future of',
        titleHighlight: 'Electronics Technology',
        subtitle: 'With over 25 years of experience, 500+ successful projects and 50,000m² production area, we are Turkey\'s leading industrial electronics solutions provider.',
        stats: [
          { value: '1999', label: 'Founded', icon: Calendar },
          { value: '500+', label: 'Successful Projects', icon: Rocket },
          { value: '50K m²', label: 'Production Area', icon: Factory },
          { value: '150+', label: 'Expert Staff', icon: Users }
        ],
        cta: 'Discover Our Story',
        ctaSecondary: 'Watch Facility Tour'
      },
      story: {
        title: 'Our Story',
        subtitle: 'From a small workshop to a global player',
        paragraphs: [
          'AICO Electronics was founded in 1999 in Ankara as a small power electronics workshop. Our founder Engineer Ahmet Yildirim\'s vision was to produce reliable and innovative electronic solutions for industrial applications.',
          'While focusing on local industry needs in our early years, we expanded to the European market in 2005. During this process, we adopted the ISO 9001 quality management system, bringing our processes to international standards.',
          'Today, with our 50,000m² modern production facility, 150+ expert engineers and technicians, and 500+ successful projects, we are one of the industry leaders. We accompany our customers on their digital transformation journey with our solutions in industrial IoT, smart agriculture, mining safety, and energy management.'
        ]
      },
      visionMission: {
        vision: {
          title: 'Vision',
          icon: Eye,
          text: 'To be a globally recognized innovation leader as a trusted technology partner in critical industrial applications.',
          points: [
            'Global brand recognition',
            'Sustainable growth',
            'Technology leadership'
          ]
        },
        mission: {
          title: 'Mission',
          icon: Target,
          text: 'To add value to our customers and society by developing energy-efficient, environmentally friendly, and reliable electronic systems.',
          points: [
            'Customer-focused solutions',
            'Environmental consciousness',
            'Social contribution'
          ]
        }
      },
      values: {
        title: 'Our Values',
        subtitle: 'The principles that define us',
        items: [
          {
            icon: Award,
            title: 'Quality Passion',
            desc: 'Excellence standard in every product. Quality proven by ISO 9001, IPC-A-610 Class 3 certifications.',
            color: 'blue'
          },
          {
            icon: Lightbulb,
            title: 'Continuous Innovation',
            desc: 'We allocate 8% of our annual revenue to R&D. We follow and implement new technologies.',
            color: 'yellow'
          },
          {
            icon: Heart,
            title: 'Customer Focus',
            desc: 'Our customers\' needs are always our priority. 24/7 technical support and proactive communication.',
            color: 'red'
          },
          {
            icon: Shield,
            title: 'Reliability',
            desc: '25 years of experience and 99.5% on-time delivery rate. Promises are always kept.',
            color: 'green'
          },
          {
            icon: Globe,
            title: 'Sustainability',
            desc: 'Eco-friendly production processes, RoHS compliant products, and carbon footprint reduction targets.',
            color: 'cyan'
          },
          {
            icon: Users,
            title: 'Team Spirit',
            desc: 'We succeed together. A work environment that values diversity, inclusion, and growth.',
            color: 'purple'
          }
        ]
      },
      timeline: {
        title: 'Our History',
        subtitle: 'The journey of 25 years',
        events: [
          {
            year: '1999',
            title: 'Foundation',
            desc: 'Started power electronics production in a 200m² workshop in Ankara. First step with a team of 5.',
            milestone: true
          },
          {
            year: '2003',
            title: 'First Major Project',
            desc: 'Produced 10,000 LED drivers for a national energy company. Our first mass production experience.',
            milestone: false
          },
          {
            year: '2005',
            title: 'European Expansion',
            desc: 'First exports to Germany and Italy. Transition to international quality standards.',
            milestone: true
          },
          {
            year: '2010',
            title: 'New Facility',
            desc: 'Moved to 5,000m² modern production facility. SMT lines and AOI systems installed.',
            milestone: false
          },
          {
            year: '2012',
            title: 'ISO 9001 Certification',
            desc: 'Quality management system certified by TÜV.',
            milestone: true
          },
          {
            year: '2016',
            title: 'IoT Transformation',
            desc: 'Focused on industrial IoT solutions. Smart agriculture and mining projects started.',
            milestone: false
          },
          {
            year: '2018',
            title: 'Mega Facility',
            desc: '50,000m² integrated production facility opened. Our capacity increased 10x.',
            milestone: true
          },
          {
            year: '2021',
            title: 'R&D Center',
            desc: 'Gained R&D Center status approved by T.R. Ministry of Industry.',
            milestone: true
          },
          {
            year: '2024',
            title: 'AI Integration',
            desc: 'AI-powered production processes and smart quality control systems deployed.',
            milestone: true
          }
        ]
      },
      certifications: {
        title: 'Certifications and Accreditations',
        subtitle: 'Quality assurance at international standards',
        items: [
          { name: 'ISO 9001:2015', desc: 'Quality Management System', authority: 'TÜV Rheinland' },
          { name: 'ISO 14001:2015', desc: 'Environmental Management System', authority: 'TÜV Rheinland' },
          { name: 'IATF 16949', desc: 'Automotive Quality Standard', authority: 'TÜV SÜD' },
          { name: 'IPC-A-610 Class 3', desc: 'Electronics Assembly Standard', authority: 'IPC' },
          { name: 'CE Marking', desc: 'European Conformity', authority: 'EU' },
          { name: 'UL Listed', desc: 'Safety Certification', authority: 'Underwriters Laboratories' },
          { name: 'RoHS', desc: 'Hazardous Substances Restriction', authority: 'EU Directive' },
          { name: 'REACH', desc: 'Chemical Safety', authority: 'EU Regulation' }
        ]
      },
      facilities: {
        title: 'Our Facilities',
        subtitle: 'World-class production capacity',
        items: [
          {
            title: 'SMT Production Line',
            desc: '3 high-speed SMT lines, 100,000+ component placement capacity per day',
            icon: Cpu
          },
          {
            title: 'THT and Assembly',
            desc: 'Selective wave soldering, manual assembly, and cable harness production',
            icon: Factory
          },
          {
            title: 'Test and Quality',
            desc: 'AOI, X-Ray, ICT, FCT, and environmental test laboratory',
            icon: Eye
          },
          {
            title: 'R&D Center',
            desc: 'R&D team of 30+ engineers, prototype and simulation laboratory',
            icon: Lightbulb
          }
        ]
      },
      team: {
        title: 'Our Leadership Team',
        subtitle: 'Experienced leaders, visionary approach',
        members: [
          {
            name: 'Ahmet Yildirim',
            role: 'Founder & CEO',
            bio: '30+ years electronics industry experience. METU Electrical-Electronics Engineering.',
            image: null
          },
          {
            name: 'Elif Kaya',
            role: 'COO',
            bio: 'Operations and supply chain expert. 15 years of production management experience.',
            image: null
          },
          {
            name: 'Mehmet Demir',
            role: 'CTO',
            bio: 'R&D and innovation leader. IoT and AI solutions architect.',
            image: null
          },
          {
            name: 'Zeynep Arslan',
            role: 'CFO',
            bio: 'Finance and strategy expert. International growth strategies.',
            image: null
          }
        ]
      },
      cta: {
        title: "Let's Bring Your Project to Life Together",
        subtitle: 'Talk to our expert team about your electronics manufacturing needs',
        button: 'Contact Us',
        buttonSecondary: 'Request Facility Tour'
      }
    }
  };

  const t = content[lang] || content.tr;

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-400 to-orange-500',
    red: 'from-red-500 to-pink-500',
    green: 'from-green-500 to-emerald-600',
    cyan: 'from-cyan-500 to-teal-500',
    purple: 'from-purple-500 to-indigo-600'
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
          <motion.div
            className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
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
            <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-6">
              {t.hero.titleHighlight}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/25">
                {t.hero.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-6 text-lg rounded-xl">
                <Play className="mr-2 w-5 h-5" />
                {t.hero.ctaSecondary}
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {t.hero.stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <IconComponent className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.story.title}</h2>
            <p className="text-xl text-gray-600">{t.story.subtitle}</p>
          </motion.div>
          <div className="space-y-6">
            {t.story.paragraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-lg text-gray-700 leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {['vision', 'mission'].map((key, idx) => {
              const item = t.visionMission[key];
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative rounded-3xl p-8 lg:p-12 overflow-hidden ${
                    idx === 0
                      ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                      : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-lg text-white/90 mb-6 leading-relaxed">{item.text}</p>
                    <ul className="space-y-2">
                      {item.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-white/80" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.values.title}</h2>
            <p className="text-xl text-gray-600">{t.values.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.values.items.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[value.color]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0E27] mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t.timeline.title}</h2>
            <p className="text-xl text-gray-300">{t.timeline.subtitle}</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500" />

            {t.timeline.events.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-center mb-12 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                  <div className={`${
                    event.milestone
                      ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/50'
                      : 'bg-white/5 border-white/10'
                  } backdrop-blur-sm border rounded-2xl p-6 hover:bg-white/10 transition-all duration-300`}>
                    <div className="text-3xl font-bold text-blue-400 mb-2">{event.year}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400">{event.desc}</p>
                  </div>
                </div>
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-slate-900 ${
                  event.milestone ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gray-600'
                }`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.certifications.title}</h2>
            <p className="text-xl text-gray-600">{t.certifications.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.certifications.items.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0A0E27] mb-1">{cert.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{cert.desc}</p>
                <span className="text-xs text-blue-600 font-medium">{cert.authority}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.facilities.title}</h2>
            <p className="text-xl text-gray-600">{t.facilities.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.facilities.items.map((facility, idx) => {
              const IconComponent = facility.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0E27] mb-2">{facility.title}</h3>
                  <p className="text-gray-600">{facility.desc}</p>
                </motion.div>
              );
            })}
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
                <Link to={`/${lang}/contact`}>
                  {t.cta.button}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                <Building className="mr-2 w-5 h-5" />
                {t.cta.buttonSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
