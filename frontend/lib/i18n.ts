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
      solutions: 'Cozumler',
      projects: 'Projeler',
      about: 'Hakkimizda',
      contact: 'Iletisim',
      engineeringRequest: 'Muhendislik Talep Et',
      languageSwitch: 'EN',
    },
    // Footer
    footer: {
      tagline: 'Muhendislik Çözümleri',
      description: 'Yillik cirosu 100M$+ olan kurumsal projelere muhendislik cozumleri sunuyoruz.',
      quickLinks: 'Hizli Erisim',
      solutions: 'Cozumler',
      projects: 'Projeler',
      about: 'Hakkimizda',
      careers: 'Kariyer',
      contact: 'Iletisim',
      legal: 'Yasal',
      privacy: 'Gizlilik Politikasi',
      terms: 'Kullanim Sartlari',
      copyright: 'Tum haklari saklidir.',
    },
    // Home Page
    home: {
      heroTitle: 'Muhendislik',
      heroHighlight: 'çözümleri',
      heroSubtitle: 'Akilli yasam teknolojileri ve endustriyel otomasyon cozumleri.',
      exploreProjects: 'Projeleri Kesfedin',
      discoverSolutions: 'Cozumleri Inceleyin',
    },
    // Smart Villa Page
    smartVilla: {
      badge: 'AKILLI VILLA',
      heroTitle: 'Ev degil,',
      heroHighlight: 'sizi taniyan bir organizma.',
      heroSubtitle: 'Kisisel luks, gorunmez teknoloji. Her detay size ozel tasarlandi.',
      scene1Title: 'Sabah Uyanis Modu',
      scene1Text: 'Gunes dogmadan once, eviniz sizin icin uyanir. Perdeler yavas yavas acilir, isiklar dogal gunes isigini taklit eder, oda sicakligi ideal seviyeye ayarlanir.',
      scene2Title: 'Gorunmez Guvenlik',
      scene2Text: 'Cit yok, kamera gorunmuyor. Ama her saniye 47 sensor aktif. Yapay zeka degil, algoritmik analiz ile tehdit tespiti.',
      scene3Title: 'Ongoru Sistemleri',
      scene3Text: 'Siz eve gelmeden iklimlendirme hazir. Aracinizdaki GPS ile senkronize, 15 dakika onceden hazirlik baslar.',
      cta: 'Villa Projenizi Konusalim',
    },
    // Smart Residence Page
    smartResidence: {
      badge: 'AKILLI REZIDANS',
      heroTitle: 'Merkezi Yonetim,',
      heroHighlight: 'Olceklenebilir Guc.',
      heroSubtitle: 'Tek ekrandan 500 dairenin tam kontrolu. Kurumsal yasam standartlari.',
      scene1Title: 'Platform Yonetimi',
      scene1Text: 'Tek ekrandan 500 dairenin enerji tuketimi, ortak alan aydinlatmasi, HVAC sistemleri. Gercek zamanli veri, anlasilan dashboard.',
      scene2Title: 'Akilli Erisim',
      scene2Text: 'QR kodlu misafir girisi. Sinirsiz kullanici, zaman bazli yetkilendirme. Anahtar kartlar tarihe karisti.',
      scene3Title: 'Kestirimci Bakim',
      scene3Text: 'Asansor 3 gun sonra arizalanacak mi? Sistem biliyor. Bakim maliyetlerinde %60 azalma.',
      cta: 'Rezidans Projenizi Konusalim',
    },
    // Projects Page
    projects: {
      badge: 'IMAJ PROJELERI',
      heroTitle: 'Muhendislik',
      heroHighlight: 'Portfolyosu',
      heroSubtitle: 'Ar-Ge calismalarimizdaki muhendislik yaklasimimizi ve sonuclari kesfedin.',
      viewProject: 'Projeyi Incele',
      caseStudy: {
        challenge: 'Zorluk',
        approach: 'Yaklasim',
        impact: 'Sonuc',
      },
      featured: 'One Cikan',
      allProjects: 'Tum Projeler',
    },
    // Contact Page
    contact: {
      title: 'Iletisim',
      subtitle: 'Projenizi birlikte tasarlayalim.',
    },
    // About Page
    about: {
      title: 'Hakkimizda',
      subtitle: 'Muhendislik tutkusuyla 20+ yil.',
    },
    // Common
    common: {
      loading: 'Yukleniyor...',
      error: 'Bir hata olustu',
      back: 'Geri',
      next: 'Ileri',
      submit: 'Gonder',
      learnMore: 'Daha Fazla',
    },
    // Meta
    meta: {
      siteTitle: 'AICO Elektronik | Muhendislik Çözümleri',
      siteDescription: 'Akilli yasam teknolojileri ve endustriyel otomasyon cozumleri. Villa, rezidans ve fabrika projeleri icin muhendislik danismanligi.',
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
      projects: 'Projects',
      about: 'About',
      careers: 'Careers',
      contact: 'Contact',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
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
      error: 'An error occurred',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      learnMore: 'Learn More',
    },
    // Meta
    meta: {
      siteTitle: 'AICO Elektronik | Engineering Solutions',
      siteDescription: 'Smart living technologies and industrial automation solutions. Engineering consultancy for villa, residence, and factory projects.',
    },
  },
} as const;

// Helper function to get translations
export function getTranslations(locale: Locale) {
  return translations[locale] || translations.tr;
}

// Type for translation keys
export type TranslationKey = keyof typeof translations.tr;
