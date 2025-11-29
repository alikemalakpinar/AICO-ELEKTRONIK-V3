import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Clock, CheckCircle2, ArrowRight, Factory,
  Cpu, Zap, Shield, Car, Leaf, HardHat, Thermometer,
  Radio, Award, Star, ChevronRight, Play, Quote
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const CaseStudiesPage = ({ lang }) => {
  const [activeCase, setActiveCase] = useState(null);
  const [activeIndustry, setActiveIndustry] = useState('all');

  const content = {
    tr: {
      hero: {
        badge: 'BAŞARI HİKAYELERİ',
        title: 'Müşterilerimizin',
        titleHighlight: 'Başarı Öyküleri',
        subtitle: 'Her projede mükemmellik arayışı. Otomotivden tarıma, madencilikten enerji yönetimine kadar geniş yelpazede sunduğumuz çözümlerle müşterilerimizin hedeflerine ulaşmasına yardımcı oluyoruz.',
        stats: [
          { value: '500+', label: 'Tamamlanan Proje' },
          { value: '%99.8', label: 'Müşteri Memnuniyeti' },
          { value: '25+', label: 'Sektör Deneyimi' },
          { value: '15+', label: 'Ülke İhracat' }
        ]
      },
      industries: [
        { id: 'all', name: 'Tümü', icon: Factory },
        { id: 'automotive', name: 'Otomotiv', icon: Car },
        { id: 'agriculture', name: 'Tarım', icon: Leaf },
        { id: 'mining', name: 'Madencilik', icon: HardHat },
        { id: 'energy', name: 'Enerji', icon: Zap },
        { id: 'industrial', name: 'Endüstri', icon: Cpu }
      ],
      cases: [
        {
          id: 1,
          title: 'Otomotiv Kontrol Ünitesi',
          client: 'Önde Gelen Otomotiv OEM',
          industry: 'automotive',
          image: '/cases/automotive.jpg',
          challenge: {
            title: 'Zorluk',
            text: 'Motor bölmesinde -40°C ile +125°C arasında çalışacak, titreşime dayanıklı ECU ünitesi. 10 yıl garanti süresi ve IATF 16949 uyumluluk gereksinimleri.'
          },
          solution: {
            title: 'Çözüm',
            text: 'Polyimide baz malzeme ve 2oz bakır kullanarak termal performansı optimize ettik. Seçmeli conformal coating ile nem ve titreşim koruması sağladık. PPAP ve MSA süreçlerini eksiksiz tamamladık.',
            details: [
              'Polyimide laminat (Tg: 260°C)',
              '2oz bakır ile ısı yayılımı',
              'Seçmeli silikon conformal coating',
              'Titreşim testi: 10G, 10-2000Hz',
              'HALT/HASS testleri tamamlandı'
            ]
          },
          results: {
            title: 'Sonuçlar',
            metrics: [
              { label: 'İlk Geçiş Verimi', value: '99.5%', icon: TrendingUp },
              { label: 'Üretim Süresi', value: '5 Gün', icon: Clock },
              { label: 'Saha Arızası', value: '0 PPM', icon: Shield },
              { label: 'Termin Tutarlılığı', value: '100%', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: 'AICO ile 5 yıldır çalışıyoruz. Kalite ve teslimat güvenilirliği rakipsiz. Otomotiv sektörünün gerektirdiği tüm standartları karşılıyorlar.',
            author: 'Ahmet Özkan',
            role: 'Satın Alma Direktörü'
          },
          featured: true
        },
        {
          id: 2,
          title: 'Akıllı Tarım Sensör Sistemi',
          client: 'AgriTech Startup',
          industry: 'agriculture',
          image: '/cases/agriculture.jpg',
          challenge: {
            title: 'Zorluk',
            text: 'Tarla koşullarında 10 yıl ömürlü, IP68 koruma sınıfında, düşük güç tüketimli IoT sensör modülü. 01005 komponentler ile ultra kompakt tasarım.'
          },
          solution: {
            title: 'Çözüm',
            text: 'Özel tasarım enclosure ile entegre PCB çözümü geliştirdik. Low-power MCU ve LoRa haberleşme modülü ile 5 yıl pil ömrü hedefledik. Potting ile tam koruma sağladık.',
            details: [
              '01005 pasif komponentler',
              'LoRaWAN haberleşme modülü',
              'Ultra düşük güç tasarımı',
              'Tam epoksi potting',
              '4 katmanlı HDI tasarım'
            ]
          },
          results: {
            title: 'Sonuçlar',
            metrics: [
              { label: 'Birim Maliyet Düşüşü', value: '%35', icon: TrendingUp },
              { label: 'Pil Ömrü', value: '5 Yıl', icon: Clock },
              { label: 'Saha Güvenilirliği', value: '%99.9', icon: Shield },
              { label: 'Prototip Süresi', value: '2 Hafta', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: 'AICO ekibi tasarım aşamasından itibaren yanımızdaydı. DFM önerileri sayesinde üretim maliyetlerimizi %35 düşürdük.',
            author: 'Dr. Elif Yılmaz',
            role: 'CTO, AgriTech'
          },
          featured: true
        },
        {
          id: 3,
          title: 'Madenci Takip ve Güvenlik Sistemi',
          client: 'Ulusal Maden İşletmesi',
          industry: 'mining',
          image: '/cases/mining.jpg',
          challenge: {
            title: 'Zorluk',
            text: 'Yeraltı madenlerde 300+ madenciyi gerçek zamanlı takip edecek, metan ve CO gazı algılayacak, patlamaya dayanıklı (ATEX) güvenlik sistemi.'
          },
          solution: {
            title: 'Çözüm',
            text: 'ATEX Zone 1 sertifikalı, intrinsically safe tasarım geliştirdik. UWB teknolojisi ile ±10cm konum hassasiyeti sağladık. Entegre gaz sensörleri ile anlık uyarı sistemi kurduk.',
            details: [
              'ATEX Zone 1 sertifikası',
              'UWB konum sistemi (±10cm)',
              'Metan & CO gaz sensörleri',
              'Titreşim uyarı sistemi',
              '72 saat batarya ömrü'
            ]
          },
          results: {
            title: 'Sonuçlar',
            metrics: [
              { label: 'Konum Hassasiyeti', value: '±10cm', icon: TrendingUp },
              { label: 'İş Kazası Azalması', value: '%60', icon: Shield },
              { label: 'Sistem Uptime', value: '%99.99', icon: Clock },
              { label: 'ROI Süresi', value: '8 Ay', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: 'Bu sistem sayesinde madenci güvenliğinde çığır açtık. Gerçek zamanlı takip ve gaz uyarıları hayat kurtarıyor.',
            author: 'Murat Kaya',
            role: 'İş Güvenliği Müdürü'
          },
          featured: true
        },
        {
          id: 4,
          title: 'Yüksek Güçlü LED Sürücü',
          client: 'Aydınlatma Üreticisi',
          industry: 'energy',
          image: '/cases/led.jpg',
          challenge: {
            title: 'Zorluk',
            text: '250W LED armatür için %95+ verimlilik, 0-10V ve DALI dimming desteği, geniş giriş voltaj aralığı (90-305VAC) ve -40°C/+60°C çalışma sıcaklığı.'
          },
          solution: {
            title: 'Çözüm',
            text: 'PFC + LLC topoloji ile yüksek verimlilik sağladık. IMS (Insulated Metal Substrate) PCB ile termal yönetimi optimize ettik. UL, CE, ENEC sertifikasyonlarını tamamladık.',
            details: [
              'PFC + LLC topoloji',
              'IMS bakır tabanlı PCB',
              '0-10V & DALI dimming',
              'Surge koruması (4kV)',
              'IP67 sürücü tasarımı'
            ]
          },
          results: {
            title: 'Sonuçlar',
            metrics: [
              { label: 'Verimlilik', value: '%96.2', icon: TrendingUp },
              { label: 'THD', value: '<%8', icon: Zap },
              { label: 'MTBF', value: '100K Saat', icon: Clock },
              { label: 'Garanti', value: '7 Yıl', icon: Shield }
            ]
          },
          testimonial: {
            text: 'AICO\'nun LED sürücüleri sektörün en iyileri arasında. Kalite ve güvenilirlik konusunda hiç sorun yaşamadık.',
            author: 'Ali Demir',
            role: 'Ürün Müdürü'
          },
          featured: false
        },
        {
          id: 5,
          title: 'Soğuk Hava Deposu IoT Monitör',
          client: 'Lojistik Şirketi',
          industry: 'industrial',
          image: '/cases/coldchain.jpg',
          challenge: {
            title: 'Zorluk',
            text: '-35°C ortamda çalışacak, sıcaklık ve nem takibi yapacak, HACCP uyumlu loglama özellikli IoT cihazı. 50+ depo için merkezi yönetim.'
          },
          solution: {
            title: 'Çözüm',
            text: 'Düşük sıcaklık özellikli komponentler ve özel PCB laminat seçtik. NB-IoT bağlantısı ile uzak lokasyonlarda bile güvenilir iletişim sağladık. Cloud dashboard geliştirdik.',
            details: [
              '-40°C rated komponentler',
              'High-Tg FR4 laminat',
              'NB-IoT haberleşme',
              'HACCP uyumlu loglama',
              'Pil + PoE güç seçenekleri'
            ]
          },
          results: {
            title: 'Sonuçlar',
            metrics: [
              { label: 'Fire Azalması', value: '%40', icon: TrendingUp },
              { label: 'Sistem Güvenilirliği', value: '%99.9', icon: Shield },
              { label: 'Alarm Yanıt Süresi', value: '<1 dk', icon: Clock },
              { label: 'Yıllık Tasarruf', value: '₺2M', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: 'Soğuk zincir takibinde tam görünürlük sağladık. Fire oranlarımız %40 azaldı, müşteri memnuniyeti arttı.',
            author: 'Zeynep Arslan',
            role: 'Operasyon Direktörü'
          },
          featured: false
        },
        {
          id: 6,
          title: 'Makine Ses Analizi Sistemi',
          client: 'Üretim Tesisi',
          industry: 'industrial',
          image: '/cases/predictive.jpg',
          challenge: {
            title: 'Zorluk',
            text: 'Üretim hattındaki makinelerin ses analizini yaparak arızayı önceden tespit edecek, edge AI tabanlı prediktif bakım sistemi.'
          },
          solution: {
            title: 'Çözüm',
            text: 'Yüksek hassasiyetli MEMS mikrofonlar ve edge AI işlemci entegrasyonu yaptık. TinyML modelleri ile gerçek zamanlı anomali tespiti sağladık.',
            details: [
              'MEMS mikrofon dizisi',
              'Edge AI işlemci (NPU)',
              'TinyML anomali modeli',
              'Vibrasyon sensörü entegrasyonu',
              'OPC-UA bağlantısı'
            ]
          },
          results: {
            title: 'Sonuçlar',
            metrics: [
              { label: 'Arıza Tahmini Doğruluğu', value: '%92', icon: TrendingUp },
              { label: 'Plansız Duruş Azalması', value: '%65', icon: Clock },
              { label: 'Bakım Maliyeti Düşüşü', value: '%30', icon: Shield },
              { label: 'ROI', value: '6 Ay', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: 'Prediktif bakım sistemimiz sayesinde plansız duruşlarımız %65 azaldı. Yatırımımız 6 ayda kendini amorti etti.',
            author: 'Mehmet Yıldız',
            role: 'Bakım Müdürü'
          },
          featured: false
        },
        {
          id: 7,
          title: 'Yangın Algılama Sistemi',
          client: 'Endüstriyel Tesis',
          industry: 'industrial',
          image: '/cases/fire.jpg',
          challenge: {
            title: 'Zorluk',
            text: 'Geniş endüstriyel alanda (10.000m²+) erken yangın algılama, duman ve ısı sensör füzyonu, 7/24 izleme ve otomatik itfaiye bildirimi.'
          },
          solution: {
            title: 'Çözüm',
            text: 'Çoklu sensör füzyonu (duman, ısı, alev) ile false alarm oranını minimize ettik. Addressable loop sistemi ile tam lokasyon bilgisi sağladık.',
            details: [
              'Çoklu sensör füzyonu',
              'Addressable loop sistemi',
              'Video doğrulama entegrasyonu',
              'Otomatik bildirim sistemi',
              'EN 54 sertifikasyonu'
            ]
          },
          results: {
            title: 'Sonuçlar',
            metrics: [
              { label: 'Algılama Süresi', value: '<30 sn', icon: Clock },
              { label: 'False Alarm Azalması', value: '%85', icon: Shield },
              { label: 'Kapsama Alanı', value: '10.000m²', icon: TrendingUp },
              { label: 'Sigorta Tasarrufu', value: '%25', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: 'Yeni yangın algılama sistemimiz sigorta primlerimizi %25 düşürdü ve çalışan güvenliği konusundaki endişelerimizi giderdi.',
            author: 'Hakan Çelik',
            role: 'Tesis Müdürü'
          },
          featured: false
        },
        {
          id: 8,
          title: 'Akü Yönetim Sistemi (BMS)',
          client: 'EV Dönüşüm Şirketi',
          industry: 'automotive',
          image: '/cases/bms.jpg',
          challenge: {
            title: 'Zorluk',
            text: 'Elektrikli araç dönüşüm kiti için 400V/100kWh Li-ion batarya paketi yönetim sistemi. Cell balancing, termal yönetim ve fonksiyonel güvenlik (ISO 26262).'
          },
          solution: {
            title: 'Çözüm',
            text: 'Active cell balancing ile batarya ömrünü optimize ettik. CAN bus üzerinden araç entegrasyonu ve ISO 26262 ASIL-B fonksiyonel güvenlik standardına uyum sağladık.',
            details: [
              'Active cell balancing',
              'CAN bus entegrasyonu',
              'ISO 26262 ASIL-B uyum',
              'Termal yönetim algoritması',
              'SOC/SOH tahmini'
            ]
          },
          results: {
            title: 'Sonuçlar',
            metrics: [
              { label: 'Batarya Verimliliği', value: '%98', icon: TrendingUp },
              { label: 'Menzil Artışı', value: '%12', icon: Zap },
              { label: 'Cell Dengesi', value: '±5mV', icon: Shield },
              { label: 'Güvenlik Seviyesi', value: 'ASIL-B', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: 'AICO\'nun BMS çözümü sayesinde dönüşüm araçlarımızın menzili %12 arttı ve batarya güvenliği konusunda tam güvence sağladık.',
            author: 'Can Öztürk',
            role: 'Teknik Direktör'
          },
          featured: false
        }
      ],
      cta: {
        title: 'Sizin Projeniz de Bir Başarı Hikayesi Olabilir',
        subtitle: 'Elektronik üretim ihtiyaçlarınızı görüşelim, size özel çözüm üretelim.',
        button: 'Proje Görüşmesi Talep Et',
        buttonSecondary: 'Teklif Al'
      }
    },
    en: {
      hero: {
        badge: 'SUCCESS STORIES',
        title: 'Customer',
        titleHighlight: 'Success Stories',
        subtitle: 'Pursuit of excellence in every project. From automotive to agriculture, mining to energy management, we help our customers achieve their goals with our wide range of solutions.',
        stats: [
          { value: '500+', label: 'Completed Projects' },
          { value: '99.8%', label: 'Customer Satisfaction' },
          { value: '25+', label: 'Years Experience' },
          { value: '15+', label: 'Export Countries' }
        ]
      },
      industries: [
        { id: 'all', name: 'All', icon: Factory },
        { id: 'automotive', name: 'Automotive', icon: Car },
        { id: 'agriculture', name: 'Agriculture', icon: Leaf },
        { id: 'mining', name: 'Mining', icon: HardHat },
        { id: 'energy', name: 'Energy', icon: Zap },
        { id: 'industrial', name: 'Industrial', icon: Cpu }
      ],
      cases: [
        {
          id: 1,
          title: 'Automotive Control Unit',
          client: 'Leading Automotive OEM',
          industry: 'automotive',
          image: '/cases/automotive.jpg',
          challenge: {
            title: 'Challenge',
            text: 'ECU unit for engine compartment operating between -40°C and +125°C, vibration resistant. 10-year warranty and IATF 16949 compliance requirements.'
          },
          solution: {
            title: 'Solution',
            text: 'Optimized thermal performance using polyimide base material and 2oz copper. Provided moisture and vibration protection with selective conformal coating. Completed PPAP and MSA processes.',
            details: [
              'Polyimide laminate (Tg: 260°C)',
              '2oz copper for heat dissipation',
              'Selective silicone conformal coating',
              'Vibration test: 10G, 10-2000Hz',
              'HALT/HASS tests completed'
            ]
          },
          results: {
            title: 'Results',
            metrics: [
              { label: 'First Pass Yield', value: '99.5%', icon: TrendingUp },
              { label: 'Production Time', value: '5 Days', icon: Clock },
              { label: 'Field Failure', value: '0 PPM', icon: Shield },
              { label: 'Delivery Reliability', value: '100%', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: "We've been working with AICO for 5 years. Quality and delivery reliability are unmatched. They meet all standards required by the automotive industry.",
            author: 'Ahmet Ozkan',
            role: 'Procurement Director'
          },
          featured: true
        },
        {
          id: 2,
          title: 'Smart Agriculture Sensor System',
          client: 'AgriTech Startup',
          industry: 'agriculture',
          image: '/cases/agriculture.jpg',
          challenge: {
            title: 'Challenge',
            text: 'IoT sensor module with 10-year lifespan in field conditions, IP68 protection class, low power consumption. Ultra-compact design with 01005 components.'
          },
          solution: {
            title: 'Solution',
            text: 'Developed integrated PCB solution with custom enclosure. Targeted 5-year battery life with low-power MCU and LoRa communication module. Provided full protection with potting.',
            details: [
              '01005 passive components',
              'LoRaWAN communication module',
              'Ultra low power design',
              'Full epoxy potting',
              '4-layer HDI design'
            ]
          },
          results: {
            title: 'Results',
            metrics: [
              { label: 'Unit Cost Reduction', value: '35%', icon: TrendingUp },
              { label: 'Battery Life', value: '5 Years', icon: Clock },
              { label: 'Field Reliability', value: '99.9%', icon: Shield },
              { label: 'Prototype Time', value: '2 Weeks', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: 'AICO team was with us from the design phase. Thanks to DFM recommendations, we reduced our production costs by 35%.',
            author: 'Dr. Elif Yilmaz',
            role: 'CTO, AgriTech'
          },
          featured: true
        },
        {
          id: 3,
          title: 'Miner Tracking and Safety System',
          client: 'National Mining Company',
          industry: 'mining',
          image: '/cases/mining.jpg',
          challenge: {
            title: 'Challenge',
            text: 'Explosion-proof (ATEX) safety system for tracking 300+ miners in real-time, detecting methane and CO gas in underground mines.'
          },
          solution: {
            title: 'Solution',
            text: 'Developed ATEX Zone 1 certified, intrinsically safe design. Achieved ±10cm position accuracy with UWB technology. Set up instant warning system with integrated gas sensors.',
            details: [
              'ATEX Zone 1 certification',
              'UWB positioning (±10cm)',
              'Methane & CO gas sensors',
              'Vibration warning system',
              '72-hour battery life'
            ]
          },
          results: {
            title: 'Results',
            metrics: [
              { label: 'Position Accuracy', value: '±10cm', icon: TrendingUp },
              { label: 'Work Accident Reduction', value: '60%', icon: Shield },
              { label: 'System Uptime', value: '99.99%', icon: Clock },
              { label: 'ROI Period', value: '8 Months', icon: CheckCircle2 }
            ]
          },
          testimonial: {
            text: 'This system has been a breakthrough in miner safety. Real-time tracking and gas alerts save lives.',
            author: 'Murat Kaya',
            role: 'Safety Manager'
          },
          featured: true
        }
      ],
      cta: {
        title: 'Your Project Can Also Be a Success Story',
        subtitle: "Let's discuss your electronics manufacturing needs and create a custom solution for you.",
        button: 'Request Project Meeting',
        buttonSecondary: 'Get Quote'
      }
    }
  };

  const t = content[lang] || content.tr;

  const filteredCases = activeIndustry === 'all'
    ? t.cases
    : t.cases.filter(c => c.industry === activeIndustry);

  const featuredCases = t.cases.filter(c => c.featured);

  const industryColors = {
    automotive: 'from-blue-500 to-blue-600',
    agriculture: 'from-green-500 to-emerald-600',
    mining: 'from-orange-500 to-amber-600',
    energy: 'from-yellow-400 to-yellow-600',
    industrial: 'from-purple-500 to-indigo-600'
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
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6">
              <Award className="w-4 h-4 mr-2" />
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

      {/* Industry Filter */}
      <section className="py-8 bg-gray-50 sticky top-0 z-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {t.industries.map((ind) => {
              const IconComponent = ind.icon;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeIndustry === ind.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {ind.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      {activeIndustry === 'all' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-12">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-[#0A0E27]">
                {lang === 'tr' ? 'Öne Çıkan Projeler' : 'Featured Projects'}
              </h2>
            </div>

            <div className="space-y-12">
              {featuredCases.map((caseItem, idx) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    idx % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Image/Visual Side */}
                  <div className={`${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${industryColors[caseItem.industry]} p-8 min-h-[400px] flex items-center justify-center`}>
                      <div className="text-center text-white">
                        <Factory className="w-24 h-24 mx-auto mb-4 opacity-50" />
                        <h3 className="text-2xl font-bold">{caseItem.title}</h3>
                        <p className="text-white/80">{caseItem.client}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${industryColors[caseItem.industry]} text-white`}>
                        {t.industries.find(i => i.id === caseItem.industry)?.name}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-[#0A0E27] mb-4">{caseItem.title}</h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{caseItem.challenge.title}</h4>
                        <p className="text-gray-600">{caseItem.challenge.text}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{caseItem.solution.title}</h4>
                        <p className="text-gray-600 mb-3">{caseItem.solution.text}</p>
                        <div className="flex flex-wrap gap-2">
                          {caseItem.solution.details.slice(0, 3).map((detail, dIdx) => (
                            <span key={dIdx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {caseItem.results.metrics.map((metric, mIdx) => {
                          const MetricIcon = metric.icon;
                          return (
                            <div key={mIdx} className="bg-gray-50 rounded-xl p-4">
                              <MetricIcon className="w-5 h-5 text-blue-600 mb-2" />
                              <div className="text-2xl font-bold text-[#0A0E27]">{metric.value}</div>
                              <div className="text-sm text-gray-600">{metric.label}</div>
                            </div>
                          );
                        })}
                      </div>

                      {caseItem.testimonial && (
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                          <Quote className="w-8 h-8 text-blue-300 mb-3" />
                          <p className="text-gray-700 italic mb-4">"{caseItem.testimonial.text}"</p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {caseItem.testimonial.author.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{caseItem.testimonial.author}</div>
                              <div className="text-sm text-gray-600">{caseItem.testimonial.role}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Cases Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A0E27] mb-8 text-center">
            {activeIndustry === 'all'
              ? (lang === 'tr' ? 'Tüm Projeler' : 'All Projects')
              : t.industries.find(i => i.id === activeIndustry)?.name}
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCases.map((caseItem, idx) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-500"
                >
                  <div className={`h-48 bg-gradient-to-br ${industryColors[caseItem.industry]} flex items-center justify-center`}>
                    <Factory className="w-16 h-16 text-white/50" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${industryColors[caseItem.industry]} text-white`}>
                        {t.industries.find(i => i.id === caseItem.industry)?.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0A0E27] mb-2 group-hover:text-blue-600 transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{caseItem.client}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {caseItem.results.metrics.slice(0, 2).map((metric, mIdx) => (
                        <div key={mIdx} className="bg-gray-50 rounded-lg p-2 text-center">
                          <div className="text-lg font-bold text-blue-600">{metric.value}</div>
                          <div className="text-xs text-gray-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <Button variant="ghost" className="w-full justify-between text-blue-600 hover:bg-blue-50">
                      {lang === 'tr' ? 'Detayları Gör' : 'View Details'}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
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
              <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                <Link to={`/${lang}/instant-quote`}>
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

export default CaseStudiesPage;
