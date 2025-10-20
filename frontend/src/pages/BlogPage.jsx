import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const BlogPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      title: 'Blog & Haberler',
      subtitle: 'PCB teknolojileri, sektör haberleri ve teknik makaleler',
      posts: [
        {
          title: 'PCB Tasarımında DFM İlkeleri',
          excerpt: 'Üretilebilirlik için tasarım (DFM) prensipleri ve en iyi uygulamalar...',
          author: 'Ahmet Yıldırım',
          date: '15 Ekim 2024',
          category: 'Teknik'
        },
        {
          title: 'İmpedans Kontrollü PCB Nedir?',
          excerpt: 'Yüksek hızlı sinyaller için impedans kontrolünün önemi...',
          author: 'Mehmet Kaya',
          date: '10 Ekim 2024',
          category: 'Eğitim'
        },
        {
          title: 'SMT vs THT: Hangisi Daha Uygun?',
          excerpt: 'Yüzey montaj ve delikli montaj teknolojilerinin karşılaştırması...',
          author: 'Ayşe Demir',
          date: '5 Ekim 2024',
          category: 'Tavsiye'
        },
        {
          title: 'HDI PCB Tasarım Rehberi',
          excerpt: 'Yüksek yoğunluklu interconnect PCB tasarımı için ipucu..',
          author: 'Can Öztürk',
          date: '1 Ekim 2024',
          category: 'Teknik'
        }
      ]
    },
    en: {
      title: 'Blog & News',
      subtitle: 'PCB technologies, industry news and technical articles',
      posts: [
        {
          title: 'DFM Principles in PCB Design',
          excerpt: 'Design for manufacturability (DFM) principles and best practices...',
          author: 'John Smith',
          date: 'October 15, 2024',
          category: 'Technical'
        },
        {
          title: 'What is Impedance Controlled PCB?',
          excerpt: 'Importance of impedance control for high-speed signals...',
          author: 'Michael Brown',
          date: 'October 10, 2024',
          category: 'Education'
        },
        {
          title: 'SMT vs THT: Which is Better?',
          excerpt: 'Comparison of surface mount and through-hole technologies...',
          author: 'Sarah Wilson',
          date: 'October 5, 2024',
          category: 'Guide'
        },
        {
          title: 'HDI PCB Design Guide',
          excerpt: 'Tips for high-density interconnect PCB design...',
          author: 'David Lee',
          date: 'October 1, 2024',
          category: 'Technical'
        }
      ]
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#1554F6] to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl opacity-90">{t.subtitle}</p>
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.posts.map((post, idx) => (
              <article key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#1554F6] transition-colors">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-[#1554F6] text-white rounded">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#1554F6]">
                    {lang === 'tr' ? 'Devamını Oku' : 'Read More'}
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
