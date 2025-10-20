import React from 'react';
import { Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const FastPrototypingPage = ({ lang }) => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="mx-auto mb-6 text-[#1554F6]" size={64} />
          <h1 className="text-5xl font-bold text-[#0A0E27] mb-4">{lang === 'tr' ? 'Hızlı Prototipleme' : 'Fast Prototyping'}</h1>
          <p className="text-xl text-gray-600 mb-8">{lang === 'tr' ? '24-48 saat içinde prototip PCB' : '24-48 hour prototype PCB'}</p>
          <Button asChild className="bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] text-white px-8 py-6 text-lg rounded-xl">
            <Link to={`/${lang}/instant-quote`}>{lang === 'tr' ? 'Hızlı Teklif Al' : 'Get Fast Quote'}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FastPrototypingPage;