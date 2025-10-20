import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTranslation } from '../../utils/i18n';
import { Mail, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const Newsletter = ({ lang }) => {
  const t = useTranslation(lang);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Mock subscription
      toast.success(lang === 'tr' ? 'Başarıyla kaydoldunuz!' : 'Successfully subscribed!');
      setEmail('');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1554F6] via-[#0EA5E9] to-[#8B5CF6]">
        {/* Animated Overlay Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
        </div>
        
        {/* Animated Shapes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <Mail className="text-white" size={36} />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="text-[#1554F6]" size={16} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t.newsletter.title}
        </h2>
        <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
          {t.newsletter.subtitle}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 backdrop-blur-sm bg-white bg-opacity-10 p-2 rounded-2xl border border-white border-opacity-20">
            <Input
              type="email"
              placeholder={t.newsletter.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-0 rounded-xl px-6 py-6 text-base text-gray-900 placeholder:text-gray-500"
              required
            />
            <Button
              type="submit"
              className="bg-white hover:bg-gray-100 text-[#1554F6] px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Send className="mr-2" size={20} />
              {t.newsletter.button}
            </Button>
          </div>
        </form>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white text-opacity-80">
          <div className="flex items-center space-x-2">
            <Sparkles size={16} />
            <span>{lang === 'tr' ? 'Spam yok' : 'No spam'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles size={16} />
            <span>{lang === 'tr' ? 'Dilediğinizde vazgeçin' : 'Unsubscribe anytime'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles size={16} />
            <span>{lang === 'tr' ? '10.000+ abone' : '10,000+ subscribers'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
