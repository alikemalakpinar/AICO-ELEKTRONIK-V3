'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CircuitBoard,
  Cpu,
  Code,
  Wrench,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

// ===========================================
// InteractiveServices - Compact & Elegant
// Refined modal system with sleek cards
// ===========================================

export interface ServiceDetail {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  technologies: string[];
  deliverables: string[];
  color: string;
}

interface InteractiveServicesProps {
  services: ServiceDetail[];
  lang: 'tr' | 'en';
  className?: string;
}

// Service Card Component - COMPACT
function ServiceCard({
  service,
  onClick,
  index,
}: {
  service: ServiceDetail;
  onClick: () => void;
  index: number;
}) {
  const Icon = service.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      onClick={onClick}
      className="group p-5 text-left bg-gradient-to-br from-onyx-800/60 to-onyx-800/30 border border-white/[0.04] rounded-xl hover:border-engineer-500/20 transition-all duration-300 hover:scale-[1.015] w-full"
    >
      <div className="w-10 h-10 rounded-lg bg-engineer-500/8 flex items-center justify-center mb-3.5 group-hover:bg-engineer-500/15 transition-colors">
        <Icon size={20} className="text-engineer-500" />
      </div>

      <h3 className="text-base font-semibold text-offwhite-400 mb-1 tracking-tight">{service.title}</h3>
      <p className="text-xs text-offwhite-700 mb-2">{service.subtitle}</p>
      <p className="text-sm text-offwhite-600 line-clamp-2 leading-relaxed">{service.description}</p>

      <div className="mt-3.5 flex items-center gap-1.5 text-engineer-500 font-medium">
        <span className="text-xs">Details</span>
        <ArrowRight
          size={12}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </div>
    </motion.button>
  );
}

// Service Modal Component - REFINED
function ServiceModal({
  service,
  onClose,
  lang,
}: {
  service: ServiceDetail;
  onClose: () => void;
  lang: 'tr' | 'en';
}) {
  const Icon = service.icon;

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-onyx-900/85 backdrop-blur-xl" />

      {/* Modal Content - COMPACT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-onyx-800/95 to-onyx-900/95 border border-white/8 rounded-2xl shadow-2xl"
      >
        {/* Header Gradient */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-engineer-500/10 to-transparent pointer-events-none rounded-t-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors z-10"
        >
          <X size={16} className="text-offwhite-400" />
        </button>

        <div className="relative p-6 md:p-7">
          {/* Icon & Title */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center flex-shrink-0">
              <Icon size={24} className="text-engineer-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-offwhite-400 mb-1 tracking-tight">
                {service.title}
              </h2>
              <p className="text-sm text-engineer-500">{service.subtitle}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-offwhite-600 leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Content Grid - COMPACT */}
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {/* Features */}
            <div>
              <h3 className="text-[10px] font-medium text-offwhite-500 uppercase tracking-wider mb-2.5">
                {lang === 'tr' ? 'Ozellikler' : 'Features'}
              </h3>
              <ul className="space-y-1.5">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-1.5 text-offwhite-600"
                  >
                    <CheckCircle
                      size={12}
                      className="text-engineer-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-xs leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-[10px] font-medium text-offwhite-500 uppercase tracking-wider mb-2.5">
                {lang === 'tr' ? 'Teknolojiler' : 'Technologies'}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-engineer-500/8 text-engineer-500 text-[10px] font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h3 className="text-[10px] font-medium text-offwhite-500 uppercase tracking-wider mb-2.5">
                {lang === 'tr' ? 'Teslim Edilenler' : 'Deliverables'}
              </h3>
              <ul className="space-y-1.5">
                {service.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-1.5 text-offwhite-600"
                  >
                    <span className="w-1 h-1 rounded-full bg-engineer-500 flex-shrink-0 mt-1.5" />
                    <span className="text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA - COMPACT */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <Link
              href={`/${lang}/contact?service=${service.id}`}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-engineer-500 hover:bg-engineer-600 text-white text-sm font-medium rounded-lg transition-all duration-300"
            >
              <span>
                {lang === 'tr' ? 'Teklif Al' : 'Get Quote'}
              </span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center px-5 py-2.5 border border-white/8 hover:border-white/15 text-offwhite-400 text-sm font-medium rounded-lg transition-colors"
            >
              {lang === 'tr' ? 'Kapat' : 'Close'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Component
export default function InteractiveServices({
  services,
  lang,
  className = '',
}: InteractiveServicesProps) {
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  return (
    <div className={className}>
      {/* Services Grid - COMPACT */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => setActiveService(service)}
            index={index}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeService && (
          <ServiceModal
            service={activeService}
            onClose={() => setActiveService(null)}
            lang={lang}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Pre-defined Services Data
export const getServicesData = (lang: 'tr' | 'en'): ServiceDetail[] => [
  {
    id: 'schematic',
    icon: CircuitBoard,
    title: lang === 'tr' ? 'Sematik Tasarim' : 'Schematic Design',
    subtitle: lang === 'tr' ? 'Profesyonel devre tasarimi' : 'Professional circuit design',
    description:
      lang === 'tr'
        ? 'Altium Designer ile profesyonel sematik tasarim. Komponent secimi, guc hesaplamalari ve devre optimizasyonu.'
        : 'Professional schematic design with Altium Designer. Component selection, power calculations and circuit optimization.',
    features:
      lang === 'tr'
        ? [
            'Altium Designer / KiCAD',
            'Komponent secimi ve tedarik',
            'Guc ve termal analiz',
            'DFM uyumluluk kontrolu',
          ]
        : [
            'Altium Designer / KiCAD',
            'Component selection & sourcing',
            'Power & thermal analysis',
            'DFM compliance check',
          ],
    technologies: ['Altium', 'KiCAD', 'LTSpice', 'MATLAB'],
    deliverables:
      lang === 'tr'
        ? ['Sematik dosyalari', 'BOM listesi', 'Analiz raporu']
        : ['Schematic files', 'BOM list', 'Analysis report'],
    color: 'engineer-500',
  },
  {
    id: 'pcb',
    icon: Cpu,
    title: lang === 'tr' ? 'PCB Layout' : 'PCB Layout',
    subtitle: lang === 'tr' ? 'Cok katmanli tasarim' : 'Multi-layer design',
    description:
      lang === 'tr'
        ? 'Cok katmanli, yuksek hizli PCB tasarimi. EMC uyumluluk, sinyal butunlugu ve termal yonetim.'
        : 'Multi-layer, high-speed PCB design. EMC compliance, signal integrity and thermal management.',
    features:
      lang === 'tr'
        ? [
            'Cok katmanli tasarim (12+)',
            'Yuksek hiz / RF tasarim',
            'Impedans kontrollu routing',
            'EMC & SI analizi',
          ]
        : [
            'Multi-layer design (12+)',
            'High-speed / RF design',
            'Impedance controlled routing',
            'EMC & SI analysis',
          ],
    technologies: ['Altium', 'HyperLynx', 'CST Studio', 'ANSYS'],
    deliverables:
      lang === 'tr'
        ? ['Gerber dosyalari', 'Pick & Place', '3D model']
        : ['Gerber files', 'Pick & Place', '3D model'],
    color: 'engineer-500',
  },
  {
    id: 'firmware',
    icon: Code,
    title: lang === 'tr' ? 'Gomulu Yazilim' : 'Embedded Software',
    subtitle: lang === 'tr' ? 'Profesyonel firmware' : 'Professional firmware',
    description:
      lang === 'tr'
        ? 'STM32, ESP32, nRF platformlarinda profesyonel firmware gelistirme. RTOS ve OTA altyapisi.'
        : 'Professional firmware development on STM32, ESP32, nRF platforms. RTOS and OTA infrastructure.',
    features:
      lang === 'tr'
        ? [
            'STM32 / ESP32 / nRF',
            'FreeRTOS / Zephyr',
            'BLE / WiFi / LoRa',
            'OTA guncelleme',
          ]
        : [
            'STM32 / ESP32 / nRF',
            'FreeRTOS / Zephyr',
            'BLE / WiFi / LoRa',
            'OTA updates',
          ],
    technologies: ['C/C++', 'Rust', 'FreeRTOS', 'BLE', 'MQTT'],
    deliverables:
      lang === 'tr'
        ? ['Kaynak kodu', 'Test raporu', 'API dokumantasyonu']
        : ['Source code', 'Test report', 'API documentation'],
    color: 'engineer-500',
  },
  {
    id: 'prototype',
    icon: Wrench,
    title: lang === 'tr' ? 'Prototipleme' : 'Prototyping',
    subtitle: lang === 'tr' ? 'Hizli uretim ve test' : 'Rapid production & test',
    description:
      lang === 'tr'
        ? 'Hizli prototip uretimi ve test. Fonksiyonel dogrulama ve iteratif gelistirme.'
        : 'Rapid prototype production and testing. Functional validation and iterative development.',
    features:
      lang === 'tr'
        ? [
            'Hizli PCB uretimi',
            'SMT montaj',
            'Test fiksturu tasarimi',
            'Fonksiyonel test',
          ]
        : [
            'Rapid PCB manufacturing',
            'SMT assembly',
            'Test fixture design',
            'Functional test',
          ],
    technologies: ['SMT', 'AOI', 'ICT', '3D Printing'],
    deliverables:
      lang === 'tr'
        ? ['Prototip uniteler', 'Test raporu', 'Kalite raporu']
        : ['Prototype units', 'Test report', 'Quality report'],
    color: 'engineer-500',
  },
  {
    id: 'consulting',
    icon: Users,
    title: lang === 'tr' ? 'Teknik Danismanlik' : 'Technical Consulting',
    subtitle: lang === 'tr' ? 'Uzman muhendislik destegi' : 'Expert engineering support',
    description:
      lang === 'tr'
        ? 'Mevcut projelerin teknik incelemesi, optimizasyon onerileri ve sertifikasyon danismanligi.'
        : 'Technical review of existing projects, optimization recommendations and certification consulting.',
    features:
      lang === 'tr'
        ? [
            'Tasarim inceleme (DFM/DFT)',
            'Maliyet optimizasyonu',
            'Sertifikasyon danismanligi',
            'Teknik egitim',
          ]
        : [
            'Design review (DFM/DFT)',
            'Cost optimization',
            'Certification consulting',
            'Technical training',
          ],
    technologies: ['CE', 'FCC', 'UL', 'ISO', 'IPC'],
    deliverables:
      lang === 'tr'
        ? ['Inceleme raporu', 'Optimizasyon plani', 'Yol haritasi']
        : ['Review report', 'Optimization plan', 'Roadmap'],
    color: 'engineer-500',
  },
];
