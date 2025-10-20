import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, 
  Youtube, Send, CheckCircle2, Award, CreditCard, Shield, Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = ({ lang = 'tr' }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const content = {
    tr: {
      tagline: 'Güvenilir güç, akıllı çözümler',
      description: 'Türkiye\'nin öncü PCB üretim ve elektronik dizgi firması. 25+ yıllık deneyim, ISO 9001 sertifikalı üretim.',
      services: {
        title: 'Hizmetler',
        items: [
          { name: 'PCB Üretim', link: '/pcb-manufacturing' },
          { name: 'PCB Dizgi (SMT/THT)', link: '/pcb-assembly' },
          { name: 'Hızlı Prototip', link: '/fast-prototyping' },
          { name: 'Anında Teklif', link: '/instant-quote' }
        ]
      },
      capabilities: {
        title: 'Yetenekler',
        items: [
          { name: 'PCB Kapasiteleri', link: '/pcb-capabilities' },
          { name: 'Dizgi Kapasiteleri', link: '/assembly-capabilities' },
          { name: 'Stackup Kütüphanesi', link: '/stackup' },
          { name: 'Kalite & Sertifikalar', link: '/quality' }
        ]
      },
      resources: {
        title: 'Kaynaklar',
        items: [
          { name: 'Vaka Çalışmaları', link: '/case-studies' },
          { name: 'Belgeler & SSS', link: '/support' },
          { name: 'DFM Kontrol Listesi', link: '/support#dfm' },
          { name: 'Panelizasyon Rehberi', link: '/support#panelization' }
        ]
      },
      company: {
        title: 'Kurumsal',
        items: [
          { name: 'Hakkımızda', link: '/about' },
          { name: 'İletişim', link: '/contact' },
          { name: 'Kariyer', link: '/careers' },
          { name: 'Blog', link: '/blog' }
        ]
      },
      newsletter: {
        title: 'Bülten',
        subtitle: 'Yeni ürünler ve kampanyalardan haberdar olun',
        placeholder: 'E-posta adresiniz',
        button: 'Abone Ol',
        success: 'Başarıyla abone oldunuz!'
      },
      contact: {
        title: 'İletişim',
        address: 'ODTÜ Teknokent, Kuluçka Merkezi, Çankaya, Ankara',
        phone: '+90 312 555 0000',
        email: 'info@aicoelektronik.com',
        hours: 'Pzt-Cum: 09:00 - 18:00'
      },
      certifications: {
        title: 'Sertifikalar & Standartlar',
        items: ['ISO 9001:2015', 'CE', 'RoHS', 'REACH', 'IPC-A-610']
      },
      payments: {
        title: 'Ödeme Yöntemleri',
        methods: ['Visa', 'Mastercard', 'Havale/EFT', 'Kapıda Ödeme']
      },
      copyright: '© 2024 Aico Elektronik. Tüm hakları saklıdır.',
      legal: [
        { name: 'Gizlilik Politikası', link: '/privacy' },
        { name: 'Kullanım Koşulları', link: '/terms' },
        { name: 'Çerez Politikası', link: '/cookies' }
      ]
    },
    en: {
      tagline: 'Reliable power, intelligent solutions',
      description: 'Turkey\'s leading PCB manufacturing and electronic assembly company. 25+ years of experience, ISO 9001 certified production.',
      services: {
        title: 'Services',
        items: [
          { name: 'PCB Manufacturing', link: '/pcb-manufacturing' },
          { name: 'PCB Assembly (SMT/THT)', link: '/pcb-assembly' },
          { name: 'Fast Prototyping', link: '/fast-prototyping' },
          { name: 'Instant Quote', link: '/instant-quote' }
        ]
      },
      capabilities: {
        title: 'Capabilities',
        items: [
          { name: 'PCB Capabilities', link: '/pcb-capabilities' },
          { name: 'Assembly Capabilities', link: '/assembly-capabilities' },
          { name: 'Stackup Library', link: '/stackup' },
          { name: 'Quality & Certifications', link: '/quality' }
        ]
      },
      resources: {
        title: 'Resources',
        items: [
          { name: 'Case Studies', link: '/case-studies' },
          { name: 'Docs & FAQ', link: '/support' },
          { name: 'DFM Checklist', link: '/support#dfm' },
          { name: 'Panelization Guide', link: '/support#panelization' }
        ]
      },
      company: {
        title: 'Company',
        items: [
          { name: 'About Us', link: '/about' },
          { name: 'Contact', link: '/contact' },
          { name: 'Careers', link: '/careers' },
          { name: 'Blog', link: '/blog' }
        ]
      },
      newsletter: {
        title: 'Newsletter',
        subtitle: 'Stay updated with new products and campaigns',
        placeholder: 'Your email address',
        button: 'Subscribe',
        success: 'Successfully subscribed!'
      },
      contact: {
        title: 'Contact',
        address: 'METU Technopolis, Incubation Center, Çankaya, Ankara',
        phone: '+90 312 555 0000',
        email: 'info@aicoelektronik.com',
        hours: 'Mon-Fri: 09:00 - 18:00'
      },
      certifications: {
        title: 'Certifications & Standards',
        items: ['ISO 9001:2015', 'CE', 'RoHS', 'REACH', 'IPC-A-610']
      },
      payments: {
        title: 'Payment Methods',
        methods: ['Visa', 'Mastercard', 'Bank Transfer', 'Cash on Delivery']
      },
      copyright: '© 2024 Aico Electronics. All rights reserved.',
      legal: [
        { name: 'Privacy Policy', link: '/privacy' },
        { name: 'Terms of Service', link: '/terms' },
        { name: 'Cookie Policy', link: '/cookies' }
      ]
    }
  };

  const t = content[lang] || content.tr;

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/aicoelektronik', name: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com/aicoelektronik', name: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com/company/aico-elektronik', name: 'LinkedIn' },
    { icon: Instagram, url: 'https://instagram.com/aicoelektronik', name: 'Instagram' },
    { icon: Youtube, url: 'https://youtube.com/@aicoelektronik', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#0A0E27] via-[#1e293b] to-[#0A0E27] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                A
              </div>
              <div>
                <div className="font-bold text-xl">Aico Elektronik</div>
                <div className="text-sm text-gray-400">{t.tagline}</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              {t.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#0EA5E9] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <span>{t.contact.phone}</span>
              </a>
              <a href={`mailto:${t.contact.email}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#0EA5E9] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <span>{t.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <span>{t.contact.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-gradient-to-br hover:from-[#1554F6] hover:to-[#0EA5E9] flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.services.title}</h3>
            <ul className="space-y-2">
              {t.services.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-sm text-gray-300 hover:text-[#0EA5E9] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] group-hover:scale-150 transition-transform"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-lg mb-4 mt-8">{t.capabilities.title}</h3>
            <ul className="space-y-2">
              {t.capabilities.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-sm text-gray-300 hover:text-[#0EA5E9] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] group-hover:scale-150 transition-transform"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.resources.title}</h3>
            <ul className="space-y-2">
              {t.resources.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-sm text-gray-300 hover:text-[#0EA5E9] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] group-hover:scale-150 transition-transform"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-lg mb-4 mt-8">{t.company.title}</h3>
            <ul className="space-y-2">
              {t.company.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}${item.link}`}
                    className="text-sm text-gray-300 hover:text-[#0EA5E9] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] group-hover:scale-150 transition-transform"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.newsletter.title}</h3>
            <p className="text-sm text-gray-300 mb-4">{t.newsletter.subtitle}</p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder={t.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:scale-105 transition-transform">
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

            {/* Trust Badges */}
            <div className="mt-8">
              <h4 className="font-semibold text-sm mb-3">{t.certifications.title}</h4>
              <div className="flex flex-wrap gap-2">
                {t.certifications.items.map((cert, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium border border-white/20"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Stats Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Zap className="text-[#0EA5E9]" size={24} />
              <div>
                <div className="text-sm font-semibold">24-48 {lang === 'tr' ? 'Saat' : 'Hour'}</div>
                <div className="text-xs text-gray-400">{lang === 'tr' ? 'Hızlı Prototip' : 'Fast Prototype'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="text-[#0EA5E9]" size={24} />
              <div>
                <div className="text-sm font-semibold">ISO 9001</div>
                <div className="text-xs text-gray-400">{lang === 'tr' ? 'Sertifikalı' : 'Certified'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="text-[#0EA5E9]" size={24} />
              <div>
                <div className="text-sm font-semibold">%98</div>
                <div className="text-xs text-gray-400">{lang === 'tr' ? 'Zamanında Teslimat' : 'On-Time Delivery'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="text-[#0EA5E9]" size={24} />
              <div>
                <div className="text-sm font-semibold">{lang === 'tr' ? 'Güvenli' : 'Secure'}</div>
                <div className="text-xs text-gray-400">{lang === 'tr' ? 'Ödeme' : 'Payment'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">{t.copyright}</p>
            <div className="flex items-center gap-6">
              {t.legal.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/${lang}${item.link}`}
                  className="text-sm text-gray-400 hover:text-[#0EA5E9] transition-colors"
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
