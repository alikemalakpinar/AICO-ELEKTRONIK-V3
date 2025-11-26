import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronDown, Zap, Globe, Phone, Mail,
  Cpu, Settings, Award, Layers, Package, Moon, Sun, ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';

const Header = ({ lang = 'tr' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const content = {
    tr: {
      services: 'Hizmetler',
      capabilities: 'Yetenekler',
      caseStudies: 'Referanslar',
      docs: 'Destek',
      about: 'Hakkımızda',
      contact: 'İletişim',
      getQuote: 'Anında Teklif',
      serviceItems: [
        { icon: Layers, title: 'PCB Üretim', desc: '2-10 katman profesyonel üretim', link: '/pcb-manufacturing' },
        { icon: Cpu, title: 'PCB Dizgi', desc: 'SMT/THT hassas montaj', link: '/pcb-assembly' },
        { icon: Zap, title: 'Hızlı Prototip', desc: '24-48 saat ekspres teslimat', link: '/fast-prototyping' }
      ],
      capabilityItems: [
        { icon: Settings, title: 'PCB Kapasiteleri', desc: 'Teknik özellikler', link: '/pcb-capabilities' },
        { icon: Package, title: 'Dizgi Kapasiteleri', desc: 'Montaj yetenekleri', link: '/assembly-capabilities' },
        { icon: Award, title: 'Kalite', desc: 'ISO 9001 sertifikalı', link: '/quality' }
      ]
    },
    en: {
      services: 'Services',
      capabilities: 'Capabilities',
      caseStudies: 'References',
      docs: 'Support',
      about: 'About',
      contact: 'Contact',
      getQuote: 'Instant Quote',
      serviceItems: [
        { icon: Layers, title: 'PCB Manufacturing', desc: '2-10 layer professional production', link: '/pcb-manufacturing' },
        { icon: Cpu, title: 'PCB Assembly', desc: 'SMT/THT precision assembly', link: '/pcb-assembly' },
        { icon: Zap, title: 'Fast Prototyping', desc: '24-48 hour express delivery', link: '/fast-prototyping' }
      ],
      capabilityItems: [
        { icon: Settings, title: 'PCB Capabilities', desc: 'Technical specifications', link: '/pcb-capabilities' },
        { icon: Package, title: 'Assembly Capabilities', desc: 'Assembly capabilities', link: '/assembly-capabilities' },
        { icon: Award, title: 'Quality', desc: 'ISO 9001 certified', link: '/quality' }
      ]
    }
  };

  const t = content[lang] || content.tr;
  const otherLang = lang === 'tr' ? 'en' : 'tr';
  const currentPath = location.pathname.replace(`/${lang}`, '');

  return (
    <>
      {/* Elegant Top Bar */}
      <div className="hidden md:block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2.5 text-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="tel:+903125550000" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 group">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Phone size={12} />
              </div>
              <span className="font-medium">+90 312 555 0000</span>
            </a>
            <a href="mailto:info@aicoelektronik.com" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 group">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Mail size={12} />
              </div>
              <span className="font-medium">info@aicoelektronik.com</span>
            </a>
          </div>
          <Link
            to={`/${otherLang}${currentPath}`}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 group"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <Globe size={12} />
            </div>
            <span className="font-semibold">{otherLang.toUpperCase()}</span>
          </Link>
        </div>
      </div>

      {/* Main Header with elegant glass effect */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-2xl shadow-xl shadow-slate-900/5 border-b border-slate-200/50'
          : 'bg-white/70 backdrop-blur-xl border-b border-slate-100/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo with subtle hover effect */}
            <Link to={`/${lang}`} className="flex items-center gap-3 flex-shrink-0 group">
              <img
                src="/assets/logos/logo-mavi.png"
                alt="Aico Elektronik"
                className="h-9 lg:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2.5 text-slate-600 hover:text-slate-900 transition-colors font-medium text-[15px]">
                  {t.services}
                  <ChevronDown size={15} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3">
                      {t.serviceItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/${lang}${item.link}`}
                            className="flex items-start gap-4 p-3.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-300 group"
                          >
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
                              <Icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-slate-800 text-[15px] group-hover:text-blue-600 transition-colors">{item.title}</div>
                              <div className="text-sm text-slate-500 mt-0.5">{item.desc}</div>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 mt-1 transition-all duration-300 group-hover:translate-x-1" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Capabilities Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setCapabilitiesOpen(true)}
                onMouseLeave={() => setCapabilitiesOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2.5 text-slate-600 hover:text-slate-900 transition-colors font-medium text-[15px]">
                  {t.capabilities}
                  <ChevronDown size={15} className={`transition-transform duration-300 ${capabilitiesOpen ? 'rotate-180' : ''}`} />
                </button>

                {capabilitiesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3">
                      {t.capabilityItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/${lang}${item.link}`}
                            className="flex items-start gap-4 p-3.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-300 group"
                          >
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-slate-500/25 group-hover:shadow-slate-500/40 group-hover:scale-105 transition-all duration-300">
                              <Icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-slate-800 text-[15px] group-hover:text-blue-600 transition-colors">{item.title}</div>
                              <div className="text-sm text-slate-500 mt-0.5">{item.desc}</div>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 mt-1 transition-all duration-300 group-hover:translate-x-1" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link to={`/${lang}/case-studies`} className="px-4 py-2.5 text-slate-600 hover:text-slate-900 transition-colors font-medium text-[15px]">
                {t.caseStudies}
              </Link>
              <Link to={`/${lang}/support`} className="px-4 py-2.5 text-slate-600 hover:text-slate-900 transition-colors font-medium text-[15px]">
                {t.docs}
              </Link>
              <Link to={`/${lang}/about`} className="px-4 py-2.5 text-slate-600 hover:text-slate-900 transition-colors font-medium text-[15px]">
                {t.about}
              </Link>
              <Link to={`/${lang}/contact`} className="px-4 py-2.5 text-slate-600 hover:text-slate-900 transition-colors font-medium text-[15px]">
                {t.contact}
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-500" />
                )}
              </button>

              <Link to={`/${lang}/instant-quote`}>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
                  <Zap className="mr-2" size={18} />
                  {t.getQuote}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} className="text-slate-700" /> : <Menu size={24} className="text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-[72px] left-0 right-0 bottom-0 bg-white z-40 lg:hidden overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            <div className="p-5 space-y-2">
              {/* Language Switcher */}
              <Link
                to={`/${otherLang}${currentPath}`}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Globe size={18} className="text-slate-600" />
                </div>
                <span>{otherLang === 'en' ? 'English' : 'Türkçe'}</span>
              </Link>

              <div className="border-t border-slate-100 my-3" />

              {/* CTA Button */}
              <Link to={`/${lang}/instant-quote`} className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3.5 rounded-xl font-semibold shadow-lg mb-4">
                  <Zap className="mr-2" size={18} />
                  {t.getQuote}
                </Button>
              </Link>

              {/* Services */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.services}</div>
                {t.serviceItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/${lang}${item.link}`}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="border-t border-slate-100 my-3" />

              {/* Capabilities */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.capabilities}</div>
                {t.capabilityItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/${lang}${item.link}`}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white shadow-md">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="border-t border-slate-100 my-3" />

              {/* Other Links */}
              <Link to={`/${lang}/case-studies`} className="block px-4 py-3.5 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-colors">
                {t.caseStudies}
              </Link>
              <Link to={`/${lang}/support`} className="block px-4 py-3.5 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-colors">
                {t.docs}
              </Link>
              <Link to={`/${lang}/about`} className="block px-4 py-3.5 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-colors">
                {t.about}
              </Link>
              <Link to={`/${lang}/contact`} className="block px-4 py-3.5 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-colors">
                {t.contact}
              </Link>

              {/* Contact Info */}
              <div className="border-t border-slate-100 my-3" />
              <div className="px-4 py-3 space-y-3 bg-slate-50 rounded-xl">
                <a href="tel:+903125550000" className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <Phone size={16} />
                  <span>+90 312 555 0000</span>
                </a>
                <a href="mailto:info@aicoelektronik.com" className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <Mail size={16} />
                  <span>info@aicoelektronik.com</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
