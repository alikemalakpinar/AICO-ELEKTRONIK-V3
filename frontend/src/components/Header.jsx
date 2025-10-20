import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from '../utils/i18n';

const Header = ({ lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation(lang);

  const changeLang = (newLang) => {
    setLang(newLang);
    const currentPath = location.pathname.replace(/^\/(tr|en)/, '');
    navigate(`/${newLang}${currentPath || ''}`);
  };

  const navItems = [
    { label: t.nav.products, path: `/${lang}/products` },
    { label: t.nav.services, path: `/${lang}/services` },
    { label: t.nav.calculators, path: `/${lang}/calculators` },
    { label: t.nav.about, path: `/${lang}/about` },
    { label: t.nav.contact, path: `/${lang}/contact` }
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
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
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-gray-700 hover:text-[#1554F6] font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
              >
                {item.label}
              </Link>
            ))}
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
            <Button className="hidden lg:inline-flex bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:from-[#0E3CC7] hover:to-[#0284C7] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Zap size={18} className="mr-2" />
              {t.nav.getQuote}
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
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-gray-700 hover:text-[#1554F6] font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="w-full bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:from-[#0E3CC7] hover:to-[#0284C7] text-white mt-4">
              <Zap size={18} className="mr-2" />
              {t.nav.getQuote}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
