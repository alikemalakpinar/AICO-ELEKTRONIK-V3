'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Coffee,
  Smartphone,
  Wifi,
  Clock,
  Droplets,
  ThermometerSun,
  ArrowRight,
  Star,
  Zap,
  Settings,
} from 'lucide-react';
import { ImmersiveHero, BentoGrid } from '@/components/modules';
import type { BentoItem } from '@/components/modules';
import type { Locale } from '@/types';

interface CoffeeClientProps {
  lang: Locale;
}

export default function CoffeeClient({ lang }: CoffeeClientProps) {
  const accentColor = '#A855F7'; // Purple for coffee

  const content = {
    hero: {
      badge: 'AICO COFFEE',
      title: lang === 'tr' ? 'Kahveniz,' : 'Your Coffee,',
      titleHighlight: lang === 'tr' ? 'Sizin Kurallariniz.' : 'Your Rules.',
      subtitle: lang === 'tr'
        ? 'Akilli kontrol, kisisel tarifler. Mucizevi bir kahve deneyimi.'
        : 'Smart control, personal recipes. A miraculous coffee experience.',
      cta: lang === 'tr' ? 'Urunleri Inceleyin' : 'Explore Products',
    },
    features: {
      badge: lang === 'tr' ? 'OZELLIKLER' : 'FEATURES',
      title: lang === 'tr' ? 'Akilli' : 'Smart',
      titleHighlight: lang === 'tr' ? 'Kahve Teknolojisi' : 'Coffee Technology',
      items: [
        {
          id: 'app',
          icon: Smartphone,
          title: lang === 'tr' ? 'Mobil Kontrol' : 'Mobile Control',
          description: lang === 'tr'
            ? 'iOS ve Android uygulamasi ile tam kontrol'
            : 'Full control with iOS and Android app',
          size: 'medium' as const,
        },
        {
          id: 'recipes',
          icon: Star,
          title: lang === 'tr' ? 'Kisisel Tarifler' : 'Personal Recipes',
          description: lang === 'tr'
            ? 'Sinirsiz tarif kaydetme ve paylasma'
            : 'Unlimited recipe saving and sharing',
          value: '∞',
          unit: lang === 'tr' ? 'Tarif' : 'Recipes',
          size: 'medium' as const,
        },
        {
          id: 'schedule',
          icon: Clock,
          title: lang === 'tr' ? 'Zamanlama' : 'Scheduling',
          description: lang === 'tr'
            ? 'Kahveniz sizi beklesin, siz onu degil'
            : 'Let your coffee wait for you, not the other way around',
          size: 'medium' as const,
        },
        {
          id: 'temp',
          icon: ThermometerSun,
          title: lang === 'tr' ? 'Sicaklik Kontrolu' : 'Temperature Control',
          description: lang === 'tr'
            ? 'Derece hassasiyetinde sicaklik ayari'
            : 'Degree-precise temperature setting',
          value: '±1',
          unit: '°C',
          size: 'medium' as const,
        },
        {
          id: 'grind',
          icon: Settings,
          title: lang === 'tr' ? 'Ogutme Ayari' : 'Grind Settings',
          description: lang === 'tr'
            ? '15 farkli ogutme kalinligi'
            : '15 different grind thickness options',
          value: '15',
          unit: lang === 'tr' ? 'Seviye' : 'Levels',
          size: 'medium' as const,
        },
        {
          id: 'water',
          icon: Droplets,
          title: lang === 'tr' ? 'Su Filtresi' : 'Water Filter',
          description: lang === 'tr'
            ? 'Dahili su filtreleme sistemi'
            : 'Built-in water filtration system',
          size: 'medium' as const,
        },
      ] as BentoItem[],
    },
    demo: {
      title: lang === 'tr' ? 'Uygulama Onizlemesi' : 'App Preview',
      subtitle: lang === 'tr'
        ? 'Telefonunuzdan kahve makinesini tam kontrol edin.'
        : 'Control your coffee machine completely from your phone.',
    },
    cta: {
      title: lang === 'tr'
        ? 'Kahve Rituelinizi Yukseltın'
        : 'Elevate Your Coffee Ritual',
      subtitle: lang === 'tr'
        ? 'AICO Coffee ile mucizevi bir kahve deneyimi icin bizimle iletisime gecin.'
        : 'Contact us for a miraculous coffee experience with AICO Coffee.',
      button: lang === 'tr' ? 'Satin Al' : 'Buy Now',
    },
  };

  // Coffee recipes for demo
  const recipes = [
    { name: 'Espresso', temp: 93, strength: 'Strong', time: '25s' },
    { name: 'Americano', temp: 92, strength: 'Medium', time: '35s' },
    { name: 'Cappuccino', temp: 65, strength: 'Medium', time: '45s' },
    { name: 'Latte', temp: 60, strength: 'Light', time: '50s' },
  ];

  return (
    <div className="min-h-screen bg-onyx-950">
      <ImmersiveHero
        badge={content.hero.badge}
        title={content.hero.title}
        titleHighlight={content.hero.titleHighlight}
        subtitle={content.hero.subtitle}
        accentColor={accentColor}
        ctaText={content.hero.cta}
        ctaHref="#demo"
        lang={lang}
      />

      {/* App Preview Demo */}
      <section id="demo" className="py-24 md:py-32 bg-onyx-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: accentColor }}>
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
              {lang === 'tr' ? 'UYGULAMA' : 'APP'}
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {content.demo.title}
            </h2>
            <p className="text-offwhite-700 max-w-2xl mx-auto">
              {content.demo.subtitle}
            </p>
          </motion.div>

          {/* Phone Mockup with App UI */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Phone Frame */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-[280px] h-[580px] bg-onyx-800 rounded-[3rem] p-2 shadow-2xl border border-white/10">
                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-onyx-900 rounded-full z-20" />

                {/* Screen */}
                <div className="relative w-full h-full bg-onyx-900 rounded-[2.5rem] overflow-hidden">
                  {/* App Header */}
                  <div className="p-6 pt-12 text-center"
                    style={{ background: `linear-gradient(to bottom, ${accentColor}20, transparent)` }}>
                    <Coffee size={40} style={{ color: accentColor }} className="mx-auto mb-2" />
                    <h3 className="text-white font-semibold">AICO Coffee</h3>
                    <p className="text-offwhite-700 text-xs mt-1">
                      {lang === 'tr' ? 'Hazir' : 'Ready'}
                    </p>
                  </div>

                  {/* Recipe Cards */}
                  <div className="p-4 space-y-3">
                    {recipes.map((recipe, i) => (
                      <motion.div
                        key={recipe.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${accentColor}20` }}
                          >
                            <Coffee size={18} style={{ color: accentColor }} />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{recipe.name}</div>
                            <div className="text-offwhite-700 text-xs">{recipe.strength}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-sm font-mono">{recipe.temp}°C</div>
                          <div className="text-offwhite-700 text-xs">{recipe.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Brew Button */}
                  <div className="absolute bottom-8 left-4 right-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Zap size={18} />
                      {lang === 'tr' ? 'Hizli Demleme' : 'Quick Brew'}
                    </motion.button>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
              </div>

              {/* Glow */}
              <div
                className="absolute inset-0 blur-3xl -z-10 scale-150"
                style={{ background: `radial-gradient(circle, ${accentColor}20, transparent)` }}
              />
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 max-w-sm"
            >
              {[
                { icon: Wifi, text: lang === 'tr' ? 'WiFi & Bluetooth baglanti' : 'WiFi & Bluetooth connectivity' },
                { icon: Clock, text: lang === 'tr' ? 'Zamanlayici ile sabah kahvesi' : 'Morning coffee with timer' },
                { icon: Star, text: lang === 'tr' ? 'Favori tariflerinizi kaydedin' : 'Save your favorite recipes' },
                { icon: Settings, text: lang === 'tr' ? 'Detayli ogutme ayarlari' : 'Detailed grind settings' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-onyx-800/50 rounded-xl border border-white/5"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <item.icon size={20} style={{ color: accentColor }} />
                  </div>
                  <span className="text-offwhite-400">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <BentoGrid
        badge={content.features.badge}
        title={content.features.title}
        titleHighlight={content.features.titleHighlight}
        items={content.features.items}
        accentColor={accentColor}
        lang={lang}
      />

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-onyx-950 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <Coffee size={40} style={{ color: accentColor }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {content.cta.title}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {content.cta.subtitle}
            </p>
            <Link
              href={`/${lang}/contact?subject=aico-coffee`}
              className="group inline-flex items-center gap-3 px-8 py-4 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              <span>{content.cta.button}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
