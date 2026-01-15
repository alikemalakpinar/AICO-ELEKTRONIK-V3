import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, ArrowRight, ChevronDown, Target, Lightbulb,
  CheckCircle2, Layers, Cpu, Award, Clock, Users, Phone,
  FileSearch, PenTool, TestTube, Wrench, Code, ClipboardList
} from 'lucide-react';

// Icon mapping for phases
const iconMap = {
  FileSearch: FileSearch,
  PenTool: PenTool,
  Layers: Layers,
  TestTube: TestTube,
  Wrench: Wrench,
  Code: Code,
  ClipboardList: ClipboardList,
  Cpu: Cpu
};

// Sample project data (will be fetched from API)
const SAMPLE_PROJECT = {
  slug: "yuksek-hizli-fpga-karti",
  title: "Yuksek Hizli FPGA Gelistirme Karti",
  title_en: "High-Speed FPGA Development Board",
  subtitle: "Savunma Sanayii icin 10 Gbps Veri Isleme Cozumu",
  subtitle_en: "10 Gbps Data Processing Solution for Defense Industry",
  hero_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop",
  client_industry: "Savunma Sanayii",
  client_industry_en: "Defense Industry",
  project_type: "pcb-design",

  challenge_text: "Musterimiz, radar sistemleri icin saniyede 10 gigabit veri isleyebilen, son derece dusuk gecikmeli bir FPGA tabanli sinyal isleme karti talep ediyordu. Mevcut cozumler ya cok pahali ya da performans gereksinimlerini karsilamiyordu. Ayrica kartin -40 derece ile +85 derece arasinda calisabilmesi gerekiyordu.",
  challenge_text_en: "Our client required an FPGA-based signal processing board capable of processing 10 gigabits of data per second with extremely low latency for radar systems. Existing solutions were either too expensive or did not meet performance requirements. Additionally, the board needed to operate between -40 and +85 degrees Celsius.",

  solution_text: "Xilinx Kintex UltraScale FPGA cevresinde 10 katmanli, empedans kontrollu bir PCB tasarladik. DDR4 bellek arayuzu ve yuksek hizli SerDes hatlarinin sinyal butunlugunu saglamak icin gelismis simulasyon araclari kullandik.",
  solution_text_en: "We designed a 10-layer, impedance-controlled PCB around the Xilinx Kintex UltraScale FPGA. We used advanced simulation tools to ensure signal integrity of the DDR4 memory interface and high-speed SerDes lines.",

  approach_text: "Projeye once detayli bir gereksinim analizi ile basladik. SI/PI simulasyonlari yaparak kritik sinyallerin yonlendirmesini optimize ettik. Prototip asamasinda VNA ve osiloskop ile kapsamli testler gerceklestirdik.",
  approach_text_en: "We started the project with a detailed requirements analysis. We optimized the routing of critical signals through SI/PI simulations. During the prototype phase, we performed comprehensive tests with VNA and oscilloscope.",

  results_text: "Proje, musterinin tum gereksinimlerini karsiladi. 12 Gbps veri isleme kapasitesi, hedefin %20 uzerinde performans sagladi. Kart, MIL-STD-810G cevresel testlerinden ilk seferde gecti. Birim maliyeti rakip cozumlerin %35 altinda.",
  results_text_en: "The project met all customer requirements. 12 Gbps data processing capacity provided 20% above target performance. The board passed MIL-STD-810G environmental tests on the first attempt. Unit cost is 35% below competing solutions.",

  technologies: ["Altium Designer", "Xilinx Vivado", "DDR4", "SerDes", "FPGA", "High-Speed PCB", "Impedance Control", "SI/PI Analysis"],

  tech_specs: [
    { category: "PCB", items: [
      { label: "Katman Sayisi", value: "10" },
      { label: "Min Track/Space", value: "3/3 mil" },
      { label: "Via Boyutu", value: "8 mil" },
      { label: "Materyal", value: "Megtron 6" }
    ]},
    { category: "Performans", items: [
      { label: "Veri Hizi", value: "12 Gbps" },
      { label: "Bellek", value: "8GB DDR4" },
      { label: "Arayuzler", value: "PCIe Gen3 x8" }
    ]}
  ],

  phases: [
    {
      title: "Faz 1: Analiz ve Planlama",
      title_en: "Phase 1: Analysis and Planning",
      description: "Gereksinim analizi, blok sema tasarimi ve kritik bilesenlerin secimi yapildi.",
      description_en: "Requirements analysis, block diagram design and selection of critical components were performed.",
      icon: "FileSearch"
    },
    {
      title: "Faz 2: Sematik Tasarim",
      title_en: "Phase 2: Schematic Design",
      description: "FPGA, bellek, guc ve arayuz devrelerinin sematik tasarimi tamamlandi.",
      description_en: "Schematic design of FPGA, memory, power and interface circuits was completed.",
      icon: "PenTool"
    },
    {
      title: "Faz 3: PCB Layout ve Simulasyon",
      title_en: "Phase 3: PCB Layout and Simulation",
      description: "10 katmanli PCB tasarimi ve SI/PI simulasyonlari gerceklestirildi.",
      description_en: "10-layer PCB design and SI/PI simulations were performed.",
      icon: "Layers"
    },
    {
      title: "Faz 4: Prototip ve Test",
      title_en: "Phase 4: Prototype and Test",
      description: "Prototip uretimi, dogrulama testleri ve optimizasyon calismalari yapildi.",
      description_en: "Prototype production, verification tests and optimization work were performed.",
      icon: "TestTube"
    }
  ],

  metrics: {
    size_reduction: null,
    cost_savings: "%35",
    performance_improvement: "%20",
    time_to_market: "4 ay",
    custom: {
      "Sicaklik Araligi": "-40C ile +85C",
      "EMC Uyumluluk": "MIL-STD-461"
    }
  },

  testimonial: "AICO ekibi, karmasik teknik gereksinimlerimizi anladi ve beklentilerimizin otesinde bir cozum sundu.",
  testimonial_author: "Proje Muduru, Savunma Sanayi Firmasi",

  gallery_images: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop"
  ]
};

const content = {
  tr: {
    backToSolutions: "Cozumlere Don",
    theChallenge: "Muhendislik Zorlugu",
    challengeSubtitle: "Musteri Bu Problemle Geldi",
    ourApproach: "Bizim Yaklasimimiz",
    approachSubtitle: "Boyle Cozduk",
    developmentProcess: "Gelistirme Sureci",
    processSubtitle: "Adim Adim Ilerleme",
    techStack: "Teknoloji Yigini",
    techSubtitle: "Kullandigimiz Araclar ve Teknolojiler",
    results: "Sonuclar ve Etki",
    resultsSubtitle: "Olculebilir Basarilar",
    specifications: "Teknik Ozellikler",
    gallery: "Proje Galerisi",
    ctaTitle: "Benzer Bir Projeniz mi Var?",
    ctaDesc: "Muhendislik ekibimiz zorlu projeleriniz icin hazir.",
    ctaButton: "Proje Gorusun",
    testimonialTitle: "Musteri Gorusu"
  },
  en: {
    backToSolutions: "Back to Solutions",
    theChallenge: "The Engineering Challenge",
    challengeSubtitle: "The Client Came With This Problem",
    ourApproach: "Our Approach",
    approachSubtitle: "How We Solved It",
    developmentProcess: "Development Process",
    processSubtitle: "Step by Step Progress",
    techStack: "Tech Stack",
    techSubtitle: "Tools and Technologies We Used",
    results: "Results & Impact",
    resultsSubtitle: "Measurable Achievements",
    specifications: "Technical Specifications",
    gallery: "Project Gallery",
    ctaTitle: "Have a Similar Project?",
    ctaDesc: "Our engineering team is ready for your challenging projects.",
    ctaButton: "Discuss Project",
    testimonialTitle: "Client Testimonial"
  }
};

const ProjectDetailPage = ({ lang = 'tr' }) => {
  const { slug } = useParams();
  const t = content[lang];
  const [project, setProject] = useState(SAMPLE_PROJECT);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        }
      } catch (error) {
        console.log('Using sample data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [slug]);

  const getText = (trText, enText) => lang === 'en' && enText ? enText : trText;
  const getPhaseTitle = (phase) => lang === 'en' && phase.title_en ? phase.title_en : phase.title;
  const getPhaseDesc = (phase) => lang === 'en' && phase.description_en ? phase.description_en : phase.description;

  return (
    <>
      <Helmet>
        <title>{getText(project.title, project.title_en)} | AICO Elektronik</title>
        <meta name="description" content={getText(project.subtitle, project.subtitle_en)} />
      </Helmet>

      {/* 1. HERO SECTION - Cinematic Full Screen */}
      <section ref={heroRef} className="relative h-screen overflow-hidden bg-slate-950">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.hero_image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-end pb-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Back button */}
            <Link
              to={`/${lang}/solutions`}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              {t.backToSolutions}
            </Link>

            {/* Industry Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold uppercase tracking-wider mb-6">
              {getText(project.client_industry, project.client_industry_en)}
            </span>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl">
              {getText(project.title, project.title_en)}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-slate-300 max-w-3xl">
              {getText(project.subtitle, project.subtitle_en)}
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <ChevronDown className="w-10 h-10 text-white/50 animate-bounce" />
        </div>
      </section>

      {/* 2. THE CHALLENGE Section */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Target className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{t.theChallenge}</h2>
                  <p className="text-slate-500">{t.challengeSubtitle}</p>
                </div>
              </div>

              <p className="text-xl text-slate-300 leading-relaxed">
                {getText(project.challenge_text, project.challenge_text_en)}
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-3xl opacity-50" />
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                <img
                  src={project.gallery_images?.[0] || project.hero_image}
                  alt="Challenge visualization"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR APPROACH Section */}
      <section className="py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{t.ourApproach}</h2>
                <p className="text-slate-500">{t.approachSubtitle}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  {getText(project.solution_text, project.solution_text_en)}
                </p>
                {project.approach_text && (
                  <p className="text-lg text-slate-400 leading-relaxed">
                    {getText(project.approach_text, project.approach_text_en)}
                  </p>
                )}
              </div>

              {/* Interactive PCB Layer Viewer */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">PCB Katman Gorunumu</h3>
                <div className="aspect-square bg-slate-900 rounded-xl overflow-hidden relative mb-4">
                  <img
                    src={project.gallery_images?.[1] || project.hero_image}
                    alt="PCB Layer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-sm text-slate-400 mb-2">Katman: {activeLayer + 1} / 6</div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={activeLayer}
                      onChange={(e) => setActiveLayer(parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {['Top', 'GND', 'Sig1', 'PWR', 'Sig2', 'Bot'].map((layer, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveLayer(i)}
                      className={`text-xs py-2 rounded transition-colors ${
                        activeLayer === i
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      {layer}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. DEVELOPMENT PROCESS - Timeline */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.developmentProcess}</h2>
              <p className="text-slate-500">{t.processSubtitle}</p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-green-500" />

              {project.phases.map((phase, index) => {
                const IconComponent = iconMap[phase.icon] || Cpu;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center mb-12 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-950 z-10" />

                    {/* Content card */}
                    <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                      <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white">{getPhaseTitle(phase)}</h3>
                        </div>
                        <p className="text-slate-400">{getPhaseDesc(phase)}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. TECH STACK */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.techStack}</h2>
              <p className="text-slate-500">{t.techSubtitle}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {project.technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 font-medium hover:border-blue-500/50 hover:text-blue-400 transition-colors"
                >
                  {tech}
                </motion.div>
              ))}
            </div>

            {/* Technical Specifications */}
            {project.tech_specs && (
              <div className="mt-16 grid md:grid-cols-2 gap-8">
                {project.tech_specs.map((spec, index) => (
                  <div key={index} className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">{spec.category}</h3>
                    <div className="space-y-3">
                      {spec.items.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-slate-400">{item.label}</span>
                          <span className="text-white font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 6. RESULTS & IMPACT */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-400" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{t.results}</h2>
                <p className="text-slate-500">{t.resultsSubtitle}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  {getText(project.results_text, project.results_text_en)}
                </p>

                {/* Metrics Grid */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.performance_improvement && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <div className="text-3xl font-bold text-green-400">{project.metrics.performance_improvement}</div>
                        <div className="text-sm text-slate-400">Performans Artisi</div>
                      </div>
                    )}
                    {project.metrics.cost_savings && (
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <div className="text-3xl font-bold text-cyan-400">{project.metrics.cost_savings}</div>
                        <div className="text-sm text-slate-400">Maliyet Tasarrufu</div>
                      </div>
                    )}
                    {project.metrics.time_to_market && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <div className="text-3xl font-bold text-blue-400">{project.metrics.time_to_market}</div>
                        <div className="text-sm text-slate-400">Proje Suresi</div>
                      </div>
                    )}
                    {project.metrics.custom && Object.entries(project.metrics.custom).map(([key, value], i) => (
                      <div key={i} className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                        <div className="text-xl font-bold text-purple-400">{value}</div>
                        <div className="text-sm text-slate-400">{key}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-4">{t.testimonialTitle}</h3>
                  <blockquote className="text-xl text-slate-300 italic mb-6">
                    "{project.testimonial}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                      <Users className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="text-slate-400">{project.testimonial_author}</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery_images && project.gallery_images.length > 0 && (
        <section className="py-24 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">{t.gallery}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {project.gallery_images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="aspect-video rounded-xl overflow-hidden bg-slate-800"
                >
                  <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. CTA Section */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-600/10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Award className="w-16 h-16 text-blue-500 mx-auto mb-8" />

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.ctaTitle}
            </h2>

            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              {t.ctaDesc}
            </p>

            <Link to={`/${lang}/contact`}>
              <button className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1">
                <Phone className="w-6 h-6" />
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

export default ProjectDetailPage;
