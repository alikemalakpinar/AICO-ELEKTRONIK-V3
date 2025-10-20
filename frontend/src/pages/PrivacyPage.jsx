import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      title: 'Gizlilik Politikası',
      updated: 'Son Güncelleme: Ekim 2024',
      sections: [
        {
          title: 'Veri Toplama',
          content: 'Aico Elektronik olarak, web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda belli kişisel bilgilerinizi topluyoruz. Bu bilgiler ad, e-posta, telefon numarası ve şirket bilgilerini içerebilir.'
        },
        {
          title: 'Veri Kullanımı',
          content: 'Topladığımız veriler sadece hizmet kalitemizi artırmak, teklif hazırlamak ve sizinle iletişim kurmak için kullanılır. Verilerinizi üçüncü şahslarla paylaşmayız.'
        },
        {
          title: 'Veri Güvenliği',
          content: 'Verileriniz en yüksek güvenlik standartlarıyla korunmaktadır. SSL şifreleme ve güvenli sunucular kullanıyoruz.'
        },
        {
          title: 'Haklarınız',
          content: 'KVKK kapsamında verilerinize erişim, düzeltme ve silme hakkına sahipsiniz. info@aicoelektronik.com adresinden başvurabilirsiniz.'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      updated: 'Last Updated: October 2024',
      sections: [
        {
          title: 'Data Collection',
          content: 'As Aico Electronics, we collect certain personal information when you visit our website and use our services. This may include name, email, phone number and company information.'
        },
        {
          title: 'Data Usage',
          content: 'The data we collect is used solely to improve service quality, prepare quotes and communicate with you. We do not share your data with third parties.'
        },
        {
          title: 'Data Security',
          content: 'Your data is protected with the highest security standards. We use SSL encryption and secure servers.'
        },
        {
          title: 'Your Rights',
          content: 'Under GDPR, you have the right to access, correct and delete your data. You can apply via info@aicoelektronik.com.'
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
            <Shield className="text-[#1554F6]" size={32} />
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

export default PrivacyPage;
