import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
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
    { label: t.nav.calculators, path: `/${lang}/calculators` },
    { label: t.nav.about, path: `/${lang}/about` },
    { label: t.nav.contact, path: `/${lang}/contact` }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={`/${lang}`} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#1554F6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#0E1A2B] font-bold text-lg leading-tight">Aico</span>
              <span className="text-[#1554F6] text-xs leading-tight">Elektronik</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-[#374151] hover:text-[#1554F6] font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => changeLang('tr')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                  lang === 'tr' ? 'bg-white text-[#1554F6] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                TR
              </button>
              <button
                onClick={() => changeLang('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                  lang === 'en' ? 'bg-white text-[#1554F6] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Button className="hidden md:inline-flex bg-[#1554F6] hover:bg-[#0E3CC7] text-white">
              {t.nav.getQuote}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-[#374151] hover:text-[#1554F6] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="w-full bg-[#1554F6] hover:bg-[#0E3CC7] text-white">
              {t.nav.getQuote}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
