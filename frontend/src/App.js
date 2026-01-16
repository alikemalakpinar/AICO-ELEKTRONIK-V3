import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from './components/ui/sonner';
import { useTranslation } from 'react-i18next';

// Premium Components
import PremiumNavbar from './components/premium/PremiumNavbar';
import PremiumFooter from './components/premium/PremiumFooter';

// Critical pages - loaded immediately
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// ==========================================
// NEW PREMIUM PAGES - Scrollytelling Experience
// ==========================================
const SmartVillaPage = lazy(() => import('./pages/SmartVillaPage'));
const SmartResidencePage = lazy(() => import('./pages/SmartResidencePage'));
const ProjectsPortfolioPage = lazy(() => import('./pages/ProjectsPortfolioPage'));

// Legacy Pages - Still active
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

// ==========================================
// DISABLED E-COMMERCE / PRICING ROUTES
// These routes are commented out as per "PROJECT AICO REBORN"
// The site is now a premium engineering showroom, not an e-commerce platform
// ==========================================

// DISABLED: E-commerce & Products
// const ProductListPage = lazy(() => import('./pages/ProductListPage'));
// const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));

// DISABLED: Calculators & Pricing Tools
// const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage'));
// const PowerSupplyCalculator = lazy(() => import('./pages/PowerSupplyCalculator'));
// const LEDDriverCalculator = lazy(() => import('./pages/LEDDriverCalculator'));
// const CableCalculator = lazy(() => import('./pages/CableCalculator'));

// DISABLED: PCB Services (Manufacturing focus removed)
// const ServicesPage = lazy(() => import('./pages/ServicesPage'));
// const PCBManufacturingPage = lazy(() => import('./pages/PCBManufacturingPage'));
// const PCBAssemblyPage = lazy(() => import('./pages/PCBAssemblyPage'));
// const FastPrototypingPage = lazy(() => import('./pages/FastPrototypingPage'));
// const PCBCapabilitiesPage = lazy(() => import('./pages/PCBCapabilitiesPage'));
// const AssemblyCapabilitiesPage = lazy(() => import('./pages/AssemblyCapabilitiesPage'));
// const StackupPage = lazy(() => import('./pages/StackupPage'));
// const QualityPage = lazy(() => import('./pages/QualityPage'));

// DISABLED: Old Solutions/Portfolio
// const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
// const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
// const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
// const SupportPage = lazy(() => import('./pages/SupportPage'));

// DISABLED: Old IoT Product Pages
// const CoffeeMachineSystemsPage = lazy(() => import('./pages/CoffeeMachineSystemsPage'));
// const FireDetectionPage = lazy(() => import('./pages/FireDetectionPage'));
// const ColdStoragePage = lazy(() => import('./pages/ColdStoragePage'));
// const MiningTrackingPage = lazy(() => import('./pages/MiningTrackingPage'));
// const MachineAnalysisPage = lazy(() => import('./pages/MachineAnalysisPage'));

// Premium Loading fallback component
const PremiumPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-onyx-900">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 border-2 border-onyx-700 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-engineer-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-offwhite-700 font-mono text-sm tracking-wide">
        AICO
      </p>
    </div>
  </div>
);

function App() {
  const [lang, setLang] = useState('tr');
  const { i18n } = useTranslation();

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      setLang('en');
      i18n.changeLanguage('en');
    } else {
      setLang('tr');
      i18n.changeLanguage('tr');
    }
  }, [i18n]);

  return (
    <HelmetProvider>
      <div className="App bg-onyx-900 min-h-screen">
        <BrowserRouter>
          {/* Premium Navbar - Dark, minimal, blur effect */}
          <PremiumNavbar lang={lang} />

          <Suspense fallback={<PremiumPageLoader />}>
            <main className="min-h-screen">
              <Routes>
                {/* Root redirect to Turkish */}
                <Route path="/" element={<Navigate to="/tr" replace />} />

                {/* ==========================================
                    TURKISH ROUTES
                ========================================== */}
                <Route path="/tr" element={<HomePage lang="tr" />} />

                {/* NEW: Premium Solutions - Scrollytelling Experience */}
                <Route path="/tr/solutions" element={<Navigate to="/tr/solutions/smart-villa" replace />} />
                <Route path="/tr/solutions/smart-villa" element={<SmartVillaPage lang="tr" />} />
                <Route path="/tr/solutions/smart-residence" element={<SmartResidencePage lang="tr" />} />

                {/* NEW: Projects Portfolio - Case Studies */}
                <Route path="/tr/projects" element={<ProjectsPortfolioPage lang="tr" />} />

                {/* Legacy Active Routes */}
                <Route path="/tr/about" element={<AboutPage lang="tr" />} />
                <Route path="/tr/contact" element={<ContactPage lang="tr" />} />
                <Route path="/tr/careers" element={<CareersPage lang="tr" />} />
                <Route path="/tr/blog" element={<BlogPage lang="tr" />} />
                <Route path="/tr/privacy" element={<PrivacyPage lang="tr" />} />
                <Route path="/tr/terms" element={<TermsPage lang="tr" />} />

                {/* ==========================================
                    ENGLISH ROUTES
                ========================================== */}
                <Route path="/en" element={<HomePage lang="en" />} />

                {/* NEW: Premium Solutions - Scrollytelling Experience */}
                <Route path="/en/solutions" element={<Navigate to="/en/solutions/smart-villa" replace />} />
                <Route path="/en/solutions/smart-villa" element={<SmartVillaPage lang="en" />} />
                <Route path="/en/solutions/smart-residence" element={<SmartResidencePage lang="en" />} />

                {/* NEW: Projects Portfolio - Case Studies */}
                <Route path="/en/projects" element={<ProjectsPortfolioPage lang="en" />} />

                {/* Legacy Active Routes */}
                <Route path="/en/about" element={<AboutPage lang="en" />} />
                <Route path="/en/contact" element={<ContactPage lang="en" />} />
                <Route path="/en/careers" element={<CareersPage lang="en" />} />
                <Route path="/en/blog" element={<BlogPage lang="en" />} />
                <Route path="/en/privacy" element={<PrivacyPage lang="en" />} />
                <Route path="/en/terms" element={<TermsPage lang="en" />} />

                {/* ==========================================
                    DISABLED ROUTES - E-COMMERCE / PRICING
                    Redirected to new pages for SEO purposes
                ========================================== */}

                {/* Redirect old product routes to projects */}
                <Route path="/tr/products/*" element={<Navigate to="/tr/projects" replace />} />
                <Route path="/en/products/*" element={<Navigate to="/en/projects" replace />} />

                {/* Redirect old calculator routes to contact */}
                <Route path="/tr/calculators/*" element={<Navigate to="/tr/contact" replace />} />
                <Route path="/en/calculators/*" element={<Navigate to="/en/contact" replace />} />

                {/* Redirect old service routes to solutions */}
                <Route path="/tr/pcb-manufacturing" element={<Navigate to="/tr/solutions" replace />} />
                <Route path="/tr/pcb-assembly" element={<Navigate to="/tr/solutions" replace />} />
                <Route path="/tr/fast-prototyping" element={<Navigate to="/tr/solutions" replace />} />
                <Route path="/tr/services" element={<Navigate to="/tr/solutions" replace />} />
                <Route path="/en/pcb-manufacturing" element={<Navigate to="/en/solutions" replace />} />
                <Route path="/en/pcb-assembly" element={<Navigate to="/en/solutions" replace />} />
                <Route path="/en/fast-prototyping" element={<Navigate to="/en/solutions" replace />} />
                <Route path="/en/services" element={<Navigate to="/en/solutions" replace />} />

                {/* Redirect old capability routes to about */}
                <Route path="/tr/pcb-capabilities" element={<Navigate to="/tr/about" replace />} />
                <Route path="/tr/assembly-capabilities" element={<Navigate to="/tr/about" replace />} />
                <Route path="/tr/stackup" element={<Navigate to="/tr/about" replace />} />
                <Route path="/tr/quality" element={<Navigate to="/tr/about" replace />} />
                <Route path="/en/pcb-capabilities" element={<Navigate to="/en/about" replace />} />
                <Route path="/en/assembly-capabilities" element={<Navigate to="/en/about" replace />} />
                <Route path="/en/stackup" element={<Navigate to="/en/about" replace />} />
                <Route path="/en/quality" element={<Navigate to="/en/about" replace />} />

                {/* Redirect old IoT product routes to projects */}
                <Route path="/tr/coffee-machine-systems" element={<Navigate to="/tr/projects" replace />} />
                <Route path="/tr/fire-detection" element={<Navigate to="/tr/projects" replace />} />
                <Route path="/tr/cold-storage" element={<Navigate to="/tr/projects" replace />} />
                <Route path="/tr/mining-tracking" element={<Navigate to="/tr/projects" replace />} />
                <Route path="/tr/machine-analysis" element={<Navigate to="/tr/projects" replace />} />
                <Route path="/en/coffee-machine-systems" element={<Navigate to="/en/projects" replace />} />
                <Route path="/en/fire-detection" element={<Navigate to="/en/projects" replace />} />
                <Route path="/en/cold-storage" element={<Navigate to="/en/projects" replace />} />
                <Route path="/en/mining-tracking" element={<Navigate to="/en/projects" replace />} />
                <Route path="/en/machine-analysis" element={<Navigate to="/en/projects" replace />} />

                {/* Redirect case studies and support to projects */}
                <Route path="/tr/case-studies" element={<Navigate to="/tr/projects" replace />} />
                <Route path="/tr/support" element={<Navigate to="/tr/contact" replace />} />
                <Route path="/en/case-studies" element={<Navigate to="/en/projects" replace />} />
                <Route path="/en/support" element={<Navigate to="/en/contact" replace />} />

                {/* 404 - Not Found */}
                <Route path="*" element={<NotFoundPage lang={lang} />} />
              </Routes>
            </main>
          </Suspense>

          {/* Premium Footer - Dark, minimal */}
          <PremiumFooter lang={lang} />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#0A0A0A',
                color: '#F8FAFC',
                border: '1px solid rgba(255,255,255,0.1)',
              },
            }}
          />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
