import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle, Calendar,
  Building, Headphones, Wrench, FileText, ChevronRight, ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import GlassCard from '../components/GlassCard';

const ContactPage = ({ lang = 'tr' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    department: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const content = {
    tr: {
      pageTitle: 'İletişim | Aico Elektronik',
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
        department: 'Departman',
        message: 'Mesajınız',
        send: 'Gönder',
        sending: 'Gönderiliyor...',
        success: 'Mesajınız başarıyla gönderildi!',
        successDesc: 'En kısa sürede size dönüş yapacağız.'
      },
      departments: [
        { id: 'sales', name: 'Satış & Fiyat Teklifi', icon: FileText },
        { id: 'support', name: 'Teknik Destek', icon: Headphones },
        { id: 'engineering', name: 'Mühendislik Danışmanlığı', icon: Wrench },
        { id: 'general', name: 'Genel Bilgi', icon: Building }
      ],
      info: {
        title: 'İletişim Bilgileri',
        address: 'ODTÜ Teknokent, Çankaya, 06800 Ankara',
        phone: '+90 312 555 0000',
        email: 'info@aicoelektronik.com',
        hours: 'Pazartesi - Cuma: 09:00 - 18:00'
      },
      meeting: {
        title: 'Toplantı Ayarlayın',
        subtitle: 'Büyük projeleriniz için mühendisimizle birebir görüşme yapın',
        button: '15dk Toplantı Ayarla',
        note: 'Ücretsiz danışmanlık'
      },
      map: {
        title: 'Bizi Ziyaret Edin'
      }
    },
    en: {
      pageTitle: 'Contact | Aico Electronics',
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
        department: 'Department',
        message: 'Your Message',
        send: 'Send',
        sending: 'Sending...',
        success: 'Your message has been sent successfully!',
        successDesc: 'We\'ll get back to you as soon as possible.'
      },
      departments: [
        { id: 'sales', name: 'Sales & Quotation', icon: FileText },
        { id: 'support', name: 'Technical Support', icon: Headphones },
        { id: 'engineering', name: 'Engineering Consultation', icon: Wrench },
        { id: 'general', name: 'General Inquiry', icon: Building }
      ],
      info: {
        title: 'Contact Information',
        address: 'METU Technopolis, Cankaya, 06800 Ankara',
        phone: '+90 312 555 0000',
        email: 'info@aicoelektronik.com',
        hours: 'Monday - Friday: 09:00 - 18:00'
      },
      meeting: {
        title: 'Schedule a Meeting',
        subtitle: 'Have a one-on-one meeting with our engineer for large projects',
        button: 'Schedule 15min Meeting',
        note: 'Free consultation'
      },
      map: {
        title: 'Visit Us'
      }
    }
  };

  const t = content[lang] || content.tr;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    toast.success(t.form.success);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectDepartment = (deptId) => {
    setFormData({ ...formData, department: deptId });
  };

  // Structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Aico Elektronik",
    "image": "https://www.aicoelektronik.com/assets/logos/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ODTÜ Teknokent",
      "addressLocality": "Çankaya",
      "addressRegion": "Ankara",
      "postalCode": "06800",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.8908,
      "longitude": 32.7826
    },
    "telephone": "+90-312-555-0000",
    "email": "info@aicoelektronik.com",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <meta name="description" content="Aico Elektronik ile iletişime geçin. PCB üretim, IoT çözümleri ve teknik destek için bize ulaşın." />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />

          <motion.div
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t.hero.badge}
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{t.hero.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.hero.subtitle}</p>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="py-20 -mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Form - Wider */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="p-8" gradient="blue">
                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.form.title}</h2>

                        {/* Department Selector */}
                        <div className="mb-8">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            {t.form.department}
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {t.departments.map((dept) => {
                              const Icon = dept.icon;
                              const isSelected = formData.department === dept.id;
                              return (
                                <motion.button
                                  key={dept.id}
                                  type="button"
                                  onClick={() => selectDepartment(dept.id)}
                                  className={`
                                    p-4 rounded-xl border-2 text-center transition-all
                                    ${isSelected
                                      ? 'border-blue-500 bg-blue-50 shadow-md'
                                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                                  `}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Icon
                                    className={`mx-auto mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}
                                    size={24}
                                  />
                                  <span className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                                    {dept.name}
                                  </span>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.name} *</label>
                              <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                                className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.phone}</label>
                              <Input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.company}</label>
                              <Input
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.message} *</label>
                            <Textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows={5}
                              className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                            >
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                  {t.form.sending}
                                </div>
                              ) : (
                                <>
                                  <Send className="mr-2" size={20} />
                                  {t.form.send}
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          <CheckCircle className="w-10 h-10 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.form.success}</h3>
                        <p className="text-gray-600 mb-8">{t.form.successDesc}</p>
                        <Button
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({ name: '', email: '', phone: '', company: '', department: '', message: '' });
                          }}
                          variant="outline"
                        >
                          {lang === 'tr' ? 'Yeni Mesaj Gönder' : 'Send Another Message'}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>

              {/* Right Sidebar */}
              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Contact Info Card */}
                <GlassCard className="p-6" gradient="blue">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{t.info.title}</h3>
                  <div className="space-y-5">
                    <motion.a
                      href={`https://maps.google.com/?q=${encodeURIComponent(t.info.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {lang === 'tr' ? 'Adres' : 'Address'}
                        </h4>
                        <p className="text-gray-600 text-sm">{t.info.address}</p>
                      </div>
                    </motion.a>

                    <motion.a
                      href={`tel:${t.info.phone.replace(/\s/g, '')}`}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {lang === 'tr' ? 'Telefon' : 'Phone'}
                        </h4>
                        <p className="text-gray-600">{t.info.phone}</p>
                      </div>
                    </motion.a>

                    <motion.a
                      href={`mailto:${t.info.email}`}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {lang === 'tr' ? 'E-posta' : 'Email'}
                        </h4>
                        <p className="text-gray-600">{t.info.email}</p>
                      </div>
                    </motion.a>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {lang === 'tr' ? 'Çalışma Saatleri' : 'Working Hours'}
                        </h4>
                        <p className="text-gray-600">{t.info.hours}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Meeting Scheduler Card */}
                <GlassCard className="p-6 bg-gradient-to-br from-blue-600 to-slate-700 border-0" gradient="blue">
                  <div className="text-white">
                    <Calendar className="mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">{t.meeting.title}</h3>
                    <p className="text-blue-100 text-sm mb-4">{t.meeting.subtitle}</p>
                    <motion.button
                      className="w-full bg-white text-blue-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Calendly integration placeholder
                        toast.info(lang === 'tr' ? 'Calendly entegrasyonu yakında!' : 'Calendly integration coming soon!');
                      }}
                    >
                      {t.meeting.button}
                      <ExternalLink size={18} />
                    </motion.button>
                    <p className="text-xs text-blue-200 mt-3 text-center">{t.meeting.note}</p>
                  </div>
                </GlassCard>

                {/* Google Maps */}
                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin size={18} className="text-blue-600" />
                      {t.map.title}
                    </h3>
                  </div>
                  <div className="relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.8844584961644!2d32.78011831534666!3d39.890827579427596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f190a9cea8f%3A0xd6e9c4b5b9e7e3d4!2sODT%C3%9C%20Teknokent!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                      width="100%"
                      height="250"
                      style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Aico Elektronik Location"
                    />
                    {/* Custom overlay for branding */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                      <p className="text-xs font-semibold text-gray-800">Aico Elektronik</p>
                      <p className="text-xs text-gray-600">ODTÜ Teknokent</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
