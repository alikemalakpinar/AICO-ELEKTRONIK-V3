import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTranslation } from '../../utils/i18n';
import { Mail } from 'lucide-react';
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
    <section className="py-16 bg-[#1554F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="text-white" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.newsletter.title}
          </h2>
          <p className="text-lg text-white text-opacity-90">
            {t.newsletter.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={t.newsletter.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white border-0 rounded-xl px-6 py-6 text-base"
            required
          />
          <Button
            type="submit"
            className="bg-[#0E1A2B] hover:bg-[#1a2942] text-white px-8 py-6 rounded-xl transition-colors duration-200"
          >
            {t.newsletter.button}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
