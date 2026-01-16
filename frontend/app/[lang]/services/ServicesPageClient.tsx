'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Cpu,
  CircuitBoard,
  Code,
  Wrench,
  FileCheck,
  Users,
  CheckCircle,
  Zap,
} from 'lucide-react';
import type { Locale } from '@/types';

// Lazy load 3D component for performance
const FloatingModules = dynamic(
  () => import('@/components/premium/3d/FloatingModules'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
    ),
  }
);

interface ServicesPageClientProps {
  lang: Locale;
}

export default function ServicesPageClient({ lang }: ServicesPageClientProps) {
  const t = {
    tr: {
      badge: 'HIZMETLER',
      title: 'Muhendislik Hizmetlerimiz',
      subtitle:
        'Konseptten uretime, tum elektronik gelistirme surecinde yaninizdayiz.',
      schematic: {
        title: 'Sematik Tasarim',
        description:
          'Altium Designer ile profesyonel sematik tasarim. Komponent secimi, guc hesaplamalari ve devre optimizasyonu.',
        features: [
          'Altium Designer / KiCAD',
          'Komponent secimi ve tedarik',
          'Guc ve termal analiz',
          'DFM uyumluluk kontrolu',
        ],
      },
      pcb: {
        title: 'PCB Layout',
        description:
          'Cok katmanli, yuksek hizli PCB tasarimi. EMC uyumluluk, sinyal butunlugu ve termal yonetim.',
        features: [
          'Cok katmanli tasarim (12+ katman)',
          'Yuksek hiz / RF tasarim',
          'Impedans kontrollu routing',
          'EMC & SI analizi',
        ],
      },
      firmware: {
        title: 'Gomulu Yazilim',
        description:
          'STM32, ESP32, nRF platformlarinda profesyonel firmware gelistirme. RTOS, BLE, WiFi entegrasyonu.',
        features: [
          'STM32 / ESP32 / nRF',
          'FreeRTOS / Zephyr',
          'BLE / WiFi / LoRa',
          'OTA guncelleme altyapisi',
        ],
      },
      prototype: {
        title: 'Prototipleme',
        description:
          'Hizli prototip uretimi ve test. Fonksiyonel dogrulama, performans olcumleri ve iteratif gelistirme.',
        features: [
          'Hizli PCB uretimi',
          'SMT montaj',
          'Test fiksturu tasarimi',
          'Fonksiyonel test raporu',
        ],
      },
      consulting: {
        title: 'Teknik Danismanlik',
        description:
          'Mevcut projelerin teknik incelemesi, optimizasyon onerileri ve muhendislik destek hizmetleri.',
        features: [
          'Tasarim inceleme (DFM/DFT)',
          'Maliyet optimizasyonu',
          'Sertifikasyon danismanligi',
          'Tedarik zinciri yonetimi',
        ],
      },
      process: 'Calisma Surecimiz',
      processSteps: [
        {
          title: 'Kesfet',
          description: 'Ihtiyac analizi ve teknik gereksinimler.',
        },
        { title: 'Tasarla', description: 'Sematik, PCB ve firmware gelistirme.' },
        { title: 'Dogrula', description: 'Prototip uretimi ve test.' },
        { title: 'Uret', description: 'Seri uretim ve kalite kontrol.' },
      ],
      cta: 'Projenizi Konusalim',
      ctaSubtitle:
        'Muhendislik ekibimiz, ihtiyaclariniza ozel cozumler tasarlamak icin hazir.',
      ctaButton: 'Ucretsiz Gorusme Planla',
    },
    en: {
      badge: 'SERVICES',
      title: 'Our Engineering Services',
      subtitle:
        'From concept to production, we are with you throughout the entire electronic development process.',
      schematic: {
        title: 'Schematic Design',
        description:
          'Professional schematic design with Altium Designer. Component selection, power calculations and circuit optimization.',
        features: [
          'Altium Designer / KiCAD',
          'Component selection & sourcing',
          'Power & thermal analysis',
          'DFM compliance check',
        ],
      },
      pcb: {
        title: 'PCB Layout',
        description:
          'Multi-layer, high-speed PCB design. EMC compliance, signal integrity and thermal management.',
        features: [
          'Multi-layer design (12+ layers)',
          'High-speed / RF design',
          'Impedance controlled routing',
          'EMC & SI analysis',
        ],
      },
      firmware: {
        title: 'Embedded Software',
        description:
          'Professional firmware development on STM32, ESP32, nRF platforms. RTOS, BLE, WiFi integration.',
        features: [
          'STM32 / ESP32 / nRF',
          'FreeRTOS / Zephyr',
          'BLE / WiFi / LoRa',
          'OTA update infrastructure',
        ],
      },
      prototype: {
        title: 'Prototyping',
        description:
          'Rapid prototype production and testing. Functional validation, performance measurements and iterative development.',
        features: [
          'Rapid PCB manufacturing',
          'SMT assembly',
          'Test fixture design',
          'Functional test report',
        ],
      },
      consulting: {
        title: 'Technical Consulting',
        description:
          'Technical review of existing projects, optimization recommendations and engineering support services.',
        features: [
          'Design review (DFM/DFT)',
          'Cost optimization',
          'Certification consulting',
          'Supply chain management',
        ],
      },
      process: 'Our Process',
      processSteps: [
        {
          title: 'Discover',
          description: 'Requirements analysis and technical specifications.',
        },
        { title: 'Design', description: 'Schematic, PCB and firmware development.' },
        { title: 'Validate', description: 'Prototype production and testing.' },
        { title: 'Produce', description: 'Mass production and quality control.' },
      ],
      cta: "Let's Discuss Your Project",
      ctaSubtitle:
        'Our engineering team is ready to design custom solutions for your needs.',
      ctaButton: 'Schedule Free Consultation',
    },
  };

  const text = t[lang];

  const services = [
    {
      icon: CircuitBoard,
      ...text.schematic,
      color: 'from-blue-500/20 to-transparent',
      borderColor: 'border-blue-500/30',
    },
    {
      icon: Cpu,
      ...text.pcb,
      color: 'from-engineer-500/20 to-transparent',
      borderColor: 'border-engineer-500/30',
    },
    {
      icon: Code,
      ...text.firmware,
      color: 'from-green-500/20 to-transparent',
      borderColor: 'border-green-500/30',
    },
    {
      icon: Wrench,
      ...text.prototype,
      color: 'from-purple-500/20 to-transparent',
      borderColor: 'border-purple-500/30',
    },
    {
      icon: Users,
      ...text.consulting,
      color: 'from-yellow-500/20 to-transparent',
      borderColor: 'border-yellow-500/30',
    },
  ];

  return (
    <div className="min-h-screen bg-onyx-900">
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        {/* 3D Floating Modules Background */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingModules className="opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-onyx-900/50 via-transparent to-onyx-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {text.badge}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite-400 mb-6">
              {text.title}
            </h1>
            <p className="text-xl text-offwhite-700 max-w-2xl mx-auto">
              {text.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group p-8 bg-gradient-to-br ${service.color} border ${service.borderColor} rounded-3xl hover:scale-[1.02] transition-all duration-300`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-onyx-800 flex items-center justify-center mb-6 group-hover:bg-onyx-700 transition-colors">
                    <Icon size={28} className="text-engineer-500" />
                  </div>

                  <h3 className="text-xl font-bold text-offwhite-400 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-offwhite-700 mb-6">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-offwhite-600"
                      >
                        <CheckCircle size={14} className="text-engineer-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {text.process}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {text.processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < text.processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-engineer-500/50 to-transparent" />
                )}

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-engineer-500/10 border border-engineer-500/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-engineer-500">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-offwhite-400 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-offwhite-700">{step.description}</p>
                </div>
              </motion.div>
            ))}
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
              {text.cta}
            </h2>
            <p className="text-lg text-offwhite-700 mb-8">{text.ctaSubtitle}</p>
            <Link
              href={`/${lang}/contact?subject=consultation`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300"
            >
              <span>{text.ctaButton}</span>
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
