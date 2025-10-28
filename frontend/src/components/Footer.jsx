import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, 
  Send, CheckCircle2, Award, Shield, Zap, Clock
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
      tagline: 'Türkiyenin güvenilir PCB üretim partneri',
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
        subtitle: 'Kampanya ve duyurulardan haberdar olun',
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
        qualitySub: 'Sertifikalı',
        ontime: '%98',
        ontimeSub: 'Zamanında Teslimat'
      },
      copyright: '© 2024 Aico Elektronik. Tüm hakları saklıdır.',
      legal: [
        { name: 'Gizlilik Politikası', link: '/privacy' },
        { name: 'Kullanım Koşulları', link: '/terms' }
      ]
    },
    en: {
      tagline: 'Turkey trusted PCB manufacturing partner',
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
        subtitle: 'Stay updated with campaigns and announcements',
        placeholder: 'Your email address',
        button: 'Subscribe',
        success: 'Successfully subscribed!'
      },
      contact: {
        title: 'Contact',
        address: 'METU Technopolis, Çankaya, Ankara',
        phone: '+90 312 555 0000',
        email: 'info@aicoelektronik.com'
      },
      trust: {
        delivery: '24-48 Hours',
        deliverySub: 'Fast Prototype',
        quality: 'ISO 9001',
        qualitySub: 'Certified',
        ontime: '98%',
        ontimeSub: 'On-Time Delivery'
      },
      copyright: '© 2024 Aico Electronics. All rights reserved.',
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
    <footer className="bg-[#0A0E27] text-white">
      {/* Trust Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1554F6] flex items-center justify-center flex-shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <div className="font-bold">{t.trust.delivery}</div>
                <div className="text-sm text-gray-400">{t.trust.deliverySub}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1554F6] flex items-center justify-center flex-shrink-0">
                <Award size={24} />
              </div>
              <div>
                <div className="font-bold">{t.trust.quality}</div>
                <div className="text-sm text-gray-400">{t.trust.qualitySub}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1554F6] flex items-center justify-center flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <div className="font-bold">{t.trust.ontime}</div>
                <div className="text-sm text-gray-400">{t.trust.ontimeSub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="/assets/logos/logo-beyaz.png" 
                alt="Aico Elektronik" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
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
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#1554F6] flex items-center justify-center transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-base mb-4">{t.services.title}</h3>
            <ul className="space-y-2.5">
              {t.services.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities & Resources */}
          <div>
            <h3 className="font-bold text-base mb-4">{t.capabilities.title}</h3>
            <ul className="space-y-2.5 mb-6">
              {t.capabilities.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-base mb-4">{t.resources.title}</h3>
            <ul className="space-y-2.5">
              {t.resources.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-base mb-4">{t.contact.title}</h3>
            <div className="space-y-3 mb-6">
              <a href={`tel:${t.contact.phone.replace(/\\s/g, '')}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone size={16} className="flex-shrink-0" />
                <span>{t.contact.phone}</span>
              </a>
              <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={16} className="flex-shrink-0" />
                <span>{t.contact.email}</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>{t.contact.address}</span>
              </div>
            </div>

            <h3 className="font-bold text-base mb-3">{t.newsletter.title}</h3>
            <p className="text-sm text-gray-400 mb-3">{t.newsletter.subtitle}</p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder={t.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  required
                />
                <Button type="submit" className="w-full bg-[#1554F6] hover:bg-[#0d3cb8] text-white">
                  <Send size={16} className="mr-2" />
                  {t.newsletter.button}
                </Button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
                <CheckCircle2 size={20} />
                <span className="text-sm">{t.newsletter.success}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>{t.copyright}</p>
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
