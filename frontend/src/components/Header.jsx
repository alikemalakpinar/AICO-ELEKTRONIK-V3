import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Zap, Globe, Phone, Mail,
  Cpu, Settings, Award, Layers, Package, ArrowRight,
  Calculator, BookOpen, FileText, Headphones, Factory,
  Truck, Shield, Clock, Sparkles, Leaf, HardHat, Flame, Snowflake
} from 'lucide-react';
import { Button } from './ui/button';

const Header = ({ lang = 'tr' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const content = {
    tr: {
      services: 'Hizmetler',
      capabilities: 'Yetenekler',
      solutions: 'Cozumler',
      caseStudies: 'Referanslar',
      support: 'Destek',
      about: 'Hakkimizda',
      contact: 'Iletisim',
      projectDiscuss: 'Proje Gorusun',
      serviceItems: [
        { icon: Layers, title: 'PCB Uretim', desc: '2-10 katman profesyonel uretim', link: '/pcb-manufacturing' },
        { icon: Cpu, title: 'PCB Dizgi', desc: 'SMT/THT hassas montaj', link: '/pcb-assembly' },
        { icon: Zap, title: 'Hizli Prototip', desc: '24-48 saat ekspres teslimat', link: '/fast-prototyping' }
      ],
      capabilityItems: [
        { icon: Settings, title: 'PCB Kapasiteleri', desc: 'Teknik ozellikler', link: '/pcb-capabilities' },
        { icon: Package, title: 'Dizgi Kapasiteleri', desc: 'Montaj yetenekleri', link: '/assembly-capabilities' },
        { icon: Award, title: 'Kalite', desc: 'ISO 9001 sertifikali', link: '/quality' }
      ],
      solutionItems: [
        { icon: Leaf, title: 'Akilli Tarim', desc: 'IoT tabanli cozumler', link: '/coffee-machine-systems' },
        { icon: HardHat, title: 'Madenci Takibi', desc: 'Guvenllik sistemleri', link: '/mining-tracking' },
        { icon: Factory, title: 'Makine Analizi', desc: 'Endustriyel izleme', link: '/machine-analysis' },
        { icon: Flame, title: 'Yangin Tespit', desc: 'Erken uyari sistemleri', link: '/fire-detection' },
        { icon: Snowflake, title: 'Soguk Depo', desc: 'Sicaklik kontrolu', link: '/cold-storage' }
      ],
      resources: 'Kaynaklar',
      resourceItems: [
        { icon: Calculator, title: 'Hesaplama Araclari', desc: 'Kablo, guc hesaplama', link: '/calculators' },
        { icon: BookOpen, title: 'Blog', desc: 'Teknik makaleler', link: '/blog' },
        { icon: FileText, title: 'Dokumanlar', desc: 'Teknik kaynaklar', link: '/support' },
        { icon: Headphones, title: 'Destek', desc: 'Yardim ve SSS', link: '/support' }
      ]
    },
    en: {
      services: 'Services',
      capabilities: 'Capabilities',
      solutions: 'Solutions',
      caseStudies: 'References',
      support: 'Support',
      about: 'About',
      contact: 'Contact',
      projectDiscuss: 'Discuss Project',
      serviceItems: [
        { icon: Layers, title: 'PCB Manufacturing', desc: '2-10 layer professional production', link: '/pcb-manufacturing' },
        { icon: Cpu, title: 'PCB Assembly', desc: 'SMT/THT precision assembly', link: '/pcb-assembly' },
        { icon: Zap, title: 'Fast Prototyping', desc: '24-48 hour express delivery', link: '/fast-prototyping' }
      ],
      capabilityItems: [
        { icon: Settings, title: 'PCB Capabilities', desc: 'Technical specifications', link: '/pcb-capabilities' },
        { icon: Package, title: 'Assembly Capabilities', desc: 'Assembly capabilities', link: '/assembly-capabilities' },
        { icon: Award, title: 'Quality', desc: 'ISO 9001 certified', link: '/quality' }
      ],
      solutionItems: [
        { icon: Leaf, title: 'Smart Agriculture', desc: 'IoT-based solutions', link: '/coffee-machine-systems' },
        { icon: HardHat, title: 'Mining Tracking', desc: 'Safety systems', link: '/mining-tracking' },
        { icon: Factory, title: 'Machine Analysis', desc: 'Industrial monitoring', link: '/machine-analysis' },
        { icon: Flame, title: 'Fire Detection', desc: 'Early warning systems', link: '/fire-detection' },
        { icon: Snowflake, title: 'Cold Storage', desc: 'Temperature control', link: '/cold-storage' }
      ],
      resources: 'Resources',
      resourceItems: [
        { icon: Calculator, title: 'Calculators', desc: 'Cable, power tools', link: '/calculators' },
        { icon: BookOpen, title: 'Blog', desc: 'Technical articles', link: '/blog' },
        { icon: FileText, title: 'Documents', desc: 'Technical resources', link: '/support' },
        { icon: Headphones, title: 'Support', desc: 'Help & FAQ', link: '/support' }
      ]
    }
  };

  const t = content[lang] || content.tr;
  const otherLang = lang === 'tr' ? 'en' : 'tr';
  const currentPath = location.pathname.replace(`/${lang}`, '');

  return (
    <>
      {/* Corporate Top Bar */}
      <div className="hidden md:block bg-slate-900 text-white py-2.5 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="tel:+903125550000" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <Phone size={14} />
              <span>+90 312 555 0000</span>
            </a>
            <a href="mailto:info@aicoelektronik.com" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <Mail size={14} />
              <span>info@aicoelektronik.com</span>
            </a>
          </div>
          <Link
            to={`/${otherLang}${currentPath}`}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <Globe size={14} />
            <span className="font-medium">{otherLang.toUpperCase()}</span>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg border-b border-slate-200'
          : 'bg-white border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to={`/${lang}`} className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/assets/logos/aicoelektroniklogo.png"
                alt="Aico Elektronik"
                className="h-28 lg:h-35 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm">
                  {t.services}
                  <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-2">
                      {t.serviceItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/${lang}${item.link}`}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                              <div className="text-xs text-slate-500">{item.desc}</div>
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
                className="relative"
                onMouseEnter={() => setCapabilitiesOpen(true)}
                onMouseLeave={() => setCapabilitiesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm">
                  {t.capabilities}
                  <ChevronDown size={14} className={`transition-transform ${capabilitiesOpen ? 'rotate-180' : ''}`} />
                </button>

                {capabilitiesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-2">
                      {t.capabilityItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/${lang}${item.link}`}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                              <div className="text-xs text-slate-500">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm">
                  {t.solutions}
                  <ChevronDown size={14} className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                    >
                      <div className="p-2">
                        {t.solutionItems.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              to={`/${lang}${item.link}`}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                                <Icon size={18} />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                                <div className="text-xs text-slate-500">{item.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      {/* CTA in dropdown */}
                      <div className="bg-slate-50 p-3 border-t border-slate-200">
                        <Link
                          to={`/${lang}/case-studies`}
                          className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <span>{lang === 'tr' ? 'Tüm referansları görüntüle' : 'View all references'}</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm">
                  {t.resources}
                  <ChevronDown size={14} className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                    >
                      <div className="p-2">
                        {t.resourceItems.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              to={`/${lang}${item.link}`}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                                <Icon size={18} />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                                <div className="text-xs text-slate-500">{item.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to={`/${lang}/case-studies`} className="px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm">
                {t.caseStudies}
              </Link>
              <Link to={`/${lang}/about`} className="px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm">
                {t.about}
              </Link>
              <Link to={`/${lang}/contact`} className="px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm">
                {t.contact}
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to={`/${lang}/contact`}>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all text-sm">
                  <Phone className="mr-2" size={16} />
                  {t.projectDiscuss}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} className="text-slate-700" /> : <Menu size={24} className="text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-[64px] left-0 right-0 bottom-0 bg-white z-40 lg:hidden overflow-y-auto">
            <div className="p-5 space-y-4">
              {/* Language Switcher */}
              <Link
                to={`/${otherLang}${currentPath}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 font-medium"
              >
                <Globe size={18} />
                <span>{otherLang === 'en' ? 'English' : 'Turkce'}</span>
              </Link>

              {/* CTA Button */}
              <Link to={`/${lang}/contact`} className="block">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-medium">
                  <Phone className="mr-2" size={18} />
                  {t.projectDiscuss}
                </Button>
              </Link>

              <div className="border-t border-slate-200 pt-4" />

              {/* Services */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase">{t.services}</div>
                {t.serviceItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/${lang}${item.link}`}
                    className="block px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              {/* Capabilities */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase">{t.capabilities}</div>
                {t.capabilityItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/${lang}${item.link}`}
                    className="block px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              {/* Solutions */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase">{t.solutions}</div>
                {t.solutionItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      to={`/${lang}${item.link}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700"
                    >
                      <Icon size={18} className="text-blue-500" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              {/* Resources */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase">{t.resources}</div>
                {t.resourceItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      to={`/${lang}${item.link}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700"
                    >
                      <Icon size={18} className="text-amber-500" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-slate-200 pt-4" />

              {/* Other Links */}
              <Link to={`/${lang}/case-studies`} className="block px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">
                {t.caseStudies}
              </Link>
              <Link to={`/${lang}/about`} className="block px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">
                {t.about}
              </Link>
              <Link to={`/${lang}/contact`} className="block px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">
                {t.contact}
              </Link>

              {/* Contact Info */}
              <div className="border-t border-slate-200 pt-4 space-y-3 px-4">
                <a href="tel:+903125550000" className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone size={16} />
                  <span>+90 312 555 0000</span>
                </a>
                <a href="mailto:info@aicoelektronik.com" className="flex items-center gap-3 text-sm text-slate-600">
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
