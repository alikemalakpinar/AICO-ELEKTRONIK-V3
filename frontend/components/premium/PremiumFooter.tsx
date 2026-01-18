'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';

interface PremiumFooterProps {
  lang: Locale;
}

export default function PremiumFooter({ lang }: PremiumFooterProps) {
  const t = getTranslations(lang);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    solutions: [
      {
        label: lang === 'tr' ? 'Akilli Villa' : 'Smart Villa',
        href: `/${lang}/solutions/smart-villa`,
      },
      {
        label: lang === 'tr' ? 'Akilli Rezidans' : 'Smart Residence',
        href: `/${lang}/solutions/smart-residence`,
      },
    ],
    company: [
      { label: t.footer.projects, href: `/${lang}/projects` },
      { label: t.footer.about, href: `/${lang}/about` },
      { label: t.footer.careers, href: `/${lang}/careers` },
      { label: t.footer.contact, href: `/${lang}/contact` },
    ],
    legal: [
      { label: t.footer.privacy, href: `/${lang}/privacy` },
      { label: t.footer.terms, href: `/${lang}/terms` },
    ],
  };

  return (
    <footer className="dark:bg-onyx-950 light:bg-gray-50 border-t dark:border-white/5 light:border-gray-200 transition-colors duration-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href={`/${lang}`} className="inline-block mb-6">
              <Image
                src="/assets/logos/aicoelektroniklogo.png"
                alt="AICO"
                width={120}
                height={50}
                className="h-12 w-auto dark:brightness-0 dark:invert dark:opacity-80 light:opacity-100"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              {t.footer.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info@aicoelektronik.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Mail size={16} className="text-engineer-500" />
                <span>info@aicoelektronik.com</span>
              </a>
              <a
                href="tel:+903125550000"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Phone size={16} className="text-engineer-500" />
                <span>+90 312 555 0000</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-engineer-500 mt-0.5" />
                <span>
                  Ankara, Turkiye
                </span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Solutions */}
              <div>
                <h4 className="text-foreground font-medium text-sm mb-4">
                  {t.footer.solutions}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.solutions.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
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
                <h4 className="text-foreground font-medium text-sm mb-4">
                  {t.footer.quickLinks}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
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

              {/* Legal */}
              <div>
                <h4 className="text-foreground font-medium text-sm mb-4">
                  {t.footer.legal}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
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
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t dark:border-white/5 light:border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              &copy; {currentYear} AICO Elektronik. {t.footer.copyright}
            </p>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span className="font-mono">{t.footer.tagline}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-engineer-500 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
