import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Search, Zap, Globe, Phone, Mail,
  Cpu, Settings, Award, FileText, HelpCircle, Package, Layers
} from 'lucide-react';
import { Button } from './ui/button';

const Header = ({ lang = 'tr' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    tr: {
      services: 'Hizmetler',
      capabilities: 'Yetenekler',
      caseStudies: 'Vaka Çalışmaları',
      docs: 'Belgeler & SSS',
      about: 'Hakkımızda',
      contact: 'İletişim',
      getQuote: 'Gerber Yükle',
      instantQuote: 'Anında Teklif Al',
      serviceItems: [
        { icon: Layers, title: 'PCB Üretim', desc: '2-10 katman, 24-48 saat', link: '/pcb-manufacturing' },
        { icon: Cpu, title: 'PCB Dizgi', desc: 'SMT/THT, BGA montaj', link: '/pcb-assembly' },
        { icon: Zap, title: 'Hızlı Prototip', desc: '24 saat teslimat', link: '/fast-prototyping' }
      ],
      capabilityItems: [
        { icon: Settings, title: 'PCB Kapasiteleri', desc: 'Teknik özellikler', link: '/pcb-capabilities' },
        { icon: Package, title: 'Dizgi Kapasiteleri', desc: 'Montaj detayları', link: '/assembly-capabilities' },
        { icon: Award, title: 'Kalite & Sertifikalar', desc: 'ISO 9001, RoHS', link: '/quality' }
      ],
      searchPlaceholder: 'Ürün veya hizmet ara...'
    },
    en: {
      services: 'Services',
      capabilities: 'Capabilities',
      caseStudies: 'Case Studies',
      docs: 'Docs & FAQ',
      about: 'About',
      contact: 'Contact',
      getQuote: 'Upload Gerber',
      instantQuote: 'Get Instant Quote',
      serviceItems: [
        { icon: Layers, title: 'PCB Manufacturing', desc: '2-10 layers, 24-48h', link: '/pcb-manufacturing' },
        { icon: Cpu, title: 'PCB Assembly', desc: 'SMT/THT, BGA assembly', link: '/pcb-assembly' },
        { icon: Zap, title: 'Fast Prototyping', desc: '24h delivery', link: '/fast-prototyping' }
      ],
      capabilityItems: [
        { icon: Settings, title: 'PCB Capabilities', desc: 'Technical specs', link: '/pcb-capabilities' },
        { icon: Package, title: 'Assembly Capabilities', desc: 'Assembly details', link: '/assembly-capabilities' },
        { icon: Award, title: 'Quality & Certifications', desc: 'ISO 9001, RoHS', link: '/quality' }
      ],
      searchPlaceholder: 'Search products or services...'
    }
  };

  const t = content[lang] || content.tr;
  const otherLang = lang === 'tr' ? 'en' : 'tr';
  const currentPath = location.pathname.replace(`/${lang}`, '');

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#0A0E27] to-[#1e293b] text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+903125550000" className="flex items-center gap-2 hover:text-[#0EA5E9] transition-colors">
              <Phone size={14} />
              <span className="hidden sm:inline">+90 312 555 0000</span>
            </a>
            <a href="mailto:info@aicoelektronik.com" className="flex items-center gap-2 hover:text-[#0EA5E9] transition-colors">
              <Mail size={14} />
              <span className="hidden md:inline">info@aicoelektronik.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to={`/${otherLang}${currentPath}`}
              className="flex items-center gap-1 hover:text-[#0EA5E9] transition-colors"
            >
              <Globe size={14} />
              <span className="font-semibold">{otherLang.toUpperCase()}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={`/${lang}`} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                A
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xl bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] bg-clip-text text-transparent">
                  Aico
                </div>
                <div className="text-xs text-gray-500 -mt-1">Elektronik</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors">
                  {t.services}
                  <ChevronDown size={16} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      {t.serviceItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/${lang}${item.link}`}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                              <Icon size={20} />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-500">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] p-3">
                      <Link
                        to={`/${lang}/instant-quote`}
                        className="flex items-center justify-between text-white hover:translate-x-1 transition-transform"
                      >
                        <span className="font-semibold">{t.instantQuote}</span>
                        <Zap size={18} />
                      </Link>
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
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors">
                  {t.capabilities}
                  <ChevronDown size={16} className={`transition-transform ${capabilitiesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {capabilitiesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      {t.capabilityItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/${lang}${item.link}`}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                              <Icon size={20} />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-500">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link to={`/${lang}/case-studies`} className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors">
                {t.caseStudies}
              </Link>
              <Link to={`/${lang}/support`} className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors">
                {t.docs}
              </Link>
              <Link to={`/${lang}/about`} className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors">
                {t.about}
              </Link>
              <Link to={`/${lang}/contact`} className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors">
                {t.contact}
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to={`/${lang}/instant-quote`}>
                <Button className="bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] text-white px-6 py-2.5 rounded-xl hover:shadow-xl hover:scale-105 transition-all">
                  <Zap className="mr-2" size={18} />
                  {t.getQuote}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              <Link to={`/${lang}/instant-quote`} className="block">
                <Button className="w-full bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] text-white mb-3">
                  <Zap className="mr-2" size={18} />
                  {t.getQuote}
                </Button>
              </Link>
              
              <Link to={`/${lang}/pcb-manufacturing`} className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                PCB Üretim
              </Link>
              <Link to={`/${lang}/pcb-assembly`} className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                PCB Dizgi
              </Link>
              <Link to={`/${lang}/pcb-capabilities`} className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                Yetenekler
              </Link>
              <Link to={`/${lang}/case-studies`} className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                {t.caseStudies}
              </Link>
              <Link to={`/${lang}/support`} className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                {t.docs}
              </Link>
              <Link to={`/${lang}/about`} className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                {t.about}
              </Link>
              <Link to={`/${lang}/contact`} className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                {t.contact}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
