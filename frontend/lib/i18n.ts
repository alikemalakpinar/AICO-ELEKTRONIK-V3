// AICO Elektronik - Next.js 14 i18n Configuration
// Static translations - no runtime i18n library needed

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

// Type-safe translations
export const translations = {
  tr: {
    // Navigation
    nav: {
      solutions: 'Çözümler',
      projects: 'Projeler',
      about: 'Hakkımızda',
      contact: 'İletişim',
      engineeringRequest: 'Mühendislik Talep Et',
      languageSwitch: 'EN',
    },
    // Footer
    footer: {
      tagline: 'Mühendislik Çözümleri',
      description: 'Yıllık cirosu 100M$+ olan kurumsal projelere mühendislik çözümleri sunuyoruz.',
      quickLinks: 'Hızlı Erişim',
      solutions: 'Çözümler',
      products: 'Ürünler',
      resources: 'Kaynaklar',
      projects: 'Projeler',
      about: 'Hakkımızda',
      careers: 'Kariyer',
      contact: 'İletişim',
      legal: 'Yasal',
      privacy: 'Gizlilik Politikası',
      terms: 'Kullanım Şartları',
      cookies: 'Çerez Politikası',
      copyright: 'Tüm hakları saklıdır.',
    },
    // Home Page
    home: {
      heroTitle: 'Mühendislik',
      heroHighlight: 'çözümleri',
      heroSubtitle: 'Akıllı yaşam teknolojileri ve endüstriyel otomasyon çözümleri.',
      exploreProjects: 'Projeleri Keşfedin',
      discoverSolutions: 'Çözümleri İnceleyin',
    },
    // Smart Villa Page
    smartVilla: {
      badge: 'AKILLI VİLLA',
      heroTitle: 'Ev değil,',
      heroHighlight: 'sizi tanıyan bir organizma.',
      heroSubtitle: 'Kişisel lüks, görünmez teknoloji. Her detay size özel tasarlandı.',
      scene1Title: 'Sabah Uyanış Modu',
      scene1Text: 'Güneş doğmadan önce, eviniz sizin için uyanır. Perdeler yavaş yavaş açılır, ışıklar doğal güneş ışığını taklit eder, oda sıcaklığı ideal seviyeye ayarlanır.',
      scene2Title: 'Görünmez Güvenlik',
      scene2Text: 'Çit yok, kamera görünmüyor. Ama her saniye 47 sensör aktif. Yapay zekâ değil, algoritmik analiz ile tehdit tespiti.',
      scene3Title: 'Öngörü Sistemleri',
      scene3Text: 'Siz eve gelmeden iklimlendirme hazır. Aracınızdaki GPS ile senkronize, 15 dakika önceden hazırlık başlar.',
      cta: 'Villa Projenizi Konuşalım',
    },
    // Smart Residence Page
    smartResidence: {
      badge: 'AKILLI REZİDANS',
      heroTitle: 'Merkezi Yönetim,',
      heroHighlight: 'Ölçeklenebilir Güç.',
      heroSubtitle: 'Tek ekrandan 500 dairenin tam kontrolü. Kurumsal yaşam standartları.',
      scene1Title: 'Platform Yönetimi',
      scene1Text: 'Tek ekrandan 500 dairenin enerji tüketimi, ortak alan aydınlatması, HVAC sistemleri. Gerçek zamanlı veri, anlaşılan dashboard.',
      scene2Title: 'Akıllı Erişim',
      scene2Text: 'QR kodlu misafir girişi. Sınırsız kullanıcı, zaman bazlı yetkilendirme. Anahtar kartlar tarihe karıştı.',
      scene3Title: 'Kestirimci Bakım',
      scene3Text: 'Asansör 3 gün sonra arızalanacak mı? Sistem biliyor. Bakım maliyetlerinde %60 azalma.',
      cta: 'Rezidans Projenizi Konuşalım',
    },
    // Projects Page
    projects: {
      badge: 'İMAJ PROJELERİ',
      heroTitle: 'Mühendislik',
      heroHighlight: 'Portföyosu',
      heroSubtitle: 'Ar-Ge çalışmalarımızdaki mühendislik yaklaşımımızı ve sonuçları keşfedin.',
      viewProject: 'Projeyi İncele',
      caseStudy: {
        challenge: 'Zorluk',
        approach: 'Yaklaşım',
        impact: 'Sonuç',
      },
      featured: 'Öne Çıkan',
      allProjects: 'Tüm Projeler',
    },
    // Contact Page
    contact: {
      title: 'İletişim',
      subtitle: 'Projenizi birlikte tasarlayalım.',
    },
    // About Page
    about: {
      title: 'Hakkımızda',
      subtitle: 'Mühendislik tutkusuyla 20+ yıl.',
    },
    // Common
    common: {
      loading: 'Yükleniyor...',
      systemLoading: 'Sistem Yükleniyor',
      error: 'Bir hata oluştu',
      errorDescription: 'Beklenmedik bir hata meydana geldi. Lütfen sayfayı yenileyin veya ana sayfaya dönün.',
      errorCode: 'Hata Kodu',
      tryAgain: 'Tekrar Dene',
      homePage: 'Ana Sayfa',
      supportLink: 'Sorun devam ederse bize ulaşın',
      back: 'Geri',
      next: 'İleri',
      submit: 'Gönder',
      learnMore: 'Daha Fazla',
      close: 'Kapat',
      cancel: 'İptal',
      save: 'Kaydet',
      delete: 'Sil',
      edit: 'Düzenle',
      view: 'Görüntüle',
      download: 'İndir',
      upload: 'Yükle',
      search: 'Ara',
      filter: 'Filtrele',
      sort: 'Sırala',
      all: 'Tümü',
      none: 'Hiçbiri',
      yes: 'Evet',
      no: 'Hayır',
    },
    // Meta
    meta: {
      siteTitle: 'AICO Elektronik | Endüstriyel IoT & Mühendislik Çözümleri',
      siteDescription: 'Endüstriyel IoT, fabrika yangın algılama, vibrasyon analizi ve akıllı yaşam çözümleri. AICO Elektronik - 20+ yıllık mühendislik deneyimi ile villa, rezidans ve fabrika projeleri.',
      keywords: 'Endüstriyel IoT, Fabrika Yangın Algılama, Vibrasyon Analizi, AICO Elektronik, Akıllı Villa, Akıllı Rezidans, Kestirimci Bakım, Soğuk Zincir Takip, Maden Güvenliği, Hava Kalitesi İzleme, CO2 Sensör, TVOC Ölçüm, PM2.5 Monitoring',
    },
  },
  en: {
    // Navigation
    nav: {
      solutions: 'Solutions',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      engineeringRequest: 'Request Engineering',
      languageSwitch: 'TR',
    },
    // Footer
    footer: {
      tagline: 'Engineering Solutions',
      description: 'We provide engineering solutions for corporate projects with $100M+ annual revenue.',
      quickLinks: 'Quick Links',
      solutions: 'Solutions',
      products: 'Products',
      resources: 'Resources',
      projects: 'Projects',
      about: 'About',
      careers: 'Careers',
      contact: 'Contact',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      copyright: 'All rights reserved.',
    },
    // Home Page
    home: {
      heroTitle: 'Engineering',
      heroHighlight: 'Showroom',
      heroSubtitle: 'Smart living technologies and industrial automation solutions.',
      exploreProjects: 'Explore Projects',
      discoverSolutions: 'Discover Solutions',
    },
    // Smart Villa Page
    smartVilla: {
      badge: 'SMART VILLA',
      heroTitle: 'Not a house,',
      heroHighlight: 'an organism that knows you.',
      heroSubtitle: 'Personal luxury, invisible technology. Every detail designed for you.',
      scene1Title: 'Morning Wake Mode',
      scene1Text: 'Before sunrise, your home wakes up for you. Blinds slowly open, lights mimic natural sunlight, room temperature adjusts to ideal levels.',
      scene2Title: 'Invisible Security',
      scene2Text: 'No fences, no visible cameras. But 47 sensors active every second. Not AI, but algorithmic analysis for threat detection.',
      scene3Title: 'Predictive Systems',
      scene3Text: 'Climate control ready before you arrive. Synchronized with your car GPS, preparation starts 15 minutes in advance.',
      cta: 'Discuss Your Villa Project',
    },
    // Smart Residence Page
    smartResidence: {
      badge: 'SMART RESIDENCE',
      heroTitle: 'Central Management,',
      heroHighlight: 'Scalable Power.',
      heroSubtitle: 'Full control of 500 units from a single screen. Corporate living standards.',
      scene1Title: 'Platform Management',
      scene1Text: 'Energy consumption, common area lighting, HVAC systems of 500 units from a single screen. Real-time data, intuitive dashboard.',
      scene2Title: 'Smart Access',
      scene2Text: 'QR-coded guest entry. Unlimited users, time-based authorization. Key cards are history.',
      scene3Title: 'Predictive Maintenance',
      scene3Text: 'Will the elevator break down in 3 days? The system knows. 60% reduction in maintenance costs.',
      cta: 'Discuss Your Residence Project',
    },
    // Projects Page
    projects: {
      badge: 'SHOWCASE PROJECTS',
      heroTitle: 'Engineering',
      heroHighlight: 'Portfolio',
      heroSubtitle: 'Discover our engineering approach and results in our R&D projects.',
      viewProject: 'View Project',
      caseStudy: {
        challenge: 'Challenge',
        approach: 'Approach',
        impact: 'Impact',
      },
      featured: 'Featured',
      allProjects: 'All Projects',
    },
    // Contact Page
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s design your project together.',
    },
    // About Page
    about: {
      title: 'About Us',
      subtitle: '20+ years of engineering passion.',
    },
    // Common
    common: {
      loading: 'Loading...',
      systemLoading: 'System Loading',
      error: 'An error occurred',
      errorDescription: 'An unexpected error occurred. Please refresh the page or return to the home page.',
      errorCode: 'Error Code',
      tryAgain: 'Try Again',
      homePage: 'Home',
      supportLink: 'Contact us if the problem persists',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      learnMore: 'Learn More',
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      download: 'Download',
      upload: 'Upload',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      all: 'All',
      none: 'None',
      yes: 'Yes',
      no: 'No',
    },
    // Meta
    meta: {
      siteTitle: 'AICO Elektronik | Industrial IoT & Engineering Solutions',
      siteDescription: 'Industrial IoT, factory fire detection, vibration analysis and smart living solutions. AICO Elektronik - 20+ years of engineering experience for villa, residence, and factory projects.',
      keywords: 'Industrial IoT, Factory Fire Detection, Vibration Analysis, AICO Elektronik, Smart Villa, Smart Residence, Predictive Maintenance, Cold Chain Tracking, Mining Safety, Air Quality Monitoring, CO2 Sensor, TVOC Measurement, PM2.5 Monitoring',
    },
  },
} as const;

// Helper function to get translations
export function getTranslations(locale: Locale) {
  return translations[locale] || translations.tr;
}

// Type for translation keys
export type TranslationKey = keyof typeof translations.tr;
