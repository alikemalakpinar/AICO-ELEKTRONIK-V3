import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CalculatorsPage from './pages/CalculatorsPage';
import PowerSupplyCalculator from './pages/PowerSupplyCalculator';
import LEDDriverCalculator from './pages/LEDDriverCalculator';
import CableCalculator from './pages/CableCalculator';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import InstantQuotePage from './pages/InstantQuotePage';
import PCBManufacturingPage from './pages/PCBManufacturingPage';
import PCBAssemblyPage from './pages/PCBAssemblyPage';
import FastPrototypingPage from './pages/FastPrototypingPage';
import PCBCapabilitiesPage from './pages/PCBCapabilitiesPage';
import AssemblyCapabilitiesPage from './pages/AssemblyCapabilitiesPage';
import StackupPage from './pages/StackupPage';
import QualityPage from './pages/QualityPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import SupportPage from './pages/SupportPage';
import NotFoundPage from './pages/NotFoundPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

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
    <div className="App">
      <BrowserRouter>
        <Header lang={lang} setLang={setLang} />
        <Routes>
          <Route path="/" element={<Navigate to="/tr" replace />} />

          {/* Turkish Routes */}
          <Route path="/tr" element={<HomePage lang="tr" />} />
          <Route path="/tr/instant-quote" element={<InstantQuotePage lang="tr" />} />
          
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
        <Footer lang={lang} />
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
