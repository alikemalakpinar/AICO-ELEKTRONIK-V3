'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import MagneticButton from './MagneticButton';

interface PremiumFooterProps {
  lang: Locale;
}

export default function PremiumFooter({ lang }: PremiumFooterProps) {
  const t = getTranslations(lang);
  const currentYear = new Date().getFullYear();

  const solutions = [
    { label: lang === 'tr' ? 'Akıllı Villa' : 'Smart Villa', href: `/${lang}/solutions/smart-villa` },
    { label: lang === 'tr' ? 'Akıllı Rezidans' : 'Smart Residence', href: `/${lang}/solutions/smart-residence` },
    { label: lang === 'tr' ? 'Akıllı Apartman' : 'Smart Apartment', href: `/${lang}/solutions/smart-apartment` },
    { label: 'FireLink', href: `/${lang}/solutions/firelink` },
    { label: lang === 'tr' ? 'Soğuk Zincir' : 'Cold Chain', href: `/${lang}/solutions/cold-chain` },
    { label: lang === 'tr' ? 'Maden IoT' : 'Mining IoT', href: `/${lang}/solutions/mining-iot` },
    { label: lang === 'tr' ? 'Kestirimci Bakım' : 'Predictive Maintenance', href: `/${lang}/solutions/predictive-maintenance` },
  ];

  const company = [
    { label: t.footer.projects, href: `/${lang}/projects` },
    { label: t.footer.about, href: `/${lang}/about` },
    { label: t.footer.careers, href: `/${lang}/careers` },
    { label: t.footer.contact, href: `/${lang}/contact` },
    { label: 'Blog', href: `/${lang}/blog` },
  ];

  const resources = [
    { label: t.footer.privacy, href: `/${lang}/privacy` },
    { label: t.footer.terms, href: `/${lang}/terms` },
    { label: t.footer.cookies, href: `/${lang}/cookies` },
  ];

  const socials = [
    { icon: Linkedin, href: 'https://linkedin.com/company/aicoelektronik', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/aicoelektronik', label: 'X' },
    { icon: Github, href: 'https://github.com/aicoelektronik', label: 'GitHub' },
  ];

  return (
    <footer className="relative bg-background text-foreground transition-colors duration-300">
      {/* Engineer-orange neon glow lines */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-engineer-500/50 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-engineer-500/80 to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-engineer-500/30 to-transparent blur-sm" />
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2 lg:col-span-5">
            <Link href={`/${lang}`} className="inline-block mb-6">
              <Image
                src="/assets/logos/aicoelektroniklogo.png"
                alt="AICO Elektronik"
                width={130}
                height={54}
                className="h-12 w-auto dark:brightness-0 dark:invert dark:opacity-80"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
              {t.footer.description}
            </p>

            <div className="space-y-3 mb-8">
              <a
                href="mailto:info@aicoelektronik.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Mail size={15} className="text-engineer-500 flex-shrink-0" />
                <span>info@aicoelektronik.com</span>
              </a>
              <a
                href="tel:+905326210601"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Phone size={15} className="text-engineer-500 flex-shrink-0" />
                <span>+90 532 621 06 01</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin size={15} className="text-engineer-500 mt-0.5 flex-shrink-0" />
                <span>Yukarı Dudullu Mah, Necip Fazıl Blv No:44/38, Ümraniye, İstanbul</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <MagneticButton
                  key={s.label}
                  as="a"
                  href={s.href}
                  strength={0.4}
                  radius={120}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-engineer-500 hover:border-engineer-500/40 hover:shadow-[0_0_12px_rgba(249,115,22,0.15)] transition-all duration-300"
                >
                  <s.icon size={16} />
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-2 lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Solutions */}
              <div>
                <h4 className="text-foreground font-semibold text-sm tracking-wide mb-5">
                  {t.footer.solutions}
                </h4>
                <ul className="space-y-3">
                  {solutions.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm line-reveal inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-foreground font-semibold text-sm tracking-wide mb-5">
                  {lang === 'tr' ? 'Şirket' : 'Company'}
                </h4>
                <ul className="space-y-3">
                  {company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm line-reveal inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-foreground font-semibold text-sm tracking-wide mb-5">
                  {t.footer.resources}
                </h4>
                <ul className="space-y-3">
                  {resources.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm line-reveal inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>&copy; {currentYear} AICO Elektronik. {t.footer.copyright}</p>
            <span className="font-mono tracking-tight">{t.footer.tagline}</span>
            <p>{lang === 'tr' ? "Türkiye'de tasarlandı" : 'Designed in Turkey'} 🇹🇷</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
