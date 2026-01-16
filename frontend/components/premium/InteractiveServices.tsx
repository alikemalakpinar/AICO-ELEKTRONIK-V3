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
// InteractiveServices - Premium Modal System
// Apple-style glassmorphism modals for service details
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

// Service Card Component
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`group p-8 text-left bg-gradient-to-br from-onyx-800/80 to-onyx-800/40 border border-white/5 rounded-2xl hover:border-${service.color}/30 transition-all duration-300 hover:scale-[1.02] w-full`}
    >
      <div
        className={`w-16 h-16 rounded-xl bg-${service.color}/10 flex items-center justify-center mb-6 group-hover:bg-${service.color}/20 transition-colors`}
      >
        <Icon size={32} className={`text-${service.color}`} />
      </div>

      <h3 className="text-xl font-bold text-offwhite-400 mb-2">{service.title}</h3>
      <p className="text-sm text-offwhite-600 mb-4">{service.subtitle}</p>
      <p className="text-offwhite-700 line-clamp-2">{service.description}</p>

      <div className="mt-6 flex items-center gap-2 text-engineer-500 font-medium">
        <span className="text-sm">Details</span>
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </div>
    </motion.button>
  );
}

// Service Modal Component
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-onyx-900/80 backdrop-blur-xl" />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-onyx-800/95 to-onyx-900/95 border border-white/10 rounded-3xl shadow-2xl"
      >
        {/* Header Gradient */}
        <div
          className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-${service.color}/20 to-transparent pointer-events-none rounded-t-3xl`}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        >
          <X size={20} className="text-offwhite-400" />
        </button>

        <div className="relative p-8 md:p-12">
          {/* Icon & Title */}
          <div className="flex items-start gap-6 mb-8">
            <div
              className={`w-20 h-20 rounded-2xl bg-${service.color}/10 flex items-center justify-center flex-shrink-0`}
            >
              <Icon size={40} className={`text-${service.color}`} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-2">
                {service.title}
              </h2>
              <p className={`text-lg text-${service.color}`}>{service.subtitle}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-offwhite-600 leading-relaxed mb-10">
            {service.description}
          </p>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Features */}
            <div>
              <h3 className="text-sm font-medium text-offwhite-500 uppercase tracking-wider mb-4">
                {lang === 'tr' ? 'Ozellikler' : 'Features'}
              </h3>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-offwhite-600"
                  >
                    <CheckCircle
                      size={16}
                      className={`text-${service.color} flex-shrink-0 mt-0.5`}
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-sm font-medium text-offwhite-500 uppercase tracking-wider mb-4">
                {lang === 'tr' ? 'Teknolojiler' : 'Technologies'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 bg-${service.color}/10 text-${service.color} text-xs font-medium rounded-full`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h3 className="text-sm font-medium text-offwhite-500 uppercase tracking-wider mb-4">
                {lang === 'tr' ? 'Teslim Edilenler' : 'Deliverables'}
              </h3>
              <ul className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-offwhite-600"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-${service.color} flex-shrink-0 mt-2`}
                    />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${lang}/contact?service=${service.id}`}
              className={`group inline-flex items-center justify-center gap-3 px-8 py-4 bg-${service.color} hover:opacity-90 text-white font-medium rounded-xl transition-all duration-300`}
            >
              <span>
                {lang === 'tr' ? 'Teklif Al' : 'Get Quote'}
              </span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/10 hover:border-white/20 text-offwhite-400 font-medium rounded-xl transition-colors"
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
      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ? 'Altium Designer ile profesyonel sematik tasarim. Komponent secimi, guc hesaplamalari ve devre optimizasyonu. Her projede DFM uyumluluk kontrolu.'
        : 'Professional schematic design with Altium Designer. Component selection, power calculations and circuit optimization. DFM compliance check in every project.',
    features:
      lang === 'tr'
        ? [
            'Altium Designer / KiCAD',
            'Komponent secimi ve tedarik',
            'Guc ve termal analiz',
            'DFM uyumluluk kontrolu',
            'Tasarim dokumantasyonu',
          ]
        : [
            'Altium Designer / KiCAD',
            'Component selection & sourcing',
            'Power & thermal analysis',
            'DFM compliance check',
            'Design documentation',
          ],
    technologies: ['Altium Designer', 'KiCAD', 'LTSpice', 'MATLAB'],
    deliverables:
      lang === 'tr'
        ? ['Sematik dosyalari', 'BOM listesi', 'Analiz raporu', 'Tasarim incelemesi']
        : ['Schematic files', 'BOM list', 'Analysis report', 'Design review'],
    color: 'blue-500',
  },
  {
    id: 'pcb',
    icon: Cpu,
    title: lang === 'tr' ? 'PCB Layout' : 'PCB Layout',
    subtitle: lang === 'tr' ? 'Cok katmanli tasarim' : 'Multi-layer design',
    description:
      lang === 'tr'
        ? 'Cok katmanli, yuksek hizli PCB tasarimi. EMC uyumluluk, sinyal butunlugu ve termal yonetim. RF ve mixed-signal tasarim uzmanlik alani.'
        : 'Multi-layer, high-speed PCB design. EMC compliance, signal integrity and thermal management. RF and mixed-signal design expertise.',
    features:
      lang === 'tr'
        ? [
            'Cok katmanli tasarim (12+ katman)',
            'Yuksek hiz / RF tasarim',
            'Impedans kontrollu routing',
            'EMC & SI analizi',
            'Termal yonetim',
          ]
        : [
            'Multi-layer design (12+ layers)',
            'High-speed / RF design',
            'Impedance controlled routing',
            'EMC & SI analysis',
            'Thermal management',
          ],
    technologies: ['Altium Designer', 'HyperLynx', 'CST Studio', 'ANSYS'],
    deliverables:
      lang === 'tr'
        ? ['Gerber dosyalari', 'Pick & Place', '3D model', 'Uretim dokumanlari']
        : ['Gerber files', 'Pick & Place', '3D model', 'Manufacturing docs'],
    color: 'engineer-500',
  },
  {
    id: 'firmware',
    icon: Code,
    title: lang === 'tr' ? 'Gomulu Yazilim' : 'Embedded Software',
    subtitle: lang === 'tr' ? 'Profesyonel firmware' : 'Professional firmware',
    description:
      lang === 'tr'
        ? 'STM32, ESP32, nRF platformlarinda profesyonel firmware gelistirme. RTOS, BLE, WiFi entegrasyonu ve OTA guncelleme altyapisi.'
        : 'Professional firmware development on STM32, ESP32, nRF platforms. RTOS, BLE, WiFi integration and OTA update infrastructure.',
    features:
      lang === 'tr'
        ? [
            'STM32 / ESP32 / nRF',
            'FreeRTOS / Zephyr',
            'BLE / WiFi / LoRa',
            'OTA guncelleme altyapisi',
            'Power management',
          ]
        : [
            'STM32 / ESP32 / nRF',
            'FreeRTOS / Zephyr',
            'BLE / WiFi / LoRa',
            'OTA update infrastructure',
            'Power management',
          ],
    technologies: ['C/C++', 'Rust', 'FreeRTOS', 'Zephyr', 'BLE', 'MQTT'],
    deliverables:
      lang === 'tr'
        ? ['Kaynak kodu', 'Test raporu', 'API dokumantasyonu', 'Kullanim kilavuzu']
        : ['Source code', 'Test report', 'API documentation', 'User guide'],
    color: 'green-500',
  },
  {
    id: 'prototype',
    icon: Wrench,
    title: lang === 'tr' ? 'Prototipleme' : 'Prototyping',
    subtitle: lang === 'tr' ? 'Hizli uretim ve test' : 'Rapid production & test',
    description:
      lang === 'tr'
        ? 'Hizli prototip uretimi ve test. Fonksiyonel dogrulama, performans olcumleri ve iteratif gelistirme. Test fiksturleri ile kapsamli validasyon.'
        : 'Rapid prototype production and testing. Functional validation, performance measurements and iterative development. Comprehensive validation with test fixtures.',
    features:
      lang === 'tr'
        ? [
            'Hizli PCB uretimi',
            'SMT montaj',
            'Test fiksturu tasarimi',
            'Fonksiyonel test raporu',
            'Iteratif gelistirme',
          ]
        : [
            'Rapid PCB manufacturing',
            'SMT assembly',
            'Test fixture design',
            'Functional test report',
            'Iterative development',
          ],
    technologies: ['SMT', 'AOI', 'ICT', 'Functional Test', '3D Printing'],
    deliverables:
      lang === 'tr'
        ? ['Prototip uniteler', 'Test raporu', 'Kalite raporu', 'Iyilestirme onerileri']
        : ['Prototype units', 'Test report', 'Quality report', 'Improvement suggestions'],
    color: 'purple-500',
  },
  {
    id: 'consulting',
    icon: Users,
    title: lang === 'tr' ? 'Teknik Danismanlik' : 'Technical Consulting',
    subtitle: lang === 'tr' ? 'Uzman muhendislik destegi' : 'Expert engineering support',
    description:
      lang === 'tr'
        ? 'Mevcut projelerin teknik incelemesi, optimizasyon onerileri ve muhendislik destek hizmetleri. Sertifikasyon sureci danismanligi.'
        : 'Technical review of existing projects, optimization recommendations and engineering support services. Certification process consulting.',
    features:
      lang === 'tr'
        ? [
            'Tasarim inceleme (DFM/DFT)',
            'Maliyet optimizasyonu',
            'Sertifikasyon danismanligi',
            'Tedarik zinciri yonetimi',
            'Teknik egitim',
          ]
        : [
            'Design review (DFM/DFT)',
            'Cost optimization',
            'Certification consulting',
            'Supply chain management',
            'Technical training',
          ],
    technologies: ['CE', 'FCC', 'UL', 'ISO', 'IPC Standards'],
    deliverables:
      lang === 'tr'
        ? ['Inceleme raporu', 'Optimizasyon plani', 'Sertifikasyon yol haritasi', 'Egitim materyalleri']
        : ['Review report', 'Optimization plan', 'Certification roadmap', 'Training materials'],
    color: 'yellow-500',
  },
];
