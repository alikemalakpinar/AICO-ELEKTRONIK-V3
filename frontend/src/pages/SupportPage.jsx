import React, { useState } from 'react';
import { Download, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';

const SupportPage = ({ lang }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const docs = [
    { name: lang === 'tr' ? 'DFM Kontrol Listesi' : 'DFM Checklist', size: '1.2 MB' },
    { name: lang === 'tr' ? 'Panelizasyon Rehberi' : 'Panelization Guide', size: '2.5 MB' },
    { name: lang === 'tr' ? 'Stencil Yönergesi' : 'Stencil Guidelines', size: '1.8 MB' },
    { name: 'NDA ' + (lang === 'tr' ? 'Şablonu' : 'Template'), size: '0.5 MB' }
  ];

  const faqs = [
    {
      q: lang === 'tr' ? 'ENIG mi HASL mi seçmeliyim?' : 'Should I choose ENIG or HASL?',
      a: lang === 'tr' ? 'ENIG düz yüzey ve daha iyi lehimlenebilirlik sağlar, hassas komponentler için idealdir. HASL daha ekonomiktir.' : 'ENIG provides flat surface and better solderability, ideal for fine pitch components. HASL is more economical.'
    },
    {
      q: lang === 'tr' ? 'Panel V-cut mu tab-route mu?' : 'Panel V-cut or tab-route?',
      a: lang === 'tr' ? 'V-cut düz kenarlarda, tab-route kompleks şekillerde kullanılır.' : 'V-cut for straight edges, tab-route for complex shapes.'
    },
    {
      q: lang === 'tr' ? 'Minimum sipariş adedi nedir?' : 'What is the minimum order quantity?',
      a: lang === 'tr' ? 'PCB için 5 adet, dizgi için 10 adet minimumla başlıyoruz.' : 'We start from 5 pcs for PCB, 10 pcs for assembly.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="mx-auto mb-6 text-[#1554F6]" size={64} />
          <h1 className="text-5xl font-bold text-[#0A0E27] mb-4">{lang === 'tr' ? 'Belgeler & SSS' : 'Documents & FAQ'}</h1>
          <p className="text-xl text-gray-600">{lang === 'tr' ? 'Teknik dokümanlar ve sık sorulan sorular' : 'Technical documents and frequently asked questions'}</p>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A0E27] mb-8">{lang === 'tr' ? 'İndirilebilir Dokümanlar' : 'Downloadable Documents'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {docs.map((doc, idx) => (
              <button key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#1554F6] hover:shadow-lg transition-all duration-300 text-left">
                <Download className="mb-4 text-[#1554F6]" size={32} />
                <div className="font-semibold text-[#0A0E27] mb-1">{doc.name}</div>
                <div className="text-sm text-gray-500">{doc.size}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A0E27] mb-8 text-center">{lang === 'tr' ? 'Sık Sorulan Sorular' : 'Frequently Asked Questions'}</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-[#0A0E27]">{faq.q}</span>
                  {openFAQ === idx ? <ChevronUp className="text-[#1554F6]" /> : <ChevronDown className="text-gray-400" />}
                </button>
                {openFAQ === idx && (
                  <div className="px-6 pb-6 text-gray-700">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;