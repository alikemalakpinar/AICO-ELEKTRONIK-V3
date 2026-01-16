import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

/**
 * PremiumFooter - Minimalist, premium footer design
 *
 * Ultra-minimal, engineering-focused footer with subtle animations
 */

const PremiumFooter = ({ lang = 'tr' }) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    solutions: [
      { label: lang === 'tr' ? 'Akilli Villa' : 'Smart Villa', href: `/${lang}/solutions/smart-villa` },
      { label: lang === 'tr' ? 'Akilli Rezidans' : 'Smart Residence', href: `/${lang}/solutions/smart-residence` },
      { label: lang === 'tr' ? 'Endustriyel Cozumler' : 'Industrial Solutions', href: `/${lang}/solutions` },
    ],
    company: [
      { label: lang === 'tr' ? 'Hakkimizda' : 'About Us', href: `/${lang}/about` },
      { label: lang === 'tr' ? 'Projeler' : 'Projects', href: `/${lang}/projects` },
      { label: lang === 'tr' ? 'Kariyer' : 'Careers', href: `/${lang}/careers` },
      { label: lang === 'tr' ? 'Iletisim' : 'Contact', href: `/${lang}/contact` },
    ],
    legal: [
      { label: t('footer.privacy'), href: `/${lang}/privacy` },
      { label: t('footer.terms'), href: `/${lang}/terms` },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/aico-elektronik', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/aicoelektronik', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/aicoelektronik', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@aicoelektronik', label: 'YouTube' },
  ];

  return (
    <footer className="bg-onyx-900 border-t border-white/5">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to={`/${lang}`} className="inline-block mb-6">
              <img
                src="/assets/logos/aicoelektroniklogo.png"
                alt="AICO"
                className="h-16 w-auto brightness-0 invert opacity-80"
              />
            </Link>

            <p className="text-offwhite-700 text-sm leading-relaxed mb-8 max-w-xs">
              {t('footer.tagline')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-offwhite-700 hover:bg-engineer-500/20 hover:text-engineer-500 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
            {/* Solutions */}
            <div>
              <h4 className="text-offwhite-400 font-semibold text-sm mb-6 uppercase tracking-wide">
                {t('footer.solutions')}
              </h4>
              <ul className="space-y-4">
                {footerLinks.solutions.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-offwhite-700 hover:text-offwhite-400 transition-colors text-sm"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-offwhite-400 font-semibold text-sm mb-6 uppercase tracking-wide">
                {t('footer.company')}
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-offwhite-700 hover:text-offwhite-400 transition-colors text-sm"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-offwhite-400 font-semibold text-sm mb-6 uppercase tracking-wide">
                {t('footer.contact')}
              </h4>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-offwhite-800 text-xs uppercase tracking-wide mb-1">Email</div>
                  <a
                    href="mailto:info@aicoelektronik.com"
                    className="text-offwhite-600 hover:text-engineer-500 transition-colors"
                  >
                    info@aicoelektronik.com
                  </a>
                </div>
                <div>
                  <div className="text-offwhite-800 text-xs uppercase tracking-wide mb-1">
                    {lang === 'tr' ? 'Telefon' : 'Phone'}
                  </div>
                  <a
                    href="tel:+903125550000"
                    className="text-offwhite-600 hover:text-engineer-500 transition-colors font-mono"
                  >
                    +90 312 555 0000
                  </a>
                </div>
                <div>
                  <div className="text-offwhite-800 text-xs uppercase tracking-wide mb-1">
                    {lang === 'tr' ? 'Adres' : 'Address'}
                  </div>
                  <p className="text-offwhite-700">
                    {lang === 'tr'
                      ? 'Teknopark Ankara, A1 Blok, Cankaya/Ankara'
                      : 'Teknopark Ankara, Block A1, Cankaya/Ankara'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-offwhite-800 text-xs">
              © {currentYear} AICO Elektronik.{' '}
              {lang === 'tr' ? 'Tum haklari saklidir.' : 'All rights reserved.'}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-offwhite-800 hover:text-offwhite-600 text-xs transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Tech Badge */}
            <div className="flex items-center gap-2 text-offwhite-800 text-xs font-mono">
              <span className="w-1.5 h-1.5 bg-success-500 rounded-full" />
              <span>{lang === 'tr' ? 'Tum sistemler calisir' : 'All systems operational'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
