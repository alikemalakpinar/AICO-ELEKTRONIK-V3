import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock, Tag, Search, Filter, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const BlogPage = ({ lang = 'tr' }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    tr: {
      hero: {
        badge: 'BLOG & HABERLER',
        title: 'Teknoloji Dünyasından',
        titleHighlight: 'Güncel İçerikler',
        subtitle: 'PCB teknolojileri, endüstriyel IoT, elektronik tasarım ve üretim hakkında uzman makaleler'
      },
      search: 'Makale ara...',
      categories: [
        { id: 'all', name: 'Tümü' },
        { id: 'technical', name: 'Teknik' },
        { id: 'education', name: 'Eğitim' },
        { id: 'industry', name: 'Sektör' },
        { id: 'innovation', name: 'İnovasyon' },
        { id: 'guide', name: 'Rehber' }
      ],
      featured: 'Öne Çıkan',
      readMore: 'Devamını Oku',
      readTime: 'dk okuma',
      posts: [
        {
          id: 1,
          title: 'AI Destekli DFM Analizi: Üretim Hatalarını %80 Azaltın',
          excerpt: 'Yapay zeka destekli tasarım doğrulama sistemleri, PCB üretiminde devrim yaratıyor. Gerber dosyalarınızı yükleyin, saniyeler içinde potansiyel sorunları tespit edin.',
          author: 'Dr. Ahmet Yıldırım',
          authorRole: 'CTO',
          date: '25 Kasım 2024',
          category: 'innovation',
          readTime: 8,
          featured: true,
          image: '/blog/ai-dfm.jpg',
          tags: ['AI', 'DFM', 'Kalite Kontrol']
        },
        {
          id: 2,
          title: 'PCB Tasarımında DFM İlkeleri: Kapsamlı Rehber',
          excerpt: 'Üretilebilirlik için tasarım (DFM) prensipleri, maliyet ve kaliteyi doğrudan etkiler. Minimum trace genişliği, via boyutları ve panel optimizasyonu.',
          author: 'Mehmet Kaya',
          authorRole: 'Kıdemli PCB Mühendisi',
          date: '20 Kasım 2024',
          category: 'technical',
          readTime: 12,
          featured: true,
          image: '/blog/dfm-guide.jpg',
          tags: ['DFM', 'PCB Tasarım', 'Best Practices']
        },
        {
          id: 3,
          title: 'İmpedans Kontrollü PCB: Yüksek Hızlı Sinyal Bütünlüğü',
          excerpt: 'DDR4, USB 3.0, PCIe gibi yüksek hızlı protokoller için impedans kontrolünün önemi. Stackup tasarımı ve malzeme seçimi.',
          author: 'Ayşe Demir',
          authorRole: 'RF/SI Mühendisi',
          date: '15 Kasım 2024',
          category: 'technical',
          readTime: 10,
          featured: false,
          image: '/blog/impedance.jpg',
          tags: ['İmpedans', 'Sinyal Bütünlüğü', 'High-Speed']
        },
        {
          id: 4,
          title: 'SMT vs THT: Hangi Teknoloji Ne Zaman Kullanılmalı?',
          excerpt: 'Yüzey montaj ve delikli montaj teknolojilerinin karşılaştırması. Maliyet, güvenilirlik ve uygulama alanları.',
          author: 'Can Öztürk',
          authorRole: 'Üretim Müdürü',
          date: '10 Kasım 2024',
          category: 'education',
          readTime: 7,
          featured: false,
          image: '/blog/smt-tht.jpg',
          tags: ['SMT', 'THT', 'Montaj']
        },
        {
          id: 5,
          title: 'HDI PCB Tasarım Rehberi: Microvia ve Blind Via',
          excerpt: 'Yüksek yoğunluklu interconnect PCB tasarımı için ipuçları. Layer stackup, microvia yerleşimi ve HDI avantajları.',
          author: 'Zeynep Arslan',
          authorRole: 'PCB Tasarım Lideri',
          date: '5 Kasım 2024',
          category: 'guide',
          readTime: 15,
          featured: false,
          image: '/blog/hdi-pcb.jpg',
          tags: ['HDI', 'Microvia', 'Tasarım']
        },
        {
          id: 6,
          title: 'Endüstriyel IoT Trendleri 2025: Türkiye Perspektifi',
          excerpt: 'Akıllı fabrikalar, prediktif bakım ve edge computing. Türk sanayisinin dijital dönüşüm yol haritası.',
          author: 'Ali Yılmaz',
          authorRole: 'IoT Çözümleri Direktörü',
          date: '1 Kasım 2024',
          category: 'industry',
          readTime: 9,
          featured: false,
          image: '/blog/iot-trends.jpg',
          tags: ['IoT', 'Endüstri 4.0', 'Dijital Dönüşüm']
        },
        {
          id: 7,
          title: 'BGA Rework: Profesyonel Onarım Teknikleri',
          excerpt: 'Ball Grid Array komponentlerin güvenli sökümü ve yeniden montajı. Reflow profilleri ve X-ray doğrulama.',
          author: 'Osman Yılmaz',
          authorRole: 'Rework Uzmanı',
          date: '28 Ekim 2024',
          category: 'technical',
          readTime: 11,
          featured: false,
          image: '/blog/bga-rework.jpg',
          tags: ['BGA', 'Rework', 'Onarım']
        },
        {
          id: 8,
          title: 'Conformal Coating Seçim Rehberi',
          excerpt: 'Akrilik, silikon, poliüretan ve epoksi kaplamalar. Uygulama yöntemleri ve performans karşılaştırması.',
          author: 'Fatma Çelik',
          authorRole: 'Kalite Mühendisi',
          date: '25 Ekim 2024',
          category: 'guide',
          readTime: 8,
          featured: false,
          image: '/blog/conformal.jpg',
          tags: ['Conformal Coating', 'Koruma', 'Kalite']
        },
        {
          id: 9,
          title: 'Flex PCB Tasarım ve Üretim: A\'dan Z\'ye',
          excerpt: 'Esnek baskılı devre kartları için malzeme seçimi, bükülme yarıçapı hesaplama ve stiffener kullanımı.',
          author: 'Burak Şahin',
          authorRole: 'Flex PCB Uzmanı',
          date: '20 Ekim 2024',
          category: 'education',
          readTime: 14,
          featured: false,
          image: '/blog/flex-pcb.jpg',
          tags: ['Flex PCB', 'Tasarım', 'Üretim']
        },
        {
          id: 10,
          title: 'Lehimsiz Montaj: Press-Fit Konnektörler',
          excerpt: 'Lehimsiz bağlantı teknolojileri, otomotiv ve endüstriyel uygulamalardaki avantajları.',
          author: 'Emre Koç',
          authorRole: 'Montaj Mühendisi',
          date: '15 Ekim 2024',
          category: 'technical',
          readTime: 6,
          featured: false,
          image: '/blog/press-fit.jpg',
          tags: ['Press-Fit', 'Konnektör', 'Montaj']
        },
        {
          id: 11,
          title: 'Termal Yönetim: PCB Isı Dağılımı Optimizasyonu',
          excerpt: 'Thermal via, bakır dolgu ve heatsink entegrasyonu. Simülasyon araçları ve pratik çözümler.',
          author: 'Selin Acar',
          authorRole: 'Termal Analiz Uzmanı',
          date: '10 Ekim 2024',
          category: 'technical',
          readTime: 10,
          featured: false,
          image: '/blog/thermal.jpg',
          tags: ['Termal', 'Isı Yönetimi', 'Optimizasyon']
        },
        {
          id: 12,
          title: 'ESD Korumalı Üretim Ortamı Nasıl Oluşturulur?',
          excerpt: 'Elektrostatik deşarj kontrolü, EPA bölgeleri ve operatör eğitimi. ANSI/ESD S20.20 standardı.',
          author: 'Hakan Demir',
          authorRole: 'ESD Koordinatörü',
          date: '5 Ekim 2024',
          category: 'education',
          readTime: 7,
          featured: false,
          image: '/blog/esd.jpg',
          tags: ['ESD', 'Statik', 'Üretim Ortamı']
        }
      ]
    },
    en: {
      hero: {
        badge: 'BLOG & NEWS',
        title: 'Latest Insights from',
        titleHighlight: 'Technology World',
        subtitle: 'Expert articles on PCB technologies, industrial IoT, electronic design and manufacturing'
      },
      search: 'Search articles...',
      categories: [
        { id: 'all', name: 'All' },
        { id: 'technical', name: 'Technical' },
        { id: 'education', name: 'Education' },
        { id: 'industry', name: 'Industry' },
        { id: 'innovation', name: 'Innovation' },
        { id: 'guide', name: 'Guide' }
      ],
      featured: 'Featured',
      readMore: 'Read More',
      readTime: 'min read',
      posts: [
        {
          id: 1,
          title: 'AI-Powered DFM Analysis: Reduce Manufacturing Errors by 80%',
          excerpt: 'AI-powered design verification systems are revolutionizing PCB manufacturing. Upload your Gerber files, detect potential issues in seconds.',
          author: 'Dr. Ahmet Yildirim',
          authorRole: 'CTO',
          date: 'November 25, 2024',
          category: 'innovation',
          readTime: 8,
          featured: true,
          image: '/blog/ai-dfm.jpg',
          tags: ['AI', 'DFM', 'Quality Control']
        },
        {
          id: 2,
          title: 'DFM Principles in PCB Design: Comprehensive Guide',
          excerpt: 'Design for manufacturability (DFM) principles directly impact cost and quality. Minimum trace width, via sizes and panel optimization.',
          author: 'Mehmet Kaya',
          authorRole: 'Senior PCB Engineer',
          date: 'November 20, 2024',
          category: 'technical',
          readTime: 12,
          featured: true,
          image: '/blog/dfm-guide.jpg',
          tags: ['DFM', 'PCB Design', 'Best Practices']
        },
        {
          id: 3,
          title: 'Impedance Controlled PCB: High-Speed Signal Integrity',
          excerpt: 'Importance of impedance control for high-speed protocols like DDR4, USB 3.0, PCIe. Stackup design and material selection.',
          author: 'Ayse Demir',
          authorRole: 'RF/SI Engineer',
          date: 'November 15, 2024',
          category: 'technical',
          readTime: 10,
          featured: false,
          image: '/blog/impedance.jpg',
          tags: ['Impedance', 'Signal Integrity', 'High-Speed']
        },
        {
          id: 4,
          title: 'SMT vs THT: When to Use Which Technology?',
          excerpt: 'Comparison of surface mount and through-hole technologies. Cost, reliability and application areas.',
          author: 'Can Ozturk',
          authorRole: 'Production Manager',
          date: 'November 10, 2024',
          category: 'education',
          readTime: 7,
          featured: false,
          image: '/blog/smt-tht.jpg',
          tags: ['SMT', 'THT', 'Assembly']
        },
        {
          id: 5,
          title: 'HDI PCB Design Guide: Microvia and Blind Via',
          excerpt: 'Tips for high-density interconnect PCB design. Layer stackup, microvia placement and HDI advantages.',
          author: 'Zeynep Arslan',
          authorRole: 'PCB Design Lead',
          date: 'November 5, 2024',
          category: 'guide',
          readTime: 15,
          featured: false,
          image: '/blog/hdi-pcb.jpg',
          tags: ['HDI', 'Microvia', 'Design']
        },
        {
          id: 6,
          title: 'Industrial IoT Trends 2025: Turkey Perspective',
          excerpt: 'Smart factories, predictive maintenance and edge computing. Digital transformation roadmap for Turkish industry.',
          author: 'Ali Yilmaz',
          authorRole: 'IoT Solutions Director',
          date: 'November 1, 2024',
          category: 'industry',
          readTime: 9,
          featured: false,
          image: '/blog/iot-trends.jpg',
          tags: ['IoT', 'Industry 4.0', 'Digital Transformation']
        },
        {
          id: 7,
          title: 'BGA Rework: Professional Repair Techniques',
          excerpt: 'Safe removal and remounting of Ball Grid Array components. Reflow profiles and X-ray verification.',
          author: 'Osman Yilmaz',
          authorRole: 'Rework Specialist',
          date: 'October 28, 2024',
          category: 'technical',
          readTime: 11,
          featured: false,
          image: '/blog/bga-rework.jpg',
          tags: ['BGA', 'Rework', 'Repair']
        },
        {
          id: 8,
          title: 'Conformal Coating Selection Guide',
          excerpt: 'Acrylic, silicone, polyurethane and epoxy coatings. Application methods and performance comparison.',
          author: 'Fatma Celik',
          authorRole: 'Quality Engineer',
          date: 'October 25, 2024',
          category: 'guide',
          readTime: 8,
          featured: false,
          image: '/blog/conformal.jpg',
          tags: ['Conformal Coating', 'Protection', 'Quality']
        },
        {
          id: 9,
          title: 'Flex PCB Design and Manufacturing: A to Z',
          excerpt: 'Material selection for flexible printed circuit boards, bend radius calculation and stiffener usage.',
          author: 'Burak Sahin',
          authorRole: 'Flex PCB Specialist',
          date: 'October 20, 2024',
          category: 'education',
          readTime: 14,
          featured: false,
          image: '/blog/flex-pcb.jpg',
          tags: ['Flex PCB', 'Design', 'Manufacturing']
        },
        {
          id: 10,
          title: 'Solderless Assembly: Press-Fit Connectors',
          excerpt: 'Solderless connection technologies, advantages in automotive and industrial applications.',
          author: 'Emre Koc',
          authorRole: 'Assembly Engineer',
          date: 'October 15, 2024',
          category: 'technical',
          readTime: 6,
          featured: false,
          image: '/blog/press-fit.jpg',
          tags: ['Press-Fit', 'Connector', 'Assembly']
        },
        {
          id: 11,
          title: 'Thermal Management: PCB Heat Dissipation Optimization',
          excerpt: 'Thermal vias, copper fill and heatsink integration. Simulation tools and practical solutions.',
          author: 'Selin Acar',
          authorRole: 'Thermal Analysis Expert',
          date: 'October 10, 2024',
          category: 'technical',
          readTime: 10,
          featured: false,
          image: '/blog/thermal.jpg',
          tags: ['Thermal', 'Heat Management', 'Optimization']
        },
        {
          id: 12,
          title: 'How to Create an ESD Protected Production Environment?',
          excerpt: 'Electrostatic discharge control, EPA zones and operator training. ANSI/ESD S20.20 standard.',
          author: 'Hakan Demir',
          authorRole: 'ESD Coordinator',
          date: 'October 5, 2024',
          category: 'education',
          readTime: 7,
          featured: false,
          image: '/blog/esd.jpg',
          tags: ['ESD', 'Static', 'Production Environment']
        }
      ]
    }
  };

  const t = content[lang] || content.tr;

  const filteredPosts = t.posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = t.posts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const categoryColors = {
    technical: 'bg-blue-100 text-blue-700',
    education: 'bg-green-100 text-green-700',
    industry: 'bg-purple-100 text-purple-700',
    innovation: 'bg-orange-100 text-orange-700',
    guide: 'bg-cyan-100 text-cyan-700'
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              {t.hero.badge}
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-2">
              {t.hero.title}
            </h1>
            <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
              {t.hero.titleHighlight}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 sticky top-0 z-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {t.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {activeCategory === 'all' && searchQuery === '' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-[#0A0E27]">{t.featured}</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
                        {t.categories.find(c => c.id === post.category)?.name}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {post.readTime} {t.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{post.author}</div>
                          <div className="text-gray-400 text-sm">{post.date}</div>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-blue-400 hover:text-white hover:bg-white/10">
                        {t.readMore}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {(activeCategory === 'all' && searchQuery === '' ? regularPosts : filteredPosts).map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-500"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                        {t.categories.find(c => c.id === post.category)?.name}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock className="w-3 h-3" />
                        {post.readTime} {t.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0A0E27] mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.date}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {lang === 'tr' ? 'Aramanızla eşleşen makale bulunamadı.' : 'No articles found matching your search.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {lang === 'tr' ? 'Yeni Makaleleri Kaçırmayın' : "Don't Miss New Articles"}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {lang === 'tr'
                ? 'Haftalık bültenimize abone olun, en son teknoloji trendlerinden haberdar olun.'
                : 'Subscribe to our weekly newsletter and stay updated with the latest tech trends.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder={lang === 'tr' ? 'E-posta adresiniz' : 'Your email address'}
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white/50 outline-none"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold">
                {lang === 'tr' ? 'Abone Ol' : 'Subscribe'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
