'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Globe,
  ArrowRight,
  ChevronDown,
  Flame,
  HardHat,
  Thermometer,
  Coffee,
  Home,
  Building,
  Building2,
} from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import Image from 'next/image';
import SoundToggle from './SoundToggle';
import { useAudio } from './AudioProvider';

interface PremiumNavbarProps {
  lang: Locale;
}

export default function PremiumNavbar({ lang }: PremiumNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [smartLivingOpen, setSmartLivingOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = getTranslations(lang);
  const { playClick } = useAudio();

  // Handle scroll effect with height transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
    setSmartLivingOpen(false);
  }, [pathname]);

  // Language switch handler
  const handleLanguageSwitch = () => {
    playClick();
    const newLang = lang === 'tr' ? 'en' : 'tr';
    const currentPath = pathname.replace(`/${lang}`, '');
    router.push(`/${newLang}${currentPath || ''}`);
  };

  // Product categories
  const products = [
    {
      id: 'fire-safety',
      icon: Flame,
      title: 'FireLink',
      subtitle: lang === 'tr' ? 'Yangin Guvenlik Karti' : 'Fire Safety Card',
      description: lang === 'tr'
        ? 'Termal izleme ve erken uyari sistemi'
        : 'Thermal monitoring and early warning system',
      href: `/${lang}/solutions/fire-safety`,
      color: '#EF4444',
    },
    {
      id: 'mining-iot',
      icon: HardHat,
      title: 'MineGuard',
      subtitle: lang === 'tr' ? 'Maden Guvenligi' : 'Mining Safety',
      description: lang === 'tr'
        ? 'Isci takip ve gaz algilama sistemi'
        : 'Worker tracking and gas detection system',
      href: `/${lang}/solutions/mining-iot`,
      color: '#EAB308',
    },
    {
      id: 'cold-chain',
      icon: Thermometer,
      title: 'ColdTrack',
      subtitle: lang === 'tr' ? 'Soguk Zincir' : 'Cold Chain',
      description: lang === 'tr'
        ? 'Sicaklik izleme ve lojistik yonetimi'
        : 'Temperature monitoring and logistics management',
      href: `/${lang}/solutions/cold-chain`,
      color: '#06B6D4',
    },
    {
      id: 'coffee',
      icon: Coffee,
      title: 'AICO Coffee',
      subtitle: lang === 'tr' ? 'Akilli Kahve Makinesi' : 'Smart Coffee Machine',
      description: lang === 'tr'
        ? 'IoT baglantili premium kahve deneyimi'
        : 'IoT-connected premium coffee experience',
      href: `/${lang}/products/coffee`,
      color: '#A855F7',
    },
  ];

  // Smart Living solutions
  const smartLiving = [
    {
      id: 'smart-villa',
      icon: Home,
      title: lang === 'tr' ? 'Akilli Villa' : 'Smart Villa',
      description: lang === 'tr'
        ? 'Kisisel luks, gorunmez teknoloji'
        : 'Personal luxury, invisible technology',
      href: `/${lang}/solutions/smart-villa`,
    },
    {
      id: 'smart-apartment',
      icon: Building,
      title: lang === 'tr' ? 'Akilli Apartman' : 'Smart Apartment',
      description: lang === 'tr'
        ? 'Ortak alan yonetimi ve iletisim'
        : 'Common area management and communication',
      href: `/${lang}/solutions/smart-apartment`,
    },
    {
      id: 'smart-residence',
      icon: Building2,
      title: lang === 'tr' ? 'Akilli Rezidans' : 'Smart Residence',
      description: lang === 'tr'
        ? 'Merkezi yonetim, olceklenebilir guc'
        : 'Central management, scalable power',
      href: `/${lang}/solutions/smart-residence`,
    },
  ];

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-onyx-900/80 backdrop-blur-xl border-b border-white/5 h-14'
            : 'bg-transparent h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href={`/${lang}`} className="flex items-center gap-2 group flex-shrink-0">
              <Image
                src="/assets/logos/aicoelektroniklogo.png"
                alt="AICO"
                width={82}
                height={34}
                className={`w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-300 ${
                  isScrolled ? 'h-6' : 'h-8'
                }`}
                priority
              />
            </Link>

            {/* Center Navigation - Products */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 text-offwhite-600 hover:text-offwhite-400 transition-colors text-sm font-medium">
                  {lang === 'tr' ? 'Urunler' : 'Products'}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      productsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-onyx-800/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                    >
                      <div className="p-3 grid grid-cols-2 gap-2">
                        {products.map((product) => (
                          <Link
                            key={product.id}
                            href={product.href}
                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                          >
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                              style={{ backgroundColor: `${product.color}15` }}
                            >
                              <product.icon size={20} style={{ color: product.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-offwhite-400 font-semibold text-sm group-hover:text-white transition-colors">
                                  {product.title}
                                </span>
                              </div>
                              <div className="text-offwhite-800 text-xs mt-0.5">
                                {product.subtitle}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Smart Living Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSmartLivingOpen(true)}
                onMouseLeave={() => setSmartLivingOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 text-offwhite-600 hover:text-offwhite-400 transition-colors text-sm font-medium">
                  Smart Living
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      smartLivingOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {smartLivingOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-onyx-800/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                    >
                      <div className="p-2">
                        {smartLiving.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-engineer-500/20 transition-colors">
                              <item.icon size={20} className="text-engineer-500" />
                            </div>
                            <div className="flex-1">
                              <div className="text-offwhite-400 font-medium text-sm group-hover:text-white transition-colors">
                                {item.title}
                              </div>
                              <div className="text-offwhite-800 text-xs mt-0.5">
                                {item.description}
                              </div>
                            </div>
                            <ArrowRight
                              size={14}
                              className="text-offwhite-800 group-hover:text-engineer-500 group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
                            />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Projects */}
              <Link
                href={`/${lang}/projects`}
                className="px-4 py-2 text-offwhite-600 hover:text-offwhite-400 transition-colors text-sm font-medium"
              >
                {t.nav.projects}
              </Link>

              {/* About */}
              <Link
                href={`/${lang}/about`}
                className="px-4 py-2 text-offwhite-600 hover:text-offwhite-400 transition-colors text-sm font-medium"
              >
                {t.nav.about}
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Sound Toggle */}
              <SoundToggle />

              {/* Language Switcher */}
              <button
                onClick={handleLanguageSwitch}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-offwhite-700 hover:text-offwhite-400 transition-colors text-xs font-mono rounded-lg hover:bg-white/5"
              >
                <Globe size={14} />
                <span className="uppercase">{t.nav.languageSwitch}</span>
              </button>

              {/* Demo Request CTA */}
              <Link
                href={`/${lang}/contact?subject=demo`}
                className="group relative flex items-center gap-2 px-5 py-2.5 bg-engineer-500 hover:bg-engineer-600 text-white text-sm font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-engineer-500/20"
              >
                <span>{lang === 'tr' ? 'Demo Talep Et' : 'Request Demo'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-offwhite-400 hover:text-offwhite-200 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-onyx-950/95 backdrop-blur-xl z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-14 left-0 right-0 bottom-0 bg-onyx-950 z-40 lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Products Section */}
                <div className="space-y-3">
                  <div className="text-offwhite-800 text-xs font-mono uppercase tracking-widest px-2">
                    {lang === 'tr' ? 'Urunler' : 'Products'}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={product.href}
                        className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center"
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${product.color}15` }}
                        >
                          <product.icon size={24} style={{ color: product.color }} />
                        </div>
                        <div className="text-offwhite-400 font-medium text-sm">
                          {product.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Smart Living Section */}
                <div className="space-y-3">
                  <div className="text-offwhite-800 text-xs font-mono uppercase tracking-widest px-2">
                    Smart Living
                  </div>
                  {smartLiving.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center">
                        <item.icon size={20} className="text-engineer-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-offwhite-400 font-medium">
                          {item.title}
                        </div>
                        <div className="text-offwhite-800 text-sm">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/5" />

                {/* Other Links */}
                <div className="space-y-1">
                  <Link
                    href={`/${lang}/projects`}
                    className="block px-4 py-3 text-offwhite-400 hover:text-offwhite-200 font-medium transition-colors"
                  >
                    {t.nav.projects}
                  </Link>
                  <Link
                    href={`/${lang}/about`}
                    className="block px-4 py-3 text-offwhite-400 hover:text-offwhite-200 font-medium transition-colors"
                  >
                    {t.nav.about}
                  </Link>
                  <Link
                    href={`/${lang}/contact`}
                    className="block px-4 py-3 text-offwhite-400 hover:text-offwhite-200 font-medium transition-colors"
                  >
                    {t.nav.contact}
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5" />

                {/* Language Switcher */}
                <button
                  onClick={handleLanguageSwitch}
                  className="flex items-center gap-3 px-4 py-3 text-offwhite-600 hover:text-offwhite-400 transition-colors w-full"
                >
                  <Globe size={18} />
                  <span className="font-mono">
                    {lang === 'tr' ? 'English' : 'Turkce'}
                  </span>
                </button>

                {/* Demo Request CTA */}
                <Link
                  href={`/${lang}/contact?subject=demo`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-colors"
                >
                  <span>{lang === 'tr' ? 'Demo Talep Et' : 'Request Demo'}</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
