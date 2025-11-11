import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Flame, Snowflake, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection';
import GlassCard from '../GlassCard';

const IoTProducts = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      badge: 'IoT ÇÖZÜMLER',
      title: 'Endüstriyel IoT Sistemleri',
      subtitle: 'Akıllı sensörler ve yapay zeka ile işletmenizi optimize edin',
      products: [
        {
          icon: Coffee,
          title: 'Kahve Makinası Sistemleri',
          description: 'Sayaç kartları, ses ve titreşim analizi ile makina sağlığı izleme',
          features: ['Sayaç Kartı', 'Titreşim Analizi', 'Ses Analizi', 'Önleyici Bakım'],
          link: '/tr/coffee-machine-systems',
          gradient: 'from-orange-500 to-amber-600',
          bgGradient: 'from-orange-50 to-amber-50'
        },
        {
          icon: Flame,
          title: 'Yangın Tespit Sistemleri',
          description: 'AI kamera ile yangın erken tespit ve otomatik uyarı sistemi',
          features: ['AI Kamera', 'Erken Uyarı', '7/24 İzleme', 'Hızlı Müdahale'],
          link: '/tr/fire-detection',
          gradient: 'from-red-500 to-orange-600',
          bgGradient: 'from-red-50 to-orange-50'
        },
        {
          icon: Snowflake,
          title: 'Soğuk Hava Deposu',
          description: 'Sıcaklık, nem ve enerji yönetimi için akıllı kontrol sistemleri',
          features: ['Sıcaklık Kontrol', 'Nem İzleme', 'IoT Bağlantı', 'Enerji Tasarrufu'],
          link: '/tr/cold-storage',
          gradient: 'from-cyan-500 to-blue-600',
          bgGradient: 'from-cyan-50 to-blue-50'
        }
      ]
    },
    en: {
      badge: 'IoT SOLUTIONS',
      title: 'Industrial IoT Systems',
      subtitle: 'Optimize your business with smart sensors and artificial intelligence',
      products: [
        {
          icon: Coffee,
          title: 'Coffee Machine Systems',
          description: 'Counter cards, sound and vibration analysis for machine health monitoring',
          features: ['Counter Card', 'Vibration Analysis', 'Sound Analysis', 'Preventive Maintenance'],
          link: '/en/coffee-machine-systems',
          gradient: 'from-orange-500 to-amber-600',
          bgGradient: 'from-orange-50 to-amber-50'
        },
        {
          icon: Flame,
          title: 'Fire Detection Systems',
          description: 'AI camera for early fire detection and automatic alert system',
          features: ['AI Camera', 'Early Warning', '24/7 Monitoring', 'Fast Response'],
          link: '/en/fire-detection',
          gradient: 'from-red-500 to-orange-600',
          bgGradient: 'from-red-50 to-orange-50'
        },
        {
          icon: Snowflake,
          title: 'Cold Storage',
          description: 'Smart control systems for temperature, humidity and energy management',
          features: ['Temperature Control', 'Humidity Monitor', 'IoT Connection', 'Energy Savings'],
          link: '/en/cold-storage',
          gradient: 'from-cyan-500 to-blue-600',
          bgGradient: 'from-cyan-50 to-blue-50'
        }
      ]
    }
  };

  const t = content[lang] || content.tr;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <AnimatedSection animation="fadeInDown">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 text-purple-700 text-sm font-semibold mb-4">
              <Activity className="w-4 h-4 mr-2" />
              {t.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <AnimatedSection key={idx} animation="fadeInUp" delay={idx * 0.2}>
                <Link to={product.link}>
                  <GlassCard className="p-0 h-full group overflow-hidden" hover glow>
                    {/* Gradient Header */}
                    <div className={`bg-gradient-to-br ${product.gradient} p-6 text-white`}>
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {product.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                        <span>Detaylı Bilgi</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IoTProducts;
