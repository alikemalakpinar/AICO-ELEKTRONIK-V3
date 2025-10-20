import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../mock';
import { ChevronRight, Download, FileText, CheckCircle2, Package, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

const ProductDetailPage = ({ lang }) => {
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState('specs');
  
  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#9CA3AF]">{lang === 'tr' ? 'Ürün bulunamadı' : 'Product not found'}</p>
      </div>
    );
  }

  const handleQuoteRequest = () => {
    toast.success(lang === 'tr' ? 'Teklif talebi alındı! Ekibimiz en kısa sürede dönüş yapacaktır.' : 'Quote request received! Our team will get back to you shortly.');
  };

  const handleDownload = (docType) => {
    toast.success(lang === 'tr' ? `${docType} indiriliyor...` : `Downloading ${docType}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-[#374151]">
            <Link to={`/${lang}`} className="hover:text-[#1554F6]">{lang === 'tr' ? 'Ana Sayfa' : 'Home'}</Link>
            <ChevronRight size={16} />
            <Link to={`/${lang}/products`} className="hover:text-[#1554F6]">{lang === 'tr' ? 'Ürünler' : 'Products'}</Link>
            <ChevronRight size={16} />
            <span className="text-[#0E1A2B] font-medium">{product.code}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
            <div className="aspect-square bg-gray-100">
              <img
                src={product.image}
                alt={lang === 'tr' ? product.nameTr : product.nameEn}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="text-sm text-[#1554F6] font-medium mb-2">{product.code}</div>
              <h1 className="text-3xl font-bold text-[#0E1A2B] mb-4">
                {lang === 'tr' ? product.nameTr : product.nameEn}
              </h1>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-[#9CA3AF] mb-1">{lang === 'tr' ? 'Güç' : 'Power'}</div>
                  <div className="text-xl font-bold text-[#0E1A2B]">{product.power}W</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-[#9CA3AF] mb-1">{lang === 'tr' ? 'Gerilim' : 'Voltage'}</div>
                  <div className="text-xl font-bold text-[#0E1A2B]">{product.voltage}V</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-[#9CA3AF] mb-1">{lang === 'tr' ? 'Akım' : 'Current'}</div>
                  <div className="text-xl font-bold text-[#0E1A2B]">{product.current}A</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-[#9CA3AF] mb-1">{lang === 'tr' ? 'Verim' : 'Efficiency'}</div>
                  <div className="text-xl font-bold text-[#0E1A2B]">{product.efficiency}%</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={18} className="text-[#0E9F6E]" />
                  <span className="text-sm text-[#374151]">{lang === 'tr' ? 'Koruma Sınıfı' : 'Protection Rating'}: {product.ip}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={18} className="text-[#0E9F6E]" />
                  <span className="text-sm text-[#374151]">{lang === 'tr' ? 'Sertifikalar' : 'Certifications'}: {product.certifications.join(', ')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package size={18} className="text-[#0E9F6E]" />
                  <span className="text-sm text-[#374151]">{product.stock ? (lang === 'tr' ? 'Stokta mevcut' : 'In stock') : (lang === 'tr' ? 'Stokta yok' : 'Out of stock')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck size={18} className="text-[#0E9F6E]" />
                  <span className="text-sm text-[#374151]">{lang === 'tr' ? '48 saat içinde sevkiyat' : '48-hour shipping'}</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="border-t border-gray-200 pt-6">
                <div className="text-3xl font-bold text-[#0E1A2B] mb-4">
                  {product.price.toLocaleString('tr-TR')} ₺
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleQuoteRequest}
                    className="flex-1 bg-[#1554F6] hover:bg-[#0E3CC7] text-white rounded-xl py-6"
                  >
                    {lang === 'tr' ? 'Teklif Al' : 'Get Quote'}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-[#1554F6] text-[#1554F6] hover:bg-[#1554F6] hover:text-white rounded-xl px-6"
                  >
                    {lang === 'tr' ? 'Teknik Soru' : 'Technical Question'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="specs">{lang === 'tr' ? 'Teknik Özellikler' : 'Technical Specs'}</TabsTrigger>
              <TabsTrigger value="documents">{lang === 'tr' ? 'Belgeler' : 'Documents'}</TabsTrigger>
              <TabsTrigger value="applications">{lang === 'tr' ? 'Uygulamalar' : 'Applications'}</TabsTrigger>
            </TabsList>

            <TabsContent value="specs">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#0E1A2B] mb-4">{lang === 'tr' ? 'Teknik Özellikler' : 'Technical Specifications'}</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 text-[#374151] font-medium">{lang === 'tr' ? 'Güç' : 'Power'}</td>
                      <td className="py-3 text-[#0E1A2B]">{product.power}W</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[#374151] font-medium">{lang === 'tr' ? 'Çıkış Gerilimi' : 'Output Voltage'}</td>
                      <td className="py-3 text-[#0E1A2B]">{product.voltage}V DC</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[#374151] font-medium">{lang === 'tr' ? 'Çıkış Akımı' : 'Output Current'}</td>
                      <td className="py-3 text-[#0E1A2B]">{product.current}A</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[#374151] font-medium">{lang === 'tr' ? 'Verim' : 'Efficiency'}</td>
                      <td className="py-3 text-[#0E1A2B]">{product.efficiency}%</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[#374151] font-medium">{lang === 'tr' ? 'Giriş Gerilimi' : 'Input Voltage'}</td>
                      <td className="py-3 text-[#0E1A2B]">100-240V AC</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[#374151] font-medium">{lang === 'tr' ? 'Koruma Sınıfı' : 'Protection Rating'}</td>
                      <td className="py-3 text-[#0E1A2B]">{product.ip}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[#374151] font-medium">{lang === 'tr' ? 'Çalışma Sıcaklığı' : 'Operating Temperature'}</td>
                      <td className="py-3 text-[#0E1A2B]">-30°C to +70°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-[#0E1A2B] mb-4">{lang === 'tr' ? 'İndirilebilir Belgeler' : 'Downloadable Documents'}</h3>
                {[
                  { name: 'Datasheet', size: '2.4 MB' },
                  { name: lang === 'tr' ? 'Kullanım Kılavuzu' : 'User Manual', size: '5.1 MB' },
                  { name: 'CE ' + (lang === 'tr' ? 'Sertifikası' : 'Certificate'), size: '0.8 MB' },
                  { name: 'CAD ' + (lang === 'tr' ? 'Çizimi' : 'Drawing'), size: '1.2 MB' }
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDownload(doc.name)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="text-[#1554F6]" size={24} />
                      <div className="text-left">
                        <div className="font-medium text-[#0E1A2B]">{doc.name}</div>
                        <div className="text-xs text-[#9CA3AF]">{doc.size}</div>
                      </div>
                    </div>
                    <Download className="text-[#374151]" size={20} />
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#0E1A2B] mb-4">{lang === 'tr' ? 'Tipik Uygulamalar' : 'Typical Applications'}</h3>
                <ul className="space-y-3">
                  {[
                    lang === 'tr' ? 'Endüstriyel otomasyon sistemleri' : 'Industrial automation systems',
                    lang === 'tr' ? 'LED aydınlatma çözümleri' : 'LED lighting solutions',
                    lang === 'tr' ? 'Makine kontrol panelleri' : 'Machine control panels',
                    lang === 'tr' ? 'Güvenlik ve gözetim sistemleri' : 'Security and surveillance systems',
                    lang === 'tr' ? 'Telekom altyapısı' : 'Telecom infrastructure'
                  ].map((app, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 size={20} className="text-[#0E9F6E] mt-0.5 flex-shrink-0" />
                      <span className="text-[#374151]">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
