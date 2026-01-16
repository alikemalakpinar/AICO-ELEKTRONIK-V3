'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';

export default function ContactPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const t = getTranslations(lang);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-onyx-900 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
            <span className="w-8 h-px bg-engineer-500" />
            {lang === 'tr' ? 'ILETISIM' : 'CONTACT'}
            <span className="w-8 h-px bg-engineer-500" />
          </span>
          <h1 className="text-hero-md font-bold text-offwhite-400 mb-6">
            {t.contact.title}
          </h1>
          <p className="text-xl text-offwhite-700 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div className="p-6 bg-onyx-800/50 border border-white/5 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-engineer-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-engineer-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-offwhite-400 mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:info@aicoelektronik.com"
                    className="text-offwhite-600 hover:text-engineer-500 transition-colors"
                  >
                    info@aicoelektronik.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-onyx-800/50 border border-white/5 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-engineer-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-engineer-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-offwhite-400 mb-1">
                    {lang === 'tr' ? 'Telefon' : 'Phone'}
                  </h3>
                  <a
                    href="tel:+903125550000"
                    className="text-offwhite-600 hover:text-engineer-500 transition-colors"
                  >
                    +90 312 555 0000
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-onyx-800/50 border border-white/5 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-engineer-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-engineer-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-offwhite-400 mb-1">
                    {lang === 'tr' ? 'Adres' : 'Address'}
                  </h3>
                  <p className="text-offwhite-600">Ankara, Turkiye</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-onyx-800/50 border border-white/5 rounded-2xl"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-success-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-offwhite-400 mb-2">
                  {lang === 'tr' ? 'Tesekkurler!' : 'Thank you!'}
                </h3>
                <p className="text-offwhite-700">
                  {lang === 'tr'
                    ? 'En kisa surede sizinle iletisime gececegiz.'
                    : 'We will contact you as soon as possible.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-offwhite-600 mb-2">
                    {lang === 'tr' ? 'Ad Soyad' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-onyx-900 border border-white/10 rounded-lg text-offwhite-400 placeholder-offwhite-800 focus:border-engineer-500 focus:outline-none transition-colors"
                    placeholder={lang === 'tr' ? 'Adiniz Soyadiniz' : 'Your Name'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-offwhite-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-onyx-900 border border-white/10 rounded-lg text-offwhite-400 placeholder-offwhite-800 focus:border-engineer-500 focus:outline-none transition-colors"
                    placeholder="email@ornek.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-offwhite-600 mb-2">
                    {lang === 'tr' ? 'Proje Tipi' : 'Project Type'}
                  </label>
                  <select className="w-full px-4 py-3 bg-onyx-900 border border-white/10 rounded-lg text-offwhite-400 focus:border-engineer-500 focus:outline-none transition-colors">
                    <option value="villa">
                      {lang === 'tr' ? 'Akilli Villa' : 'Smart Villa'}
                    </option>
                    <option value="residence">
                      {lang === 'tr' ? 'Akilli Rezidans' : 'Smart Residence'}
                    </option>
                    <option value="industrial">
                      {lang === 'tr' ? 'Endustriyel' : 'Industrial'}
                    </option>
                    <option value="other">
                      {lang === 'tr' ? 'Diger' : 'Other'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-offwhite-600 mb-2">
                    {lang === 'tr' ? 'Mesajiniz' : 'Your Message'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-onyx-900 border border-white/10 rounded-lg text-offwhite-400 placeholder-offwhite-800 focus:border-engineer-500 focus:outline-none transition-colors resize-none"
                    placeholder={
                      lang === 'tr'
                        ? 'Projeniz hakkinda bilgi verin...'
                        : 'Tell us about your project...'
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-engineer-500 hover:bg-engineer-600 disabled:bg-engineer-500/50 text-white font-medium rounded-lg transition-colors"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      <span>{t.common.submit}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
