import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ArrowRight, ChevronDown } from 'lucide-react';

/**
 * PremiumNavbar - Ultra-minimal, blur-effektli premium navbar
 *
 * Sadece: Logo + Çözümler + Projeler + İletişim
 * Blur arka plan, şeffaf tasarım, premium tipografi
 */

const PremiumNavbar = ({ lang = 'tr' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [location]);

  // Language switch handler
  const handleLanguageSwitch = () => {
    const newLang = lang === 'tr' ? 'en' : 'tr';
    const currentPath = location.pathname.replace(`/${lang}`, '');
    i18n.changeLanguage(newLang);
    navigate(`/${newLang}${currentPath}`);
  };

  // Solution items
  const solutions = [
    {
      id: 'smart-villa',
      title: lang === 'tr' ? 'Akilli Villa' : 'Smart Villa',
      description: lang === 'tr' ? 'Kisisel luks, gorunmez teknoloji' : 'Personal luxury, invisible technology',
      href: `/${lang}/solutions/smart-villa`,
    },
    {
      id: 'smart-residence',
      title: lang === 'tr' ? 'Akilli Rezidans' : 'Smart Residence',
      description: lang === 'tr' ? 'Merkezi yonetim, olceklenebilir guc' : 'Central management, scalable power',
      href: `/${lang}/solutions/smart-residence`,
    },
  ];

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-onyx-900/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to={`/${lang}`}
              className="flex items-center gap-3 group"
            >
              <img
                src="/assets/logos/aicoelektroniklogo.png"
                alt="AICO"
                className="h-24 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 text-offwhite-600 hover:text-offwhite-400 transition-colors text-sm font-medium tracking-wide">
                  {t('nav.solutions')}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-onyx-800/95 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden shadow-2xl"
                    >
                      <div className="p-2">
                        {solutions.map((solution) => (
                          <Link
                            key={solution.id}
                            to={solution.href}
                            className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="text-offwhite-400 font-medium text-sm mb-1 group-hover:text-engineer-500 transition-colors">
                                {solution.title}
                              </div>
                              <div className="text-offwhite-800 text-xs">
                                {solution.description}
                              </div>
                            </div>
                            <ArrowRight
                              size={16}
                              className="text-offwhite-800 group-hover:text-engineer-500 group-hover:translate-x-1 transition-all mt-1"
                            />
                          </Link>
                        ))}
                      </div>

                      {/* All Solutions Link */}
                      <div className="border-t border-white/5 p-3">
                        <Link
                          to={`/${lang}/solutions`}
                          className="flex items-center justify-between text-xs text-offwhite-700 hover:text-offwhite-400 transition-colors"
                        >
                          <span>{lang === 'tr' ? 'Tum cozumler' : 'All solutions'}</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Projects */}
              <Link
                to={`/${lang}/projects`}
                className="px-4 py-2 text-offwhite-600 hover:text-offwhite-400 transition-colors text-sm font-medium tracking-wide"
              >
                {t('nav.projects')}
              </Link>

              {/* About */}
              <Link
                to={`/${lang}/about`}
                className="px-4 py-2 text-offwhite-600 hover:text-offwhite-400 transition-colors text-sm font-medium tracking-wide"
              >
                {t('nav.about')}
              </Link>

              {/* Contact */}
              <Link
                to={`/${lang}/contact`}
                className="px-4 py-2 text-offwhite-600 hover:text-offwhite-400 transition-colors text-sm font-medium tracking-wide"
              >
                {t('nav.contact')}
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={handleLanguageSwitch}
                className="flex items-center gap-2 px-3 py-1.5 text-offwhite-700 hover:text-offwhite-400 transition-colors text-sm font-mono"
              >
                <Globe size={14} />
                <span className="uppercase">{lang === 'tr' ? 'EN' : 'TR'}</span>
              </button>

              {/* CTA Button */}
              <Link
                to={`/${lang}/contact`}
                className="group relative px-5 py-2.5 bg-transparent border border-engineer-500/30 hover:border-engineer-500 text-offwhite-400 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10">{t('nav.engineeringRequest')}</span>
                <div className="absolute inset-0 bg-engineer-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-offwhite-400 hover:text-offwhite-200 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="fixed inset-0 bg-onyx-900/95 backdrop-blur-xl z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-onyx-900 border-l border-white/5 z-40 lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Solutions */}
                <div className="space-y-3">
                  <div className="text-offwhite-800 text-xs font-mono uppercase tracking-tech">
                    {t('nav.solutions')}
                  </div>
                  {solutions.map((solution) => (
                    <Link
                      key={solution.id}
                      to={solution.href}
                      className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="text-offwhite-400 font-medium mb-1">
                        {solution.title}
                      </div>
                      <div className="text-offwhite-800 text-sm">
                        {solution.description}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/5" />

                {/* Navigation Links */}
                <div className="space-y-1">
                  <Link
                    to={`/${lang}/projects`}
                    className="block px-4 py-3 text-offwhite-400 hover:text-offwhite-200 font-medium transition-colors"
                  >
                    {t('nav.projects')}
                  </Link>
                  <Link
                    to={`/${lang}/about`}
                    className="block px-4 py-3 text-offwhite-400 hover:text-offwhite-200 font-medium transition-colors"
                  >
                    {t('nav.about')}
                  </Link>
                  <Link
                    to={`/${lang}/contact`}
                    className="block px-4 py-3 text-offwhite-400 hover:text-offwhite-200 font-medium transition-colors"
                  >
                    {t('nav.contact')}
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
                  <span className="font-mono">{lang === 'tr' ? 'English' : 'Turkce'}</span>
                </button>

                {/* CTA Button */}
                <Link
                  to={`/${lang}/contact`}
                  className="block w-full px-6 py-4 bg-engineer-500 hover:bg-engineer-600 text-white text-center font-medium rounded-lg transition-colors"
                >
                  {t('nav.engineeringRequest')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PremiumNavbar;
