import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Zap, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from '../utils/i18n';

const Header = ({ lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation(lang);

  const changeLang = (newLang) => {
    setLang(newLang);
    const currentPath = location.pathname.replace(/^\/(tr|en)/, '');
    navigate(`/${newLang}${currentPath || ''}`);
  };

  const servicesMenu = [
    { label: lang === 'tr' ? 'PCB Üretim' : 'PCB Manufacturing', path: `/${lang}/services/pcb-manufacturing` },
    { label: lang === 'tr' ? 'PCB Dizgi (SMT/THT)' : 'PCB Assembly (SMT/THT)', path: `/${lang}/services/pcb-assembly` },
    { label: lang === 'tr' ? 'Hızlı Prototipleme' : 'Fast Prototyping', path: `/${lang}/services/fast-prototyping` }
  ];

  const capabilitiesMenu = [
    { label: lang === 'tr' ? 'PCB Kapasitesi' : 'PCB Capabilities', path: `/${lang}/capabilities/pcb` },
    { label: lang === 'tr' ? 'Dizgi Kapasitesi' : 'Assembly Capabilities', path: `/${lang}/capabilities/assembly` },
    { label: lang === 'tr' ? 'Malzeme & Stackup' : 'Materials & Stackup', path: `/${lang}/capabilities/stackup` },
    { label: lang === 'tr' ? 'Kalite & Sertifikalar' : 'Quality & Certifications', path: `/${lang}/capabilities/quality` }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={`/${lang}`} className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#0A0E27] font-bold text-xl leading-tight">Aico</span>
              <span className="text-[#1554F6] text-xs leading-tight font-semibold">Elektronik</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-[#1554F6] font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
              >
                {lang === 'tr' ? 'Hizmetler' : 'Services'}
                <ChevronDown size={16} className="ml-1" />
              </button>
              {servicesOpen && (
                <div
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                >
                  {servicesMenu.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#1554F6] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Capabilities Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setCapabilitiesOpen(true)}
                onMouseLeave={() => setCapabilitiesOpen(false)}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-[#1554F6] font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
              >
                {lang === 'tr' ? 'Yetenekler' : 'Capabilities'}
                <ChevronDown size={16} className="ml-1" />
              </button>
              {capabilitiesOpen && (
                <div
                  onMouseEnter={() => setCapabilitiesOpen(true)}
                  onMouseLeave={() => setCapabilitiesOpen(false)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                >
                  {capabilitiesMenu.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#1554F6] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to={`/${lang}/case-studies`}
              className="px-4 py-2 text-gray-700 hover:text-[#1554F6] font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
            >
              {lang === 'tr' ? 'Vaka Çalışmaları' : 'Case Studies'}
            </Link>
            <Link
              to={`/${lang}/support`}
              className="px-4 py-2 text-gray-700 hover:text-[#1554F6] font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
            >
              {lang === 'tr' ? 'Belgeler & SSS' : 'Docs & FAQ'}
            </Link>
            <Link
              to={`/${lang}/about`}
              className="px-4 py-2 text-gray-700 hover:text-[#1554F6] font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
            >
              {t.nav.about}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => changeLang('tr')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  lang === 'tr' ? 'bg-white text-[#1554F6] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                TR
              </button>
              <button
                onClick={() => changeLang('en')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  lang === 'en' ? 'bg-white text-[#1554F6] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Button 
              asChild
              className="hidden lg:inline-flex bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:from-[#0E3CC7] hover:to-[#0284C7] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/${lang}/instant-quote`}>
                <Upload size={18} className="mr-2" />
                {lang === 'tr' ? 'Gerber Yükle' : 'Upload Gerber'}
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-600 hover:text-[#1554F6] transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg">
          <div className="px-4 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
            <div className="space-y-2">
              <div className="font-semibold text-[#0A0E27] text-sm px-4 py-2">{lang === 'tr' ? 'Hizmetler' : 'Services'}</div>
              {servicesMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-gray-700 hover:text-[#1554F6] py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-[#0A0E27] text-sm px-4 py-2">{lang === 'tr' ? 'Yetenekler' : 'Capabilities'}</div>
              {capabilitiesMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-gray-700 hover:text-[#1554F6] py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              to={`/${lang}/case-studies`}
              className="block text-gray-700 hover:text-[#1554F6] font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {lang === 'tr' ? 'Vaka Çalışmaları' : 'Case Studies'}
            </Link>
            <Link
              to={`/${lang}/support`}
              className="block text-gray-700 hover:text-[#1554F6] font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {lang === 'tr' ? 'Belgeler & SSS' : 'Docs & FAQ'}
            </Link>
            <Link
              to={`/${lang}/about`}
              className="block text-gray-700 hover:text-[#1554F6] font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.about}
            </Link>
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:from-[#0E3CC7] hover:to-[#0284C7] text-white mt-4"
            >
              <Link to={`/${lang}/instant-quote`}>
                <Upload size={18} className="mr-2" />
                {lang === 'tr' ? 'Gerber Yükle' : 'Upload Gerber'}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
