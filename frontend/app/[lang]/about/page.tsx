'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getTranslations, type Locale } from '@/lib/i18n';
import { ArrowRight, Rocket, Target, Lightbulb, Users, Award, Zap } from 'lucide-react';

export default function AboutPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const t = getTranslations(lang);

  const values = [
    {
      icon: Rocket,
      title: lang === 'tr' ? 'Vizyon Odakli' : 'Vision-Driven',
      description:
        lang === 'tr'
          ? 'Gelecegin teknolojilerini bugun insa ediyoruz. Her projede sinirlari zorluyoruz.'
          : "We build tomorrow's technologies today. We push boundaries in every project.",
    },
    {
      icon: Target,
      title: lang === 'tr' ? 'Sonuc Odakli' : 'Results-Focused',
      description:
        lang === 'tr'
          ? 'Olculebilir basari kriterleri. Challenge-Approach-Impact metodolojisi.'
          : 'Measurable success criteria. Challenge-Approach-Impact methodology.',
    },
    {
      icon: Lightbulb,
      title: lang === 'tr' ? 'Inovasyon' : 'Innovation',
      description:
        lang === 'tr'
          ? 'En son teknolojiler, yaratici cozumler. Standartlari biz belirliyoruz.'
          : 'Cutting-edge technologies, creative solutions. We set the standards.',
    },
    {
      icon: Users,
      title: lang === 'tr' ? 'Isbirligi' : 'Collaboration',
      description:
        lang === 'tr'
          ? 'Musterilerimizle birlikte buyuyoruz. Her proje bir ortaklik.'
          : 'We grow with our clients. Every project is a partnership.',
    },
  ];

  const milestones = [
    {
      year: '2023',
      title: lang === 'tr' ? 'Kuruluş' : 'Foundation',
      description:
        lang === 'tr'
          ? 'AICO Elektronik, deneyimli muhendisler tarafindan kuruldu.'
          : 'AICO Elektronik founded by experienced engineers.',
    },
    {
      year: '2023',
      title: lang === 'tr' ? 'Ilk Smart Villa Projesi' : 'First Smart Villa Project',
      description:
        lang === 'tr'
          ? '47 sensorlu entegre ev otomasyonu sistemi.'
          : 'Integrated home automation system with 47 sensors.',
    },
    {
      year: '2024',
      title: lang === 'tr' ? 'Rezidans Platformu' : 'Residence Platform',
      description:
        lang === 'tr'
          ? '500+ dairelik akilli site yonetim sistemi.'
          : 'Smart site management system for 500+ units.',
    },
    {
      year: '2025',
      title: lang === 'tr' ? 'Vizyon' : 'Vision',
      description:
        lang === 'tr'
          ? 'Turkiye\'nin lider akilli yasam teknolojileri sirketi olmak.'
          : "Becoming Turkey's leading smart living technologies company.",
    },
  ];

  return (
    <div className="min-h-screen bg-onyx-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'HAKKIMIZDA' : 'ABOUT US'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr' ? 'Genc, Vizyoner, Kararli' : 'Young, Visionary, Determined'}
            </h1>
            <p className="text-xl text-offwhite-700 leading-relaxed">
              {lang === 'tr'
                ? '2 yillik genc bir sirket olarak, 20 yillik deneyime sahip muhendislerle, Turkiye\'nin akilli yasam teknolojileri alaninda lider markasi olmak icin calisiyoruz.'
                : "As a 2-year-old young company, with engineers having 20 years of experience, we're working to become Turkey's leading brand in smart living technologies."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2+', label: lang === 'tr' ? 'Yil Tecrube' : 'Years of Innovation' },
              { value: '50+', label: lang === 'tr' ? 'Tamamlanan Proje' : 'Projects Completed' },
              { value: '1000+', label: lang === 'tr' ? 'Entegre Sensor' : 'Integrated Sensors' },
              { value: '%98', label: lang === 'tr' ? 'Musteri Memnuniyeti' : 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-mono text-4xl md:text-5xl font-bold text-engineer-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-offwhite-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
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
              <p>
                {lang === 'tr'
                  ? 'AICO Elektronik, 2023 yilinda deneyimli bir muhendislik ekibi tarafindan kuruldu. Amacimiz basit: Teknolojiyi gorunmez kilarak yasam kalitesini artirmak.'
                  : 'AICO Elektronik was founded in 2023 by an experienced engineering team. Our goal is simple: To improve quality of life by making technology invisible.'}
              </p>
              <p>
                {lang === 'tr'
                  ? 'Genc bir sirket olarak agility ve inovasyonu birlestiririyoruz. Buyuk kurumsal sirketlerin agirligi yerine, startup hizi ve esnekligini tercih ediyoruz. Her projede Challenge-Approach-Impact metodolojisini kullanarak olculebilir sonuclar sunuyoruz.'
                  : 'As a young company, we combine agility with innovation. Instead of the weight of large corporations, we prefer startup speed and flexibility. We deliver measurable results using the Challenge-Approach-Impact methodology in every project.'}
              </p>
              <p>
                {lang === 'tr'
                  ? 'Villa otomasyonundan site yonetim platformlarina, endustriyel IoT cozumlerinden ozel elektronik tasarima kadar genis bir yelpazede hizmet veriyoruz. Her projemiz, musterilerimizin hayatini somut sekilde iyilestirmek icin tasarlaniyor.'
                  : "From villa automation to site management platforms, from industrial IoT solutions to custom electronic design, we serve a wide range. Every project is designed to tangibly improve our clients' lives."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-onyx-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Degerlerimiz' : 'Our Values'}
            </h2>
            <p className="text-lg text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Her kararda bizi yonlendiren ilkeler.'
                : 'The principles that guide us in every decision.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-onyx-800/50 border border-white/5 rounded-xl hover:border-engineer-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-engineer-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-offwhite-400 mb-2">{value.title}</h3>
                  <p className="text-sm text-offwhite-700">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Yolculugumuz' : 'Our Journey'}
            </h2>
            <p className="text-lg text-offwhite-700">
              {lang === 'tr'
                ? 'Kisa ama etkili bir gecmis, buyuk hedefler.'
                : 'A short but impactful past, big goals ahead.'}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-engineer-500/50 via-engineer-500/20 to-transparent" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-4 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-engineer-500 border-2 border-onyx-900" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <span className="inline-block font-mono text-sm text-engineer-500 mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold text-offwhite-400 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-offwhite-700">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Zap size={48} className="text-engineer-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Vizyonumuza Ortak Olun' : 'Join Our Vision'}
            </h2>
            <p className="text-lg text-offwhite-700 mb-8">
              {lang === 'tr'
                ? 'Akilli yasam teknolojileri alaninda bir sonraki projenizi birlikte gelistirelim.'
                : "Let's develop your next project together in smart living technologies."}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300"
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
