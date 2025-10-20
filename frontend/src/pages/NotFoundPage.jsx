import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

const NotFoundPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      title: 'Sayfa Bulunamadı',
      subtitle: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir',
      home: 'Ana Sayfaya Dön',
      back: 'Geri Git',
      search: 'Ürünleri Ara'
    },
    en: {
      title: 'Page Not Found',
      subtitle: 'The page you are looking for does not exist or may have been moved',
      home: 'Go to Homepage',
      back: 'Go Back',
      search: 'Search Products'
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1554F6] to-[#8B5CF6]">
            404
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {t.subtitle}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] hover:from-[#0E3CC7] hover:to-[#0284C7] text-white px-8 py-6 rounded-xl"
          >
            <Link to={`/${lang}`}>
              <Home className="mr-2" size={20} />
              {t.home}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-[#1554F6] text-[#1554F6] hover:bg-[#1554F6] hover:text-white px-8 py-6 rounded-xl"
          >
            <Link to={`/${lang}/products`}>
              <Search className="mr-2" size={20} />
              {t.search}
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 opacity-5 rounded-full blur-3xl" />
    </div>
  );
};

export default NotFoundPage;