'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Menu,
  X,
  Globe,
  ArrowRight,
  ChevronDown,
  Flame,
  HardHat,
  Thermometer,
  Activity,
  Home,
  Building,
  Building2,
  Zap,
  Snowflake,
} from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import ThemeToggle from './ThemeToggle';
import ThemeLogo from './ThemeLogo';

interface PremiumNavbarProps {
  lang: Locale;
}

// Get accent color based on current page
function getPageAccentColor(pathname: string): string {
  if (pathname.includes('fire-safety') || pathname.includes('firelink')) return '#EF4444';
  if (pathname.includes('mining-iot') || pathname.includes('mineguard')) return '#EAB308';
  if (pathname.includes('cold-chain') || pathname.includes('coldtrack')) return '#06B6D4';
  if (pathname.includes('predictive-maintenance') || pathname.includes('vibration')) return '#00D4FF';
  return '#F97316'; // Default engineer orange
}

export default function PremiumNavbar({ lang }: PremiumNavbarProps) {
  // Hydration-safe scroll state - start with null to avoid mismatch
  const [hasMounted, setHasMounted] = useState(false);
  const [scrollState, setScrollState] = useState<'top' | 'scrolled' | 'compact'>('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [smartLivingOpen, setSmartLivingOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = getTranslations(lang);
  const navRef = useRef<HTMLElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get accent color for current page
  const accentColor = useMemo(() => getPageAccentColor(pathname), [pathname]);

  // Use Framer Motion's scroll tracking for smoother performance
  const { scrollY } = useScroll();

  // Mark as mounted after hydration completes - this prevents CLS
  useEffect(() => {
    setHasMounted(true);
    // Set initial scroll state based on actual position after mount
    const currentScroll = window.scrollY;
    if (currentScroll < 20) {
      setScrollState('top');
    } else if (currentScroll < 150) {
      setScrollState('scrolled');
    } else {
      setScrollState('compact');
    }
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Only update after mount to prevent hydration issues
    if (!hasMounted) return;
    if (latest < 20) {
      setScrollState('top');
    } else if (latest < 150) {
      setScrollState('scrolled');
    } else {
      setScrollState('compact');
    }
  });

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
    setSmartLivingOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Language switch handler
  const handleLanguageSwitch = () => {
    const newLang = lang === 'tr' ? 'en' : 'tr';
    const currentPath = pathname.replace(`/${lang}`, '');
    router.push(`/${newLang}${currentPath || ''}`);
  };

  // Mega menu hover handlers with delay
  const handleSolutionsEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setSolutionsOpen(true);
    setSmartLivingOpen(false);
  };

  const handleSolutionsLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 150);
  };

  const handleSmartLivingEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setSmartLivingOpen(true);
    setSolutionsOpen(false);
  };

  const handleSmartLivingLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setSmartLivingOpen(false);
    }, 150);
  };

  // Product categories for Mega Menu
  const solutions = [
    {
      id: 'fire-safety',
      icon: Flame,
      title: 'FireLink',
      subtitle: lang === 'tr' ? 'Yangın Güvenlik Sistemi' : 'Fire Safety System',
      description: lang === 'tr'
        ? 'Termal izleme ve erken uyarı'
        : 'Thermal monitoring and early warning',
      href: `/${lang}/solutions/fire-safety`,
      color: '#EF4444',
      gradient: 'from-red-500/20 to-orange-500/10',
    },
    {
      id: 'mining-iot',
      icon: HardHat,
      title: 'MineGuard',
      subtitle: lang === 'tr' ? 'Maden Güvenliği' : 'Mining Safety',
      description: lang === 'tr'
        ? 'İşçi takip ve gaz algılama'
        : 'Worker tracking and gas detection',
      href: `/${lang}/solutions/mining-iot`,
      color: '#EAB308',
      gradient: 'from-yellow-500/20 to-amber-500/10',
    },
    {
      id: 'cold-chain',
      icon: Snowflake,
      title: 'ColdTrack',
      subtitle: lang === 'tr' ? 'Soğuk Zincir' : 'Cold Chain',
      description: lang === 'tr'
        ? 'Sıcaklık izleme ve lojistik'
        : 'Temperature monitoring and logistics',
      href: `/${lang}/solutions/cold-chain`,
      color: '#06B6D4',
      gradient: 'from-cyan-500/20 to-blue-500/10',
    },
    {
      id: 'predictive-maintenance',
      icon: Activity,
      title: 'VibrationGuard',
      subtitle: lang === 'tr' ? 'Kestirimci Bakım' : 'Predictive Maintenance',
      description: lang === 'tr'
        ? 'FFT titreşim analizi ve arıza tahmini'
        : 'FFT vibration analysis and failure prediction',
      href: `/${lang}/solutions/predictive-maintenance`,
      color: '#00D4FF',
      gradient: 'from-cyan-500/20 to-blue-500/10',
    },
  ];

  // Smart Living solutions
  const smartLiving = [
    {
      id: 'smart-villa',
      icon: Home,
      title: lang === 'tr' ? 'Akıllı Villa' : 'Smart Villa',
      description: lang === 'tr'
        ? 'Kişisel lüks, görünmez teknoloji'
        : 'Personal luxury, invisible technology',
      href: `/${lang}/solutions/smart-villa`,
    },
    {
      id: 'smart-apartment',
      icon: Building,
      title: lang === 'tr' ? 'Akıllı Apartman' : 'Smart Apartment',
      description: lang === 'tr'
        ? 'Ortak alan yönetimi ve iletişim'
        : 'Common area management',
      href: `/${lang}/solutions/smart-apartment`,
    },
    {
      id: 'smart-residence',
      icon: Building2,
      title: lang === 'tr' ? 'Akıllı Rezidans' : 'Smart Residence',
      description: lang === 'tr'
        ? 'Merkezi yönetim platformu'
        : 'Central management platform',
      href: `/${lang}/solutions/smart-residence`,
    },
  ];

  // Compute navbar classes based on scroll state - using transform instead of height changes
  const navbarClasses = useMemo(() => {
    const base = 'fixed top-0 left-0 right-0 z-50 will-change-transform';
    return base;
  }, []);

  return (
    <>
      {/* Spacer to prevent content jump - fixed height */}
      <div className="h-20" />

      {/* Main Navbar - GPU accelerated, no layout shifts */}
      <motion.header
        ref={navRef}
        className={navbarClasses}
        initial={false}
      >
        {/* Outer container for centering - fixed dimensions, hydration-safe */}
        <div
          className="h-20 flex items-center justify-center transition-all duration-500 ease-out"
          style={{
            // Use 'top' state styles until mounted to prevent CLS
            paddingTop: !hasMounted ? '0px' : scrollState === 'top' ? '0px' : scrollState === 'scrolled' ? '8px' : '12px',
            paddingLeft: !hasMounted ? '0px' : scrollState === 'top' ? '0px' : scrollState === 'scrolled' ? '16px' : '24px',
            paddingRight: !hasMounted ? '0px' : scrollState === 'top' ? '0px' : scrollState === 'scrolled' ? '16px' : '24px',
          }}
        >
          {/* Inner navbar container with Apple-style vibrancy blur - hydration-safe */}
          <motion.div
            className="w-full h-full flex items-center border border-transparent transition-all duration-500 ease-out navbar-glass"
            style={{
              // Apply 'top' state styles until mounted to ensure consistent SSR/CSR
              maxWidth: !hasMounted || scrollState === 'top' ? '100%' : scrollState === 'scrolled' ? '95%' : '900px',
              borderRadius: !hasMounted || scrollState === 'top' ? '0px' : scrollState === 'scrolled' ? '16px' : '24px',
              backgroundColor: !hasMounted || scrollState === 'top' ? 'transparent' : 'var(--vibrancy-bg)',
              backdropFilter: !hasMounted || scrollState === 'top' ? 'none' : 'var(--vibrancy-blur)',
              WebkitBackdropFilter: !hasMounted || scrollState === 'top' ? 'none' : 'var(--vibrancy-blur)',
              borderColor: !hasMounted || scrollState === 'top' ? 'transparent' : 'var(--navbar-border, rgba(255, 255, 255, 0.08))',
              boxShadow: !hasMounted ? 'none' : scrollState === 'compact'
                ? 'var(--navbar-shadow-compact, 0 8px 32px rgba(0, 0, 0, 0.4))'
                : scrollState === 'scrolled'
                  ? 'var(--navbar-shadow-scrolled, 0 4px 24px rgba(0, 0, 0, 0.3))'
                  : 'none',
            }}
          >
            {/* Accent glow line - GPU accelerated */}
            <motion.div
              className="absolute bottom-0 left-1/2 h-px pointer-events-none"
              initial={{ width: 0, x: '-50%' }}
              animate={{
                width: scrollState === 'compact' ? '50%' : '0%',
                x: '-50%',
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                opacity: 0.6,
              }}
            />

            {/* Navbar content */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                {/* Logo - Theme adaptive with native variants */}
                <Link href={`/${lang}`} className="flex items-center gap-2 group flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ThemeLogo
                      width={100}
                      height={28}
                      variant="default"
                      className="h-7 w-auto"
                      priority
                    />
                  </motion.div>
                </Link>

                {/* Center Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                  {/* Solutions Mega Menu */}
                  <div
                    className="relative"
                    onMouseEnter={handleSolutionsEnter}
                    onMouseLeave={handleSolutionsLeave}
                  >
                    <button className="flex items-center gap-1.5 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-lg dark:hover:bg-white/5 light:hover:bg-black/5">
                      {lang === 'tr' ? 'Çözümler' : 'Solutions'}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Solutions Mega Menu Dropdown */}
                    <AnimatePresence>
                      {solutionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] origin-top"
                          onMouseEnter={handleSolutionsEnter}
                          onMouseLeave={handleSolutionsLeave}
                        >
                          {/* Glass card - theme adaptive */}
                          <div className="dark:bg-onyx-800/95 light:bg-white/98 backdrop-blur-2xl rounded-2xl border dark:border-white/10 light:border-gray-200 shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="px-6 py-4 border-b dark:border-white/5 light:border-gray-200">
                              <div className="flex items-center gap-2">
                                <Zap size={16} className="text-engineer-500" />
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                                  {lang === 'tr' ? 'Endüstriyel Çözümler' : 'Industrial Solutions'}
                                </span>
                              </div>
                            </div>

                            {/* Grid of solutions */}
                            <div className="p-4 grid grid-cols-2 gap-2">
                              {solutions.map((solution) => (
                                <Link
                                  key={solution.id}
                                  href={solution.href}
                                  className="group relative flex items-start gap-4 p-4 rounded-xl dark:hover:bg-white/5 light:hover:bg-gray-100 transition-all duration-300"
                                >
                                  {/* Icon with gradient background */}
                                  <div
                                    className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}
                                  >
                                    <solution.icon
                                      size={22}
                                      style={{ color: solution.color }}
                                    />
                                    {/* Glow effect */}
                                    <div
                                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                                      style={{ backgroundColor: `${solution.color}30` }}
                                    />
                                  </div>

                                  {/* Text content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-foreground font-semibold text-sm group-hover:text-foreground transition-colors">
                                        {solution.title}
                                      </span>
                                      <ArrowRight
                                        size={12}
                                        className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                                      />
                                    </div>
                                    <div
                                      className="text-[11px] font-medium mb-1"
                                      style={{ color: solution.color }}
                                    >
                                      {solution.subtitle}
                                    </div>
                                    <div className="text-muted-foreground text-xs leading-relaxed">
                                      {solution.description}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            {/* Footer CTA */}
                            <div className="px-6 py-4 border-t dark:border-white/5 light:border-gray-200 dark:bg-white/[0.02] light:bg-gray-50">
                              <Link
                                href={`/${lang}/projects`}
                                className="group flex items-center justify-between text-sm"
                              >
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                  {lang === 'tr' ? 'Tüm projeleri inceleyin' : 'View all projects'}
                                </span>
                                <ArrowRight
                                  size={14}
                                  className="text-engineer-500 group-hover:translate-x-1 transition-transform"
                                />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Smart Living Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={handleSmartLivingEnter}
                    onMouseLeave={handleSmartLivingLeave}
                  >
                    <button className="flex items-center gap-1.5 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-lg dark:hover:bg-white/5 light:hover:bg-black/5">
                      Smart Living
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${smartLivingOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {smartLivingOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 origin-top"
                          onMouseEnter={handleSmartLivingEnter}
                          onMouseLeave={handleSmartLivingLeave}
                        >
                          <div className="dark:bg-onyx-800/95 light:bg-white/98 backdrop-blur-2xl rounded-2xl border dark:border-white/10 light:border-gray-200 shadow-2xl overflow-hidden p-2">
                            {smartLiving.map((item) => (
                              <Link
                                key={item.id}
                                href={item.href}
                                className="group flex items-start gap-3 p-3 rounded-xl dark:hover:bg-white/5 light:hover:bg-gray-100 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-xl bg-engineer-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-engineer-500/20 transition-colors">
                                  <item.icon size={18} className="text-engineer-500" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-foreground font-medium text-sm transition-colors">
                                    {item.title}
                                  </div>
                                  <div className="text-muted-foreground text-xs mt-0.5">
                                    {item.description}
                                  </div>
                                </div>
                                <ArrowRight
                                  size={14}
                                  className="text-muted-foreground group-hover:text-engineer-500 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100"
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
                    className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-lg dark:hover:bg-white/5 light:hover:bg-black/5"
                  >
                    {t.nav.projects}
                  </Link>

                  {/* About */}
                  <Link
                    href={`/${lang}/about`}
                    className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-lg dark:hover:bg-white/5 light:hover:bg-black/5"
                  >
                    {t.nav.about}
                  </Link>
                </nav>

                {/* Right Side Actions */}
                <div className="hidden lg:flex items-center gap-2">
                  {/* Theme Toggle */}
                  <ThemeToggle size="sm" />

                  {/* Language Switcher */}
                  <button
                    onClick={handleLanguageSwitch}
                    className="flex items-center gap-1.5 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-mono rounded-lg dark:hover:bg-white/5 light:hover:bg-black/5"
                  >
                    <Globe size={14} />
                    <span className="uppercase">{t.nav.languageSwitch}</span>
                  </button>

                  {/* Demo Request CTA */}
                  <Link
                    href={`/${lang}/contact?subject=demo`}
                    className="group relative flex items-center gap-2 px-5 py-2.5 bg-engineer-500 hover:bg-engineer-600 text-white text-sm font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-engineer-500/25"
                  >
                    <span>{lang === 'tr' ? 'Demo Talep Et' : 'Request Demo'}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg dark:hover:bg-white/5 light:hover:bg-black/5"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.15 }}
                      >
                        <X size={22} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Menu size={22} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop - Theme adaptive */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{
                backgroundColor: 'var(--overlay-heavy)',
                backdropFilter: 'var(--vibrancy-blur)',
                WebkitBackdropFilter: 'var(--vibrancy-blur)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content - Slide from right, theme adaptive */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 lg:hidden overflow-y-auto dark:bg-onyx-900 light:bg-white border-l dark:border-white/5 light:border-gray-200"
            >
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg dark:hover:bg-white/5 light:hover:bg-black/5"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="px-6 pb-8 space-y-8">
                {/* Solutions Section */}
                <div className="space-y-4">
                  <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest px-2">
                    {lang === 'tr' ? 'Çözümler' : 'Solutions'}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {solutions.map((solution) => (
                      <Link
                        key={solution.id}
                        href={solution.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-colors text-center dark:bg-white/5 dark:hover:bg-white/10 light:bg-gray-100 light:hover:bg-gray-200"
                      >
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center`}
                        >
                          <solution.icon size={26} style={{ color: solution.color }} />
                        </div>
                        <div>
                          <div className="text-foreground font-medium text-sm">
                            {solution.title}
                          </div>
                          <div className="text-muted-foreground text-xs mt-0.5">
                            {solution.subtitle}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Smart Living Section */}
                <div className="space-y-4">
                  <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest px-2">
                    Smart Living
                  </div>
                  {smartLiving.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl transition-colors dark:bg-white/5 dark:hover:bg-white/10 light:bg-gray-100 light:hover:bg-gray-200"
                    >
                      <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center">
                        <item.icon size={22} className="text-engineer-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-foreground font-medium">{item.title}</div>
                        <div className="text-muted-foreground text-sm">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t dark:border-white/5 light:border-gray-200" />

                {/* Other Links */}
                <div className="space-y-1">
                  <Link
                    href={`/${lang}/projects`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-muted-foreground hover:text-foreground font-medium transition-colors rounded-lg dark:hover:bg-white/5 light:hover:bg-gray-100"
                  >
                    {t.nav.projects}
                  </Link>
                  <Link
                    href={`/${lang}/about`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-muted-foreground hover:text-foreground font-medium transition-colors rounded-lg dark:hover:bg-white/5 light:hover:bg-gray-100"
                  >
                    {t.nav.about}
                  </Link>
                  <Link
                    href={`/${lang}/contact`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-muted-foreground hover:text-foreground font-medium transition-colors rounded-lg dark:hover:bg-white/5 light:hover:bg-gray-100"
                  >
                    {t.nav.contact}
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t dark:border-white/5 light:border-gray-200" />

                {/* Language Switcher */}
                <button
                  onClick={() => {
                    handleLanguageSwitch();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors w-full rounded-lg dark:hover:bg-white/5 light:hover:bg-gray-100"
                >
                  <Globe size={18} />
                  <span className="font-mono">{lang === 'tr' ? 'English' : 'Türkçe'}</span>
                </button>

                {/* Demo Request CTA */}
                <Link
                  href={`/${lang}/contact?subject=demo`}
                  onClick={() => setMobileMenuOpen(false)}
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
