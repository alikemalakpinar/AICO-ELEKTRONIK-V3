import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, MapPin, Clock, Users, Heart, Zap, Coffee,
  GraduationCap, Target, TrendingUp, Award, ChevronRight,
  ArrowRight, Sparkles, Building, Globe, Cpu, Shield,
  Send, CheckCircle2, Star, Lightbulb, Rocket
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const CareersPage = ({ lang = 'tr' }) => {
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  const content = {
    tr: {
      hero: {
        badge: 'KARİYER FIRSATLARI',
        title: 'Geleceği Birlikte',
        titleHighlight: 'Şekillendirelim',
        subtitle: 'Teknolojiye tutkuyla bağlı, yenilikçi ve dinamik bir ekibin parçası olun. AICO\'da sadece bir iş değil, bir kariyer inşa edin.',
        stats: [
          { value: '150+', label: 'Çalışan' },
          { value: '30%', label: 'Mühendis Oranı' },
          { value: '4.8/5', label: 'Çalışan Memnuniyeti' },
          { value: '15+', label: 'Yıl Ort. Deneyim' }
        ],
        cta: 'Açık Pozisyonlar',
        ctaSecondary: 'Kültürümüzü Keşfet'
      },
      culture: {
        title: 'Neden AICO?',
        subtitle: 'Çalışan mutluluğunu en üst değer olarak görüyoruz',
        items: [
          {
            icon: GraduationCap,
            title: 'Sürekli Öğrenme',
            desc: 'Yıllık 80+ saat eğitim bütçesi, konferans katılımları ve sertifikasyon destekleri',
            color: 'blue'
          },
          {
            icon: TrendingUp,
            title: 'Kariyer Gelişimi',
            desc: 'Şeffaf kariyer haritası, mentorluk programları ve iç terfi önceliği',
            color: 'green'
          },
          {
            icon: Heart,
            title: 'Sağlık & Wellness',
            desc: 'Özel sağlık sigortası, fitness merkezi üyeliği ve psikolojik destek',
            color: 'red'
          },
          {
            icon: Coffee,
            title: 'Esnek Çalışma',
            desc: 'Hibrit çalışma modeli, esnek saatler ve remote Cuma imkanı',
            color: 'yellow'
          },
          {
            icon: Users,
            title: 'Takım Ruhu',
            desc: 'Düzenli team building aktiviteleri, hackathonlar ve sosyal etkinlikler',
            color: 'purple'
          },
          {
            icon: Award,
            title: 'Rekabetçi Ücret',
            desc: 'Piyasa üstü maaş, performans bonusu ve yıllık düzenli zamlar',
            color: 'cyan'
          }
        ]
      },
      benefits: {
        title: 'Yan Haklarımız',
        items: [
          'Özel Sağlık Sigortası',
          'Yemek Kartı',
          'Servis / Ulaşım Desteği',
          'Fitness Merkezi Üyeliği',
          'Eğitim Bütçesi (Yıllık)',
          'Konferans Katılım Desteği',
          'Sertifikasyon Desteği',
          'Teknoloji Cihaz Yardımı',
          'Doğum Günü İzni',
          'Çocuk Bakım Desteği',
          'Uzaktan Çalışma Ekipmanı',
          'Sosyal Aktivite Bütçesi'
        ]
      },
      departments: [
        { id: 'all', name: 'Tümü', icon: Building },
        { id: 'engineering', name: 'Mühendislik', icon: Cpu },
        { id: 'production', name: 'Üretim', icon: Zap },
        { id: 'quality', name: 'Kalite', icon: Shield },
        { id: 'sales', name: 'Satış & Pazarlama', icon: TrendingUp },
        { id: 'rnd', name: 'Ar-Ge', icon: Lightbulb }
      ],
      openings: {
        title: 'Açık Pozisyonlar',
        subtitle: 'Size uygun fırsatı bulun',
        jobs: [
          {
            id: 1,
            title: 'Kıdemli PCB Tasarım Mühendisi',
            department: 'engineering',
            location: 'Ankara',
            type: 'Tam Zamanlı',
            experience: '5+ Yıl',
            featured: true,
            description: 'Karmaşık çok katmanlı PCB tasarımları, impedans kontrolü ve high-speed sinyal bütünlüğü üzerinde çalışacaksınız.',
            requirements: [
              'Altium Designer veya Cadence Allegro deneyimi',
              'High-speed tasarım ve SI/PI analizi',
              'DFM/DFA bilgisi',
              'HDI ve flex PCB deneyimi tercih sebebi'
            ],
            responsibilities: [
              'Müşteri gereksinimlerini teknik tasarıma dönüştürme',
              'Tasarım review toplantılarına katılım',
              'Genç mühendislere mentorluk',
              'Prototip ve üretim dosyası hazırlama'
            ]
          },
          {
            id: 2,
            title: 'SMT Proses Mühendisi',
            department: 'production',
            location: 'Ankara',
            type: 'Tam Zamanlı',
            experience: '3+ Yıl',
            featured: true,
            description: 'SMT üretim hatlarının optimizasyonu, proses geliştirme ve kalite iyileştirme projelerinde yer alacaksınız.',
            requirements: [
              'SMT proses deneyimi (pick & place, reflow)',
              'SPC ve istatistiksel analiz bilgisi',
              '6 Sigma Green Belt tercih sebebi',
              'IPC-A-610 sertifikası'
            ],
            responsibilities: [
              'Üretim proseslerinin optimizasyonu',
              'Yeni ürün devreye alma (NPI)',
              'Kalite sapma analizleri',
              'Proses dokümantasyonu'
            ]
          },
          {
            id: 3,
            title: 'Kalite Güvence Mühendisi',
            department: 'quality',
            location: 'Ankara',
            type: 'Tam Zamanlı',
            experience: '2+ Yıl',
            featured: false,
            description: 'ISO 9001 kalite yönetim sisteminin sürdürülmesi ve iyileştirilmesi, iç denetimler ve müşteri kalite yönetimi.',
            requirements: [
              'ISO 9001 ve IATF 16949 bilgisi',
              'İç denetçi sertifikası',
              'FMEA ve 8D problem çözme',
              'İyi derecede İngilizce'
            ],
            responsibilities: [
              'Kalite sisteminin sürdürülmesi',
              'İç ve dış denetimlerin koordinasyonu',
              'Müşteri kalite işlemleri',
              'Sürekli iyileştirme projeleri'
            ]
          },
          {
            id: 4,
            title: 'IoT Yazılım Geliştirici',
            department: 'rnd',
            location: 'Ankara / Remote',
            type: 'Tam Zamanlı',
            experience: '3+ Yıl',
            featured: true,
            description: 'Endüstriyel IoT çözümleri için embedded yazılım ve cloud backend geliştirme.',
            requirements: [
              'C/C++ ve Python deneyimi',
              'MQTT, LoRaWAN protokolleri',
              'ESP32, STM32 mikrodenetleyici deneyimi',
              'AWS IoT veya Azure IoT tercih sebebi'
            ],
            responsibilities: [
              'Embedded firmware geliştirme',
              'Cloud entegrasyonu',
              'OTA güncelleme sistemleri',
              'Güvenlik protokolleri implementasyonu'
            ]
          },
          {
            id: 5,
            title: 'Teknik Satış Mühendisi',
            department: 'sales',
            location: 'İstanbul',
            type: 'Tam Zamanlı',
            experience: '2+ Yıl',
            featured: false,
            description: 'B2B satış süreçlerinde teknik destek, müşteri ilişkileri yönetimi ve yeni müşteri kazanımı.',
            requirements: [
              'Elektronik veya Elektrik Mühendisliği mezunu',
              'B2B satış deneyimi',
              'CRM kullanım deneyimi',
              'Sunum ve ikna yetenekleri'
            ],
            responsibilities: [
              'Müşteri ziyaretleri ve teknik sunumlar',
              'Teklif hazırlama ve takibi',
              'Müşteri ihtiyaç analizi',
              'Satış hedeflerinin gerçekleştirilmesi'
            ]
          },
          {
            id: 6,
            title: 'AOI Operatörü',
            department: 'production',
            location: 'Ankara',
            type: 'Tam Zamanlı',
            experience: '1+ Yıl',
            featured: false,
            description: 'AOI (Automated Optical Inspection) sistemlerinin operasyonu ve kalite kontrol.',
            requirements: [
              'Meslek lisesi veya önlisans mezunu',
              'AOI/SPI operatör deneyimi tercih sebebi',
              'Dikkatli ve titiz çalışma',
              'Vardiyalı çalışmaya uygunluk'
            ],
            responsibilities: [
              'AOI sistemlerinin günlük operasyonu',
              'Hata sınıflandırma ve raporlama',
              'Program optimizasyonu',
              'Preventive bakım faaliyetleri'
            ]
          },
          {
            id: 7,
            title: 'Test Mühendisi',
            department: 'engineering',
            location: 'Ankara',
            type: 'Tam Zamanlı',
            experience: '2+ Yıl',
            featured: false,
            description: 'ICT/FCT test fixture tasarımı, test programı geliştirme ve üretim test süreçlerinin yönetimi.',
            requirements: [
              'ICT ve FCT test sistemleri bilgisi',
              'Test fixture tasarım deneyimi',
              'Python veya LabVIEW bilgisi',
              'Elektronik ölçü aletleri kullanımı'
            ],
            responsibilities: [
              'Test programı geliştirme',
              'Fixture tasarımı ve devreye alma',
              'Test verimliliği analizi',
              'Arıza kök neden analizi'
            ]
          },
          {
            id: 8,
            title: 'AI/ML Araştırmacı',
            department: 'rnd',
            location: 'Ankara / Remote',
            type: 'Tam Zamanlı',
            experience: '3+ Yıl',
            featured: true,
            description: 'Üretim kalite kontrol ve prediktif bakım için yapay zeka/makine öğrenimi modelleri geliştirme.',
            requirements: [
              'MSc/PhD (Bilgisayar Bilimi, Elektrik-Elektronik)',
              'PyTorch veya TensorFlow deneyimi',
              'Computer Vision bilgisi',
              'TinyML ve edge deployment tercih sebebi'
            ],
            responsibilities: [
              'AOI anomali tespit modelleri',
              'Prediktif bakım algoritmaları',
              'Model optimizasyonu ve deployment',
              'Araştırma makaleleri ve patentler'
            ]
          }
        ]
      },
      process: {
        title: 'İşe Alım Sürecimiz',
        steps: [
          { title: 'Başvuru', desc: 'Online başvuru formunu doldurun ve CV\'nizi yükleyin', icon: Send },
          { title: 'İK Görüşmesi', desc: 'Telefon veya video görüşme ile ön değerlendirme', icon: Users },
          { title: 'Teknik Mülakat', desc: 'Pozisyona özel teknik değerlendirme', icon: Cpu },
          { title: 'Teklif', desc: 'Başarılı adaylara iş teklifi', icon: Award }
        ]
      },
      cta: {
        title: 'Aradığınız Pozisyonu Bulamadınız mı?',
        subtitle: 'Genel başvuru yapın, size uygun pozisyon açıldığında sizi bilgilendirelim.',
        button: 'Genel Başvuru Yap',
        email: 'CV\'nizi kariyer@aicoelektronik.com adresine gönderebilirsiniz.'
      }
    },
    en: {
      hero: {
        badge: 'CAREER OPPORTUNITIES',
        title: "Let's Shape the",
        titleHighlight: 'Future Together',
        subtitle: 'Be part of an innovative and dynamic team passionate about technology. Build a career, not just a job, at AICO.',
        stats: [
          { value: '150+', label: 'Employees' },
          { value: '30%', label: 'Engineers' },
          { value: '4.8/5', label: 'Employee Satisfaction' },
          { value: '15+', label: 'Years Avg. Experience' }
        ],
        cta: 'Open Positions',
        ctaSecondary: 'Explore Our Culture'
      },
      culture: {
        title: 'Why AICO?',
        subtitle: 'We consider employee happiness as our top value',
        items: [
          {
            icon: GraduationCap,
            title: 'Continuous Learning',
            desc: '80+ hours annual training budget, conference attendance and certification support',
            color: 'blue'
          },
          {
            icon: TrendingUp,
            title: 'Career Development',
            desc: 'Transparent career path, mentorship programs and internal promotion priority',
            color: 'green'
          },
          {
            icon: Heart,
            title: 'Health & Wellness',
            desc: 'Private health insurance, fitness membership and psychological support',
            color: 'red'
          },
          {
            icon: Coffee,
            title: 'Flexible Work',
            desc: 'Hybrid work model, flexible hours and remote Friday option',
            color: 'yellow'
          },
          {
            icon: Users,
            title: 'Team Spirit',
            desc: 'Regular team building activities, hackathons and social events',
            color: 'purple'
          },
          {
            icon: Award,
            title: 'Competitive Salary',
            desc: 'Above market salary, performance bonus and annual regular raises',
            color: 'cyan'
          }
        ]
      },
      benefits: {
        title: 'Our Benefits',
        items: [
          'Private Health Insurance',
          'Meal Card',
          'Transportation Support',
          'Fitness Membership',
          'Training Budget (Annual)',
          'Conference Attendance Support',
          'Certification Support',
          'Tech Device Allowance',
          'Birthday Leave',
          'Childcare Support',
          'Remote Work Equipment',
          'Social Activity Budget'
        ]
      },
      departments: [
        { id: 'all', name: 'All', icon: Building },
        { id: 'engineering', name: 'Engineering', icon: Cpu },
        { id: 'production', name: 'Production', icon: Zap },
        { id: 'quality', name: 'Quality', icon: Shield },
        { id: 'sales', name: 'Sales & Marketing', icon: TrendingUp },
        { id: 'rnd', name: 'R&D', icon: Lightbulb }
      ],
      openings: {
        title: 'Open Positions',
        subtitle: 'Find the right opportunity for you',
        jobs: [
          {
            id: 1,
            title: 'Senior PCB Design Engineer',
            department: 'engineering',
            location: 'Ankara',
            type: 'Full-Time',
            experience: '5+ Years',
            featured: true,
            description: 'Work on complex multilayer PCB designs, impedance control and high-speed signal integrity.',
            requirements: [
              'Altium Designer or Cadence Allegro experience',
              'High-speed design and SI/PI analysis',
              'DFM/DFA knowledge',
              'HDI and flex PCB experience preferred'
            ],
            responsibilities: [
              'Convert customer requirements to technical designs',
              'Participate in design review meetings',
              'Mentor junior engineers',
              'Prepare prototype and production files'
            ]
          },
          {
            id: 2,
            title: 'SMT Process Engineer',
            department: 'production',
            location: 'Ankara',
            type: 'Full-Time',
            experience: '3+ Years',
            featured: true,
            description: 'Participate in SMT production line optimization, process development and quality improvement projects.',
            requirements: [
              'SMT process experience (pick & place, reflow)',
              'SPC and statistical analysis knowledge',
              '6 Sigma Green Belt preferred',
              'IPC-A-610 certification'
            ],
            responsibilities: [
              'Production process optimization',
              'New product introduction (NPI)',
              'Quality deviation analysis',
              'Process documentation'
            ]
          }
        ]
      },
      process: {
        title: 'Our Hiring Process',
        steps: [
          { title: 'Application', desc: 'Fill out online application form and upload your CV', icon: Send },
          { title: 'HR Interview', desc: 'Initial assessment via phone or video call', icon: Users },
          { title: 'Technical Interview', desc: 'Position-specific technical evaluation', icon: Cpu },
          { title: 'Offer', desc: 'Job offer to successful candidates', icon: Award }
        ]
      },
      cta: {
        title: "Couldn't Find the Position You're Looking For?",
        subtitle: "Submit a general application, we'll notify you when a suitable position opens.",
        button: 'Submit General Application',
        email: 'You can send your CV to careers@aicoelektronik.com'
      }
    }
  };

  const t = content[lang] || content.tr;

  const filteredJobs = activeDepartment === 'all'
    ? t.openings.jobs
    : t.openings.jobs.filter(j => j.department === activeDepartment);

  const featuredJobs = t.openings.jobs.filter(j => j.featured);

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-pink-500',
    yellow: 'from-yellow-400 to-orange-500',
    purple: 'from-purple-500 to-indigo-600',
    cyan: 'from-cyan-500 to-teal-500'
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
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
              <Rocket className="w-4 h-4 mr-2" />
              {t.hero.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-2">
              {t.hero.title}
            </h1>
            <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
              {t.hero.titleHighlight}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg">
                {t.hero.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-6 text-lg rounded-xl">
                {t.hero.ctaSecondary}
              </Button>
            </div>
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

      {/* Culture Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.culture.title}</h2>
            <p className="text-xl text-gray-600">{t.culture.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.culture.items.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[item.color]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0E27] mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t.benefits.title}</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.benefits.items.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.openings.title}</h2>
            <p className="text-xl text-gray-600">{t.openings.subtitle}</p>
          </motion.div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {t.departments.map((dept) => {
              const IconComponent = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDepartment(dept.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeDepartment === dept.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {dept.name}
                </button>
              );
            })}
          </div>

          {/* Featured Jobs */}
          {activeDepartment === 'all' && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-[#0A0E27]">
                  {lang === 'tr' ? 'Öne Çıkan Pozisyonlar' : 'Featured Positions'}
                </h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                {featuredJobs.slice(0, 4).map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold mb-2">{job.title}</h4>
                        <div className="flex flex-wrap gap-3 text-sm text-white/80">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.experience}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {t.departments.find(d => d.id === job.department)?.name}
                      </span>
                    </div>
                    <p className="text-white/90 mb-4">{job.description}</p>
                    <Button
                      onClick={() => setSelectedJob(job)}
                      className="w-full bg-white text-blue-600 hover:bg-gray-100"
                    >
                      {lang === 'tr' ? 'Detayları Gör ve Başvur' : 'View Details & Apply'}
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All Jobs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDepartment}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {(activeDepartment === 'all' ? filteredJobs.filter(j => !j.featured) : filteredJobs).map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xl font-bold text-[#0A0E27]">{job.title}</h4>
                        {job.featured && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.experience}
                        </span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {t.departments.find(d => d.id === job.department)?.name}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedJob(job)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {lang === 'tr' ? 'Başvur' : 'Apply'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {lang === 'tr'
                  ? 'Bu departmanda şu anda açık pozisyon bulunmuyor.'
                  : 'No open positions in this department at the moment.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0E27] mb-4">{t.process.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {t.process.steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 hidden md:block" style={{ display: idx === 3 ? 'none' : undefined }} />
                  <h3 className="text-lg font-bold text-[#0A0E27] mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t.cta.title}</h2>
            <p className="text-xl text-white/90 mb-8">{t.cta.subtitle}</p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg">
              {t.cta.button}
              <Send className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-white/70 mt-6">{t.cta.email}</p>
          </motion.div>
        </div>
      </section>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A0E27] mb-2">{selectedJob.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedJob.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {selectedJob.experience}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-600 mb-6">{selectedJob.description}</p>

                {selectedJob.requirements && (
                  <div className="mb-6">
                    <h4 className="font-bold text-[#0A0E27] mb-3">
                      {lang === 'tr' ? 'Aranan Nitelikler' : 'Requirements'}
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.responsibilities && (
                  <div className="mb-6">
                    <h4 className="font-bold text-[#0A0E27] mb-3">
                      {lang === 'tr' ? 'Sorumluluklar' : 'Responsibilities'}
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-xl">
                  {lang === 'tr' ? 'Hemen Başvur' : 'Apply Now'}
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareersPage;
