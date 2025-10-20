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

function App() {
  const [lang, setLang] = useState('tr');

  // Sync language with URL
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
          {/* Redirect root to /tr */}
          <Route path="/" element={<Navigate to="/tr" replace />} />

          {/* Turkish Routes */}
          <Route path="/tr" element={<HomePage lang="tr" />} />
          <Route path="/tr/products" element={<ProductListPage lang="tr" />} />
          <Route path="/tr/products/:categoryId" element={<ProductListPage lang="tr" />} />
          <Route path="/tr/products/:categoryId/:productId" element={<ProductDetailPage lang="tr" />} />
          <Route path="/tr/calculators" element={<CalculatorsPage lang="tr" />} />
          <Route path="/tr/calculators/power-supply" element={<PowerSupplyCalculator lang="tr" />} />
          <Route path="/tr/calculators/led-driver" element={<LEDDriverCalculator lang="tr" />} />
          <Route path="/tr/calculators/cable-voltage" element={<CableCalculator lang="tr" />} />
          
          <Route path="/tr/about" element={<AboutPage lang="tr" />} />
          <Route path="/tr/contact" element={<ContactPage lang="tr" />} />
          <Route path="/tr/services" element={<ServicesPage lang="tr" />} />
          <Route path="/tr/services/:serviceId" element={<PlaceholderPage lang="tr" title="Hizmet Detayı" />} />

          {/* English Routes */}
          <Route path="/en" element={<HomePage lang="en" />} />
          <Route path="/en/products" element={<ProductListPage lang="en" />} />
          <Route path="/en/products/:categoryId" element={<ProductListPage lang="en" />} />
          <Route path="/en/products/:categoryId/:productId" element={<ProductDetailPage lang="en" />} />
          <Route path="/en/calculators" element={<CalculatorsPage lang="en" />} />
          <Route path="/en/calculators/power-supply" element={<PowerSupplyCalculator lang="en" />} />
          <Route path="/en/calculators/led-driver" element={<LEDDriverCalculator lang="en" />} />
          <Route path="/en/calculators/cable-voltage" element={<CableCalculator lang="en" />} />
          <Route path="/en/about" element={<AboutPage lang="en" />} />
          <Route path="/en/contact" element={<ContactPage lang="en" />} />
          <Route path="/en/services" element={<ServicesPage lang="en" />} />
          <Route path="/en/services/:serviceId" element={<PlaceholderPage lang="en" title="Service Detail" />} />
        </Routes>
        <Footer lang={lang} />
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

// Placeholder component for unimplemented pages
const PlaceholderPage = ({ lang, title }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#0E1A2B] mb-4">{title}</h1>
      <p className="text-[#374151]">
        {lang === 'tr' ? 'Bu sayfa yakında eklenecek.' : 'This page will be added soon.'}
      </p>
    </div>
  </div>
);

export default App;
