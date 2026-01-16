'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Cpu,
  Layout,
  Code,
  Cog,
  ArrowRight,
  CheckCircle2,
  Wrench,
  Layers,
  Zap,
  Shield,
} from 'lucide-react';
import type { Locale } from '@/types';

interface ServicesSectionProps {
  lang: Locale;
}

// Service data
const servicesData = {
  tr: {
    badge: 'HIZMETLERIMIZ',
    title: 'PCB Tasarim &',
    titleHighlight: 'Gomulu Yazilim Danismanligi',
    subtitle:
      'Sadece urun gelistirmiyoruz; fikrinizi uretime hazir hale getiriyoruz.',
    services: [
      {
        id: 'schematic',
        icon: Layout,
        title: 'Sematik Cizimi',
        description:
          'Projenizin temelini olusturan profesyonel sematik tasarimlar.',
        features: [
          'Detayli bileşen secimi',
          'DFM uyumlu tasarim',
          'Guc hesaplamalari',
          'EMC ongoruleri',
        ],
        color: 'from-blue-500/20 to-transparent',
      },
      {
        id: 'pcb-layout',
        icon: Layers,
        title: 'PCB Layout',
        description:
          'Yuksek hizli, cok katmanli PCB tasarimlari ve layout optimizasyonu.',
        features: [
          '4-16 katman tasarim',
          'Impedans kontrolu',
          'Termal yonetim',
          'Sinyal butunlugu',
        ],
        color: 'from-engineer-500/20 to-transparent',
      },
      {
        id: 'firmware',
        icon: Code,
        title: 'Firmware Gelistirme',
        description:
          'Mikrodenetleyici ve gomulu sistemler icin optimize edilmis yazilimlar.',
        features: [
          'Bare-metal & RTOS',
          'Dusuk guc optimizasyonu',
          'Bootloader gelistirme',
          'OTA guncelleme',
        ],
        color: 'from-purple-500/20 to-transparent',
      },
      {
        id: 'prototype',
        icon: Cog,
        title: 'Prototip Uretimi',
        description:
          'Fikrinizden fiziksel urune hizli gecis ve test sureclerri.',
        features: [
          'Hizli prototipleme',
          '3D baski entegrasyonu',
          'Fonksiyonel testler',
          'Seri uretime hazirlik',
        ],
        color: 'from-orange-500/20 to-transparent',
      },
    ],
    process: {
      title: 'Calisma Surecimiz',
      steps: [
        {
          number: '01',
          title: 'Analiz',
          description: 'Ihtiyaclarinizi anlamak icin detayli teknik gorusme.',
        },
        {
          number: '02',
          title: 'Tasarim',
          description: 'Sematik ve PCB tasarim sureci ile iteratif gelistirme.',
        },
        {
          number: '03',
          title: 'Prototip',
          description: 'Ilk prototip uretimi ve kapsamli dogrulama testleri.',
        },
        {
          number: '04',
          title: 'Uretim',
          description: 'Seri uretim dokumantasyonu ve uretici koordinasyonu.',
        },
      ],
    },
    cta: {
      title: 'Projenizi Konusalim',
      subtitle:
        'Muhendislik ekibimiz fikirlerinizi gercege donusturmek icin hazir.',
      button: 'Ucretsiz Danismanlik',
    },
  },
  en: {
    badge: 'OUR SERVICES',
    title: 'PCB Design &',
    titleHighlight: 'Embedded Software Consulting',
    subtitle:
      "We don't just develop products; we make your idea production-ready.",
    services: [
      {
        id: 'schematic',
        icon: Layout,
        title: 'Schematic Design',
        description:
          'Professional schematic designs that form the foundation of your project.',
        features: [
          'Detailed component selection',
          'DFM compliant design',
          'Power calculations',
          'EMC considerations',
        ],
        color: 'from-blue-500/20 to-transparent',
      },
      {
        id: 'pcb-layout',
        icon: Layers,
        title: 'PCB Layout',
        description:
          'High-speed, multi-layer PCB designs and layout optimization.',
        features: [
          '4-16 layer design',
          'Impedance control',
          'Thermal management',
          'Signal integrity',
        ],
        color: 'from-engineer-500/20 to-transparent',
      },
      {
        id: 'firmware',
        icon: Code,
        title: 'Firmware Development',
        description:
          'Optimized software for microcontrollers and embedded systems.',
        features: [
          'Bare-metal & RTOS',
          'Low power optimization',
          'Bootloader development',
          'OTA updates',
        ],
        color: 'from-purple-500/20 to-transparent',
      },
      {
        id: 'prototype',
        icon: Cog,
        title: 'Prototype Manufacturing',
        description:
          'Fast transition from idea to physical product and testing processes.',
        features: [
          'Rapid prototyping',
          '3D printing integration',
          'Functional testing',
          'Production readiness',
        ],
        color: 'from-orange-500/20 to-transparent',
      },
    ],
    process: {
      title: 'Our Process',
      steps: [
        {
          number: '01',
          title: 'Analysis',
          description:
            'Detailed technical consultation to understand your needs.',
        },
        {
          number: '02',
          title: 'Design',
          description:
            'Iterative development through schematic and PCB design process.',
        },
        {
          number: '03',
          title: 'Prototype',
          description:
            'First prototype production and comprehensive validation tests.',
        },
        {
          number: '04',
          title: 'Production',
          description:
            'Mass production documentation and manufacturer coordination.',
        },
      ],
    },
    cta: {
      title: "Let's Discuss Your Project",
      subtitle:
        'Our engineering team is ready to turn your ideas into reality.',
      button: 'Free Consultation',
    },
  },
};

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const content = servicesData[lang];

  return (
    <section className="relative py-32 bg-onyx-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
            <span className="w-8 h-px bg-engineer-500" />
            {content.badge}
            <span className="w-8 h-px bg-engineer-500" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-offwhite-400 mb-6">
            {content.title}{' '}
            <span className="text-engineer-500">{content.titleHighlight}</span>
          </h2>
          <p className="text-xl text-offwhite-700 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {content.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-onyx-800/50 border border-white/5 rounded-3xl hover:border-engineer-500/30 transition-all duration-500"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon size={32} className="text-offwhite-400" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-offwhite-400 mb-3 group-hover:text-engineer-500 transition-colors">
                {service.title}
              </h3>
              <p className="text-offwhite-700 mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-offwhite-600 text-sm"
                  >
                    <CheckCircle2 size={16} className="text-engineer-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h3 className="text-2xl font-bold text-offwhite-400 text-center mb-16">
            {content.process.title}
          </h3>

          <div className="grid md:grid-cols-4 gap-8">
            {content.process.steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Connector Line */}
                {index < content.process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-engineer-500/50 to-transparent" />
                )}

                {/* Number */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-engineer-500/10 border border-engineer-500/30 flex items-center justify-center">
                  <span className="font-mono text-2xl font-bold text-engineer-500">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h4 className="text-lg font-semibold text-offwhite-400 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-offwhite-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-12 bg-gradient-to-br from-engineer-500/10 to-transparent border border-engineer-500/20 rounded-3xl"
        >
          <Wrench size={48} className="text-engineer-500 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-offwhite-400 mb-4">
            {content.cta.title}
          </h3>
          <p className="text-lg text-offwhite-700 mb-8 max-w-xl mx-auto">
            {content.cta.subtitle}
          </p>
          <Link
            href={`/${lang}/contact?subject=consultation`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300"
          >
            <span>{content.cta.button}</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
