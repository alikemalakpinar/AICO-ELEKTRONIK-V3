import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = ({ lang }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const content = {
    tr: {
      title: 'Müşterilerimiz Ne Diyor?',
      subtitle: 'Yüzlerce mutlu müşteriden bazı yorumlar',
      testimonials: [
        {
          name: 'Mehmet Yılmaz',
          company: 'XYZ Teknoloji AŞ',
          role: 'Elektronik Tasarım Müdürü',
          text: 'Aico ile çalışmak inanılmaz verimli. 24 saat içinde PCB prototipimi aldım ve kalite mükemmeldi. İmpedans kontrollü kartlarımız için vazgeçilmez partnerimiz.',
          rating: 5,
          project: 'RF Anten Kontrol Kartı'
        },
        {
          name: 'Ayşe Kaya',
          company: 'SmartMed Elektronik',
          role: 'Ürün Geliştirme Lideri',
          text: 'Medikal cihazımız için çok katmanlı HDI PCB ürettik. DFM kontrolleri sayesinde sorunsuz geçti. Dizgi kalitesi ve AOI raporları tam profesyonel.',
          rating: 5,
          project: 'Medikal Monitör 8L HDI'
        },
        {
          name: 'Can Demir',
          company: 'IoT Solutions Ltd',
          role: 'CTO',
          text: 'Anında teklif sistemi gerçekten işe yarıyor. Gerber yüklüyorsun, 30 saniyede fiyat ve termin alıyorsun. Artık başka yerde PCB ürettirmiyoruz.',
          rating: 5,
          project: '1000 adet IoT Gateway'
        },
        {
          name: 'Zeynep Arslan',
          company: 'PowerGrid Enerji',
          role: 'Baş Mühendis',
          text: 'Yüksek akım taşıyan 2oz bakırlı kartlarımız için Aico\'yu seçtik. Termal yönetim ve kalite kontrol süreçleri çok sağlam. Kesinlikle tavsiye ederim.',
          rating: 5,
          project: 'Güç Dağıtım Kontrol Ünitesi'
        }
      ]
    },
    en: {
      title: 'What Our Customers Say?',
      subtitle: 'Some reviews from hundreds of happy customers',
      testimonials: [
        {
          name: 'John Smith',
          company: 'XYZ Technology Inc',
          role: 'Electronic Design Manager',
          text: 'Working with Aico is incredibly efficient. I received my PCB prototype within 24 hours and the quality was excellent. Indispensable partner for our impedance-controlled boards.',
          rating: 5,
          project: 'RF Antenna Control Board'
        },
        {
          name: 'Jane Doe',
          company: 'SmartMed Electronics',
          role: 'Product Development Lead',
          text: 'We produced multi-layer HDI PCBs for our medical device. Thanks to DFM checks, it passed smoothly. Assembly quality and AOI reports are truly professional.',
          rating: 5,
          project: 'Medical Monitor 8L HDI'
        },
        {
          name: 'Michael Brown',
          company: 'IoT Solutions Ltd',
          role: 'CTO',
          text: 'The instant quote system really works. Upload Gerber, get price and lead time in 30 seconds. We no longer manufacture PCBs elsewhere.',
          rating: 5,
          project: '1000 pcs IoT Gateway'
        },
        {
          name: 'Sarah Wilson',
          company: 'PowerGrid Energy',
          role: 'Chief Engineer',
          text: 'We chose Aico for our 2oz copper boards carrying high current. Thermal management and quality control processes are very solid. Definitely recommend.',
          rating: 5,
          project: 'Power Distribution Control Unit'
        }
      ]
    }
  };

  const t = content[lang] || content.tr;
  const testimonials = t.testimonials;

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 lg:py-20 bg-[#1554F6] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4">{t.title}</h2>
          <p className="text-lg lg:text-xl opacity-90\">{t.subtitle}</p>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-12 border border-white/20 shadow-xl">
            <Quote className="text-white/30 mb-6" size={48} />
            
            <div className="mb-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, idx) => (
                  <Star key={idx} className="text-yellow-400 fill-yellow-400" size={20} />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl leading-relaxed mb-6">
                "{testimonials[activeIndex].text}"
              </p>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="font-bold text-lg">{testimonials[activeIndex].name}</div>
                  <div className="text-sm opacity-80">{testimonials[activeIndex].role}</div>
                  <div className="text-sm opacity-70">{testimonials[activeIndex].company}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-70">{lang === 'tr' ? 'Proje' : 'Project'}:</div>
                  <div className="font-semibold">{testimonials[activeIndex].project}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeIndex ? 'bg-white w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
