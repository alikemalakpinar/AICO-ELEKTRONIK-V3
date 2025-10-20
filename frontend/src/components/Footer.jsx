import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

const Footer = ({ lang }) => {
  const t = useTranslation(lang);

  return (
    <footer className="bg-[#0E1A2B] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#1554F6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">Aico</span>
                <span className="text-[#1554F6] text-xs leading-tight">Elektronik</span>
              </div>
            </div>
            <p className="text-sm mb-4">{t.footer.description}</p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-[#1554F6] transition-colors duration-200">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#1554F6] transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#1554F6] transition-colors duration-200">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.company}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to={`/${lang}/about`} className="hover:text-[#1554F6] transition-colors duration-200">{t.nav.about}</Link></li>
              <li><Link to={`/${lang}/projects`} className="hover:text-[#1554F6] transition-colors duration-200">{t.nav.projects}</Link></li>
              <li><Link to={`/${lang}/blog`} className="hover:text-[#1554F6] transition-colors duration-200">{t.nav.blog}</Link></li>
              <li><Link to={`/${lang}/contact`} className="hover:text-[#1554F6] transition-colors duration-200">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.products}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to={`/${lang}/products/power-supplies`} className="hover:text-[#1554F6] transition-colors duration-200">{lang === 'tr' ? 'Güç Kaynakları' : 'Power Supplies'}</Link></li>
              <li><Link to={`/${lang}/products/led-drivers`} className="hover:text-[#1554F6] transition-colors duration-200">{lang === 'tr' ? 'LED Sürücüler' : 'LED Drivers'}</Link></li>
              <li><Link to={`/${lang}/products/sensors`} className="hover:text-[#1554F6] transition-colors duration-200">{lang === 'tr' ? 'Sensörler' : 'Sensors'}</Link></li>
              <li><Link to={`/${lang}/calculators`} className="hover:text-[#1554F6] transition-colors duration-200">{t.nav.calculators}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.nav.contact}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Ankara Teknokent, 06800 Ankara, Türkiye</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="flex-shrink-0" />
                <span>+90 312 XXX XX XX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@aico.com.tr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2024 Aico Elektronik. {t.footer.rights}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to={`/${lang}/privacy`} className="hover:text-[#1554F6] transition-colors duration-200">KVKK</Link>
            <Link to={`/${lang}/terms`} className="hover:text-[#1554F6] transition-colors duration-200">{lang === 'tr' ? 'Kullanım Koşulları' : 'Terms of Use'}</Link>
            <Link to={`/${lang}/cookies`} className="hover:text-[#1554F6] transition-colors duration-200">{lang === 'tr' ? 'Çerez Politikası' : 'Cookie Policy'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
