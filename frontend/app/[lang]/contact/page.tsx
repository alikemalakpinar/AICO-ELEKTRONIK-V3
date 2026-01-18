'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { getTranslations, type Locale } from '@/lib/i18n';
import {
  Send,
  Check,
  MapPin,
  Phone,
  Mail,
  Clock,
  Linkedin,
  Twitter,
  Github,
  ArrowRight,
  Zap,
  Building2,
  Globe,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface ContactPageProps {
  params: { lang: Locale };
}

// Floating Label Input Component
function FloatingInput({
  id,
  label,
  type = 'text',
  required = false,
  value,
  onChange,
  isTextarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;

  const InputComponent = isTextarea ? 'textarea' : 'input';

  return (
    <div className="relative">
      <InputComponent
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 pt-6 pb-2 bg-white/5 border rounded-xl text-offwhite-400 placeholder-transparent focus:outline-none transition-all duration-300 resize-none ${
          isFocused
            ? 'border-engineer-500 ring-1 ring-engineer-500/30'
            : 'border-white/10 hover:border-white/20'
        } ${isTextarea ? 'h-32' : ''}`}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive
            ? 'top-2 text-xs text-engineer-500'
            : 'top-4 text-sm text-offwhite-600'
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Active glow effect */}
      {isFocused && (
        <motion.div
          layoutId={`glow-${id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 -z-10 rounded-xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(249, 115, 22, 0.1), transparent 70%)',
          }}
        />
      )}
    </div>
  );
}

// Magnetic Submit Button
function MagneticSubmitButton({
  isSubmitting,
  isSuccess,
  label,
}: {
  isSubmitting: boolean;
  isSuccess: boolean;
  label: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || isSubmitting || isSuccess) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.3);
    mouseY.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      type="submit"
      disabled={isSubmitting || isSuccess}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-full py-4 rounded-xl font-medium text-white overflow-hidden transition-all duration-500 ${
        isSuccess
          ? 'bg-success-500'
          : 'bg-engineer-500 hover:bg-engineer-600 hover:shadow-lg hover:shadow-engineer-500/25'
      }`}
    >
      {/* Button content */}
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.4 }}
            >
              <Check size={20} />
            </motion.div>
            <span>Sent!</span>
          </motion.div>
        ) : isSubmitting ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            <span>Sending...</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 group"
          >
            <span>{label}</span>
            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple effect on hover */}
      <motion.div
        className="absolute inset-0 bg-white/10 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </motion.button>
  );
}

// Connected Globe Visualization (CSS-based for performance)
function GlobalReachMap() {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  const locations = [
    { id: 0, name: 'Istanbul HQ', x: 53, y: 38, isPrimary: true },
    { id: 1, name: 'Ankara', x: 55, y: 40, isPrimary: false },
    { id: 2, name: 'Izmir', x: 50, y: 40, isPrimary: false },
    { id: 3, name: 'Antalya', x: 52, y: 42, isPrimary: false },
    { id: 4, name: 'Europe', x: 48, y: 35, isPrimary: false },
    { id: 5, name: 'Middle East', x: 58, y: 42, isPrimary: false },
  ];

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-onyx-800/50 border border-white/5">
      {/* World map outline (simplified) */}
      <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full opacity-20">
        {/* Europe */}
        <ellipse cx="48" cy="25" rx="12" ry="8" fill="none" stroke="#F97316" strokeWidth="0.3" />
        {/* Asia */}
        <ellipse cx="65" cy="28" rx="18" ry="10" fill="none" stroke="#F97316" strokeWidth="0.3" />
        {/* Africa */}
        <ellipse cx="48" cy="42" rx="8" ry="10" fill="none" stroke="#F97316" strokeWidth="0.3" />
        {/* Middle East */}
        <ellipse cx="56" cy="35" rx="5" ry="4" fill="none" stroke="#F97316" strokeWidth="0.3" />

        {/* Connection lines from Istanbul */}
        {locations.slice(1).map((loc) => (
          <motion.line
            key={loc.id}
            x1={locations[0].x}
            y1={locations[0].y}
            x2={loc.x}
            y2={loc.y}
            stroke="#F97316"
            strokeWidth="0.2"
            strokeDasharray="2,2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: loc.id * 0.2 }}
          />
        ))}
      </svg>

      {/* Location dots */}
      {locations.map((loc) => (
        <motion.div
          key={loc.id}
          className="absolute cursor-pointer"
          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          onHoverStart={() => setActiveLocation(loc.id)}
          onHoverEnd={() => setActiveLocation(null)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: loc.id * 0.1 + 0.5 }}
        >
          <motion.div
            className={`relative ${loc.isPrimary ? 'w-4 h-4' : 'w-2.5 h-2.5'} rounded-full ${
              loc.isPrimary ? 'bg-engineer-500' : 'bg-engineer-500/60'
            }`}
            animate={{
              scale: activeLocation === loc.id ? 1.5 : 1,
            }}
          >
            {/* Pulse animation for HQ */}
            {loc.isPrimary && (
              <motion.div
                className="absolute inset-0 rounded-full bg-engineer-500"
                animate={{ scale: [1, 2, 2], opacity: [0.5, 0.2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </motion.div>

          {/* Label on hover */}
          <AnimatePresence>
            {activeLocation === loc.id && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-onyx-900 border border-white/10 rounded-md text-xs text-offwhite-400"
              >
                {loc.name}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-onyx-900 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function ContactPage({ params }: ContactPageProps) {
  const lang = params.lang;
  const t = getTranslations(lang);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Check for subject in URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const subjectParam = urlParams.get('subject');
      if (subjectParam) {
        setFormData((prev) => ({ ...prev, subject: subjectParam }));
      }
    }
  }, []);

  const [error, setError] = useState<string | null>(null);

  // Handle form submission - real API integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(lang === 'tr' ? 'Geçerli bir e-posta adresi girin.' : 'Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/contact/consultation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          project_type: formData.subject || 'consultation',
          message: formData.message,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(lang === 'tr'
            ? 'Çok fazla istek gönderdiniz. Lütfen bir dakika bekleyin.'
            : 'Too many requests. Please wait a minute.');
        }
        throw new Error(lang === 'tr'
          ? 'Mesaj gönderilemedi. Lütfen tekrar deneyin.'
          : 'Failed to send message. Please try again.');
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after success animation
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      }, 3000);
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : (lang === 'tr' ? 'Bir hata oluştu.' : 'An error occurred.'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const subjects = [
    { id: 'consultation', label: lang === 'tr' ? 'Proje Danismanligi' : 'Project Consultation' },
    { id: 'demo', label: lang === 'tr' ? 'Demo Talebi' : 'Demo Request' },
    { id: 'partnership', label: lang === 'tr' ? 'Is Ortakligi' : 'Partnership' },
    { id: 'support', label: lang === 'tr' ? 'Teknik Destek' : 'Technical Support' },
    { id: 'other', label: lang === 'tr' ? 'Diger' : 'Other' },
  ];

  return (
    <div className="min-h-screen bg-onyx-900 pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
            <span className="w-8 h-px bg-engineer-500" />
            {lang === 'tr' ? 'ILETISIM' : 'CONTACT'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite-400 mb-6 tracking-tight">
            {lang === 'tr' ? 'Konusalim' : "Let's Talk"}
          </h1>
          <p className="text-xl text-offwhite-600 leading-relaxed">
            {lang === 'tr'
              ? 'Projenizi tartismak, demo talep etmek veya sorularinizi sormak icin bizimle iletisime gecin.'
              : 'Get in touch to discuss your project, request a demo, or ask any questions.'}
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingInput
                  id="name"
                  label={lang === 'tr' ? 'Adiniz' : 'Your Name'}
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <FloatingInput
                  id="email"
                  label={lang === 'tr' ? 'E-posta' : 'Email'}
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Company */}
              <FloatingInput
                id="company"
                label={lang === 'tr' ? 'Sirket (Opsiyonel)' : 'Company (Optional)'}
                value={formData.company}
                onChange={handleChange}
              />

              {/* Subject Selection */}
              <div className="space-y-2">
                <label className="text-sm text-offwhite-600">
                  {lang === 'tr' ? 'Konu' : 'Subject'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: subject.id })}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        formData.subject === subject.id
                          ? 'bg-engineer-500 text-white'
                          : 'bg-white/5 text-offwhite-500 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {subject.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <FloatingInput
                id="message"
                label={lang === 'tr' ? 'Mesajiniz' : 'Your Message'}
                required
                isTextarea
                value={formData.message}
                onChange={handleChange}
              />

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <MagneticSubmitButton
                isSubmitting={isSubmitting}
                isSuccess={isSuccess}
                label={lang === 'tr' ? 'Mesaj Gonder' : 'Send Message'}
              />
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Global Reach Map */}
            <div>
              <h3 className="text-sm font-medium text-offwhite-500 mb-4 flex items-center gap-2">
                <Globe size={16} className="text-engineer-500" />
                {lang === 'tr' ? 'Global Erisim' : 'Global Reach'}
              </h3>
              <GlobalReachMap />
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.a
                href="mailto:info@aicoelektronik.com"
                className="group p-5 bg-onyx-800/50 border border-white/5 rounded-xl hover:border-engineer-500/30 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-3 group-hover:bg-engineer-500/20 transition-colors">
                  <Mail size={20} className="text-engineer-500" />
                </div>
                <div className="text-sm text-offwhite-600 mb-1">E-posta</div>
                <div className="text-offwhite-400 font-medium">info@aicoelektronik.com</div>
              </motion.a>

              <motion.a
                href="tel:+908508408600"
                className="group p-5 bg-onyx-800/50 border border-white/5 rounded-xl hover:border-engineer-500/30 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-3 group-hover:bg-engineer-500/20 transition-colors">
                  <Phone size={20} className="text-engineer-500" />
                </div>
                <div className="text-sm text-offwhite-600 mb-1">{lang === 'tr' ? 'Telefon' : 'Phone'}</div>
                <div className="text-offwhite-400 font-medium">+90 850 840 86 00</div>
              </motion.a>

              <motion.div
                className="group p-5 bg-onyx-800/50 border border-white/5 rounded-xl hover:border-engineer-500/30 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-3 group-hover:bg-engineer-500/20 transition-colors">
                  <MapPin size={20} className="text-engineer-500" />
                </div>
                <div className="text-sm text-offwhite-600 mb-1">{lang === 'tr' ? 'Adres' : 'Address'}</div>
                <div className="text-offwhite-400 font-medium">Istanbul, Turkiye</div>
              </motion.div>

              <motion.div
                className="group p-5 bg-onyx-800/50 border border-white/5 rounded-xl hover:border-engineer-500/30 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-3 group-hover:bg-engineer-500/20 transition-colors">
                  <Clock size={20} className="text-engineer-500" />
                </div>
                <div className="text-sm text-offwhite-600 mb-1">{lang === 'tr' ? 'Calisma Saatleri' : 'Working Hours'}</div>
                <div className="text-offwhite-400 font-medium">09:00 - 18:00 GMT+3</div>
              </motion.div>
            </div>

            {/* Schedule Call CTA */}
            <div className="p-6 bg-gradient-to-br from-engineer-500/10 to-transparent border border-engineer-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={24} className="text-engineer-500" />
                <h3 className="text-lg font-semibold text-offwhite-400">
                  {lang === 'tr' ? 'Gorusme Planla' : 'Schedule a Call'}
                </h3>
              </div>
              <p className="text-sm text-offwhite-600 mb-4">
                {lang === 'tr'
                  ? 'Takvimimizden uygun bir saat secin, sizi arayalim.'
                  : 'Pick a suitable time from our calendar, and we will call you.'}
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-engineer-500 hover:bg-engineer-600 text-white text-sm font-medium rounded-lg transition-all"
              >
                <span>{lang === 'tr' ? 'Calendly ile Randevu Al' : 'Book with Calendly'}</span>
                <ExternalLink
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-sm font-medium text-offwhite-500 mb-4">
                {lang === 'tr' ? 'Sosyal Medya' : 'Social Media'}
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Github, href: '#', label: 'GitHub' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-3 bg-white/5 rounded-lg text-offwhite-500 hover:text-engineer-500 hover:bg-white/10 transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 bg-onyx-800/30 border border-white/5 rounded-2xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center flex-shrink-0">
                <Zap size={24} className="text-engineer-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-offwhite-400 mb-1">
                  {lang === 'tr' ? 'Hizli Cevap Almak Ister misiniz?' : 'Want a Quick Response?'}
                </h3>
                <p className="text-sm text-offwhite-600">
                  {lang === 'tr'
                    ? 'Demo talebi icin direkt olarak planlayin. 24 saat icerisinde donus yapariz.'
                    : 'Schedule directly for demo requests. We respond within 24 hours.'}
                </p>
              </div>
            </div>
            <motion.a
              href={`/${lang}/contact?subject=demo`}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{lang === 'tr' ? 'Demo Planla' : 'Schedule Demo'}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
