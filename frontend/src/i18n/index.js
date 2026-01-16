import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Premium Translations - TR/EN
const resources = {
  tr: {
    translation: {
      // Navigation
      nav: {
        solutions: 'Cozumler',
        projects: 'Projeler',
        about: 'Hakkimizda',
        contact: 'Iletisim',
        engineeringRequest: 'Muhendislik Talep Et',
        exploreProject: 'Projeyi Kesfet',
      },

      // Hero Section
      hero: {
        tagline: 'Muhendislik & Yasam Teknolojileri',
        title: 'Teknoloji degil,',
        titleHighlight: 'yasam standardi.',
        subtitle: 'Gorunmez sistemler, gorunen konfor. AICO, yasam alanlarinizi sizin icin dusunen organik bir teknoloji katmani olusturur.',
      },

      // Smart Villa Page
      smartVilla: {
        heroTitle: 'Ev degil,',
        heroHighlight: 'sizi taniyan bir organizma.',
        heroSubtitle: 'Akilli Villa cozumumuz, evinizi bir yasam partnerine donusturur. Her detay, sizin icin sessizce calisir.',

        // Scenes
        scene1: {
          label: 'SABAH UYANIS',
          title: 'Gun isigina yumusak gecis',
          description: 'Biyolojik saatinize uyum saglayan perdeler, dogal isigin odaniza sizmasina izin verir. Isitma sistemi, yatak odasinin sicakligini ideal 22°C\'ye getirir.',
          stat1Label: 'Isik Gecisi',
          stat1Value: '15 dk',
          stat2Label: 'Hedef Sicaklik',
          stat2Value: '22°C',
        },
        scene2: {
          label: 'AKILLI GUVENLIK',
          title: 'Gorunmez cit, gorunen huzur',
          description: 'Algoritmik goruntu isleme, tanidik yuzleri ayirt eder. Yabancilar icin aninda bildirim, tanidiginiiz icin sessiz kabul.',
          stat1Label: 'Yuz Tanima',
          stat1Value: '<0.3sn',
          stat2Label: 'Dogruluk',
          stat2Value: '%99.7',
        },
        scene3: {
          label: 'ONGORULU KONFOR',
          title: 'Siz eve gelmeden hazirlanan iklimlendirme',
          description: 'Konumunuz eve 15 dakika mesafedeyken, sistem otomatik olarak tercih ettiginiz sicaklik ve nem degerlerine ulasir.',
          stat1Label: 'On Hazirlama',
          stat1Value: '15 dk',
          stat2Label: 'Enerji Tasarrufu',
          stat2Value: '%40',
        },
        scene4: {
          label: 'ENERJI YONETIMI',
          title: 'Gorunmez verimlilik, hissedilir tasarruf',
          description: 'Gunes panelleri, batarya depolama ve sebekeden bagimsiz calisma. Eviniz, kendi enerjisini ureten bir organizmaya donusur.',
          stat1Label: 'Bagimsizlik',
          stat1Value: '%85',
          stat2Label: 'Yillik Tasarruf',
          stat2Value: '12.000kWh',
        },

        // CTA
        ctaTitle: 'Villa projenizi kesfetmeye hazir misiniz?',
        ctaSubtitle: 'Muhendislik ekibimiz, yasam alaniniza ozel bir cozum tasarlamak icin sizinle gorusmeyi bekliyor.',
        ctaButton: 'Muhendislik Gorismesi Talep Et',
      },

      // Smart Residence Page
      smartResidence: {
        heroTitle: 'Merkezi yonetim,',
        heroHighlight: 'olceklenebilir guc.',
        heroSubtitle: 'Tek bir platformdan 500 dairenin enerji, guvenlik ve konfor sistemlerini yonetin. Olceklenebilir, guvenilir, verimli.',

        // Scenes
        scene1: {
          label: 'MERKEZI PLATFORM',
          title: 'Tek ekrandan tum kontrol',
          description: 'Butun bina sistemleri - HVAC, aydinlatma, guvenlik, asansorler - tek bir merkezi panelden izlenir ve yonetilir.',
          stat1Label: 'Entegre Sistem',
          stat1Value: '12+',
          stat2Label: 'Gercek Zamanli',
          stat2Value: '24/7',
        },
        scene2: {
          label: 'AKILLI ERISIM',
          title: 'QR kodlu misafir girisi ve yetkilendirme',
          description: 'Sakinler, tek kullanimlik QR kodlari ile misafirlerine gecici erisim saglar. Tum girisler loglanir ve raporlanir.',
          stat1Label: 'Erisim Suresi',
          stat1Value: '<1sn',
          stat2Label: 'Guvenlik Seviyesi',
          stat2Value: 'AES-256',
        },
        scene3: {
          label: 'KESTIRIMCI BAKIM',
          title: 'Arizayi olusmadan bilen sistem',
          description: 'Noral islem algoritmalarimiz, ekipman performansini surekli izler. Potansiyel arizalar, olusmasindan gunler once tespit edilir.',
          stat1Label: 'Ongorulebilirlik',
          stat1Value: '%94',
          stat2Label: 'Bakim Maliyeti',
          stat2Value: '-%60',
        },
        scene4: {
          label: 'ENERJI OPTIMIZASYONU',
          title: 'Bina genelinde akilli enerji yonetimi',
          description: 'Yuk dengeleme, tepe saat yonetimi ve yenilenebilir enerji entegrasyonu. Her kilovatsaat optimize edilir.',
          stat1Label: 'Enerji Tasarrufu',
          stat1Value: '%35',
          stat2Label: 'Karbon Azaltimi',
          stat2Value: '120 ton/yil',
        },

        // CTA
        ctaTitle: 'Rezidansiniz icin demo talep edin',
        ctaSubtitle: 'Proje yoneticilerimiz, bina ozelliklerinize uygun bir sunum hazirlamak icin sizinle iletisime gecsin.',
        ctaButton: 'Demo Toplantisi Ayarla',
      },

      // Projects Portfolio
      projects: {
        heroTitle: 'Muhendislik',
        heroHighlight: 'Portfolyosu',
        heroSubtitle: 'Ar-Ge calismalarimizdaki muhendislik yaklasimimizi ve sonuclarini kesfet.',

        filterAll: 'Tumu',
        filterVilla: 'Villa',
        filterResidence: 'Rezidans',
        filterIndustrial: 'Endustriyel',

        caseStudy: {
          challenge: 'Zorluk',
          approach: 'Muhendislik Yaklasimi',
          impact: 'Sonuc',
        },

        viewProject: 'Projeyi Incele',
      },

      // Footer
      footer: {
        tagline: 'Muhendislik & Yasam Teknolojileri',
        solutions: 'Cozumler',
        company: 'Sirket',
        contact: 'Iletisim',
        privacy: 'Gizlilik Politikasi',
        terms: 'Kullanim Sartlari',
        copyright: '© 2024 AICO Elektronik. Tum haklari saklidir.',
      },

      // Common
      common: {
        learnMore: 'Daha Fazla',
        getStarted: 'Baslayalim',
        scrollDown: 'Asagi kaydir',
        loading: 'Yukleniyor...',
      },
    },
  },

  en: {
    translation: {
      // Navigation
      nav: {
        solutions: 'Solutions',
        projects: 'Projects',
        about: 'About',
        contact: 'Contact',
        engineeringRequest: 'Request Engineering',
        exploreProject: 'Explore Project',
      },

      // Hero Section
      hero: {
        tagline: 'Engineering & Life Technologies',
        title: 'Not technology,',
        titleHighlight: 'a life standard.',
        subtitle: 'Invisible systems, visible comfort. AICO creates an organic technology layer that thinks for your living spaces.',
      },

      // Smart Villa Page
      smartVilla: {
        heroTitle: 'Not a home,',
        heroHighlight: 'an organism that knows you.',
        heroSubtitle: 'Our Smart Villa solution transforms your home into a life partner. Every detail works silently for you.',

        // Scenes
        scene1: {
          label: 'MORNING WAKE-UP',
          title: 'Gentle transition to daylight',
          description: 'Curtains that adapt to your biological clock allow natural light to seep into your room. The heating system brings the bedroom temperature to an ideal 22°C.',
          stat1Label: 'Light Transition',
          stat1Value: '15 min',
          stat2Label: 'Target Temp',
          stat2Value: '22°C',
        },
        scene2: {
          label: 'SMART SECURITY',
          title: 'Invisible fence, visible peace',
          description: 'Algorithmic image processing distinguishes familiar faces. Instant notification for strangers, silent acceptance for those you know.',
          stat1Label: 'Face Recognition',
          stat1Value: '<0.3sec',
          stat2Label: 'Accuracy',
          stat2Value: '99.7%',
        },
        scene3: {
          label: 'PREDICTIVE COMFORT',
          title: 'Climate prepared before you arrive',
          description: 'When your location is 15 minutes from home, the system automatically reaches your preferred temperature and humidity levels.',
          stat1Label: 'Pre-conditioning',
          stat1Value: '15 min',
          stat2Label: 'Energy Savings',
          stat2Value: '40%',
        },
        scene4: {
          label: 'ENERGY MANAGEMENT',
          title: 'Invisible efficiency, tangible savings',
          description: 'Solar panels, battery storage, and grid-independent operation. Your home transforms into an organism that produces its own energy.',
          stat1Label: 'Independence',
          stat1Value: '85%',
          stat2Label: 'Annual Savings',
          stat2Value: '12,000kWh',
        },

        // CTA
        ctaTitle: 'Ready to explore your villa project?',
        ctaSubtitle: 'Our engineering team is waiting to discuss a custom solution for your living space.',
        ctaButton: 'Request Engineering Consultation',
      },

      // Smart Residence Page
      smartResidence: {
        heroTitle: 'Central management,',
        heroHighlight: 'scalable power.',
        heroSubtitle: 'Manage energy, security, and comfort systems of 500 units from a single platform. Scalable, reliable, efficient.',

        // Scenes
        scene1: {
          label: 'CENTRAL PLATFORM',
          title: 'Complete control from one screen',
          description: 'All building systems - HVAC, lighting, security, elevators - are monitored and managed from a single central panel.',
          stat1Label: 'Integrated Systems',
          stat1Value: '12+',
          stat2Label: 'Real-time',
          stat2Value: '24/7',
        },
        scene2: {
          label: 'SMART ACCESS',
          title: 'QR code guest entry and authorization',
          description: 'Residents provide temporary access to their guests with single-use QR codes. All entries are logged and reported.',
          stat1Label: 'Access Time',
          stat1Value: '<1sec',
          stat2Label: 'Security Level',
          stat2Value: 'AES-256',
        },
        scene3: {
          label: 'PREDICTIVE MAINTENANCE',
          title: 'A system that knows failures before they occur',
          description: 'Our neural processing algorithms continuously monitor equipment performance. Potential failures are detected days before they occur.',
          stat1Label: 'Predictability',
          stat1Value: '94%',
          stat2Label: 'Maintenance Cost',
          stat2Value: '-60%',
        },
        scene4: {
          label: 'ENERGY OPTIMIZATION',
          title: 'Building-wide smart energy management',
          description: 'Load balancing, peak hour management, and renewable energy integration. Every kilowatt-hour is optimized.',
          stat1Label: 'Energy Savings',
          stat1Value: '35%',
          stat2Label: 'Carbon Reduction',
          stat2Value: '120 tons/year',
        },

        // CTA
        ctaTitle: 'Request a demo for your residence',
        ctaSubtitle: 'Our project managers will contact you to prepare a presentation tailored to your building specifications.',
        ctaButton: 'Schedule Demo Meeting',
      },

      // Projects Portfolio
      projects: {
        heroTitle: 'Engineering',
        heroHighlight: 'Portfolio',
        heroSubtitle: 'Discover our engineering approach and results in our R&D projects.',

        filterAll: 'All',
        filterVilla: 'Villa',
        filterResidence: 'Residence',
        filterIndustrial: 'Industrial',

        caseStudy: {
          challenge: 'Challenge',
          approach: 'Engineering Approach',
          impact: 'Impact',
        },

        viewProject: 'View Project',
      },

      // Footer
      footer: {
        tagline: 'Engineering & Life Technologies',
        solutions: 'Solutions',
        company: 'Company',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        copyright: '© 2024 AICO Electronics. All rights reserved.',
      },

      // Common
      common: {
        learnMore: 'Learn More',
        getStarted: 'Get Started',
        scrollDown: 'Scroll down',
        loading: 'Loading...',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    defaultNS: 'translation',

    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
