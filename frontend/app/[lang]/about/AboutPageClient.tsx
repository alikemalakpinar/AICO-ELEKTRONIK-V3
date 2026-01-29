'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { getTranslations, type Locale } from '@/lib/i18n';
import {
  ArrowRight,
  Rocket,
  Target,
  Lightbulb,
  Users,
  Zap,
  Code,
  Cpu,
  Shield,
  Globe,
  Award,
  TrendingUp,
} from 'lucide-react';

interface AboutPageClientProps {
  lang: Locale;
}

// Cinematic Timeline Item Component
function TimelineItem({
  year,
  title,
  description,
  isLeft,
  index,
  accentColor = '#F97316',
}: {
  year: string;
  title: string;
  description: string;
  isLeft: boolean;
  index: number;
  accentColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50, rotateY: isLeft ? -15 : 15 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
    >
      {/* Timeline dot with glow */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
          className="relative"
        >
          <div
            className="w-4 h-4 rounded-full border-2 border-onyx-900"
            style={{ backgroundColor: accentColor }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: [0, 0.5, 0], scale: [0.5, 2, 2.5] } : {}}
            transition={{ duration: 1.5, delay: index * 0.15 + 0.5 }}
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          className="p-6 bg-onyx-800/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300 group"
        >
          <span
            className="inline-block font-mono text-sm mb-3"
            style={{ color: accentColor }}
          >
            {year}
          </span>
          <h3 className="text-xl font-bold text-offwhite-400 mb-2 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-offwhite-600 text-sm leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Team Member Card with hover animation
function TeamMemberCard({
  name,
  role,
  skills,
  index,
}: {
  name: string;
  role: string;
  skills: string[];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative perspective-1000"
    >
      <div className="relative p-6 bg-onyx-800/50 border border-white/5 rounded-2xl overflow-hidden hover:border-engineer-500/30 transition-all duration-500 hover:-translate-y-1">
        {/* Animated background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-engineer-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Avatar placeholder with initials */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-engineer-500/20 to-engineer-600/20 flex items-center justify-center text-engineer-500 text-xl font-bold group-hover:scale-110 transition-transform duration-300">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          {/* Working animation indicator */}
          <motion.div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success-500 border-2 border-onyx-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Code size={10} className="text-white" />
          </motion.div>
        </div>

        {/* Info */}
        <h3 className="text-lg font-semibold text-offwhite-400 mb-1 group-hover:text-white transition-colors">
          {name}
        </h3>
        <p className="text-sm text-engineer-500 mb-4">{role}</p>

        {/* Skills - revealed on hover */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 'auto', opacity: 1 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-white/5 rounded-md text-xs text-offwhite-600 group-hover:bg-engineer-500/10 group-hover:text-engineer-400 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AboutPageClient({ lang }: AboutPageClientProps) {
  const t = getTranslations(lang);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for timeline line fill
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const values = [
    {
      icon: Rocket,
      title: lang === 'tr' ? 'Vizyon Odakli' : 'Vision-Driven',
      description:
        lang === 'tr'
          ? 'Gelecegin teknolojilerini bugun insa ediyoruz. Her projede sinirlari zorluyoruz.'
          : "We build tomorrow's technologies today. We push boundaries in every project.",
      color: '#3B82F6',
    },
    {
      icon: Target,
      title: lang === 'tr' ? 'Sonuc Odakli' : 'Results-Focused',
      description:
        lang === 'tr'
          ? 'Olculebilir basari kriterleri. Challenge-Approach-Impact metodolojisi.'
          : 'Measurable success criteria. Challenge-Approach-Impact methodology.',
      color: '#10B981',
    },
    {
      icon: Lightbulb,
      title: lang === 'tr' ? 'Inovasyon' : 'Innovation',
      description:
        lang === 'tr'
          ? 'En son teknolojiler, yaratici cozumler. Standartlari biz belirliyoruz.'
          : 'Cutting-edge technologies, creative solutions. We set the standards.',
      color: '#F59E0B',
    },
    {
      icon: Users,
      title: lang === 'tr' ? 'Isbirligi' : 'Collaboration',
      description:
        lang === 'tr'
          ? 'Musterilerimizle birlikte buyuyoruz. Her proje bir ortaklik.'
          : 'We grow with our clients. Every project is a partnership.',
      color: '#8B5CF6',
    },
  ];

  const milestones = [
    {
      year: '2023 Q1',
      title: lang === 'tr' ? 'Kuruluş' : 'Foundation',
      description:
        lang === 'tr'
          ? 'AICO Elektronik, deneyimli muhendisler tarafindan Istanbul\'da kuruldu. Ilk ofis, ilk vizyon.'
          : 'AICO Elektronik founded by experienced engineers in Istanbul. First office, first vision.',
      color: '#F97316',
    },
    {
      year: '2023 Q2',
      title: lang === 'tr' ? 'Ilk Smart Villa Projesi' : 'First Smart Villa Project',
      description:
        lang === 'tr'
          ? '47 sensorlu entegre ev otomasyonu sistemi tamamlandi. Teknoloji ve luks birlesimi.'
          : 'Completed integrated home automation with 47 sensors. Technology meets luxury.',
      color: '#10B981',
    },
    {
      year: '2023 Q4',
      title: lang === 'tr' ? 'Endustriyel IoT Lansmanı' : 'Industrial IoT Launch',
      description:
        lang === 'tr'
          ? 'FireLink ve MineGuard urunleri piyasaya suruldu. Guvenlik sektorunde devrim.'
          : 'FireLink and MineGuard products launched. Revolution in safety sector.',
      color: '#EF4444',
    },
    {
      year: '2024 Q1',
      title: lang === 'tr' ? 'Rezidans Platformu' : 'Residence Platform',
      description:
        lang === 'tr'
          ? '500+ dairelik akilli site yonetim sistemi devreye alindi. Olceklenebilir mimari.'
          : 'Smart site management for 500+ units deployed. Scalable architecture.',
      color: '#3B82F6',
    },
    {
      year: '2024 Q3',
      title: lang === 'tr' ? 'ColdTrack & AICO Coffee' : 'ColdTrack & AICO Coffee',
      description:
        lang === 'tr'
          ? 'Soguk zincir izleme ve akilli kahve makinesi urunleri eklendi. Portfoy genisledi.'
          : 'Cold chain monitoring and smart coffee machine products added. Portfolio expanded.',
      color: '#06B6D4',
    },
    {
      year: '2025',
      title: lang === 'tr' ? 'Vizyon' : 'Vision',
      description:
        lang === 'tr'
          ? 'Turkiye\'nin lider akilli yasam teknolojileri sirketi olmak. Uluslararasi acilim.'
          : "Becoming Turkey's leading smart living tech company. International expansion.",
      color: '#8B5CF6',
    },
  ];

  const team = [
    {
      name: 'Ali Kemal Akpinar',
      role: lang === 'tr' ? 'Kurucu & CEO' : 'Founder & CEO',
      skills: ['IoT Architecture', 'Embedded Systems', 'Product Strategy'],
    },
    {
      name: 'Muhendislik Ekibi',
      role: lang === 'tr' ? 'Donanım & Yazılım' : 'Hardware & Software',
      skills: ['PCB Design', 'Firmware', 'Cloud', 'Mobile'],
    },
    {
      name: 'Proje Yönetimi',
      role: lang === 'tr' ? 'Teslimat & Destek' : 'Delivery & Support',
      skills: ['Agile', 'Client Relations', 'Quality Assurance'],
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-onyx-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
          <motion.div
            className="absolute top-20 right-20 w-2 h-2 rounded-full bg-engineer-500"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.div
            className="absolute bottom-40 left-40 w-1.5 h-1.5 rounded-full bg-cyan-500"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1 }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'HAKKIMIZDA' : 'ABOUT US'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite-400 mb-6 tracking-tight">
              {lang === 'tr' ? 'Genc, Vizyoner, Kararli' : 'Young, Visionary, Determined'}
            </h1>
            <p className="text-xl text-offwhite-600 leading-relaxed max-w-3xl">
              {lang === 'tr'
                ? '2 yillik genc bir sirket olarak, 20 yillik deneyime sahip muhendislerle, Turkiye\'nin akilli yasam teknolojileri alaninda lider markasi olmak icin calisiyoruz.'
                : "As a 2-year-old young company, with engineers having 20 years of experience, we're working to become Turkey's leading brand in smart living technologies."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with animated counters */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2+', label: lang === 'tr' ? 'Yil Inovasyon' : 'Years of Innovation', icon: TrendingUp },
              { value: '50+', label: lang === 'tr' ? 'Tamamlanan Proje' : 'Projects Completed', icon: Award },
              { value: '1000+', label: lang === 'tr' ? 'Entegre Sensor' : 'Integrated Sensors', icon: Cpu },
              { value: '%98', label: lang === 'tr' ? 'Musteri Memnuniyeti' : 'Client Satisfaction', icon: Shield },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-engineer-500/10 mb-4 group-hover:bg-engineer-500/20 transition-colors">
                  <stat.icon size={24} className="text-engineer-500" />
                </div>
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="font-mono text-4xl md:text-5xl font-bold text-engineer-500 mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-offwhite-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-8">
              {lang === 'tr' ? 'Hikayemiz' : 'Our Story'}
            </h2>
            <div className="space-y-6 text-lg text-offwhite-600 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {lang === 'tr'
                  ? 'AICO Elektronik, 2023 yilinda deneyimli bir muhendislik ekibi tarafindan kuruldu. Amacimiz basit: Teknolojiyi gorunmez kilarak yasam kalitesini artirmak.'
                  : 'AICO Elektronik was founded in 2023 by an experienced engineering team. Our goal is simple: To improve quality of life by making technology invisible.'}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {lang === 'tr'
                  ? 'Genc bir sirket olarak agility ve inovasyonu birlestiriyoruz. Buyuk kurumsal sirketlerin agirligi yerine, startup hizi ve esnekligini tercih ediyoruz.'
                  : 'As a young company, we combine agility with innovation. Instead of the weight of large corporations, we prefer startup speed and flexibility.'}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {lang === 'tr'
                  ? 'Villa otomasyonundan site yonetim platformlarina, endustriyel IoT cozumlerinden ozel elektronik tasarima kadar genis bir yelpazede hizmet veriyoruz.'
                  : "From villa automation to site management platforms, from industrial IoT solutions to custom electronic design, we serve a wide range."}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-onyx-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'DEGERLERIMIZ' : 'OUR VALUES'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Bizi Yonlendiren Ilkeler' : 'Principles That Guide Us'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 bg-onyx-800/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-500"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${value.color}15` }}
                  >
                    <Icon size={28} style={{ color: value.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-offwhite-400 mb-2 group-hover:text-white transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm text-offwhite-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cinematic Timeline Section */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'YOLCULUGUMUZ' : 'OUR JOURNEY'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Zaman Cizelgesi' : 'Timeline'}
            </h2>
            <p className="text-lg text-offwhite-600">
              {lang === 'tr'
                ? 'Kisa ama etkili bir gecmis, buyuk hedefler.'
                : 'A short but impactful past, big goals ahead.'}
            </p>
          </motion.div>

          <div className="relative">
            {/* Animated timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
              <motion.div
                className="w-full bg-gradient-to-b from-engineer-500 via-cyan-500 to-purple-500"
                style={{ height: lineHeight }}
              />
            </div>

            {/* Timeline items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <TimelineItem
                  key={index}
                  year={milestone.year}
                  title={milestone.title}
                  description={milestone.description}
                  isLeft={index % 2 === 0}
                  index={index}
                  accentColor={milestone.color}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-onyx-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'EKIBIMIZ' : 'OUR TEAM'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Arkasindaki Insanlar' : 'The People Behind'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                role={member.role}
                skills={member.skills}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Globe size={48} className="text-engineer-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Vizyonumuza Ortak Olun' : 'Join Our Vision'}
            </h2>
            <p className="text-lg text-offwhite-600 mb-10">
              {lang === 'tr'
                ? 'Akilli yasam teknolojileri alaninda bir sonraki projenizi birlikte gelistirelim.'
                : "Let's develop your next project together in smart living technologies."}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-engineer-500/25"
            >
              <span>{t.nav.engineeringRequest}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
