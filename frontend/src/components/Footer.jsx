import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram,
  Send, CheckCircle2, Award, Shield, Zap, Clock, ArrowUpRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = ({ lang = 'tr' }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const content = {
    tr: {
      tagline: 'Türkiye\'nin güvenilir PCB üretim ve elektronik dizgi partneri. 25+ yıllık deneyim ile kaliteli çözümler sunuyoruz.',
      services: {
        title: 'Hizmetler',
        items: [
          { name: 'PCB Üretim', link: '/pcb-manufacturing' },
          { name: 'PCB Dizgi', link: '/pcb-assembly' },
          { name: 'Hızlı Prototip', link: '/fast-prototyping' },
          { name: 'Anında Teklif', link: '/instant-quote' }
        ]
      },
      capabilities: {
        title: 'Yetenekler',
        items: [
          { name: 'PCB Kapasiteleri', link: '/pcb-capabilities' },
          { name: 'Dizgi Kapasiteleri', link: '/assembly-capabilities' },
          { name: 'Kalite & Sertifikalar', link: '/quality' }
        ]
      },
      resources: {
        title: 'Kaynaklar',
        items: [
          { name: 'Referanslar', link: '/case-studies' },
          { name: 'Destek & SSS', link: '/support' },
          { name: 'Hakkımızda', link: '/about' },
          { name: 'İletişim', link: '/contact' }
        ]
      },
      newsletter: {
        title: 'Bülten',
        subtitle: 'Kampanya ve duyurulardan ilk siz haberdar olun',
        placeholder: 'E-posta adresiniz',
        button: 'Abone Ol',
        success: 'Başarıyla abone oldunuz!'
      },
      contact: {
        title: 'İletişim',
        address: 'ODTÜ Teknokent, Çankaya, Ankara',
        phone: '+90 312 555 0000',
        email: 'info@aicoelektronik.com'
      },
      trust: {
        delivery: '24-48 Saat',
        deliverySub: 'Hızlı Prototip',
        quality: 'ISO 9001',
        qualitySub: 'Sertifikalı Kalite',
        ontime: '%98',
        ontimeSub: 'Zamanında Teslimat'
      },
      copyright: '2024 Aico Elektronik. Tüm hakları saklıdır.',
      legal: [
        { name: 'Gizlilik Politikası', link: '/privacy' },
        { name: 'Kullanım Koşulları', link: '/terms' }
      ]
    },
    en: {
      tagline: 'Turkey\'s trusted PCB manufacturing and electronic assembly partner. Delivering quality solutions with 25+ years of experience.',
      services: {
        title: 'Services',
        items: [
          { name: 'PCB Manufacturing', link: '/pcb-manufacturing' },
          { name: 'PCB Assembly', link: '/pcb-assembly' },
          { name: 'Fast Prototyping', link: '/fast-prototyping' },
          { name: 'Instant Quote', link: '/instant-quote' }
        ]
      },
      capabilities: {
        title: 'Capabilities',
        items: [
          { name: 'PCB Capabilities', link: '/pcb-capabilities' },
          { name: 'Assembly Capabilities', link: '/assembly-capabilities' },
          { name: 'Quality & Certifications', link: '/quality' }
        ]
      },
      resources: {
        title: 'Resources',
        items: [
          { name: 'References', link: '/case-studies' },
          { name: 'Support & FAQ', link: '/support' },
          { name: 'About Us', link: '/about' },
          { name: 'Contact', link: '/contact' }
        ]
      },
      newsletter: {
        title: 'Newsletter',
        subtitle: 'Be the first to know about campaigns and announcements',
        placeholder: 'Your email address',
        button: 'Subscribe',
        success: 'Successfully subscribed!'
      },
      contact: {
        title: 'Contact',
        address: 'METU Technopolis, Cankaya, Ankara',
        phone: '+90 312 555 0000',
        email: 'info@aicoelektronik.com'
      },
      trust: {
        delivery: '24-48 Hours',
        deliverySub: 'Fast Prototype',
        quality: 'ISO 9001',
        qualitySub: 'Certified Quality',
        ontime: '98%',
        ontimeSub: 'On-Time Delivery'
      },
      copyright: '2024 Aico Electronics. All rights reserved.',
      legal: [
        { name: 'Privacy Policy', link: '/privacy' },
        { name: 'Terms of Service', link: '/terms' }
      ]
    }
  };

  const t = content[lang] || content.tr;

  const socialLinks = [
    { icon: Linkedin, url: 'https://linkedin.com/company/aico-elektronik', name: 'LinkedIn' },
    { icon: Twitter, url: 'https://twitter.com/aicoelektronik', name: 'Twitter' },
    { icon: Facebook, url: 'https://facebook.com/aicoelektronik', name: 'Facebook' },
    { icon: Instagram, url: 'https://instagram.com/aicoelektronik', name: 'Instagram' }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Elegant gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Trust Bar with elegant cards */}
      <div className="border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
                <Zap size={24} />
              </div>
              <div>
                <div className="font-bold text-xl text-white">{t.trust.delivery}</div>
                <div className="text-sm text-slate-400">{t.trust.deliverySub}</div>
              </div>
            </div>
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 group-hover:scale-105 transition-all duration-300">
                <Award size={24} />
              </div>
              <div>
                <div className="font-bold text-xl text-white">{t.trust.quality}</div>
                <div className="text-sm text-slate-400">{t.trust.qualitySub}</div>
              </div>
            </div>
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300">
                <Clock size={24} />
              </div>
              <div>
                <div className="font-bold text-xl text-white">{t.trust.ontime}</div>
                <div className="text-sm text-slate-400">{t.trust.ontimeSub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Company Info - Wider column */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <img
                src="/assets/logos/logo-beyaz.png"
                alt="Aico Elektronik"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
              {t.tagline}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-11 h-11 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 border border-white/5 hover:border-blue-500/50"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white text-[15px] mb-5 uppercase tracking-wider">{t.services.title}</h3>
            <ul className="space-y-3.5">
              {t.services.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-[15px] text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities & Resources */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white text-[15px] mb-5 uppercase tracking-wider">{t.capabilities.title}</h3>
            <ul className="space-y-3.5 mb-8">
              {t.capabilities.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-[15px] text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-white text-[15px] mb-5 uppercase tracking-wider">{t.resources.title}</h3>
            <ul className="space-y-3.5">
              {t.resources.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-[15px] text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-white text-[15px] mb-5 uppercase tracking-wider">{t.contact.title}</h3>
            <div className="space-y-4 mb-8">
              <a href={`tel:${t.contact.phone.replace(/\\s/g, '')}`} className="flex items-center gap-3 text-[15px] text-slate-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Phone size={16} className="flex-shrink-0" />
                </div>
                <span>{t.contact.phone}</span>
              </a>
              <a href={`mailto:${t.contact.email}`} className="flex items-center gap-3 text-[15px] text-slate-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={16} className="flex-shrink-0" />
                </div>
                <span>{t.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-[15px] text-slate-400">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <span className="pt-2">{t.contact.address}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5">
              <h3 className="font-bold text-white text-[15px] mb-2">{t.newsletter.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{t.newsletter.subtitle}</p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder={t.newsletter.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300">
                    <Send size={16} className="mr-2" />
                    {t.newsletter.button}
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20">
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-medium">{t.newsletter.success}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>&copy; {t.copyright}</p>
            <div className="flex items-center gap-6">
              {t.legal.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/${lang}${item.link}`}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
