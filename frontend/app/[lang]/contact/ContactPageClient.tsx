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
  Globe,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface ContactPageClientProps {
  lang: Locale;
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
        className={`w-full px-4 pt-6 pb-2 bg-card border rounded-xl text-foreground placeholder-transparent focus:outline-none transition-all duration-300 resize-none border-beam ${
          isFocused
            ? 'border-engineer-500 ring-2 ring-engineer-500/30'
            : 'border-border hover:border-muted-foreground/30'
        } ${isTextarea ? 'h-32' : ''}`}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive
            ? 'top-2 text-xs text-engineer-500'
            : 'top-4 text-sm text-muted-foreground'
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
      className={`relative w-full py-4 min-h-[44px] rounded-xl font-medium text-white overflow-hidden transition-all duration-500 ${
        isSuccess
          ? 'bg-success-500'
          : 'bg-engineer-500 hover:bg-engineer-600 hover:shadow-lg hover:shadow-engineer-500/25'
      }`}
    >
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
            <span>&#10003;</span>
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

// Connected Globe Visualization
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
    <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-card/60 backdrop-blur-xl border border-border">
      <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full opacity-20">
        <ellipse cx="48" cy="25" rx="12" ry="8" fill="none" stroke="#F97316" strokeWidth="0.3" />
        <ellipse cx="65" cy="28" rx="18" ry="10" fill="none" stroke="#F97316" strokeWidth="0.3" />
        <ellipse cx="48" cy="42" rx="8" ry="10" fill="none" stroke="#F97316" strokeWidth="0.3" />
        <ellipse cx="56" cy="35" rx="5" ry="4" fill="none" stroke="#F97316" strokeWidth="0.3" />
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
            animate={{ scale: activeLocation === loc.id ? 1.5 : 1 }}
          >
            {loc.isPrimary && (
              <motion.div
                className="absolute inset-0 rounded-full bg-engineer-500"
                animate={{ scale: [1, 2, 2], opacity: [0.5, 0.2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </motion.div>

          <AnimatePresence>
            {activeLocation === loc.id && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-card border border-border rounded-md text-xs text-foreground"
              >
                {loc.name}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function ContactPageClient({ lang }: ContactPageClientProps) {
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const subjectParam = urlParams.get('subject');
      if (subjectParam) {
        setFormData((prev) => ({ ...prev, subject: subjectParam }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const subjects = [
    { id: 'consultation', label: lang === 'tr' ? 'Proje Danışmanlığı' : 'Project Consultation' },
    { id: 'demo', label: lang === 'tr' ? 'Demo Talebi' : 'Demo Request' },
    { id: 'partnership', label: lang === 'tr' ? 'İş Ortaklığı' : 'Partnership' },
    { id: 'support', label: lang === 'tr' ? 'Teknik Destek' : 'Technical Support' },
    { id: 'other', label: lang === 'tr' ? 'Diğer' : 'Other' },
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-x-hidden">
      {/* Engineering blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <pattern id="contact-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" className="text-foreground" />
          <rect width="100%" height="100%" fill="url(#contact-grid-lg)" className="text-foreground" opacity="0.5" />
        </svg>
      </div>

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-engineer-500/[0.04] dark:bg-engineer-500/[0.06] blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] dark:bg-blue-500/[0.05] blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-engineer-500/10 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="mono-overline text-engineer-500/70 mb-6">
            {lang === 'tr' ? 'ILETISIM' : 'CONTACT'}
          </span>
          <h1 className="heading-display-lg text-foreground mb-6">
            {lang === 'tr' ? 'Konuşalım' : "Let's Talk"}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {lang === 'tr'
              ? 'Projenizi tartışmak, demo talep etmek veya sorularınızı sormak için bizimle iletişime geçin.'
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
            className="relative"
          >
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-engineer-500/20 via-engineer-500/5 to-engineer-500/20 blur-sm pointer-events-none" />
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl glass-premium">
              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingInput
                  id="name"
                  label={lang === 'tr' ? 'Adınız' : 'Your Name'}
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

              <FloatingInput
                id="company"
                label={lang === 'tr' ? 'Şirket (Opsiyonel)' : 'Company (Optional)'}
                value={formData.company}
                onChange={handleChange}
              />

              {/* Subject Selection */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  {lang === 'tr' ? 'Konu' : 'Subject'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: subject.id })}
                      className={`px-4 py-2 min-h-[44px] rounded-lg text-sm transition-all ${
                        formData.subject === subject.id
                          ? 'bg-engineer-500 text-white'
                          : 'bg-muted text-muted-foreground hover:bg-accent border border-border'
                      }`}
                    >
                      {subject.label}
                    </button>
                  ))}
                </div>
              </div>

              <FloatingInput
                id="message"
                label={lang === 'tr' ? 'Mesajınız' : 'Your Message'}
                required
                isTextarea
                value={formData.message}
                onChange={handleChange}
              />

              <MagneticSubmitButton
                isSubmitting={isSubmitting}
                isSuccess={isSuccess}
                label={lang === 'tr' ? 'Mesaj Gönder' : 'Send Message'}
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
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <Globe size={16} className="text-engineer-500" />
                {lang === 'tr' ? 'Global Erişim' : 'Global Reach'}
              </h3>
              <GlobalReachMap />
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.a
                href="mailto:info@aicoelektronik.com"
                className="group p-5 bg-card/60 backdrop-blur-xl border border-border rounded-xl hover:border-engineer-500/40 hover:shadow-engineer-500/10 hover:shadow-lg transition-all duration-300 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-3 group-hover:bg-engineer-500/20 transition-colors">
                  <Mail size={20} className="text-engineer-500" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">E-posta</div>
                <div className="text-foreground font-medium mono-data">info@aicoelektronik.com</div>
              </motion.a>

              <motion.a
                href="tel:+905326210601"
                className="group p-5 bg-card/60 backdrop-blur-xl border border-border rounded-xl hover:border-engineer-500/40 hover:shadow-engineer-500/10 hover:shadow-lg transition-all duration-300 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-3 group-hover:bg-engineer-500/20 transition-colors">
                  <Phone size={20} className="text-engineer-500" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">{lang === 'tr' ? 'Telefon' : 'Phone'}</div>
                <div className="text-foreground font-medium mono-data">+90 532 621 06 01</div>
              </motion.a>

              <motion.div
                className="group p-5 bg-card/60 backdrop-blur-xl border border-border rounded-xl hover:border-engineer-500/40 hover:shadow-engineer-500/10 hover:shadow-lg transition-all duration-300 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-3 group-hover:bg-engineer-500/20 transition-colors">
                  <MapPin size={20} className="text-engineer-500" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">{lang === 'tr' ? 'Adres' : 'Address'}</div>
                <div className="text-foreground font-medium text-xs leading-relaxed">
                  Yukarı Dudullu Mah, Necip Fazıl Blv No:44/38, Ümraniye, Istanbul
                </div>
              </motion.div>

              <motion.div
                className="group p-5 bg-card/60 backdrop-blur-xl border border-border rounded-xl hover:border-engineer-500/40 hover:shadow-engineer-500/10 hover:shadow-lg transition-all duration-300 shadow-sm sm:col-span-2"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-3 group-hover:bg-engineer-500/20 transition-colors">
                  <Clock size={20} className="text-engineer-500" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">{lang === 'tr' ? 'Çalışma Saatleri' : 'Working Hours'}</div>
                <div className="text-foreground font-medium">
                  {lang === 'tr' ? 'Hafta İçi: 09:00 - 18:00' : 'Weekdays: 09:00 - 18:00'}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {lang === 'tr' ? 'Hafta sonu kapalı' : 'Closed on weekends'}
                </div>
              </motion.div>
            </div>

            {/* Schedule Call CTA */}
            <div className="p-6 bg-gradient-to-br from-engineer-500/10 to-transparent border border-engineer-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={24} className="text-engineer-500" />
                <h3 className="text-lg font-semibold text-foreground">
                  {lang === 'tr' ? 'Görüşme Planla' : 'Schedule a Call'}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {lang === 'tr'
                  ? 'Takvimimizden uygun bir saat seçin, sizi arayalım.'
                  : 'Pick a suitable time from our calendar, and we will call you.'}
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-engineer-500 hover:bg-engineer-600 text-white text-sm font-medium rounded-lg transition-all"
              >
                <span>{lang === 'tr' ? 'Calendly ile Randevu Al' : 'Book with Calendly'}</span>
                <ExternalLink
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-medium text-foreground mb-4">
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
                    className="p-3 min-h-[44px] min-w-[44px] bg-muted rounded-lg text-muted-foreground hover:text-engineer-500 hover:bg-accent transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
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
          className="p-8 bg-card/60 backdrop-blur-xl border border-border rounded-2xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center flex-shrink-0">
                <Zap size={24} className="text-engineer-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {lang === 'tr' ? 'Hızlı Cevap Almak İster misiniz?' : 'Want a Quick Response?'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lang === 'tr'
                    ? 'Demo talebi için direkt olarak planlayın. 24 saat içerisinde dönüş yaparız.'
                    : 'Schedule directly for demo requests. We respond within 24 hours.'}
                </p>
              </div>
            </div>
            <motion.a
              href={`/${lang}/contact?subject=demo`}
              className="group inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all flex-shrink-0"
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
