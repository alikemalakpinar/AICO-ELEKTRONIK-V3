import React, { useState } from 'react';
import { Upload, ArrowRight, ArrowLeft, Check, FileText, Settings, CreditCard, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

const InstantQuotePage = ({ lang }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    files: null,
    layers: '2',
    thickness: '1.6',
    surface: 'ENIG',
    quantity: '10'
  });

  const content = {
    tr: {
      title: 'Anında Teklif',
      subtitle: 'Gerber yükle, seçenekleri seç, fiyat ve termini anında gör',
      steps: [
        { title: 'Dosya Yükleme', desc: 'Gerber/ODB++ & BOM' },
        { title: 'PCB Özellikleri', desc: 'Katman, kalınlık, kaplama' },
        { title: 'Dizgi Seçenekleri', desc: 'SMT/THT, test' },
        { title: 'Fiyat & Termin', desc: 'Özet ve ödeme' }
      ],
      upload: {
        title: 'Dosyalarınızı Yükleyin',
        gerber: 'Gerber/ODB++ (ZIP)',
        bom: 'BOM (CSV/Excel) - Opsiyonel',
        pnp: 'Pick & Place (CSV) - Opsiyonel',
        dragdrop: 'Dosyaları buraya sürükleyin veya tıklayın',
        nda: 'Dosyalarınız NDA kapsamında güvendedir'
      },
      pcb: {
        title: 'PCB Özellikleri',
        layers: 'Katman Sayısı',
        thickness: 'Kalınlık (mm)',
        surface: 'Yüzey Kaplaması',
        color: 'Maske Rengi',
        quantity: 'Adet'
      },
      next: 'İleri',
      back: 'Geri',
      getQuote: 'Teklif Al'
    },
    en: {
      title: 'Instant Quote',
      subtitle: 'Upload Gerber, select options, get instant price & lead time',
      steps: [
        { title: 'File Upload', desc: 'Gerber/ODB++ & BOM' },
        { title: 'PCB Specs', desc: 'Layers, thickness, finish' },
        { title: 'Assembly Options', desc: 'SMT/THT, testing' },
        { title: 'Price & Lead Time', desc: 'Summary & payment' }
      ],
      upload: {
        title: 'Upload Your Files',
        gerber: 'Gerber/ODB++ (ZIP)',
        bom: 'BOM (CSV/Excel) - Optional',
        pnp: 'Pick & Place (CSV) - Optional',
        dragdrop: 'Drag & drop files here or click to browse',
        nda: 'Your files are safe under NDA'
      },
      pcb: {
        title: 'PCB Specifications',
        layers: 'Layers',
        thickness: 'Thickness (mm)',
        surface: 'Surface Finish',
        color: 'Mask Color',
        quantity: 'Quantity'
      },
      next: 'Next',
      back: 'Back',
      getQuote: 'Get Quote'
    }
  };

  const t = content[lang] || content.tr;

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFormData({ ...formData, files });
      toast.success(lang === 'tr' ? 'Dosya yüklendi!' : 'File uploaded!');
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>
          
          {/* Steps Indicator */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {t.steps.map((s, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`flex flex-col items-center ${step > idx + 1 ? 'opacity-50' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step === idx + 1 ? 'bg-[#1554F6] text-white' : 
                    step > idx + 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step > idx + 1 ? <Check size={20} /> : idx + 1}
                  </div>
                  <div className="text-xs mt-2 text-center hidden md:block">
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-gray-500">{s.desc}</div>
                  </div>
                </div>
                {idx < t.steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > idx + 1 ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
            {/* Step 1: Upload */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0A0E27] mb-6">{t.upload.title}</h2>
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-[#1554F6] transition-colors duration-300">
                    <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-gray-600 mb-4">{t.upload.dragdrop}</p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".zip,.rar"
                      className="hidden"
                      id="gerber-upload"
                    />
                    <label htmlFor="gerber-upload">
                      <Button className="bg-[#1554F6] hover:bg-[#0E3CC7] text-white">
                        <Upload className="mr-2" size={18} />
                        {t.upload.gerber}
                      </Button>
                    </label>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
                    <Check className="text-green-600" size={20} />
                    <span className="text-sm text-green-800">{t.upload.nda}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: PCB Specs */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0A0E27] mb-6">{t.pcb.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.pcb.layers}</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl" value={formData.layers} onChange={(e) => setFormData({...formData, layers: e.target.value})}>
                      <option value="2">2</option>
                      <option value="4">4</option>
                      <option value="6">6</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.pcb.thickness}</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl" value={formData.thickness} onChange={(e) => setFormData({...formData, thickness: e.target.value})}>
                      <option value="0.8">0.8mm</option>
                      <option value="1.0">1.0mm</option>
                      <option value="1.6">1.6mm</option>
                      <option value="2.0">2.0mm</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.pcb.surface}</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl" value={formData.surface} onChange={(e) => setFormData({...formData, surface: e.target.value})}>
                      <option value="HASL">HASL</option>
                      <option value="ENIG">ENIG</option>
                      <option value="OSP">OSP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.pcb.quantity}</label>
                    <Input type="number" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} className="px-4 py-3" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Assembly (Placeholder) */}
            {step === 3 && (
              <div className="text-center py-12">
                <Package className="mx-auto mb-4 text-gray-400" size={64} />
                <h2 className="text-2xl font-bold text-[#0A0E27] mb-4">{lang === 'tr' ? 'Dizgi Seçenekleri' : 'Assembly Options'}</h2>
                <p className="text-gray-600">{lang === 'tr' ? 'Bu bölüm yakında eklenecek' : 'Coming soon'}</p>
              </div>
            )}

            {/* Step 4: Summary (Placeholder) */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0A0E27] mb-6">{lang === 'tr' ? 'Teklif Özeti' : 'Quote Summary'}</h2>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#1554F6] mb-2">$125.00</div>
                    <div className="text-gray-600">{lang === 'tr' ? 'Toplam Fiyat' : 'Total Price'}</div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <div className="flex justify-between">
                      <span>{lang === 'tr' ? 'PCB Üretim' : 'PCB Manufacturing'}</span>
                      <span className="font-semibold">$85.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === 'tr' ? 'Termin' : 'Lead Time'}</span>
                      <span className="font-semibold text-green-600">{lang === 'tr' ? '5-7 gün' : '5-7 days'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button onClick={handleBack} disabled={step === 1} variant="outline" className="px-6">
                <ArrowLeft className="mr-2" size={18} />
                {t.back}
              </Button>
              <Button onClick={handleNext} className="bg-[#1554F6] hover:bg-[#0E3CC7] text-white px-6">
                {step === 4 ? t.getQuote : t.next}
                {step < 4 && <ArrowRight className="ml-2" size={18} />}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstantQuotePage;