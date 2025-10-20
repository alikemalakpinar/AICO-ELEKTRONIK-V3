import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const ContactPage = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const content = {
    tr: {
      hero: {
        badge: 'İLETİŞİM',
        title: 'Bizimle İletişime Geçin',
        subtitle: 'Sorularınızı yanıtlamak ve projelerinizde yardımcı olmak için buradayız'
      },
      form: {
        title: 'Mesaj Gönderin',
        name: 'Ad Soyad',
        email: 'E-posta',
        phone: 'Telefon',
        company: 'Şirket',
        message: 'Mesajınız',
        send: 'Gönder',
        success: 'Mesajınız başarıyla gönderildi!'
      },
      info: {
        title: 'İletişim Bilgileri',
        address: 'Ankara Teknokent, 06800 Çankaya, Ankara',
        phone: '+90 312 XXX XX XX',
        email: 'info@aico.com.tr',
        hours: 'Pazartesi - Cuma: 09:00 - 18:00'
      }
    },
    en: {
      hero: {
        badge: 'CONTACT',
        title: 'Get In Touch',
        subtitle: 'We\'re here to answer your questions and help with your projects'
      },
      form: {
        title: 'Send Message',
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        message: 'Your Message',
        send: 'Send',
        success: 'Your message has been sent successfully!'
      },
      info: {
        title: 'Contact Information',
        address: 'Ankara Teknokent, 06800 Cankaya, Ankara',
        phone: '+90 312 XXX XX XX',
        email: 'info@aico.com.tr',
        hours: 'Monday - Friday: 09:00 - 18:00'
      }
    }
  };

  const t = content[lang] || content.tr;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast.success(t.form.success);
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
            {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0A0E27] mb-6">{t.hero.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg">
              <h2 className="text-3xl font-bold text-[#0A0E27] mb-8">{t.form.title}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.name} *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.email} *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.phone}</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.company}</label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.message} *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-gray-300"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:from-[#0E3CC7] hover:to-[#0284C7] text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="mr-2" size={20} />
                  {t.form.send}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border-2 border-blue-100">
                <h2 className="text-3xl font-bold text-[#0A0E27] mb-8">{t.info.title}</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1554F6] to-[#0EA5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A0E27] mb-1">{lang === 'tr' ? 'Adres' : 'Address'}</h3>
                      <p className="text-gray-600">{t.info.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#0EA5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A0E27] mb-1">{lang === 'tr' ? 'Telefon' : 'Phone'}</h3>
                      <p className="text-gray-600">{t.info.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A0E27] mb-1">{lang === 'tr' ? 'E-posta' : 'Email'}</h3>
                      <p className="text-gray-600">{t.info.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A0E27] mb-1">{lang === 'tr' ? 'Çalışma Saatleri' : 'Working Hours'}</h3>
                      <p className="text-gray-600">{t.info.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-3xl h-64 flex items-center justify-center border-2 border-gray-300">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 text-gray-400" size={48} />
                  <p className="text-gray-500 font-medium">{lang === 'tr' ? 'Harita Yazılım entegrasyonu' : 'Map Integration'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;