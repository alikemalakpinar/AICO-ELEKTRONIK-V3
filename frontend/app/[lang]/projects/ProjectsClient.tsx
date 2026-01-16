'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Filter } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';

interface ProjectsClientProps {
  lang: Locale;
}

// Project data - Premium Engineering Portfolio
const projectsData = {
  tr: [
    // ============================================
    // FEATURED - ANA PROJELER
    // ============================================
    {
      id: 'smart-villa-beykoz',
      title: 'Beykoz Villa Projesi',
      category: 'villa',
      year: '2024',
      challenge:
        'Istanbul Bogazina bakan 1200m² villanin, mevcut altyapiyi bozmadan tam otomasyon sistemine donusturulmesi.',
      approach:
        'Mevcut kablolama analizi, kablosuz sensor aglari ve hibrit iletisim protokolleri ile retrofitting cozumu.',
      impact:
        'Enerji tuketiminde %42 azalma, tek noktadan 47 farkli sistemin yonetimi.',
      stats: [
        { label: 'Alan', value: '1,200m²' },
        { label: 'Sistem', value: '47' },
        { label: 'Tasarruf', value: '%42' },
      ],
      tags: ['KNX', 'Matter', 'IoT', 'Retrofitting'],
      featured: true,
    },
    {
      id: 'fire-analysis-module',
      title: 'Endustriyel IoT Yangin Analiz Modulu',
      category: 'embedded',
      year: '2023',
      challenge:
        'Geleneksel yangin dedektorlerinin yuksek yanlis alarm orani ve gec tepki suresi sorunlarinin cozumu.',
      approach:
        'Yapay sinir aglari ile duman ve isi verilerini nanosaniyeler icinde isleyen, ucta (edge) karar verebilen donanim tasarimi.',
      impact:
        'Yanlis alarm orani %0.01e dustu, tepki suresi 50ms altina indi, ATEX sertifikasyonuna uygun uretim.',
      stats: [
        { label: 'Algilama', value: '<50ms' },
        { label: 'Yanlis Alarm', value: '%0.01' },
        { label: 'Protokol', value: 'LoRaWAN' },
      ],
      tags: ['Altium', 'STM32', 'Edge AI', 'C++'],
      featured: true,
    },
    {
      id: 'underground-mining-safety',
      title: 'Yeralti Personel Konumlandirma Agi',
      category: 'industrial',
      year: '2022',
      challenge:
        'GPS sinyalinin olmadigi maden tunellerinde personel takibi ve acil durum haberlesme sisteminin kurulmasi.',
      approach:
        'RF Mesh teknolojisi ile metrelerce kaya altinda bile calisan, Man-Down (hareketsizlik) algilama ozellikli sistem.',
      impact:
        'ATEX uyumlu tasarim, 2km+ kapsama alani, 2 yil batarya omru ile kesintisiz guvenlik.',
      stats: [
        { label: 'Kapsama', value: '2km+' },
        { label: 'Batarya', value: '2 Yil' },
        { label: 'Sertifika', value: 'ATEX' },
      ],
      tags: ['RF Mesh', 'Zigbee', 'Embedded C', 'Safety'],
      featured: true,
    },
    // ============================================
    // GOMULU SISTEMLER & DONANIM
    // ============================================
    {
      id: 'smart-coffee-automation',
      title: 'PID Kontrollu Barista Otomasyonu',
      category: 'embedded',
      year: '2023',
      challenge:
        'Profesyonel kahve makinelerinde tutarli tat profili icin hassas sicaklik ve basinc kontrolu.',
      approach:
        'PID algoritmalari ile 0.1°C hassasiyetinde isi yonetimi, akis olcer entegrasyonu ve dokunmatik HMI tasarimi.',
      impact:
        'Kahve tutarliligi %98e yukseldi, enerji tuketimi %25 azaldi, kullanici deneyimi puani 4.9/5.',
      stats: [
        { label: 'Hassasiyet', value: '±0.1°C' },
        { label: 'Kontrol', value: 'PID' },
        { label: 'Enerji', value: '-%25' },
      ],
      tags: ['PID Control', 'HMI Design', 'Embedded C++', 'Power Electronics'],
      featured: false,
    },
    {
      id: 'high-efficiency-pmu',
      title: 'Yuksek Verimli Guc Yonetim Unitesi (PMU)',
      category: 'embedded',
      year: '2022',
      challenge:
        'LED aydinlatma sistemleri icin kompakt, yuksek verimli ve EMC uyumlu guc kaynagi tasarimi.',
      approach:
        'Buck/Boost donusturuculer, aktif PFC ve termal yonetim ile %96 verimlilik hedefi.',
      impact:
        '%96 enerji verimliligi, kisa devre/asiri yuk korumalari, CE ve EMC sertifikalari.',
      stats: [
        { label: 'Verimlilik', value: '%96' },
        { label: 'Koruma', value: '4 Katman' },
        { label: 'Sertifika', value: 'CE/EMC' },
      ],
      tags: ['Power Electronics', 'Buck Converter', 'EMC', 'Altium'],
      featured: false,
    },
    // ============================================
    // ENDUSTRIYEL COZUMLER
    // ============================================
    {
      id: 'cold-chain-monitoring',
      title: 'Kritik Soguk Zincir Izleme Sistemi',
      category: 'industrial',
      year: '2023',
      challenge:
        'Ilac ve gida depolarinda -40°C kosullarda kesintisiz sicaklik izleme ve alarm sistemi.',
      approach:
        'GSM tabanli veri aktarimi, bulut dashboard, elektrik kesintisinde 48 saat otonom calisma.',
      impact:
        '%99.99 uptime, FDA ve ISO 22000 uyumluluk, urun kayiplarinda %85 azalma.',
      stats: [
        { label: 'Calisma', value: '-40°C / +85°C' },
        { label: 'Uptime', value: '%99.99' },
        { label: 'Otonom', value: '48 Saat' },
      ],
      tags: ['GSM/GPRS', 'Cloud IoT', 'PCB Design', 'MQTT'],
      featured: false,
    },
    {
      id: 'predictive-maintenance',
      title: 'Kestirimci Bakim & Titresim Analizoru',
      category: 'industrial',
      year: '2024',
      challenge:
        'Sanayi motorlarinda beklenmedik arizalarin once tespiti ve planli bakim optimizasyonu.',
      approach:
        'FFT (Fast Fourier Transform) algoritmalari ile titresim analizi, makine ogrenimi tabanli ariza tahmini.',
      impact:
        'Rulman arizalarini 2 hafta onceden tespit, planlanmamis duruslarda %78 azalma, 6 ay ROI.',
      stats: [
        { label: 'Ornekleme', value: '10kHz' },
        { label: 'Tahmin', value: '2 Hafta' },
        { label: 'ROI', value: '6 Ay' },
      ],
      tags: ['DSP', 'Python', 'FFT', 'Machine Learning'],
      featured: false,
    },
    {
      id: 'factory-gebze',
      title: 'Gebze Uretim Tesisi OEE Sistemi',
      category: 'industrial',
      year: '2023',
      challenge:
        '24/7 calisan uretim hattinda kesintisiz enerji izleme ve ekipman saglik takibi.',
      approach:
        'Edge computing tabanli veri toplama, makine ogrenimi ile anomali tespiti ve OEE optimizasyonu.',
      impact:
        "Planlanmamis duruslarda %78 azalma, toplam ekipman verimliligi (OEE) %89'a yukseldi.",
      stats: [
        { label: 'Hat', value: '12' },
        { label: 'Durus', value: '-%78' },
        { label: 'OEE', value: '%89' },
      ],
      tags: ['SCADA', 'PLC', 'Edge Computing', 'OPC-UA'],
      featured: false,
    },
    // ============================================
    // AKILLI BINA & REZIDANS
    // ============================================
    {
      id: 'residence-maslak',
      title: 'Maslak Towers Rezidans',
      category: 'residence',
      year: '2023',
      challenge:
        '340 daireli A sinifi rezidansin enerji yonetimi ve ortak alan guvenlik sistemlerinin modernizasyonu.',
      approach:
        'Merkezi BMS platformu, IoT sensor agi ve kestirimci bakim algoritmalarinin entegrasyonu.',
      impact:
        'Yillik enerji maliyetinde 2.1M TL tasarruf, bakim maliyetlerinde %60 azalma.',
      stats: [
        { label: 'Daire', value: '340' },
        { label: 'Tasarruf', value: '2.1M TL' },
        { label: 'Bakim', value: '-%60' },
      ],
      tags: ['BMS', 'IoT', 'Energy Management', 'Security'],
      featured: false,
    },
    {
      id: 'villa-bodrum',
      title: 'Bodrum Yazlik Villa',
      category: 'villa',
      year: '2024',
      challenge:
        'Sezonluk kullanilan villanin uzaktan izleme, guvenlik ve enerji optimizasyonu.',
      approach:
        'Bulut tabanli uzaktan erisim, nem/sicaklik kontrolu ve guvenlik entegrasyonu.',
      impact:
        'Sezon disi enerji tuketiminde %70 azalma, 7/24 uzaktan izleme.',
      stats: [
        { label: 'Alan', value: '450m²' },
        { label: 'Enerji', value: '-%70' },
        { label: 'Erisim', value: '7/24' },
      ],
      tags: ['Remote Access', 'Cloud', 'Security', 'HVAC'],
      featured: false,
    },
    {
      id: 'residence-ankara',
      title: 'Ankara Cankaya Rezidans',
      category: 'residence',
      year: '2023',
      challenge:
        '180 daireli rezidansin guvenlik ve erisim kontrol sisteminin yenilenmesi.',
      approach:
        'QR kodlu misafir erisimi, yuz tanima ve mobil uygulama entegrasyonu.',
      impact:
        'Guvenlik olaylarinda %95 azalma, sakin memnuniyetinde %40 artis.',
      stats: [
        { label: 'Daire', value: '180' },
        { label: 'Guvenlik', value: '-%95' },
        { label: 'Memnuniyet', value: '+%40' },
      ],
      tags: ['Access Control', 'Face Recognition', 'Mobile App'],
      featured: false,
    },
    // ============================================
    // YAZILIM & PLATFORMLAR
    // ============================================
    {
      id: 'nuvia-crm',
      title: 'Nuvia Etkinlik Yonetim Platformu',
      category: 'saas',
      year: '2024',
      challenge:
        'Buyuk olcekli organizasyonlar icin uctan uca planlama, butce ve operasyonel takip ihtiyaci.',
      approach:
        'Mikroservis mimarisi, React Native mobil, AWS altyapisi ve gercek zamanli misafir takibi.',
      impact:
        'Enterprise seviye olceklenebilirlik, %99.9 uptime, 50+ kurumsal musteri.',
      stats: [
        { label: 'Platform', value: 'Web/Mobile' },
        { label: 'Olcek', value: 'Enterprise' },
        { label: 'Uptime', value: '%99.9' },
      ],
      tags: ['React Native', 'Node.js', 'AWS', 'MongoDB'],
      featured: false,
    },
  ],
  en: [
    // ============================================
    // FEATURED - MAIN PROJECTS
    // ============================================
    {
      id: 'smart-villa-beykoz',
      title: 'Beykoz Villa Project',
      category: 'villa',
      year: '2024',
      challenge:
        'Converting a 1200m² villa overlooking the Bosphorus to a full automation system without disrupting existing infrastructure.',
      approach:
        'Existing wiring analysis, wireless sensor networks, and hybrid communication protocols for retrofitting solution.',
      impact:
        '42% reduction in energy consumption, management of 47 different systems from a single point.',
      stats: [
        { label: 'Area', value: '1,200m²' },
        { label: 'Systems', value: '47' },
        { label: 'Savings', value: '42%' },
      ],
      tags: ['KNX', 'Matter', 'IoT', 'Retrofitting'],
      featured: true,
    },
    {
      id: 'fire-analysis-module',
      title: 'Industrial IoT Fire Analysis Module',
      category: 'embedded',
      year: '2023',
      challenge:
        'Solving the high false alarm rate and slow response time of traditional fire detectors.',
      approach:
        'Hardware design with neural networks processing smoke and heat data in nanoseconds, capable of edge decision-making.',
      impact:
        'False alarm rate dropped to 0.01%, response time under 50ms, ATEX-compliant production.',
      stats: [
        { label: 'Detection', value: '<50ms' },
        { label: 'False Alarm', value: '0.01%' },
        { label: 'Protocol', value: 'LoRaWAN' },
      ],
      tags: ['Altium', 'STM32', 'Edge AI', 'C++'],
      featured: true,
    },
    {
      id: 'underground-mining-safety',
      title: 'Underground Personnel Positioning Network',
      category: 'industrial',
      year: '2022',
      challenge:
        'Establishing personnel tracking and emergency communication in mine tunnels without GPS signal.',
      approach:
        'RF Mesh technology working even under meters of rock, with Man-Down (immobility) detection feature.',
      impact:
        'ATEX-compliant design, 2km+ coverage, 2-year battery life for uninterrupted safety.',
      stats: [
        { label: 'Coverage', value: '2km+' },
        { label: 'Battery', value: '2 Years' },
        { label: 'Certified', value: 'ATEX' },
      ],
      tags: ['RF Mesh', 'Zigbee', 'Embedded C', 'Safety'],
      featured: true,
    },
    // ============================================
    // EMBEDDED SYSTEMS & HARDWARE
    // ============================================
    {
      id: 'smart-coffee-automation',
      title: 'PID Controlled Barista Automation',
      category: 'embedded',
      year: '2023',
      challenge:
        'Precise temperature and pressure control for consistent taste profile in professional coffee machines.',
      approach:
        'PID algorithms with 0.1°C precision heat management, flow meter integration, and touchscreen HMI design.',
      impact:
        'Coffee consistency increased to 98%, energy consumption reduced by 25%, user experience score 4.9/5.',
      stats: [
        { label: 'Precision', value: '±0.1°C' },
        { label: 'Control', value: 'PID' },
        { label: 'Energy', value: '-25%' },
      ],
      tags: ['PID Control', 'HMI Design', 'Embedded C++', 'Power Electronics'],
      featured: false,
    },
    {
      id: 'high-efficiency-pmu',
      title: 'High Efficiency Power Management Unit (PMU)',
      category: 'embedded',
      year: '2022',
      challenge:
        'Designing a compact, high-efficiency, EMC-compliant power supply for LED lighting systems.',
      approach:
        'Buck/Boost converters, active PFC, and thermal management targeting 96% efficiency.',
      impact:
        '96% energy efficiency, short-circuit/overload protections, CE and EMC certifications.',
      stats: [
        { label: 'Efficiency', value: '96%' },
        { label: 'Protection', value: '4 Layer' },
        { label: 'Certified', value: 'CE/EMC' },
      ],
      tags: ['Power Electronics', 'Buck Converter', 'EMC', 'Altium'],
      featured: false,
    },
    // ============================================
    // INDUSTRIAL SOLUTIONS
    // ============================================
    {
      id: 'cold-chain-monitoring',
      title: 'Critical Cold Chain Monitoring System',
      category: 'industrial',
      year: '2023',
      challenge:
        'Continuous temperature monitoring and alarm system in -40°C conditions for pharmaceutical and food storage.',
      approach:
        'GSM-based data transmission, cloud dashboard, 48-hour autonomous operation during power outages.',
      impact:
        '99.99% uptime, FDA and ISO 22000 compliance, 85% reduction in product losses.',
      stats: [
        { label: 'Range', value: '-40°C / +85°C' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Backup', value: '48 Hours' },
      ],
      tags: ['GSM/GPRS', 'Cloud IoT', 'PCB Design', 'MQTT'],
      featured: false,
    },
    {
      id: 'predictive-maintenance',
      title: 'Predictive Maintenance & Vibration Analyzer',
      category: 'industrial',
      year: '2024',
      challenge:
        'Early detection of unexpected failures and planned maintenance optimization in industrial motors.',
      approach:
        'Vibration analysis with FFT algorithms, machine learning-based fault prediction.',
      impact:
        'Detecting bearing failures 2 weeks in advance, 78% reduction in unplanned downtime, 6-month ROI.',
      stats: [
        { label: 'Sampling', value: '10kHz' },
        { label: 'Prediction', value: '2 Weeks' },
        { label: 'ROI', value: '6 Months' },
      ],
      tags: ['DSP', 'Python', 'FFT', 'Machine Learning'],
      featured: false,
    },
    {
      id: 'factory-gebze',
      title: 'Gebze Production Facility OEE System',
      category: 'industrial',
      year: '2023',
      challenge:
        'Continuous energy monitoring and equipment health tracking in a 24/7 production line.',
      approach:
        'Edge computing-based data collection, machine learning anomaly detection, and OEE optimization.',
      impact:
        '78% reduction in unplanned downtime, overall equipment effectiveness (OEE) increased to 89%.',
      stats: [
        { label: 'Lines', value: '12' },
        { label: 'Downtime', value: '-78%' },
        { label: 'OEE', value: '89%' },
      ],
      tags: ['SCADA', 'PLC', 'Edge Computing', 'OPC-UA'],
      featured: false,
    },
    // ============================================
    // SMART BUILDING & RESIDENCE
    // ============================================
    {
      id: 'residence-maslak',
      title: 'Maslak Towers Residence',
      category: 'residence',
      year: '2023',
      challenge:
        'Modernization of energy management and common area security systems for a 340-unit Class A residence.',
      approach:
        'Central BMS platform, IoT sensor network, and integration of predictive maintenance algorithms.',
      impact:
        '2.1M TL savings in annual energy costs, 60% reduction in maintenance costs.',
      stats: [
        { label: 'Units', value: '340' },
        { label: 'Savings', value: '2.1M TL' },
        { label: 'Maintenance', value: '-60%' },
      ],
      tags: ['BMS', 'IoT', 'Energy Management', 'Security'],
      featured: false,
    },
    {
      id: 'villa-bodrum',
      title: 'Bodrum Summer Villa',
      category: 'villa',
      year: '2024',
      challenge:
        'Remote monitoring, security, and energy optimization for a seasonally used villa.',
      approach:
        'Cloud-based remote access, humidity/temperature control, and security integration.',
      impact:
        '70% reduction in off-season energy consumption, 24/7 remote monitoring.',
      stats: [
        { label: 'Area', value: '450m²' },
        { label: 'Energy', value: '-70%' },
        { label: 'Access', value: '24/7' },
      ],
      tags: ['Remote Access', 'Cloud', 'Security', 'HVAC'],
      featured: false,
    },
    {
      id: 'residence-ankara',
      title: 'Ankara Cankaya Residence',
      category: 'residence',
      year: '2023',
      challenge:
        'Renewal of security and access control system for a 180-unit residence.',
      approach:
        'QR-coded guest access, face recognition, and mobile app integration.',
      impact:
        '95% reduction in security incidents, 40% increase in resident satisfaction.',
      stats: [
        { label: 'Units', value: '180' },
        { label: 'Security', value: '-95%' },
        { label: 'Satisfaction', value: '+40%' },
      ],
      tags: ['Access Control', 'Face Recognition', 'Mobile App'],
      featured: false,
    },
    // ============================================
    // SOFTWARE & PLATFORMS
    // ============================================
    {
      id: 'nuvia-crm',
      title: 'Nuvia Event Management Platform',
      category: 'saas',
      year: '2024',
      challenge:
        'End-to-end planning, budget, and operational tracking needs for large-scale organizations.',
      approach:
        'Microservice architecture, React Native mobile, AWS infrastructure, and real-time guest tracking.',
      impact:
        'Enterprise-level scalability, 99.9% uptime, 50+ corporate clients.',
      stats: [
        { label: 'Platform', value: 'Web/Mobile' },
        { label: 'Scale', value: 'Enterprise' },
        { label: 'Uptime', value: '99.9%' },
      ],
      tags: ['React Native', 'Node.js', 'AWS', 'MongoDB'],
      featured: false,
    },
  ],
};

const categories = {
  tr: [
    { id: 'all', label: 'Tumu' },
    { id: 'embedded', label: 'Gomulu Sistem' },
    { id: 'industrial', label: 'Endustriyel' },
    { id: 'villa', label: 'Villa' },
    { id: 'residence', label: 'Rezidans' },
    { id: 'saas', label: 'Yazilim' },
  ],
  en: [
    { id: 'all', label: 'All' },
    { id: 'embedded', label: 'Embedded' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'villa', label: 'Villa' },
    { id: 'residence', label: 'Residence' },
    { id: 'saas', label: 'Software' },
  ],
};

export default function ProjectsClient({ lang }: ProjectsClientProps) {
  const t = getTranslations(lang);
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = projectsData[lang] || projectsData.tr;
  const cats = categories[lang] || categories.tr;

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-onyx-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase">
              <span className="w-8 h-px bg-engineer-500" />
              {t.projects.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-hero-md md:text-hero-lg font-bold text-offwhite-400 mb-6"
          >
            {t.projects.heroTitle}{' '}
            <span className="text-engineer-500">{t.projects.heroHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-offwhite-700 max-w-2xl mb-12"
          >
            {t.projects.heroSubtitle}
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Filter size={16} className="text-offwhite-800" />
            {cats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-engineer-500 text-white'
                    : 'bg-white/5 text-offwhite-600 hover:bg-white/10 hover:text-offwhite-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {activeCategory === 'all' && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <span className="text-offwhite-800 text-sm uppercase tracking-wide">
              {t.projects.featured}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-1">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-onyx-800"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-onyx-700 to-onyx-900" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-900 via-onyx-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  {/* Category & Year */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-offwhite-600 uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span className="text-offwhite-800 text-xs font-mono">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-offwhite-400 mb-4 group-hover:text-engineer-500 transition-colors">
                    {project.title}
                  </h3>

                  {/* Challenge Preview */}
                  <p className="text-sm text-offwhite-700 mb-6 line-clamp-2">
                    {project.challenge}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 mb-6">
                    {project.stats.map((stat, idx) => (
                      <div key={idx}>
                        <div className="font-mono text-lg font-bold text-offwhite-400">
                          {stat.value}
                        </div>
                        <div className="text-xs text-offwhite-800 uppercase">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-engineer-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t.projects.viewProject}</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {activeCategory === 'all' && (
            <div className="mb-12">
              <span className="text-offwhite-800 text-sm uppercase tracking-wide">
                {t.projects.allProjects}
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  {/* Project Card */}
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-xl bg-onyx-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-onyx-700 to-onyx-900" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-onyx-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-2 px-4 py-2 bg-engineer-500 rounded-lg text-white text-sm font-medium">
                        <span>{t.projects.viewProject}</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-onyx-900/80 backdrop-blur-sm rounded-full text-xs text-offwhite-600 uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    {/* Title & Year */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-offwhite-400 group-hover:text-engineer-500 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-offwhite-800 font-mono text-sm flex-shrink-0">
                        {project.year}
                      </span>
                    </div>

                    {/* Case Study Sections */}
                    <div className="space-y-3 text-sm">
                      {/* Challenge */}
                      <div>
                        <span className="text-engineer-500 font-mono text-xs uppercase tracking-wide">
                          {t.projects.caseStudy.challenge}
                        </span>
                        <p className="text-offwhite-700 mt-1 line-clamp-2">
                          {project.challenge}
                        </p>
                      </div>

                      {/* Approach */}
                      <div>
                        <span className="text-blue-500 font-mono text-xs uppercase tracking-wide">
                          {t.projects.caseStudy.approach}
                        </span>
                        <p className="text-offwhite-700 mt-1 line-clamp-2">
                          {project.approach}
                        </p>
                      </div>

                      {/* Impact */}
                      <div>
                        <span className="text-success-500 font-mono text-xs uppercase tracking-wide">
                          {t.projects.caseStudy.impact}
                        </span>
                        <p className="text-offwhite-700 mt-1 line-clamp-2">
                          {project.impact}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 pt-4 border-t border-white/5">
                      {project.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="font-mono text-lg font-bold text-offwhite-400">
                            {stat.value}
                          </div>
                          <div className="text-xs text-offwhite-800 uppercase">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr'
                ? 'Projenizi birlikte tasarlayalim'
                : "Let's design your project together"}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {lang === 'tr'
                ? 'Muhendislik ekibimiz, ihtiyaclariniza ozel bir cozum tasarlamak icin hazir.'
                : 'Our engineering team is ready to design a custom solution for your needs.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-lg transition-all duration-300"
            >
              <span>{t.nav.engineeringRequest}</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
