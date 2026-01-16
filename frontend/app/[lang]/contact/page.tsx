'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Calendar,
  ArrowRight,
  Building2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';

interface ContactPageProps {
  params: { lang: Locale };
}

// Contact form subjects
const subjects = {
  tr: [
    { value: 'new-project', label: 'Yeni Proje' },
    { value: 'consultation', label: 'Danismanlik Istegi' },
    { value: 'technical-support', label: 'Teknik Destek' },
    { value: 'other', label: 'Diger' },
  ],
  en: [
    { value: 'new-project', label: 'New Project' },
    { value: 'consultation', label: 'Consultation Request' },
    { value: 'technical-support', label: 'Technical Support' },
    { value: 'other', label: 'Other' },
  ],
};

export default function ContactPage({ params }: ContactPageProps) {
  const lang = params.lang;
  const t = getTranslations(lang);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('new-project');

  // Check for subject in URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const subjectParam = urlParams.get('subject');
      if (subjectParam && subjects[lang].some((s) => s.value === subjectParam)) {
        setSelectedSubject(subjectParam);
      }
    }
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  const text = {
    tr: {
      badge: 'ILETISIM',
      title: 'Projenizi Anlatin',
      subtitle:
        'Fikirlerinizi dinlemek ve size en uygun muhendislik cozumunu sunmak icin buradayiz.',
      contactInfo: 'Iletisim Bilgileri',
      email: 'E-posta',
      phone: 'Telefon',
      address: 'Ofis Adresi',
      workingHours: 'Calisma Saatleri',
      workingHoursValue: 'Pzt - Cum: 09:00 - 18:00',
      scheduleCall: 'Gorusme Planla',
      scheduleCallDesc:
        'Takvimimizden uygun bir saat secin, sizi arayalim.',
      formTitle: 'Bize Ulasin',
      name: 'Ad Soyad',
      namePlaceholder: 'Adiniz Soyadiniz',
      emailPlaceholder: 'email@ornek.com',
      company: 'Sirket (Opsiyonel)',
      companyPlaceholder: 'Sirket Adi',
      phonePlaceholder: '+90 5XX XXX XX XX',
      subject: 'Konu',
      message: 'Mesajiniz',
      messagePlaceholder:
        'Projeniz hakkinda kisa bilgi verin. Ne tur bir cozum ariyorsunuz?',
      submit: 'Mesaj Gonder',
      successTitle: 'Tesekkurler!',
      successMessage:
        'Mesajiniz alindi. En kisa surede muhendislik ekibimiz sizinle iletisime gececek.',
      calendlyButton: 'Calendly ile Randevu Al',
    },
    en: {
      badge: 'CONTACT',
      title: 'Tell Us About Your Project',
      subtitle:
        "We're here to listen to your ideas and offer you the most suitable engineering solution.",
      contactInfo: 'Contact Information',
      email: 'Email',
      phone: 'Phone',
      address: 'Office Address',
      workingHours: 'Working Hours',
      workingHoursValue: 'Mon - Fri: 09:00 - 18:00',
      scheduleCall: 'Schedule a Call',
      scheduleCallDesc:
        'Pick a suitable time from our calendar, and we will call you.',
      formTitle: 'Get in Touch',
      name: 'Full Name',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'email@example.com',
      company: 'Company (Optional)',
      companyPlaceholder: 'Company Name',
      phonePlaceholder: '+90 5XX XXX XX XX',
      subject: 'Subject',
      message: 'Your Message',
      messagePlaceholder:
        'Give us brief info about your project. What kind of solution are you looking for?',
      submit: 'Send Message',
      successTitle: 'Thank You!',
      successMessage:
        'Your message has been received. Our engineering team will contact you shortly.',
      calendlyButton: 'Book with Calendly',
    },
  };

  const content = text[lang];

  return (
    <div className="min-h-screen bg-onyx-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {content.badge}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite-400 mb-6">
              {content.title}
            </h1>
            <p className="text-xl text-offwhite-700 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              <h2 className="text-2xl font-bold text-offwhite-400 mb-8">
                {content.contactInfo}
              </h2>

              {/* Email */}
              <div className="group">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center group-hover:bg-engineer-500/20 transition-colors">
                    <Mail size={22} className="text-engineer-500" />
                  </div>
                  <div>
                    <p className="text-sm text-offwhite-700 mb-1">
                      {content.email}
                    </p>
                    <a
                      href="mailto:info@aicoelektronik.com"
                      className="text-xl font-semibold text-offwhite-400 hover:text-engineer-500 transition-colors"
                    >
                      info@aicoelektronik.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="group">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center group-hover:bg-engineer-500/20 transition-colors">
                    <Phone size={22} className="text-engineer-500" />
                  </div>
                  <div>
                    <p className="text-sm text-offwhite-700 mb-1">
                      {content.phone}
                    </p>
                    <a
                      href="tel:+903125550000"
                      className="text-xl font-semibold text-offwhite-400 hover:text-engineer-500 transition-colors"
                    >
                      +90 312 555 0000
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="group">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center group-hover:bg-engineer-500/20 transition-colors">
                    <Building2 size={22} className="text-engineer-500" />
                  </div>
                  <div>
                    <p className="text-sm text-offwhite-700 mb-1">
                      {content.address}
                    </p>
                    <p className="text-xl font-semibold text-offwhite-400">
                      Ankara, Turkiye
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="group">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center group-hover:bg-engineer-500/20 transition-colors">
                    <Clock size={22} className="text-engineer-500" />
                  </div>
                  <div>
                    <p className="text-sm text-offwhite-700 mb-1">
                      {content.workingHours}
                    </p>
                    <p className="text-xl font-semibold text-offwhite-400">
                      {content.workingHoursValue}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5 pt-8">
                {/* Schedule Call CTA */}
                <div className="p-6 bg-gradient-to-br from-engineer-500/10 to-transparent border border-engineer-500/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar size={24} className="text-engineer-500" />
                    <h3 className="text-lg font-semibold text-offwhite-400">
                      {content.scheduleCall}
                    </h3>
                  </div>
                  <p className="text-sm text-offwhite-700 mb-4">
                    {content.scheduleCallDesc}
                  </p>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-engineer-500 hover:bg-engineer-600 text-white text-sm font-medium rounded-lg transition-all"
                  >
                    <span>{content.calendlyButton}</span>
                    <ExternalLink
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-onyx-800 border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin
                      size={48}
                      className="text-engineer-500/50 mx-auto mb-2"
                    />
                    <p className="text-offwhite-700 text-sm">Ankara, Turkiye</p>
                  </div>
                </div>
                {/* You can replace this with actual map embed */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }}
                />
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="p-8 md:p-10 bg-onyx-800/30 border border-white/5 rounded-3xl">
                <h2 className="text-2xl font-bold text-offwhite-400 mb-8">
                  {content.formTitle}
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success-500/20 flex items-center justify-center">
                      <CheckCircle size={40} className="text-success-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-offwhite-400 mb-3">
                      {content.successTitle}
                    </h3>
                    <p className="text-offwhite-700 max-w-md mx-auto">
                      {content.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name & Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="group">
                        <label className="block text-sm font-medium text-offwhite-600 mb-3">
                          {content.name} *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white/10 text-offwhite-400 placeholder-offwhite-800 focus:border-engineer-500 focus:outline-none transition-colors"
                          placeholder={content.namePlaceholder}
                        />
                      </div>

                      {/* Email */}
                      <div className="group">
                        <label className="block text-sm font-medium text-offwhite-600 mb-3">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white/10 text-offwhite-400 placeholder-offwhite-800 focus:border-engineer-500 focus:outline-none transition-colors"
                          placeholder={content.emailPlaceholder}
                        />
                      </div>
                    </div>

                    {/* Company & Phone Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Company */}
                      <div className="group">
                        <label className="block text-sm font-medium text-offwhite-600 mb-3">
                          {content.company}
                        </label>
                        <input
                          type="text"
                          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white/10 text-offwhite-400 placeholder-offwhite-800 focus:border-engineer-500 focus:outline-none transition-colors"
                          placeholder={content.companyPlaceholder}
                        />
                      </div>

                      {/* Phone */}
                      <div className="group">
                        <label className="block text-sm font-medium text-offwhite-600 mb-3">
                          {content.phone}
                        </label>
                        <input
                          type="tel"
                          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white/10 text-offwhite-400 placeholder-offwhite-800 focus:border-engineer-500 focus:outline-none transition-colors"
                          placeholder={content.phonePlaceholder}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-offwhite-600 mb-3">
                        {content.subject} *
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {subjects[lang].map((subj) => (
                          <button
                            key={subj.value}
                            type="button"
                            onClick={() => setSelectedSubject(subj.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedSubject === subj.value
                                ? 'bg-engineer-500 text-white'
                                : 'bg-white/5 text-offwhite-600 hover:bg-white/10'
                            }`}
                          >
                            {subj.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-offwhite-600 mb-3">
                        {content.message} *
                      </label>
                      <textarea
                        rows={5}
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white/10 text-offwhite-400 placeholder-offwhite-800 focus:border-engineer-500 focus:outline-none transition-colors resize-none"
                        placeholder={content.messagePlaceholder}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 disabled:bg-engineer-500/50 text-white font-medium rounded-xl transition-all duration-300"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={18} />
                          <span>{content.submit}</span>
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
