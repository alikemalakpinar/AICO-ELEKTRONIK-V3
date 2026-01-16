import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Shield, Thermometer, Zap, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ScrollyTellingContainer from '../components/premium/ScrollyTellingContainer';

/**
 * SmartVillaPage - Premium Scrollytelling Experience
 *
 * Tema: "Kişisel Lüks, Görünmez Teknoloji"
 * Apple-style scroll-driven storytelling
 */

const SmartVillaPage = ({ lang = 'tr' }) => {
  const { t } = useTranslation();

  // Scene data for scrollytelling
  const scenes = [
    {
      id: 'morning-wakeup',
      label: t('smartVilla.scene1.label'),
      title: t('smartVilla.scene1.title'),
      description: t('smartVilla.scene1.description'),
      stats: [
        { label: t('smartVilla.scene1.stat1Label'), value: t('smartVilla.scene1.stat1Value') },
        { label: t('smartVilla.scene1.stat2Label'), value: t('smartVilla.scene1.stat2Value') },
      ],
      backgroundType: 'gradient',
      accentColor: 'rgba(251, 191, 36, 0.12)', // Warm yellow for morning
      icon: Sun,
    },
    {
      id: 'smart-security',
      label: t('smartVilla.scene2.label'),
      title: t('smartVilla.scene2.title'),
      description: t('smartVilla.scene2.description'),
      stats: [
        { label: t('smartVilla.scene2.stat1Label'), value: t('smartVilla.scene2.stat1Value') },
        { label: t('smartVilla.scene2.stat2Label'), value: t('smartVilla.scene2.stat2Value') },
      ],
      backgroundType: 'gradient',
      accentColor: 'rgba(59, 130, 246, 0.1)', // Blue for security
      icon: Shield,
    },
    {
      id: 'predictive-comfort',
      label: t('smartVilla.scene3.label'),
      title: t('smartVilla.scene3.title'),
      description: t('smartVilla.scene3.description'),
      stats: [
        { label: t('smartVilla.scene3.stat1Label'), value: t('smartVilla.scene3.stat1Value') },
        { label: t('smartVilla.scene3.stat2Label'), value: t('smartVilla.scene3.stat2Value') },
      ],
      backgroundType: 'gradient',
      accentColor: 'rgba(34, 197, 94, 0.1)', // Green for comfort
      icon: Thermometer,
    },
    {
      id: 'energy-management',
      label: t('smartVilla.scene4.label'),
      title: t('smartVilla.scene4.title'),
      description: t('smartVilla.scene4.description'),
      stats: [
        { label: t('smartVilla.scene4.stat1Label'), value: t('smartVilla.scene4.stat1Value') },
        { label: t('smartVilla.scene4.stat2Label'), value: t('smartVilla.scene4.stat2Value') },
      ],
      backgroundType: 'gradient',
      accentColor: 'rgba(249, 115, 22, 0.12)', // Orange for energy
      icon: Zap,
    },
  ];

  // Hero Content
  const heroContent = (
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-offwhite-700 text-sm font-mono">
          <span className="w-1.5 h-1.5 bg-engineer-500 rounded-full animate-pulse" />
          SMART VILLA SOLUTION
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-hero-md md:text-hero-lg lg:text-hero-xl font-bold text-offwhite-400 mb-6"
      >
        {t('smartVilla.heroTitle')}
        <br />
        <span className="text-engineer-500">{t('smartVilla.heroHighlight')}</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl text-offwhite-700 max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        {t('smartVilla.heroSubtitle')}
      </motion.p>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <span className="text-offwhite-800 text-sm">{t('common.scrollDown')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-offwhite-700" />
        </motion.div>
      </motion.div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-engineer-500/10 via-transparent to-transparent opacity-50" />
      </div>
    </div>
  );

  // CTA Content
  const ctaContent = (
    <div className="max-w-3xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* CTA Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 mb-6 tracking-tight">
          {t('smartVilla.ctaTitle')}
        </h2>

        {/* CTA Subtitle */}
        <p className="text-lg md:text-xl text-offwhite-700 mb-10 max-w-xl mx-auto">
          {t('smartVilla.ctaSubtitle')}
        </p>

        {/* CTA Button */}
        <Link
          to={`/${lang}/contact`}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-lg transition-all duration-300 shadow-glow-orange hover:shadow-glow-orange-lg"
        >
          <span>{t('smartVilla.ctaButton')}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Trust Badge */}
        <div className="mt-12 flex items-center justify-center gap-8 text-offwhite-800 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success-500 rounded-full" />
            <span>ISO 27001</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success-500 rounded-full" />
            <span>KVKK Uyumlu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success-500 rounded-full" />
            <span>7/24 Destek</span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{lang === 'tr' ? 'Akilli Villa Cozumleri | AICO' : 'Smart Villa Solutions | AICO'}</title>
        <meta
          name="description"
          content={lang === 'tr'
            ? 'AICO Akilli Villa cozumleri - Kisisel luks, gorunmez teknoloji. Evinizi bir yasam partnerine donusturun.'
            : 'AICO Smart Villa solutions - Personal luxury, invisible technology. Transform your home into a life partner.'}
        />
      </Helmet>

      {/* Main Premium Dark Background */}
      <div className="min-h-screen bg-onyx-900">
        {/* Scrollytelling Container */}
        <ScrollyTellingContainer
          scenes={scenes}
          heroContent={heroContent}
          ctaContent={ctaContent}
        />

        {/* Feature Grid Section */}
        <section className="relative z-10 py-32 bg-onyx-900">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-spec-sm tracking-tech uppercase mb-4">
                <span className="w-8 h-px bg-engineer-500" />
                {lang === 'tr' ? 'TEKNIK OZELLIKLER' : 'TECHNICAL SPECIFICATIONS'}
                <span className="w-8 h-px bg-engineer-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400">
                {lang === 'tr' ? 'Muhendislik Detaylari' : 'Engineering Details'}
              </h2>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {scenes.map((scene, index) => {
                const Icon = scene.icon;
                return (
                  <motion.div
                    key={scene.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-6 bg-white/[0.02] border border-white/5 rounded-xl hover:border-engineer-500/30 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-engineer-500/10 text-engineer-500 mb-4 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-offwhite-400 mb-2">
                      {scene.label}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-offwhite-700 mb-4 line-clamp-3">
                      {scene.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4 pt-4 border-t border-white/5">
                      {scene.stats.map((stat, idx) => (
                        <div key={idx} className="flex-1">
                          <div className="font-mono text-lg font-bold text-offwhite-400">
                            {stat.value}
                          </div>
                          <div className="text-xs text-offwhite-800 uppercase tracking-wide">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Visual Mockup Section */}
        <section className="relative z-10 py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-spec-sm tracking-tech uppercase mb-4">
                  <span className="w-8 h-px bg-engineer-500" />
                  {lang === 'tr' ? 'KONTROL PANELI' : 'CONTROL PANEL'}
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
                  {lang === 'tr'
                    ? 'Her sey parmaklarinizin ucunda'
                    : 'Everything at your fingertips'}
                </h2>

                <p className="text-lg text-offwhite-700 mb-8">
                  {lang === 'tr'
                    ? 'Sezgisel arayuzumuz ile tum sistemleri tek bir noktadan yonetin. Mobil, tablet veya duvar panelinden - her yerden erisim.'
                    : 'Manage all systems from a single point with our intuitive interface. Access from mobile, tablet, or wall panel - from anywhere.'}
                </p>

                {/* Feature List */}
                <ul className="space-y-4">
                  {[
                    lang === 'tr' ? 'Gercek zamanli enerji izleme' : 'Real-time energy monitoring',
                    lang === 'tr' ? 'Senaryo bazli otomasyon' : 'Scenario-based automation',
                    lang === 'tr' ? 'Sesli asistan entegrasyonu' : 'Voice assistant integration',
                    lang === 'tr' ? 'Uzaktan erisim ve kontrol' : 'Remote access and control',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-offwhite-600">
                      <div className="w-1.5 h-1.5 bg-engineer-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right Visual Mockup */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Dashboard Mockup */}
                <div className="relative aspect-video bg-onyx-800 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-onyx-700/50 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-error-500" />
                      <div className="w-3 h-3 rounded-full bg-warning-500" />
                      <div className="w-3 h-3 rounded-full bg-success-500" />
                    </div>
                    <span className="text-offwhite-700 text-sm font-mono">AICO Dashboard</span>
                    <div className="w-16" />
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 grid grid-cols-3 gap-4">
                    {/* Temperature Widget */}
                    <div className="col-span-1 p-4 bg-white/[0.03] rounded-lg border border-white/5">
                      <div className="text-offwhite-800 text-xs mb-2">{lang === 'tr' ? 'Sicaklik' : 'Temperature'}</div>
                      <div className="font-mono text-2xl text-offwhite-400">22°C</div>
                      <div className="w-full h-1 bg-onyx-600 rounded-full mt-3">
                        <div className="w-2/3 h-full bg-success-500 rounded-full" />
                      </div>
                    </div>

                    {/* Energy Widget */}
                    <div className="col-span-1 p-4 bg-white/[0.03] rounded-lg border border-white/5">
                      <div className="text-offwhite-800 text-xs mb-2">{lang === 'tr' ? 'Enerji' : 'Energy'}</div>
                      <div className="font-mono text-2xl text-offwhite-400">2.4kW</div>
                      <div className="w-full h-1 bg-onyx-600 rounded-full mt-3">
                        <div className="w-1/2 h-full bg-engineer-500 rounded-full" />
                      </div>
                    </div>

                    {/* Security Widget */}
                    <div className="col-span-1 p-4 bg-white/[0.03] rounded-lg border border-white/5">
                      <div className="text-offwhite-800 text-xs mb-2">{lang === 'tr' ? 'Guvenlik' : 'Security'}</div>
                      <div className="font-mono text-2xl text-success-500">Aktif</div>
                      <div className="flex items-center gap-1 mt-3">
                        <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                        <span className="text-xs text-offwhite-800">{lang === 'tr' ? 'Tum sistemler' : 'All systems'}</span>
                      </div>
                    </div>

                    {/* Room Grid */}
                    <div className="col-span-3 p-4 bg-white/[0.03] rounded-lg border border-white/5">
                      <div className="text-offwhite-800 text-xs mb-4">{lang === 'tr' ? 'Odalar' : 'Rooms'}</div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { name: lang === 'tr' ? 'Salon' : 'Living', active: true },
                          { name: lang === 'tr' ? 'Mutfak' : 'Kitchen', active: true },
                          { name: lang === 'tr' ? 'Yatak' : 'Bedroom', active: false },
                          { name: lang === 'tr' ? 'Banyo' : 'Bathroom', active: false },
                        ].map((room, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded text-center text-xs ${
                              room.active
                                ? 'bg-engineer-500/20 text-engineer-500'
                                : 'bg-onyx-700 text-offwhite-800'
                            }`}
                          >
                            {room.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl border border-engineer-500/20" />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-engineer-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SmartVillaPage;
