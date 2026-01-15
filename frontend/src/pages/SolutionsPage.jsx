import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Cpu, Layers, Zap, Shield, Factory,
  ChevronDown, Filter, Search
} from 'lucide-react';

// Sample projects data (will be fetched from API in production)
const SAMPLE_PROJECTS = [
  {
    slug: "yuksek-hizli-fpga-karti",
    title: "Yuksek Hizli FPGA Gelistirme Karti",
    title_en: "High-Speed FPGA Development Board",
    subtitle: "Savunma Sanayii icin 10 Gbps Veri Isleme Cozumu",
    subtitle_en: "10 Gbps Data Processing Solution for Defense Industry",
    hero_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    client_industry: "Savunma Sanayii",
    client_industry_en: "Defense Industry",
    technologies: ["FPGA", "DDR4", "High-Speed PCB", "Altium Designer"],
    metrics: { performance: "%20 Ustu Performans", cost: "%35 Maliyet Tasarrufu" },
    featured: true
  },
  {
    slug: "endustriyel-iot-gateway",
    title: "Endustriyel IoT Gateway Cozumu",
    title_en: "Industrial IoT Gateway Solution",
    subtitle: "Akilli Fabrika icin Edge Computing Platformu",
    subtitle_en: "Edge Computing Platform for Smart Factory",
    hero_image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
    client_industry: "Endustri 4.0",
    client_industry_en: "Industry 4.0",
    technologies: ["ARM Cortex-A53", "Linux", "Modbus", "MQTT"],
    metrics: { performance: "%15 Verimlilik Artisi", cost: "%40 Enerji Tasarrufu" },
    featured: true
  },
  {
    slug: "medikal-cihaz-kontrol-karti",
    title: "Medikal Cihaz Kontrol Karti",
    title_en: "Medical Device Control Board",
    subtitle: "ISO 13485 Uyumlu Hassas Motor Kontrol Sistemi",
    subtitle_en: "ISO 13485 Compliant Precision Motor Control System",
    hero_image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=800&fit=crop",
    client_industry: "Medikal",
    client_industry_en: "Medical",
    technologies: ["STM32H7", "IEC 62304", "EtherCAT", "24-bit ADC"],
    metrics: { performance: "0.5um Hassasiyet", cost: "FDA 510(k) Onay" },
    featured: true
  }
];

const content = {
  tr: {
    pageTitle: "Muhendislik Cozumlerimiz",
    pageSubtitle: "Teknik derinlik ve muhendislik mukemmeliyeti ile tamamlanan projeler",
    heroHeadline: "Her Proje Bir Muhendislik Hikayesi",
    heroDesc: "Zorlu teknik problemlere yenilikci cozumler uretiyoruz. Projelerimizi inceleyin ve bizimle calisin.",
    viewStory: "Hikayeyi Oku",
    viewProcess: "Sureci Incele",
    filterAll: "Tum Projeler",
    filterDefense: "Savunma",
    filterMedical: "Medikal",
    filterIndustry: "Endustri 4.0",
    ctaTitle: "Sizin Projeniz Icin Hazirız",
    ctaDesc: "Zorlu bir muhendislik projeniz mi var? Ekibimizle gorusun.",
    ctaButton: "Proje Gorusun"
  },
  en: {
    pageTitle: "Our Engineering Solutions",
    pageSubtitle: "Projects completed with technical depth and engineering excellence",
    heroHeadline: "Every Project Is an Engineering Story",
    heroDesc: "We create innovative solutions to challenging technical problems. Explore our projects and work with us.",
    viewStory: "Read the Story",
    viewProcess: "View Process",
    filterAll: "All Projects",
    filterDefense: "Defense",
    filterMedical: "Medical",
    filterIndustry: "Industry 4.0",
    ctaTitle: "Ready for Your Project",
    ctaDesc: "Have a challenging engineering project? Talk to our team.",
    ctaButton: "Discuss Project"
  }
};

const SolutionsPage = ({ lang = 'tr' }) => {
  const t = content[lang];
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?featured=true');
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setProjects(data);
          }
        }
      } catch (error) {
        console.log('Using sample data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filters = [
    { id: 'all', label: t.filterAll },
    { id: 'defense', label: t.filterDefense },
    { id: 'medical', label: t.filterMedical },
    { id: 'industry', label: t.filterIndustry }
  ];

  const getTitle = (project) => lang === 'en' && project.title_en ? project.title_en : project.title;
  const getSubtitle = (project) => lang === 'en' && project.subtitle_en ? project.subtitle_en : project.subtitle;
  const getIndustry = (project) => lang === 'en' && project.client_industry_en ? project.client_industry_en : project.client_industry;

  return (
    <>
      <Helmet>
        <title>{t.pageTitle} | AICO Elektronik</title>
        <meta name="description" content={t.pageSubtitle} />
      </Helmet>

      {/* Hero Section - Dark, Cinematic */}
      <section className="relative min-h-[70vh] bg-slate-950 flex items-center overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950" />

        {/* Floating tech elements */}
        <div className="absolute top-20 left-10 opacity-10">
          <Cpu className="w-32 h-32 text-blue-400" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Layers className="w-40 h-40 text-cyan-400" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              {t.pageSubtitle}
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {t.heroHeadline}
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12">
              {t.heroDesc}
            </p>

            {/* Filter pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-white text-slate-900 shadow-lg shadow-white/20'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-slate-500 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Projects List - Full-width Strips */}
      <section className="bg-slate-950 py-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <Link to={`/${lang}/solutions/${project.slug}`}>
              <div className={`relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden border-b border-slate-800/50 ${
                index % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950'
              }`}>
                {/* Background Image with parallax effect */}
                <div className="absolute inset-0 z-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform scale-105 group-hover:scale-110 transition-transform duration-[1500ms]"
                    style={{ backgroundImage: `url(${project.hero_image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/70" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Text content */}
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      {/* Industry badge */}
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                        <Factory className="w-3.5 h-3.5" />
                        {getIndustry(project)}
                      </span>

                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                        {getTitle(project)}
                      </h2>

                      <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                        {getSubtitle(project)}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-slate-800/80 text-slate-300 text-sm rounded-lg border border-slate-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Metrics */}
                      {project.metrics && (
                        <div className="flex gap-8 mb-8">
                          {project.metrics.performance && (
                            <div>
                              <div className="text-2xl font-bold text-green-400">{project.metrics.performance}</div>
                              <div className="text-sm text-slate-500">Performans</div>
                            </div>
                          )}
                          {project.metrics.cost && (
                            <div>
                              <div className="text-2xl font-bold text-cyan-400">{project.metrics.cost}</div>
                              <div className="text-sm text-slate-500">Kazanim</div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* CTA Button */}
                      <button className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-blue-500/20">
                        {t.viewStory}
                        <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Right: Visual element placeholder */}
                    <div className={`hidden md:block ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="relative">
                        {/* Decorative frame */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/50">
                          <img
                            src={project.hero_image}
                            alt={getTitle(project)}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Play button overlay for video effect */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ArrowRight className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-blue-500 mx-auto mb-8" />

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.ctaTitle}
            </h2>

            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              {t.ctaDesc}
            </p>

            <Link to={`/${lang}/contact`}>
              <button className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1">
                {t.ctaButton}
                <ArrowRight className="w-6 h-6" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SolutionsPage;
