import React, { useState, useEffect } from 'react';
import { 
  Upload, ArrowRight, ArrowLeft, Check, FileText, Settings, 
  CreditCard, Package, Layers, Cpu, DollarSign, Clock, 
  AlertCircle, CheckCircle2, Zap, Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import DetailedBreakdown from '../components/DetailedBreakdown';
import DFMPanel from '../components/DFMPanel';
import BOMOptimizerPanel from '../components/BOMOptimizerPanel';
import PriceComparisonChart from '../components/PriceComparisonChart';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const InstantQuotePage = ({ lang = 'tr' }) => {
  const [step, setStep] = useState(1);
  const [pricing, setPricing] = useState(null);
  const [advancedAnalysis, setAdvancedAnalysis] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [useAdvancedMode, setUseAdvancedMode] = useState(true);
  const [formData, setFormData] = useState({
    // Step 1: Files
    projectName: '',
    ndaAccepted: false,
    
    // Step 2: PCB Options
    quantity: 50,
    layers: 4,
    thickness_mm: 1.6,
    copper_oz: 1,
    finish: 'HASL',
    solder_mask_color: 'green',
    silkscreen: 'both',
    min_track_space_mm: 0.15,
    impedance_controlled: false,
    e_test: true,
    board_width_mm: 100,
    board_height_mm: 80,
    panelization_mode: 'none',
    panel_n: 2,
    panel_m: 2,
    
    // Step 3: SMT Options
    assembly_required: false,
    sides: 'single',
    component_count: 0,
    unique_parts: 0,
    bga_count: 0,
    uses_01005: false,
    stencil: 'frameless',
    inspection_aoi: true,
    inspection_xray: false,
    sourcing: 'turnkey',
    
    // Step 4: Lead Time
    lead_time: 'standard'
  });

  const content = {
    tr: {
      title: 'Anında PCB Teklifi',
      subtitle: '30 saniyede profesyonel PCB üretim fiyatı ve termin süresi',
      steps: [
        { icon: Upload, title: 'Dosya Yükleme', desc: 'Gerber/BOM/PnP' },
        { icon: Settings, title: 'PCB Özellikleri', desc: 'Katman, kaplama, boyut' },
        { icon: Cpu, title: 'Dizgi (SMT/THT)', desc: 'Montaj seçenekleri' },
        { icon: DollarSign, title: 'Fiyat & Termin', desc: 'Özet ve sipariş' }
      ],
      pcb: {
        title: 'PCB Özellikleri',
        quantity: 'Adet',
        layers: 'Katman Sayısı',
        thickness: 'Kalınlık (mm)',
        copper: 'Bakır Ağırlığı',
        finish: 'Yüzey Kaplaması',
        maskColor: 'Solder Mask Rengi',
        silkscreen: 'Silkscreen',
        minTrack: 'Min İz/Boşluk (mm)',
        boardSize: 'Kart Boyutları (mm)',
        width: 'En',
        height: 'Boy',
        impedance: 'İmpedans Kontrol',
        etest: 'E-Test (Elektriksel)',
        panelization: 'Panelizasyon'
      },
      smt: {
        title: 'Dizgi Seçenekleri',
        required: 'Dizgi gerekli mi?',
        sides: 'Taraf',
        single: 'Tek taraf',
        double: 'Çift taraf',
        components: 'Toplam Bileşen Sayısı',
        unique: 'Unique Parça Sayısı',
        bga: 'BGA Sayısı',
        uses01005: '01005 boyutu var mı?',
        stencil: 'Stencil',
        inspection: 'Kontrol',
        sourcing: 'Tedarik'
      },
      leadtime: {
        title: 'Termin Süresi',
        fast: 'Hızlı (3-5 iş günü)',
        standard: 'Standart (7-10 iş günü)',
        economy: 'Ekonomik (12-15 iş günü)'
      },
      summary: {
        title: 'Fiyat Özeti',
        pcb: 'PCB Üretim',
        smt: 'Dizgi (SMT)',
        shipping: 'Kargo',
        total: 'TOPLAM',
        leadtime: 'Termin',
        workDays: 'iş günü',
        saveQuote: 'Teklifi Kaydet',
        createOrder: 'Sipariş Ver'
      },
      buttons: {
        next: 'İleri',
        back: 'Geri',
        calculate: 'Fiyat Hesapla'
      }
    },
    en: {
      title: 'Instant PCB Quote',
      subtitle: 'Professional PCB manufacturing quote in 30 seconds',
      steps: [
        { icon: Upload, title: 'File Upload', desc: 'Gerber/BOM/PnP' },
        { icon: Settings, title: 'PCB Options', desc: 'Layers, finish, size' },
        { icon: Cpu, title: 'Assembly (SMT/THT)', desc: 'Assembly options' },
        { icon: DollarSign, title: 'Price & Lead Time', desc: 'Summary and order' }
      ],
      pcb: {
        title: 'PCB Specifications',
        quantity: 'Quantity',
        layers: 'Layers',
        thickness: 'Thickness (mm)',
        copper: 'Copper Weight',
        finish: 'Surface Finish',
        maskColor: 'Solder Mask Color',
        silkscreen: 'Silkscreen',
        minTrack: 'Min Track/Space (mm)',
        boardSize: 'Board Dimensions (mm)',
        width: 'Width',
        height: 'Height',
        impedance: 'Impedance Control',
        etest: 'E-Test (Electrical)',
        panelization: 'Panelization'
      },
      smt: {
        title: 'Assembly Options',
        required: 'Assembly required?',
        sides: 'Sides',
        single: 'Single side',
        double: 'Double side',
        components: 'Total Components',
        unique: 'Unique Parts',
        bga: 'BGA Count',
        uses01005: 'Has 01005?',
        stencil: 'Stencil',
        inspection: 'Inspection',
        sourcing: 'Sourcing'
      },
      leadtime: {
        title: 'Lead Time',
        fast: 'Fast (3-5 business days)',
        standard: 'Standard (7-10 business days)',
        economy: 'Economy (12-15 business days)'
      },
      summary: {
        title: 'Price Summary',
        pcb: 'PCB Manufacturing',
        smt: 'Assembly (SMT)',
        shipping: 'Shipping',
        total: 'TOTAL',
        leadtime: 'Lead Time',
        workDays: 'business days',
        saveQuote: 'Save Quote',
        createOrder: 'Place Order'
      },
      buttons: {
        next: 'Next',
        back: 'Back',
        calculate: 'Calculate Price'
      }
    }
  };

  const t = content[lang] || content.tr;

  // Calculate pricing when PCB or SMT options change
  useEffect(() => {
    if (step >= 2) {
      calculatePricing();
    }
  }, [
    formData.quantity, formData.layers, formData.copper_oz, formData.finish,
    formData.min_track_space_mm, formData.impedance_controlled, formData.e_test,
    formData.board_width_mm, formData.board_height_mm, formData.lead_time,
    formData.assembly_required, formData.sides, formData.component_count,
    formData.unique_parts, formData.bga_count, formData.uses_01005,
    formData.stencil, formData.inspection_aoi, formData.inspection_xray
  ]);

  const calculatePricing = async () => {
    setCalculating(true);
    
    try {
      const payload = {
        pcb: {
          quantity: parseInt(formData.quantity),
          layers: parseInt(formData.layers),
          thickness_mm: parseFloat(formData.thickness_mm),
          copper_oz: parseInt(formData.copper_oz),
          finish: formData.finish,
          solder_mask_color: formData.solder_mask_color,
          silkscreen: formData.silkscreen,
          min_track_space_mm: parseFloat(formData.min_track_space_mm),
          impedance_controlled: formData.impedance_controlled,
          e_test: formData.e_test,
          board_size_mm: {
            w: parseFloat(formData.board_width_mm),
            h: parseFloat(formData.board_height_mm)
          },
          panelization: formData.panelization_mode !== 'none' ? {
            mode: formData.panelization_mode,
            nxm: { n: parseInt(formData.panel_n), m: parseInt(formData.panel_m) },
            break_method: 'vcut'
          } : null
        },
        smt: formData.assembly_required ? {
          assembly_required: true,
          sides: formData.sides,
          component_count: parseInt(formData.component_count) || 0,
          unique_parts: parseInt(formData.unique_parts) || 0,
          bga_count: parseInt(formData.bga_count) || 0,
          uses_01005: formData.uses_01005,
          stencil: formData.stencil,
          inspection: [
            ...(formData.inspection_aoi ? ['AOI'] : []),
            ...(formData.inspection_xray ? ['Xray'] : [])
          ],
          sourcing: formData.sourcing
        } : null,
        lead_time: formData.lead_time
      };

      if (useAdvancedMode) {
        // Use complete analysis endpoint
        const response = await axios.post(`${BACKEND_URL}/api/quote/complete-analysis`, payload);
        setAdvancedAnalysis(response.data);
        setPricing(response.data.pricing);
      } else {
        // Use basic pricing endpoint
        const response = await axios.post(`${BACKEND_URL}/api/quote/calculate`, payload);
        setPricing(response.data);
        setAdvancedAnalysis(null);
      }
      
    } catch (error) {
      console.error('Pricing calculation error:', error);
      toast.error('Fiyat hesaplanamadı');
    } finally {
      setCalculating(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const getLeadTimeDays = () => {
    const days = {
      fast: '3-5',
      standard: '7-10',
      economy: '12-15'
    };
    return days[formData.lead_time] || '7-10';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/90 via-blue-700 to-primary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl opacity-90">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            {t.steps.map((s, idx) => {
              const Icon = s.icon;
              const stepNum = idx + 1;
              const isActive = step === stepNum;
              const isCompleted = step > stepNum;
              
              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all
                      ${isActive ? 'bg-primary text-white scale-110' : ''}
                      ${isCompleted ? 'bg-green-500 text-white' : ''}
                      ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-500' : ''}
                    `}>
                      {isCompleted ? <Check className="w-8 h-8" /> : <Icon className="w-8 h-8" />}
                    </div>
                    <p className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                      {s.title}
                    </p>
                    <p className="text-xs text-gray-400">{s.desc}</p>
                  </div>
                  {idx < t.steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Steps */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {/* Step 1: File Upload */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Dosya Yükleme</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary transition-colors">
                <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Gerber, BOM veya PnP dosyalarınızı yükleyin
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  ZIP, RAR formatları desteklenir (maks 50MB)
                </p>
                <Button className="mt-4">
                  <Upload className="mr-2 h-4 w-4" />
                  Dosya Seç
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <strong>NDA Güvencesi:</strong> Dosyalarınız tamamen güvende, üçüncü taraflarla paylaşılmaz.
                </p>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button onClick={nextStep} size="lg">
                  {t.buttons.next} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: PCB Options */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">2. {t.pcb.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quantity */}
                <div>
                  <Label>{t.pcb.quantity}</Label>
                  <select 
                    className="w-full mt-2 p-3 border rounded-lg"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                  >
                    {[5, 10, 20, 50, 100, 250, 500, 1000].map(q => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                {/* Layers */}
                <div>
                  <Label>{t.pcb.layers}</Label>
                  <select 
                    className="w-full mt-2 p-3 border rounded-lg"
                    value={formData.layers}
                    onChange={(e) => handleInputChange('layers', e.target.value)}
                  >
                    {[2, 4, 6, 8, 10].map(l => (
                      <option key={l} value={l}>{l}L</option>
                    ))}
                  </select>
                </div>

                {/* Thickness */}
                <div>
                  <Label>{t.pcb.thickness}</Label>
                  <select 
                    className="w-full mt-2 p-3 border rounded-lg"
                    value={formData.thickness_mm}
                    onChange={(e) => handleInputChange('thickness_mm', e.target.value)}
                  >
                    <option value="1.0">1.0mm</option>
                    <option value="1.6">1.6mm (Standart)</option>
                    <option value="2.0">2.0mm</option>
                  </select>
                </div>

                {/* Copper Weight */}
                <div>
                  <Label>{t.pcb.copper}</Label>
                  <select 
                    className="w-full mt-2 p-3 border rounded-lg"
                    value={formData.copper_oz}
                    onChange={(e) => handleInputChange('copper_oz', e.target.value)}
                  >
                    <option value="1">1 oz</option>
                    <option value="2">2 oz</option>
                  </select>
                </div>

                {/* Surface Finish */}
                <div>
                  <Label>{t.pcb.finish}</Label>
                  <select 
                    className="w-full mt-2 p-3 border rounded-lg"
                    value={formData.finish}
                    onChange={(e) => handleInputChange('finish', e.target.value)}
                  >
                    <option value="HASL">HASL</option>
                    <option value="ENIG">ENIG</option>
                    <option value="OSP">OSP</option>
                  </select>
                </div>

                {/* Min Track/Space */}
                <div>
                  <Label>{t.pcb.minTrack}</Label>
                  <Input 
                    type="number" 
                    step="0.01"
                    className="mt-2"
                    value={formData.min_track_space_mm}
                    onChange={(e) => handleInputChange('min_track_space_mm', e.target.value)}
                  />
                </div>

                {/* Board Width */}
                <div>
                  <Label>{t.pcb.width}</Label>
                  <Input 
                    type="number"
                    className="mt-2"
                    value={formData.board_width_mm}
                    onChange={(e) => handleInputChange('board_width_mm', e.target.value)}
                  />
                </div>

                {/* Board Height */}
                <div>
                  <Label>{t.pcb.height}</Label>
                  <Input 
                    type="number"
                    className="mt-2"
                    value={formData.board_height_mm}
                    onChange={(e) => handleInputChange('board_height_mm', e.target.value)}
                  />
                </div>

                {/* Lead Time */}
                <div>
                  <Label>{t.leadtime.title}</Label>
                  <select 
                    className="w-full mt-2 p-3 border rounded-lg"
                    value={formData.lead_time}
                    onChange={(e) => handleInputChange('lead_time', e.target.value)}
                  >
                    <option value="economy">{t.leadtime.economy}</option>
                    <option value="standard">{t.leadtime.standard}</option>
                    <option value="fast">{t.leadtime.fast}</option>
                  </select>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold text-lg mb-4">Gelişmiş Seçenekler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.impedance_controlled}
                      onChange={(e) => handleInputChange('impedance_controlled', e.target.checked)}
                      className="w-5 h-5"
                    />
                    <span>{t.pcb.impedance}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.e_test}
                      onChange={(e) => handleInputChange('e_test', e.target.checked)}
                      className="w-5 h-5"
                    />
                    <span>{t.pcb.etest}</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between gap-4 pt-6">
                <Button onClick={prevStep} variant="outline" size="lg">
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t.buttons.back}
                </Button>
                <Button onClick={nextStep} size="lg">
                  {t.buttons.next} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: SMT Options */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">3. {t.smt.title}</h2>
              
              {/* Assembly Required? */}
              <div className="bg-gray-50 rounded-lg p-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.assembly_required}
                    onChange={(e) => handleInputChange('assembly_required', e.target.checked)}
                    className="w-6 h-6"
                  />
                  <span className="text-lg font-semibold">{t.smt.required}</span>
                </label>
              </div>

              {formData.assembly_required && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Sides */}
                  <div>
                    <Label>{t.smt.sides}</Label>
                    <select 
                      className="w-full mt-2 p-3 border rounded-lg"
                      value={formData.sides}
                      onChange={(e) => handleInputChange('sides', e.target.value)}
                    >
                      <option value="single">{t.smt.single}</option>
                      <option value="double">{t.smt.double}</option>
                    </select>
                  </div>

                  {/* Component Count */}
                  <div>
                    <Label>{t.smt.components}</Label>
                    <Input 
                      type="number"
                      className="mt-2"
                      value={formData.component_count}
                      onChange={(e) => handleInputChange('component_count', e.target.value)}
                    />
                  </div>

                  {/* Unique Parts */}
                  <div>
                    <Label>{t.smt.unique}</Label>
                    <Input 
                      type="number"
                      className="mt-2"
                      value={formData.unique_parts}
                      onChange={(e) => handleInputChange('unique_parts', e.target.value)}
                    />
                  </div>

                  {/* BGA Count */}
                  <div>
                    <Label>{t.smt.bga}</Label>
                    <Input 
                      type="number"
                      className="mt-2"
                      value={formData.bga_count}
                      onChange={(e) => handleInputChange('bga_count', e.target.value)}
                    />
                  </div>

                  {/* Stencil */}
                  <div>
                    <Label>{t.smt.stencil}</Label>
                    <select 
                      className="w-full mt-2 p-3 border rounded-lg"
                      value={formData.stencil}
                      onChange={(e) => handleInputChange('stencil', e.target.value)}
                    >
                      <option value="none">Yok</option>
                      <option value="frameless">Çerçevesiz</option>
                      <option value="framed">Çerçeveli</option>
                    </select>
                  </div>

                  {/* Sourcing */}
                  <div>
                    <Label>{t.smt.sourcing}</Label>
                    <select 
                      className="w-full mt-2 p-3 border rounded-lg"
                      value={formData.sourcing}
                      onChange={(e) => handleInputChange('sourcing', e.target.value)}
                    >
                      <option value="turnkey">Turnkey</option>
                      <option value="consigned">Consigned</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>
                </div>
              )}

              {formData.assembly_required && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-semibold text-lg mb-4">Ek Seçenekler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.uses_01005}
                        onChange={(e) => handleInputChange('uses_01005', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span>{t.smt.uses01005}</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.inspection_aoi}
                        onChange={(e) => handleInputChange('inspection_aoi', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span>AOI İnceleme</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.inspection_xray}
                        onChange={(e) => handleInputChange('inspection_xray', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span>X-Ray İnceleme</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex justify-between gap-4 pt-6">
                <Button onClick={prevStep} variant="outline" size="lg">
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t.buttons.back}
                </Button>
                <Button onClick={nextStep} size="lg">
                  {t.buttons.next} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Summary & Price */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">4. {t.summary.title}</h2>
              
              {pricing ? (
                <div className="space-y-4">
                  {/* Pricing Breakdown */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="space-y-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-medium">{t.summary.pcb}</span>
                        <span className="font-bold">₺{pricing.breakdown.pcb.toFixed(2)}</span>
                      </div>
                      
                      {pricing.breakdown.smt > 0 && (
                        <div className="flex justify-between text-lg">
                          <span className="font-medium">{t.summary.smt}</span>
                          <span className="font-bold">₺{pricing.breakdown.smt.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-lg">
                        <span className="font-medium">{t.summary.shipping}</span>
                        <span className="font-bold">₺{pricing.breakdown.shipping.toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t-2 border-blue-300 pt-3 mt-3">
                        <div className="flex justify-between text-2xl">
                          <span className="font-bold text-primary">{t.summary.total}</span>
                          <span className="font-bold text-primary">₺{pricing.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-700 mt-4">
                        <Clock className="w-4 h-4" />
                        <span>{t.summary.leadtime}: <strong>{getLeadTimeDays()} {t.summary.workDays}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Warnings */}
                  {pricing.warnings && pricing.warnings.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-semibold text-amber-900">Bilgilendirme:</p>
                          {pricing.warnings.map((w, idx) => (
                            <p key={idx} className="text-sm text-amber-800">• {w}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <Button variant="outline" size="lg" className="w-full">
                      <FileText className="mr-2 h-5 w-5" />
                      {t.summary.saveQuote}
                    </Button>
                    <Button size="lg" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <Package className="mr-2 h-5 w-5" />
                      {t.summary.createOrder}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Fiyat hesaplanıyor...</p>
                </div>
              )}

              <div className="flex justify-between gap-4 pt-6">
                <Button onClick={prevStep} variant="outline" size="lg">
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t.buttons.back}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Price Bar (visible on steps 2-4) */}
      {step >= 2 && pricing && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary shadow-2xl p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-gray-600">PCB</p>
                <p className="text-lg font-bold">₺{pricing.breakdown.pcb.toFixed(2)}</p>
              </div>
              {pricing.breakdown.smt > 0 && (
                <div>
                  <p className="text-sm text-gray-600">SMT</p>
                  <p className="text-lg font-bold">₺{pricing.breakdown.smt.toFixed(2)}</p>
                </div>
              )}
              <div className="border-l pl-6">
                <p className="text-sm text-gray-600">TOPLAM</p>
                <p className="text-2xl font-bold text-primary">₺{pricing.total.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{getLeadTimeDays()} iş günü</span>
              </div>
            </div>
            {calculating && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Güncelleniyor...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstantQuotePage;
