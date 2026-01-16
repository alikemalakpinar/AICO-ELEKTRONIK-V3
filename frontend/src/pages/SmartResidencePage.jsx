import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, QrCode, Activity, BarChart3, ChevronDown, Building2, Users, Gauge } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ScrollyTellingContainer from '../components/premium/ScrollyTellingContainer';

/**
 * SmartResidencePage - Premium Scrollytelling Experience
 *
 * Tema: "Merkezi Yönetim, Ölçeklenebilir Güç"
 * Apple-style scroll-driven storytelling for enterprise
 */

const SmartResidencePage = ({ lang = 'tr' }) => {
  const { t } = useTranslation();

  // Scene data for scrollytelling
  const scenes = [
    {
      id: 'central-platform',
      label: t('smartResidence.scene1.label'),
      title: t('smartResidence.scene1.title'),
      description: t('smartResidence.scene1.description'),
      stats: [
        { label: t('smartResidence.scene1.stat1Label'), value: t('smartResidence.scene1.stat1Value') },
        { label: t('smartResidence.scene1.stat2Label'), value: t('smartResidence.scene1.stat2Value') },
      ],
      backgroundType: 'gradient',
      accentColor: 'rgba(59, 130, 246, 0.1)', // Blue for platform
      icon: Monitor,
    },
    {
      id: 'smart-access',
      label: t('smartResidence.scene2.label'),
      title: t('smartResidence.scene2.title'),
      description: t('smartResidence.scene2.description'),
      stats: [
        { label: t('smartResidence.scene2.stat1Label'), value: t('smartResidence.scene2.stat1Value') },
        { label: t('smartResidence.scene2.stat2Label'), value: t('smartResidence.scene2.stat2Value') },
      ],
      backgroundType: 'gradient',
      accentColor: 'rgba(139, 92, 246, 0.1)', // Purple for security
      icon: QrCode,
    },
    {
      id: 'predictive-maintenance',
      label: t('smartResidence.scene3.label'),
      title: t('smartResidence.scene3.title'),
      description: t('smartResidence.scene3.description'),
      stats: [
        { label: t('smartResidence.scene3.stat1Label'), value: t('smartResidence.scene3.stat1Value') },
        { label: t('smartResidence.scene3.stat2Label'), value: t('smartResidence.scene3.stat2Value') },
      ],
      backgroundType: 'gradient',
      accentColor: 'rgba(34, 197, 94, 0.1)', // Green for maintenance
      icon: Activity,
    },
    {
      id: 'energy-optimization',
      label: t('smartResidence.scene4.label'),
      title: t('smartResidence.scene4.title'),
      description: t('smartResidence.scene4.description'),
      stats: [
        { label: t('smartResidence.scene4.stat1Label'), value: t('smartResidence.scene4.stat1Value') },
        { label: t('smartResidence.scene4.stat2Label'), value: t('smartResidence.scene4.stat2Value') },
      ],
      backgroundType: 'gradient',
      accentColor: 'rgba(249, 115, 22, 0.1)', // Orange for energy
      icon: BarChart3,
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
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          ENTERPRISE SOLUTION
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-hero-md md:text-hero-lg lg:text-hero-xl font-bold text-offwhite-400 mb-6"
      >
        {t('smartResidence.heroTitle')}
        <br />
        <span className="text-blue-500">{t('smartResidence.heroHighlight')}</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl text-offwhite-700 max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        {t('smartResidence.heroSubtitle')}
      </motion.p>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-8 mb-12"
      >
        {[
          { value: '500+', label: lang === 'tr' ? 'Daire Kapasitesi' : 'Unit Capacity' },
          { value: '24/7', label: lang === 'tr' ? 'Izleme' : 'Monitoring' },
          { value: '99.9%', label: 'Uptime' },
        ].map((metric, idx) => (
          <div key={idx} className="text-center">
            <div className="font-mono text-3xl md:text-4xl font-bold text-offwhite-400">
              {metric.value}
            </div>
            <div className="text-sm text-offwhite-800 uppercase tracking-wide mt-1">
              {metric.label}
            </div>
          </div>
        ))}
      </motion.div>

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
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-50" />
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
          {t('smartResidence.ctaTitle')}
        </h2>

        {/* CTA Subtitle */}
        <p className="text-lg md:text-xl text-offwhite-700 mb-10 max-w-xl mx-auto">
          {t('smartResidence.ctaSubtitle')}
        </p>

        {/* CTA Button */}
        <Link
          to={`/${lang}/contact`}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span>{t('smartResidence.ctaButton')}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Enterprise Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-offwhite-800 text-sm">
          <div className="flex items-center gap-2">
            <Building2 size={16} />
            <span>{lang === 'tr' ? 'Kurumsal Cozumler' : 'Enterprise Solutions'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{lang === 'tr' ? 'Ozel Destek Ekibi' : 'Dedicated Support'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={16} />
            <span>{lang === 'tr' ? 'SLA Garantisi' : 'SLA Guaranteed'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{lang === 'tr' ? 'Akilli Rezidans Cozumleri | AICO' : 'Smart Residence Solutions | AICO'}</title>
        <meta
          name="description"
          content={lang === 'tr'
            ? 'AICO Akilli Rezidans cozumleri - Merkezi yonetim, olceklenebilir guc. 500+ daireyi tek platformdan yonetin.'
            : 'AICO Smart Residence solutions - Central management, scalable power. Manage 500+ units from a single platform.'}
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

        {/* Platform Overview Section */}
        <section className="relative z-10 py-32 bg-onyx-900">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="inline-flex items-center gap-2 text-blue-500 font-mono text-spec-sm tracking-tech uppercase mb-4">
                <span className="w-8 h-px bg-blue-500" />
                {lang === 'tr' ? 'PLATFORM OZELLIKLERI' : 'PLATFORM FEATURES'}
                <span className="w-8 h-px bg-blue-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400">
                {lang === 'tr' ? 'Butunlesik Bina Yonetimi' : 'Integrated Building Management'}
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
                    className="group p-6 bg-white/[0.02] border border-white/5 rounded-xl hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 mb-4 group-hover:scale-110 transition-transform">
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

        {/* Building Dashboard Mockup */}
        <section className="relative z-10 py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 text-blue-500 font-mono text-spec-sm tracking-tech uppercase mb-4">
                <span className="w-8 h-px bg-blue-500" />
                {lang === 'tr' ? 'MERKEZI PANEL' : 'CENTRAL DASHBOARD'}
                <span className="w-8 h-px bg-blue-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
                {lang === 'tr' ? 'Tum bina tek ekranda' : 'Entire building on one screen'}
              </h2>
              <p className="text-lg text-offwhite-700 max-w-2xl mx-auto">
                {lang === 'tr'
                  ? 'Gercek zamanli izleme, anlk uyarilar ve detayli raporlama ile bina yonetimini kolaylastirin.'
                  : 'Simplify building management with real-time monitoring, instant alerts, and detailed reporting.'}
              </p>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[16/9] max-w-5xl mx-auto bg-onyx-800 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Status Bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-onyx-700/50 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-error-500" />
                    <div className="w-3 h-3 rounded-full bg-warning-500" />
                    <div className="w-3 h-3 rounded-full bg-success-500" />
                  </div>
                  <span className="text-offwhite-700 text-sm font-mono">AICO Building Management System</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-offwhite-800 font-mono">LIVE</span>
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Dashboard Grid */}
                <div className="p-6 grid grid-cols-12 gap-4 h-[calc(100%-60px)]">
                  {/* Left Sidebar - Building Overview */}
                  <div className="col-span-3 space-y-4">
                    {/* Building Stats */}
                    <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5">
                      <div className="text-offwhite-800 text-xs mb-3">{lang === 'tr' ? 'Bina Ozeti' : 'Building Summary'}</div>
                      <div className="space-y-3">
                        {[
                          { label: lang === 'tr' ? 'Toplam Daire' : 'Total Units', value: '342', status: 'normal' },
                          { label: lang === 'tr' ? 'Aktif' : 'Active', value: '318', status: 'success' },
                          { label: lang === 'tr' ? 'Bakim' : 'Maintenance', value: '12', status: 'warning' },
                          { label: lang === 'tr' ? 'Alarm' : 'Alerts', value: '2', status: 'error' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-offwhite-700 text-xs">{item.label}</span>
                            <span className={`font-mono text-sm ${
                              item.status === 'success' ? 'text-success-500' :
                              item.status === 'warning' ? 'text-warning-500' :
                              item.status === 'error' ? 'text-error-500' :
                              'text-offwhite-400'
                            }`}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5">
                      <div className="text-offwhite-800 text-xs mb-3">{lang === 'tr' ? 'Hizli Islemler' : 'Quick Actions'}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {['HVAC', 'Lights', 'Access', 'Alarms'].map((action, idx) => (
                          <button
                            key={idx}
                            className="p-2 bg-onyx-700 hover:bg-onyx-600 rounded text-xs text-offwhite-600 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Content - Floor Plan / Energy */}
                  <div className="col-span-6 space-y-4">
                    {/* Energy Chart */}
                    <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5 h-1/2">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-offwhite-800 text-xs">{lang === 'tr' ? 'Enerji Tuketimi' : 'Energy Consumption'}</span>
                        <span className="text-offwhite-600 text-xs font-mono">-12.4% {lang === 'tr' ? 'onceki aya gore' : 'vs last month'}</span>
                      </div>
                      {/* Simple Bar Chart Mockup */}
                      <div className="flex items-end justify-between h-[calc(100%-40px)] gap-2">
                        {[65, 45, 78, 52, 90, 68, 42, 85, 55, 72, 48, 60].map((height, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                              style={{ height: `${height}%` }}
                            />
                            <span className="text-[8px] text-offwhite-800">{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* System Status Grid */}
                    <div className="grid grid-cols-3 gap-4 h-1/2">
                      {[
                        { name: 'HVAC', value: '94%', status: 'success' },
                        { name: 'Elevator', value: '100%', status: 'success' },
                        { name: 'Fire Sys', value: '100%', status: 'success' },
                      ].map((system, idx) => (
                        <div key={idx} className="p-4 bg-white/[0.03] rounded-lg border border-white/5 flex flex-col justify-between">
                          <div className="text-offwhite-800 text-xs">{system.name}</div>
                          <div className={`font-mono text-2xl ${
                            system.status === 'success' ? 'text-success-500' : 'text-warning-500'
                          }`}>
                            {system.value}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              system.status === 'success' ? 'bg-success-500' : 'bg-warning-500'
                            }`} />
                            <span className="text-[10px] text-offwhite-800">
                              {system.status === 'success' ? 'Operational' : 'Warning'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Sidebar - Alerts & Activity */}
                  <div className="col-span-3 space-y-4">
                    {/* Recent Alerts */}
                    <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5">
                      <div className="text-offwhite-800 text-xs mb-3">{lang === 'tr' ? 'Son Uyarilar' : 'Recent Alerts'}</div>
                      <div className="space-y-2">
                        {[
                          { text: 'Unit 304 - HVAC filter', time: '2m', type: 'warning' },
                          { text: 'Parking B2 - Motion', time: '15m', type: 'info' },
                          { text: 'Unit 512 - Water leak', time: '1h', type: 'error' },
                        ].map((alert, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-2 bg-onyx-700/50 rounded">
                            <div className={`w-1.5 h-1.5 mt-1.5 rounded-full ${
                              alert.type === 'error' ? 'bg-error-500' :
                              alert.type === 'warning' ? 'bg-warning-500' :
                              'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <div className="text-xs text-offwhite-600">{alert.text}</div>
                              <div className="text-[10px] text-offwhite-800">{alert.time} ago</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Access Log */}
                    <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5 flex-1">
                      <div className="text-offwhite-800 text-xs mb-3">{lang === 'tr' ? 'Erisim Logu' : 'Access Log'}</div>
                      <div className="space-y-2">
                        {[
                          { unit: '205', action: 'Entry', time: 'Just now' },
                          { unit: '412', action: 'Exit', time: '2m' },
                          { unit: 'Lobby', action: 'Visitor', time: '5m' },
                        ].map((log, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-offwhite-600">{log.unit}</span>
                            <span className="text-offwhite-800">{log.action}</span>
                            <span className="text-offwhite-800 font-mono text-[10px]">{log.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorations */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="relative z-10 py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-12">
              {[
                { value: '50+', label: lang === 'tr' ? 'Kurumsal Musteri' : 'Enterprise Clients' },
                { value: '15K+', label: lang === 'tr' ? 'Yonetilen Daire' : 'Managed Units' },
                { value: '99.9%', label: lang === 'tr' ? 'Sistem Uptime' : 'System Uptime' },
                { value: '24/7', label: lang === 'tr' ? 'Teknik Destek' : 'Technical Support' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="font-mono text-4xl font-bold text-offwhite-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-offwhite-800 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SmartResidencePage;
