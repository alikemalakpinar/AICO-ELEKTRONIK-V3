import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Zap, Globe, Phone, Mail,
  Cpu, Settings, Award, Layers, Package, Moon, Sun
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

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Close mobile menu when route changes
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
        { icon: Layers, title: 'PCB Üretim', desc: '2-10 katman', link: '/pcb-manufacturing' },
        { icon: Cpu, title: 'PCB Dizgi', desc: 'SMT/THT montaj', link: '/pcb-assembly' },
        { icon: Zap, title: 'Hızlı Prototip', desc: '24-48 saat', link: '/fast-prototyping' }
      ],
      capabilityItems: [
        { icon: Settings, title: 'PCB Kapasiteleri', link: '/pcb-capabilities' },
        { icon: Package, title: 'Dizgi Kapasiteleri', link: '/assembly-capabilities' },
        { icon: Award, title: 'Kalite', link: '/quality' }
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
        { icon: Layers, title: 'PCB Manufacturing', desc: '2-10 layers', link: '/pcb-manufacturing' },
        { icon: Cpu, title: 'PCB Assembly', desc: 'SMT/THT assembly', link: '/pcb-assembly' },
        { icon: Zap, title: 'Fast Prototyping', desc: '24-48 hours', link: '/fast-prototyping' }
      ],
      capabilityItems: [
        { icon: Settings, title: 'PCB Capabilities', link: '/pcb-capabilities' },
        { icon: Package, title: 'Assembly Capabilities', link: '/assembly-capabilities' },
        { icon: Award, title: 'Quality', link: '/quality' }
      ]
    }
  };

  const t = content[lang] || content.tr;
  const otherLang = lang === 'tr' ? 'en' : 'tr';
  const currentPath = location.pathname.replace(`/${lang}`, '');

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:block bg-[#0A0E27] text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+903125550000" className="flex items-center gap-2 hover:text-[#1554F6] transition-colors">
              <Phone size={14} />
              <span>+90 312 555 0000</span>
            </a>
            <a href="mailto:info@aicoelektronik.com" className="flex items-center gap-2 hover:text-[#1554F6] transition-colors">
              <Mail size={14} />
              <span>info@aicoelektronik.com</span>
            </a>
          </div>
          <Link 
            to={`/${otherLang}${currentPath}`}
            className="flex items-center gap-1.5 hover:text-[#1554F6] transition-colors"
          >
            <Globe size={14} />
            <span className="font-semibold">{otherLang.toUpperCase()}</span>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-white border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to={`/${lang}`} className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity">
              <img 
                src="/assets/logos/logo-mavi.png" 
                alt="Aico Elektronik" 
                className="h-8 lg:h-10 w-auto"
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
                <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#1554F6] transition-colors font-medium">
                  {t.services}
                  <ChevronDown size={16} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-2">
                      {t.serviceItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/${lang}${item.link}`}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#1554F6] flex-shrink-0">
                              <Icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                              <div className="text-xs text-gray-500">{item.desc}</div>
                            </div>
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
                <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#1554F6] transition-colors font-medium">
                  {t.capabilities}
                  <ChevronDown size={16} className={`transition-transform ${capabilitiesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {capabilitiesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-2">
                      {t.capabilityItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/${lang}${item.link}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#1554F6] flex-shrink-0">
                              <Icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link to={`/${lang}/case-studies`} className="px-4 py-2 text-gray-700 hover:text-[#1554F6] transition-colors font-medium">
                {t.caseStudies}
              </Link>
              <Link to={`/${lang}/support`} className="px-4 py-2 text-gray-700 hover:text-[#1554F6] transition-colors font-medium">
                {t.docs}
              </Link>
              <Link to={`/${lang}/about`} className="px-4 py-2 text-gray-700 hover:text-[#1554F6] transition-colors font-medium">
                {t.about}
              </Link>
              <Link to={`/${lang}/contact`} className="px-4 py-2 text-gray-700 hover:text-[#1554F6] transition-colors font-medium">
                {t.contact}
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <Link to={`/${lang}/instant-quote`}>
                <Button className="bg-[#1554F6] hover:bg-[#0d3cb8] text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
                  <Zap className="mr-2" size={18} />
                  {t.getQuote}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu */}
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-40 lg:hidden overflow-y-auto">
            <div className="p-4 space-y-1">
              {/* Language Switcher */}
              <Link 
                to={`/${otherLang}${currentPath}`}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
              >
                <Globe size={20} />
                <span>{otherLang.toUpperCase()}</span>
              </Link>

              <div className="border-t border-gray-200 my-2" />

              {/* CTA Button */}
              <Link to={`/${lang}/instant-quote`} className="block">
                <Button className="w-full bg-[#1554F6] hover:bg-[#0d3cb8] text-white mb-3">
                  <Zap className="mr-2" size={18} />
                  {t.getQuote}
                </Button>
              </Link>

              {/* Services */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">{t.services}</div>
                {t.serviceItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/${lang}${item.link}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50"
                  >
                    <item.icon size={20} className="text-[#1554F6]" />
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 my-2" />

              {/* Capabilities */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">{t.capabilities}</div>
                {t.capabilityItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/${lang}${item.link}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50"
                  >
                    <item.icon size={20} className="text-[#1554F6]" />
                    <div className="font-medium text-gray-900">{item.title}</div>
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 my-2" />

              {/* Other Links */}
              <Link to={`/${lang}/case-studies`} className="block px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                {t.caseStudies}
              </Link>
              <Link to={`/${lang}/support`} className="block px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                {t.docs}
              </Link>
              <Link to={`/${lang}/about`} className="block px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                {t.about}
              </Link>
              <Link to={`/${lang}/contact`} className="block px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                {t.contact}
              </Link>

              {/* Contact Info */}
              <div className="border-t border-gray-200 my-2" />
              <div className="px-4 py-2 space-y-3">
                <a href="tel:+903125550000" className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>+90 312 555 0000</span>
                </a>
                <a href="mailto:info@aicoelektronik.com" className="flex items-center gap-2 text-sm text-gray-600">
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
