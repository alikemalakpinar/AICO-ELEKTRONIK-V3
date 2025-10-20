import React from 'react';
import { FileText } from 'lucide-react';

const TermsPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      title: 'Kullanım Koşulları',
      updated: 'Son Güncelleme: Ekim 2024',
      sections: [
        {
          title: 'Genel Koşullar',
          content: 'Bu web sitesini kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız.'
        },
        {
          title: 'Hizmet Koşulları',
          content: 'Tüm teklifler 30 gün geçerlidir. Fiyatlar KDV hariçtir. Üretim süreleri iş günü bazlıdır.'
        },
        {
          title: 'Ödeme Koşulları',
          content: 'Ödemeler havale/EFT veya kredi kartı ile yapılabilir. İlk siparişlerde %100 peşin ödeme gereklidir.'
        },
        {
          title: 'İade & İptal',
          content: 'Üretim başladıktan sonra iptal kabul edilmez. Hatalı üretim durumunda ücretsiz yeniden üretim yapılır.'
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      updated: 'Last Updated: October 2024',
      sections: [
        {
          title: 'General Terms',
          content: 'By using this website, you agree to the following terms and conditions.'
        },
        {
          title: 'Service Terms',
          content: 'All quotes are valid for 30 days. Prices exclude VAT. Production times are business days.'
        },
        {
          title: 'Payment Terms',
          content: 'Payments can be made via bank transfer or credit card. 100% prepayment required for first orders.'
        },
        {
          title: 'Return & Cancellation',
          content: 'Cancellation not accepted after production starts. Free remake for manufacturing errors.'
        }
      ]
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-[#1554F6]" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">{t.title}</h1>
          </div>
          <p className="text-sm text-gray-500">{t.updated}</p>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {t.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
