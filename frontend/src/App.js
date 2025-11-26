import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';

// Critical pages - loaded immediately
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy loaded pages for better performance
const ProductListPage = lazy(() => import('./pages/ProductListPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage'));
const PowerSupplyCalculator = lazy(() => import('./pages/PowerSupplyCalculator'));
const LEDDriverCalculator = lazy(() => import('./pages/LEDDriverCalculator'));
const CableCalculator = lazy(() => import('./pages/CableCalculator'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const InstantQuotePage = lazy(() => import('./pages/InstantQuotePage'));
const PCBManufacturingPage = lazy(() => import('./pages/PCBManufacturingPage'));
const PCBAssemblyPage = lazy(() => import('./pages/PCBAssemblyPage'));
const FastPrototypingPage = lazy(() => import('./pages/FastPrototypingPage'));
const PCBCapabilitiesPage = lazy(() => import('./pages/PCBCapabilitiesPage'));
const AssemblyCapabilitiesPage = lazy(() => import('./pages/AssemblyCapabilitiesPage'));
const StackupPage = lazy(() => import('./pages/StackupPage'));
const QualityPage = lazy(() => import('./pages/QualityPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

// IoT Product Pages - Lazy loaded
const CoffeeMachineSystemsPage = lazy(() => import('./pages/CoffeeMachineSystemsPage'));
const FireDetectionPage = lazy(() => import('./pages/FireDetectionPage'));
const ColdStoragePage = lazy(() => import('./pages/ColdStoragePage'));
const MiningTrackingPage = lazy(() => import('./pages/MiningTrackingPage'));
const MachineAnalysisPage = lazy(() => import('./pages/MachineAnalysisPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-slate-600 font-medium">Yükleniyor...</p>
    </div>
  </div>
);

function App() {
  const [lang, setLang] = useState('tr');

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      setLang('en');
    } else {
      setLang('tr');
    }
  }, []);

  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <Header lang={lang} setLang={setLang} />
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/tr" replace />} />

            {/* Turkish Routes */}
            <Route path="/tr" element={<HomePage lang="tr" />} />
            <Route path="/tr/instant-quote" element={<InstantQuotePage lang="tr" />} />
            <Route path="/checkout" element={<CheckoutPage lang="tr" />} />

            {/* IoT Products */}
            <Route path="/tr/coffee-machine-systems" element={<CoffeeMachineSystemsPage lang="tr" />} />
            <Route path="/tr/fire-detection" element={<FireDetectionPage lang="tr" />} />
            <Route path="/tr/cold-storage" element={<ColdStoragePage lang="tr" />} />
            <Route path="/tr/mining-tracking" element={<MiningTrackingPage lang="tr" />} />
            <Route path="/tr/machine-analysis" element={<MachineAnalysisPage lang="tr" />} />

            {/* Services */}
            <Route path="/tr/pcb-manufacturing" element={<PCBManufacturingPage lang="tr" />} />
            <Route path="/tr/pcb-assembly" element={<PCBAssemblyPage lang="tr" />} />
            <Route path="/tr/fast-prototyping" element={<FastPrototypingPage lang="tr" />} />
            <Route path="/tr/services" element={<ServicesPage lang="tr" />} />

            {/* Capabilities */}
            <Route path="/tr/pcb-capabilities" element={<PCBCapabilitiesPage lang="tr" />} />
            <Route path="/tr/assembly-capabilities" element={<AssemblyCapabilitiesPage lang="tr" />} />
            <Route path="/tr/stackup" element={<StackupPage lang="tr" />} />
            <Route path="/tr/quality" element={<QualityPage lang="tr" />} />

            {/* Resources */}
            <Route path="/tr/case-studies" element={<CaseStudiesPage lang="tr" />} />
            <Route path="/tr/support" element={<SupportPage lang="tr" />} />
            <Route path="/tr/about" element={<AboutPage lang="tr" />} />
            <Route path="/tr/contact" element={<ContactPage lang="tr" />} />
            <Route path="/tr/careers" element={<CareersPage lang="tr" />} />
            <Route path="/tr/blog" element={<BlogPage lang="tr" />} />
            <Route path="/tr/privacy" element={<PrivacyPage lang="tr" />} />
            <Route path="/tr/terms" element={<TermsPage lang="tr" />} />

            {/* Products & Calculators */}
            <Route path="/tr/products" element={<ProductListPage lang="tr" />} />
            <Route path="/tr/products/:categoryId" element={<ProductListPage lang="tr" />} />
            <Route path="/tr/products/:categoryId/:productId" element={<ProductDetailPage lang="tr" />} />
            <Route path="/tr/calculators" element={<CalculatorsPage lang="tr" />} />
            <Route path="/tr/calculators/power-supply" element={<PowerSupplyCalculator lang="tr" />} />
            <Route path="/tr/calculators/led-driver" element={<LEDDriverCalculator lang="tr" />} />
            <Route path="/tr/calculators/cable-voltage" element={<CableCalculator lang="tr" />} />

            {/* English Routes */}
            <Route path="/en" element={<HomePage lang="en" />} />
            <Route path="/en/instant-quote" element={<InstantQuotePage lang="en" />} />

            {/* IoT Products */}
            <Route path="/en/coffee-machine-systems" element={<CoffeeMachineSystemsPage lang="en" />} />
            <Route path="/en/fire-detection" element={<FireDetectionPage lang="en" />} />
            <Route path="/en/cold-storage" element={<ColdStoragePage lang="en" />} />
            <Route path="/en/mining-tracking" element={<MiningTrackingPage lang="en" />} />
            <Route path="/en/machine-analysis" element={<MachineAnalysisPage lang="en" />} />

            {/* Services */}
            <Route path="/en/pcb-manufacturing" element={<PCBManufacturingPage lang="en" />} />
            <Route path="/en/pcb-assembly" element={<PCBAssemblyPage lang="en" />} />
            <Route path="/en/fast-prototyping" element={<FastPrototypingPage lang="en" />} />
            <Route path="/en/services" element={<ServicesPage lang="en" />} />

            {/* Capabilities */}
            <Route path="/en/pcb-capabilities" element={<PCBCapabilitiesPage lang="en" />} />
            <Route path="/en/assembly-capabilities" element={<AssemblyCapabilitiesPage lang="en" />} />
            <Route path="/en/stackup" element={<StackupPage lang="en" />} />
            <Route path="/en/quality" element={<QualityPage lang="en" />} />

            {/* Resources */}
            <Route path="/en/case-studies" element={<CaseStudiesPage lang="en" />} />
            <Route path="/en/support" element={<SupportPage lang="en" />} />
            <Route path="/en/about" element={<AboutPage lang="en" />} />
            <Route path="/en/contact" element={<ContactPage lang="en" />} />
            <Route path="/en/careers" element={<CareersPage lang="en" />} />
            <Route path="/en/blog" element={<BlogPage lang="en" />} />
            <Route path="/en/privacy" element={<PrivacyPage lang="en" />} />
            <Route path="/en/terms" element={<TermsPage lang="en" />} />

            {/* Products & Calculators */}
            <Route path="/en/products" element={<ProductListPage lang="en" />} />
            <Route path="/en/products/:categoryId" element={<ProductListPage lang="en" />} />
            <Route path="/en/products/:categoryId/:productId" element={<ProductDetailPage lang="en" />} />
            <Route path="/en/calculators" element={<CalculatorsPage lang="en" />} />
            <Route path="/en/calculators/power-supply" element={<PowerSupplyCalculator lang="en" />} />
            <Route path="/en/calculators/led-driver" element={<LEDDriverCalculator lang="en" />} />
            <Route path="/en/calculators/cable-voltage" element={<CableCalculator lang="en" />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage lang={lang} />} />
          </Routes>
          </Suspense>
          <Footer lang={lang} />
          <Toaster position="top-right" />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
