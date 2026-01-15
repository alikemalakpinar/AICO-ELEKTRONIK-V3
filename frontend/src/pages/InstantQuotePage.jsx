import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Upload, ArrowRight, ArrowLeft, Check, FileText, Settings,
  CreditCard, Package, Layers, Cpu, DollarSign, Clock,
  AlertCircle, CheckCircle2, Zap, Shield, Award,
  Star, Users, Truck, Lock, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { useDebounce, useDebouncedCallback } from '../hooks/useDebounce';
import { validateField, coerceFormData, PCB_LIMITS, SMT_LIMITS } from '../lib/validations/quoteSchema';
import FileUploader from '../components/FileUploader';
import DetailedBreakdown from '../components/DetailedBreakdown';
import DFMPanel from '../components/DFMPanel';
import BOMOptimizerPanel from '../components/BOMOptimizerPanel';
import PriceComparisonChart from '../components/PriceComparisonChart';
import AnimatedSection from '../components/AnimatedSection';
import CleanCard from '../components/CleanCard';
import GerberPreview from '../components/GerberPreview';
import {
  ColorSelector,
  FinishSelector,
  QuantitySelector,
  LayerSelector,
  LeadTimeSelector,
  PriceSkeleton,
  StickyPriceSkeleton
} from '../components/VisualSelectors';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Trust Badges Component
const TrustBadges = ({ lang, compact = false }) => {
  const badges = [
    {
      icon: Shield,
      label: lang === 'tr' ? 'ISO 9001' : 'ISO 9001',
      desc: lang === 'tr' ? 'Sertifikalı' : 'Certified'
    },
    {
      icon: Lock,
      label: lang === 'tr' ? 'SSL Güvenli' : 'SSL Secure',
      desc: lang === 'tr' ? '256-bit şifreleme' : '256-bit encryption'
    },
    {
      icon: Users,
      label: '500+',
      desc: lang === 'tr' ? 'Mutlu Müşteri' : 'Happy Clients'
    },
    {
      icon: Truck,
      label: lang === 'tr' ? 'Ücretsiz Kargo' : 'Free Shipping',
      desc: lang === 'tr' ? '₺5.000 üzeri' : 'Over ₺5,000'
    }
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-4">
        {badges.slice(0, 3).map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-500">
              <Icon className="w-3.5 h-3.5 text-green-600" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2"
          >
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
              <Icon className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{badge.label}</div>
              <div className="text-xs text-gray-500">{badge.desc}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Progress Percentage Component
const ProgressPercentage = ({ currentStep, totalSteps }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Adım {currentStep} / {totalSteps}
        </span>
        <span className="text-sm font-bold text-blue-600">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Validated Input Component with real-time validation
const ValidatedInput = ({
  value,
  onChange,
  fieldName,
  type = 'number',
  min,
  max,
  step: inputStep,
  className = '',
  disabled = false,
  ...props
}) => {
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(newValue);

    if (touched) {
      const validation = validateField(fieldName, newValue);
      setError(validation.valid ? null : validation.error);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validation = validateField(fieldName, type === 'number' ? parseFloat(value) || 0 : value);
    setError(validation.valid ? null : validation.error);
  };

  return (
    <div className="relative">
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={inputStep}
        disabled={disabled}
        className={`${className} ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        {...props}
      />
      <AnimatePresence>
        {error && touched && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-500 mt-1 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const InstantQuotePage = ({ lang = 'tr' }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [pricing, setPricing] = useState(null);
  const [advancedAnalysis, setAdvancedAnalysis] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [useAdvancedMode, setUseAdvancedMode] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});

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

  // Debounced form data for API calls (500ms delay)
  const debouncedFormData = useDebounce(formData, 500);

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

  // Calculate pricing when debounced form data changes (prevents excessive API calls)
  useEffect(() => {
    if (step >= 2) {
      calculatePricing();
    }
  }, [
    // Using debounced values to prevent API spam on every keystroke
    debouncedFormData.quantity,
    debouncedFormData.layers,
    debouncedFormData.copper_oz,
    debouncedFormData.finish,
    debouncedFormData.min_track_space_mm,
    debouncedFormData.impedance_controlled,
    debouncedFormData.e_test,
    debouncedFormData.board_width_mm,
    debouncedFormData.board_height_mm,
    debouncedFormData.lead_time,
    debouncedFormData.assembly_required,
    debouncedFormData.sides,
    debouncedFormData.component_count,
    debouncedFormData.unique_parts,
    debouncedFormData.bga_count,
    debouncedFormData.uses_01005,
    debouncedFormData.stencil,
    debouncedFormData.inspection_aoi,
    debouncedFormData.inspection_xray,
    step
  ]);

  // Handle file upload completion
  const handleFileUploadComplete = useCallback((fileInfo) => {
    setUploadedFile(fileInfo);
    toast.success(lang === 'tr' ? 'Dosya başarıyla yüklendi' : 'File uploaded successfully');
  }, [lang]);

  // Handle file analysis completion - auto-fill form data
  const handleFileAnalysisComplete = useCallback((analysis) => {
    if (analysis) {
      const updates = {};
      if (analysis.layers) updates.layers = analysis.layers;
      if (analysis.board_size?.width) updates.board_width_mm = analysis.board_size.width;
      if (analysis.board_size?.height) updates.board_height_mm = analysis.board_size.height;
      if (analysis.component_count) {
        updates.assembly_required = true;
        updates.component_count = analysis.component_count;
      }
      if (analysis.unique_parts) updates.unique_parts = analysis.unique_parts;

      if (Object.keys(updates).length > 0) {
        setFormData(prev => ({ ...prev, ...updates }));
        toast.success(
          lang === 'tr'
            ? 'Dosya analizi tamamlandı, form otomatik dolduruldu'
            : 'File analyzed, form auto-filled'
        );
      }
    }
  }, [lang]);

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

  // Navigate to checkout with order data
  const handleCreateOrder = () => {
    const orderData = {
      pcb: {
        quantity: formData.quantity,
        layers: formData.layers,
        finish: formData.finish,
        color: formData.solder_mask_color
      },
      leadTime: getLeadTimeDays(),
      pricing: {
        pcb: pricing?.breakdown?.pcb || 0,
        smt: pricing?.breakdown?.smt || 0,
        shipping: pricing?.breakdown?.shipping || 0,
        total: pricing?.summary?.total || pricing?.total || 0
      }
    };
    navigate('/checkout', { state: { orderData } });
  };

  return (
    <>
      <Helmet>
        <title>{t.title} | Aico Elektronik</title>
        <meta name="description" content="Profesyonel PCB üretim teklifi alın. Anında fiyat hesaplama, DFM analizi ve online sipariş." />
      </Helmet>
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Hero Section with Parallax */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 pt-24 pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center text-white"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <img 
                src="/assets/logos/logo-beyaz.png" 
                alt="Aico Elektronik" 
                className="h-12 md:h-16 w-auto mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block mb-4"
            >
              <div className="bg-white/10 px-4 py-1.5 rounded border border-white/20">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Zap className="w-4 h-4 text-brand-500" />
                  <span>Akıllı Analiz</span>
                </div>
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">{t.subtitle}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Progress Steps with Animation */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <CleanCard className="p-6 shadow-2xl" gradient="blue">
          <div className="flex items-center justify-between">
            {t.steps.map((s, idx) => {
              const Icon = s.icon;
              const stepNum = idx + 1;
              const isActive = step === stepNum;
              const isCompleted = step > stepNum;
              
              return (
                <React.Fragment key={idx}>
                  <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <motion.div 
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center mb-2
                        ${isActive ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/50' : ''}
                        ${isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' : ''}
                        ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-500' : ''}
                      `}
                      animate={isActive ? {
                        scale: [1, 1.05, 1],
                        transition: { duration: 2, repeat: Infinity }
                      } : {}}
                    >
                      <AnimatePresence mode="wait">
                        {isCompleted ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                          >
                            <Check className="w-8 h-8" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="icon"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Icon className="w-8 h-8" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <p className={`text-sm font-semibold transition-colors ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                      {s.title}
                    </p>
                    <p className="text-xs text-gray-400">{s.desc}</p>
                  </motion.div>
                  {idx < t.steps.length - 1 && (
                    <motion.div 
                      className={`flex-1 h-1 mx-4 rounded ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Percentage Progress Bar */}
          <div className="mt-6 pt-4 border-t border-gray-200/50">
            <ProgressPercentage currentStep={step} totalSteps={4} />
          </div>
        </CleanCard>
      </div>

      {/* Trust Badges */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <TrustBadges lang={lang} />
      </div>

      {/* Form Steps with Animation */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <CleanCard className="p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {/* Step 1: File Upload */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <AnimatedSection animation="fadeInDown">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">1. {lang === 'tr' ? 'Dosya Yükleme' : 'File Upload'}</h2>
                  <p className="text-gray-500">{lang === 'tr' ? 'Gerber dosyalarınızı yükleyin ve anında önizleme görün' : 'Upload your Gerber files and see instant preview'}</p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* File Upload Area with react-dropzone */}
                  <div className="space-y-4">
                    <FileUploader
                      onUploadComplete={handleFileUploadComplete}
                      onAnalysisComplete={handleFileAnalysisComplete}
                      lang={lang}
                      maxSize={50 * 1024 * 1024}
                    />
                  </div>

                  {/* Gerber Preview */}
                  <AnimatedSection animation="fadeInRight" delay={0.2}>
                    <GerberPreview lang={lang} showControls={true} interactive={true} />
                  </AnimatedSection>
                </div>

                <AnimatedSection animation="fadeInUp" delay={0.3}>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <strong>{lang === 'tr' ? 'NDA Güvencesi:' : 'NDA Guarantee:'}</strong> {lang === 'tr' ? 'Dosyalarınız tamamen güvende, üçüncü taraflarla paylaşılmaz.' : 'Your files are completely secure and not shared with third parties.'}
                    </p>
                  </div>
                </AnimatedSection>

                <div className="flex justify-end gap-4 pt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={nextStep} size="lg" className="hover-lift bg-gradient-to-r from-blue-600 to-slate-700">
                      {t.buttons.next} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 2: PCB Options */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <AnimatedSection animation="fadeInDown">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">2. {t.pcb.title}</h2>
                  <p className="text-gray-500">PCB özelliklerini görsel seçicilerle belirleyin</p>
                </AnimatedSection>

                {/* Visual Quantity Selector */}
                <AnimatedSection animation="fadeInUp" delay={0.1}>
                  <QuantitySelector
                    label={t.pcb.quantity}
                    value={parseInt(formData.quantity)}
                    onChange={(val) => handleInputChange('quantity', val)}
                  />
                </AnimatedSection>

                {/* Visual Layer Selector */}
                <AnimatedSection animation="fadeInUp" delay={0.15}>
                  <LayerSelector
                    label={t.pcb.layers}
                    value={parseInt(formData.layers)}
                    onChange={(val) => handleInputChange('layers', val)}
                  />
                </AnimatedSection>

                {/* Visual Color Selector */}
                <AnimatedSection animation="fadeInUp" delay={0.2}>
                  <ColorSelector
                    label={t.pcb.maskColor}
                    value={formData.solder_mask_color}
                    onChange={(val) => handleInputChange('solder_mask_color', val)}
                  />
                </AnimatedSection>

                {/* Visual Finish Selector */}
                <AnimatedSection animation="fadeInUp" delay={0.25}>
                  <FinishSelector
                    label={t.pcb.finish}
                    value={formData.finish}
                    onChange={(val) => handleInputChange('finish', val)}
                  />
                </AnimatedSection>

                {/* Board Dimensions */}
                <AnimatedSection animation="fadeInUp" delay={0.3}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label>{t.pcb.thickness}</Label>
                      <select
                        className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.thickness_mm}
                        onChange={(e) => handleInputChange('thickness_mm', e.target.value)}
                      >
                        <option value="1.0">1.0mm</option>
                        <option value="1.6">1.6mm (Standart)</option>
                        <option value="2.0">2.0mm</option>
                      </select>
                    </div>

                    <div>
                      <Label>{t.pcb.width}</Label>
                      <ValidatedInput
                        type="number"
                        fieldName="board_width_mm"
                        className="mt-2"
                        value={formData.board_width_mm}
                        onChange={(val) => handleInputChange('board_width_mm', val)}
                        min={PCB_LIMITS.boardSize.min}
                        max={PCB_LIMITS.boardSize.max}
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        {PCB_LIMITS.boardSize.min}-{PCB_LIMITS.boardSize.max} mm
                      </p>
                    </div>

                    <div>
                      <Label>{t.pcb.height}</Label>
                      <ValidatedInput
                        type="number"
                        fieldName="board_height_mm"
                        className="mt-2"
                        value={formData.board_height_mm}
                        onChange={(val) => handleInputChange('board_height_mm', val)}
                        min={PCB_LIMITS.boardSize.min}
                        max={PCB_LIMITS.boardSize.max}
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        {PCB_LIMITS.boardSize.min}-{PCB_LIMITS.boardSize.max} mm
                      </p>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Lead Time Visual Selector */}
                <AnimatedSection animation="fadeInUp" delay={0.35}>
                  <LeadTimeSelector
                    label={t.leadtime.title}
                    value={formData.lead_time}
                    onChange={(val) => handleInputChange('lead_time', val)}
                    content={{
                      economy: lang === 'tr' ? 'Ekonomik' : 'Economy',
                      standard: lang === 'tr' ? 'Standart' : 'Standard',
                      fast: lang === 'tr' ? 'Hızlı' : 'Fast'
                    }}
                  />
                </AnimatedSection>

                {/* Advanced Options */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4">Gelişmiş Seçenekler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>{t.pcb.copper}</Label>
                      <select
                        className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.copper_oz}
                        onChange={(e) => handleInputChange('copper_oz', e.target.value)}
                      >
                        <option value="1">1 oz</option>
                        <option value="2">2 oz</option>
                      </select>
                    </div>

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

                    <div className="flex items-end gap-6">
                      <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.impedance_controlled}
                          onChange={(e) => handleInputChange('impedance_controlled', e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                        <span className="text-sm">{t.pcb.impedance}</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.e_test}
                          onChange={(e) => handleInputChange('e_test', e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                        <span className="text-sm">{t.pcb.etest}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-4 pt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={prevStep} variant="outline" size="lg">
                      <ArrowLeft className="mr-2 h-4 w-4" /> {t.buttons.back}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={nextStep} size="lg" className="hover-lift bg-gradient-to-r from-blue-600 to-slate-700">
                      {t.buttons.next} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

          {/* Step 3: SMT Options */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <AnimatedSection animation="fadeInDown">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">3. {t.smt.title}</h2>
              </AnimatedSection>
              
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={prevStep} variant="outline" size="lg">
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t.buttons.back}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={nextStep} size="lg" className="hover-lift">
                    {t.buttons.next} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Summary & Price */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">4. {t.summary.title}</h2>
                
                {/* Advanced Mode Toggle */}
                <label className="flex items-center gap-3 cursor-pointer bg-navy-900 text-white px-4 py-2 rounded hover:bg-navy-800 hover:shadow-button-hover transition-all">
                  <Zap className="w-4 h-4 text-brand-500" />
                  <span className="font-medium text-sm">Detaylı Analiz</span>
                  <input
                    type="checkbox"
                    checked={useAdvancedMode}
                    onChange={(e) => {
                      setUseAdvancedMode(e.target.checked);
                      calculatePricing();
                    }}
                    className="w-4 h-4 rounded accent-brand-500"
                  />
                </label>
              </div>
              
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
                          <span className="font-bold text-primary">₺{(pricing.summary?.total || pricing.total).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-700 mt-4">
                        <Clock className="w-4 h-4" />
                        <span>{t.summary.leadtime}: <strong>{getLeadTimeDays()} {t.summary.workDays}</strong></span>
                      </div>
                      
                      {/* Advanced Summary Badge */}
                      {advancedAnalysis && advancedAnalysis.summary && (
                        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-blue-200">
                          {advancedAnalysis.summary.dfm_score !== undefined && (
                            <div className="bg-white rounded-lg p-3 border border-blue-200">
                              <p className="text-xs text-gray-600">DFM Skoru</p>
                              <p className="text-xl font-bold text-blue-600">
                                {advancedAnalysis.summary.dfm_score}/100
                              </p>
                              <p className="text-xs text-gray-500">{advancedAnalysis.summary.dfm_grade}</p>
                            </div>
                          )}
                          {advancedAnalysis.summary.potential_savings > 0 && (
                            <div className="bg-white rounded-lg p-3 border border-green-200">
                              <p className="text-xs text-gray-600">Potansiyel Tasarruf</p>
                              <p className="text-xl font-bold text-green-600">
                                {advancedAnalysis.summary.potential_savings.toFixed(1)}%
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Detailed Breakdown - Advanced Mode */}
                  {useAdvancedMode && advancedAnalysis && (
                    <>
                      <DetailedBreakdown pricing={advancedAnalysis.pricing} lang={lang} />
                      <PriceComparisonChart pricing={advancedAnalysis.pricing} lang={lang} />
                      <DFMPanel dfmResult={advancedAnalysis.dfm} lang={lang} />
                      {advancedAnalysis.optimization && (
                        <BOMOptimizerPanel optimization={advancedAnalysis.optimization} lang={lang} />
                      )}
                    </>
                  )}

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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="lg" className="w-full hover-lift">
                        <FileText className="mr-2 h-5 w-5" />
                        {t.summary.saveQuote}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        onClick={handleCreateOrder}
                        className="w-full bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 shadow-xl hover-lift"
                      >
                        <Package className="mr-2 h-5 w-5" />
                        {t.summary.createOrder}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Fiyat hesaplanıyor...</p>
                </div>
              )}

              <div className="flex justify-between gap-4 pt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={prevStep} variant="outline" size="lg">
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t.buttons.back}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </CleanCard>
      </div>

      {/* Sticky Price Bar - Clean Industrial Design */}
      {step >= 2 && (
        calculating ? (
          <StickyPriceSkeleton />
        ) : pricing ? (
          <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-industrial-lg z-50">
            {/* Trust badges row */}
            <div className="bg-secondary/50 border-b border-border py-1.5 px-4">
              <div className="max-w-7xl mx-auto flex items-center justify-center">
                <TrustBadges lang={lang} compact />
              </div>
            </div>
            {/* Price row */}
            <div className="py-3 px-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* PCB Price */}
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">PCB</p>
                    <p className="text-base font-mono font-bold tabular-nums text-foreground">
                      ₺{pricing.breakdown.pcb.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  {/* SMT Price */}
                  {pricing.breakdown.smt > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">SMT</p>
                      <p className="text-base font-mono font-bold tabular-nums text-foreground">
                        ₺{pricing.breakdown.smt.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                  {/* Total Price */}
                  <div className="border-l border-border pl-6">
                    <p className="text-xs text-muted-foreground font-medium">TOPLAM</p>
                    <p className="text-xl font-mono font-bold tabular-nums text-brand-500">
                      ₺{(pricing.summary?.total || pricing.total).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  {/* Lead Time */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">{getLeadTimeDays()} gün</span>
                  </div>
                  {/* DFM Score */}
                  {useAdvancedMode && advancedAnalysis && advancedAnalysis.summary && (
                    <div className="flex items-center gap-4 border-l border-border pl-6">
                      {advancedAnalysis.summary.dfm_score !== undefined && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">DFM</p>
                          <p className="text-lg font-mono font-bold tabular-nums text-navy-600">
                            {advancedAnalysis.summary.dfm_score}
                          </p>
                        </div>
                      )}
                      {advancedAnalysis.summary.potential_savings > 0 && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Tasarruf</p>
                          <p className="text-lg font-mono font-bold tabular-nums text-success-500">
                            {advancedAnalysis.summary.potential_savings.toFixed(1)}%
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* CTA Button */}
                <Button
                  onClick={handleCreateOrder}
                  variant="brand"
                  size="lg"
                  className="shadow-button-hover"
                >
                  <Package className="mr-2 h-4 w-4" />
                  {lang === 'tr' ? 'Sipariş Ver' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
    </>
  );
};

export default InstantQuotePage;
