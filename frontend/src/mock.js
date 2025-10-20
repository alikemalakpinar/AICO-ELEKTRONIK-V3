// Mock data for Aico Elektronik

export const translations = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      products: 'Ürünler',
      services: 'Hizmetler',
      solutions: 'Çözümler',
      projects: 'Projeler',
      calculators: 'Hesaplamalar',
      capabilities: 'Yetenekler',
      support: 'Destek',
      about: 'Hakkımızda',
      blog: 'Blog',
      contact: 'İletişim',
      getQuote: 'Anında Teklif Al'
    },
    hero: {
      title: 'Güvenilir güç, akıllı çözümler',
      subtitle: 'Endüstriyel güç kaynakları ve LED sürücülerde yüksek verim, tam uyumluluk',
      cta1: 'Ürünleri Keşfet',
      cta2: 'Hızlı Teklif Al',
      proof: '10.000+ kurumsal uygulama | 25+ yıl tecrübe | %98 zamanında teslimat'
    },
    categories: {
      title: 'Ürün Kategorileri',
      viewAll: 'Tümünü Gör'
    },
    sectors: {
      title: 'Sektörel Çözümler',
      subtitle: 'Sektörünüze özel doğrulanmış topolojiler ve seçme listeleri',
      cta: 'Sektörleri Gör'
    },
    calculators: {
      title: 'Mühendisler için Hesaplama Araçları',
      subtitle: 'Doğru ürün seçimi ve boyutlandırma için profesyonel araçlar'
    },
    references: {
      title: 'Referanslarımız'
    },
    newsletter: {
      title: 'Teknik Bülten',
      subtitle: 'Yeni ürünler ve teknik içerikler için kaydolun',
      placeholder: 'E-posta adresiniz',
      button: 'Kaydol'
    },
    footer: {
      description: 'Endüstriyel güç elektroniği ve aydınlatma çözümlerinde uzman',
      company: 'Kurumsal',
      products: 'Ürünler',
      support: 'Destek',
      legal: 'Yasal',
      rights: 'Tüm hakları saklıdır'
    }
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      solutions: 'Solutions',
      projects: 'Projects',
      calculators: 'Calculators',
      support: 'Support',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      getQuote: 'Get Quick Quote'
    },
    hero: {
      title: 'Reliable power, smart solutions',
      subtitle: 'High efficiency and full compliance in industrial power supplies and LED drivers',
      cta1: 'Explore Products',
      cta2: 'Get Quick Quote',
      proof: '10,000+ industrial applications | 25+ years experience | 98% on-time delivery'
    },
    categories: {
      title: 'Product Categories',
      viewAll: 'View All'
    },
    sectors: {
      title: 'Industry Solutions',
      subtitle: 'Verified topologies and selection lists tailored to your industry',
      cta: 'View Industries'
    },
    calculators: {
      title: 'Engineering Calculation Tools',
      subtitle: 'Professional tools for accurate product selection and sizing'
    },
    references: {
      title: 'Our References'
    },
    newsletter: {
      title: 'Technical Newsletter',
      subtitle: 'Subscribe for new products and technical content',
      placeholder: 'Your email address',
      button: 'Subscribe'
    },
    footer: {
      description: 'Expert in industrial power electronics and lighting solutions',
      company: 'Company',
      products: 'Products',
      support: 'Support',
      legal: 'Legal',
      rights: 'All rights reserved'
    }
  }
};

export const productCategories = [
  {
    id: 'power-supplies',
    icon: 'Zap',
    titleTr: 'Güç Kaynakları',
    titleEn: 'Power Supplies',
    descTr: 'Yüksek verimli endüstriyel güç kaynakları',
    descEn: 'High-efficiency industrial power supplies',
    count: 156
  },
  {
    id: 'led-drivers',
    icon: 'Lightbulb',
    titleTr: 'LED Sürücüler',
    titleEn: 'LED Drivers',
    descTr: 'Sabit akım ve sabit voltaj LED sürücüleri',
    descEn: 'Constant current and constant voltage LED drivers',
    count: 89
  },
  {
    id: 'sensors',
    icon: 'Radio',
    titleTr: 'Sensörler',
    titleEn: 'Sensors',
    descTr: 'Endüstriyel sensör çözümleri',
    descEn: 'Industrial sensor solutions',
    count: 124
  },
  {
    id: 'emc-filters',
    icon: 'Shield',
    titleTr: 'EMC/EMI Filtreler',
    titleEn: 'EMC/EMI Filters',
    descTr: 'Elektromanyetik uyumluluk filtreleri',
    descEn: 'Electromagnetic compatibility filters',
    count: 67
  },
  {
    id: 'cables',
    icon: 'Cable',
    titleTr: 'Kablolama ve Konnektörler',
    titleEn: 'Cables & Connectors',
    descTr: 'Endüstriyel kablolama çözümleri',
    descEn: 'Industrial cabling solutions',
    count: 203
  },
  {
    id: 'automation',
    icon: 'Cpu',
    titleTr: 'Endüstriyel Kontrol',
    titleEn: 'Industrial Control',
    descTr: 'Otomasyon ve kontrol sistemleri',
    descEn: 'Automation and control systems',
    count: 98
  }
];

export const sectors = [
  {
    id: 'automotive',
    titleTr: 'Otomotiv',
    titleEn: 'Automotive',
    icon: 'Car'
  },
  {
    id: 'defense',
    titleTr: 'Savunma & Havacılık',
    titleEn: 'Defense & Aerospace',
    icon: 'Plane'
  },
  {
    id: 'energy',
    titleTr: 'Enerji & Altyapı',
    titleEn: 'Energy & Infrastructure',
    icon: 'Fuel'
  },
  {
    id: 'manufacturing',
    titleTr: 'Endüstriyel Üretim',
    titleEn: 'Industrial Manufacturing',
    icon: 'Factory'
  }
];

export const calculatorTools = [
  {
    id: 'power-supply',
    icon: 'Calculator',
    titleTr: 'Güç Kaynağı Seçim Sihirbazı',
    titleEn: 'Power Supply Selection Wizard',
    descTr: 'Giriş/çıkış parametrelerine göre uygun model önerisi',
    descEn: 'Suitable model recommendation based on input/output parameters'
  },
  {
    id: 'led-driver',
    icon: 'Lightbulb',
    titleTr: 'LED Sürücü Hesaplayıcı',
    titleEn: 'LED Driver Calculator',
    descTr: 'LED dizi tasarımı için sürücü boyutlandırma',
    descEn: 'Driver sizing for LED array design'
  },
  {
    id: 'cable-voltage',
    icon: 'Cable',
    titleTr: 'Kablo Kesiti & Gerilim Düşümü',
    titleEn: 'Cable Cross-Section & Voltage Drop',
    descTr: 'Minimum kesit ve gerilim düşümü hesaplama',
    descEn: 'Calculate minimum cross-section and voltage drop'
  }
];

export const mockProducts = [
  {
    id: 'ps-240w-24v',
    code: 'AIC-PS-240W-24V',
    nameTr: 'Endüstriyel Güç Kaynağı 240W 24V',
    nameEn: 'Industrial Power Supply 240W 24V',
    category: 'power-supplies',
    power: 240,
    voltage: 24,
    current: 10,
    efficiency: 94,
    ip: 'IP67',
    certifications: ['CE', 'RoHS'],
    price: 1250,
    stock: true,
    image: 'https://via.placeholder.com/800x600/1554F6/ffffff?text=AIC-PS-240W-24V'
  },
  {
    id: 'ps-120w-12v',
    code: 'AIC-PS-120W-12V',
    nameTr: 'Kompakt Güç Kaynağı 120W 12V',
    nameEn: 'Compact Power Supply 120W 12V',
    category: 'power-supplies',
    power: 120,
    voltage: 12,
    current: 10,
    efficiency: 92,
    ip: 'IP65',
    certifications: ['CE', 'RoHS', 'UL'],
    price: 850,
    stock: true,
    image: 'https://via.placeholder.com/800x600/1554F6/ffffff?text=AIC-PS-120W-12V'
  },
  {
    id: 'led-60w-cc',
    code: 'AIC-LED-60W-CC',
    nameTr: 'LED Sürücü 60W Sabit Akım',
    nameEn: 'LED Driver 60W Constant Current',
    category: 'led-drivers',
    power: 60,
    voltage: 48,
    current: 1.25,
    efficiency: 95,
    ip: 'IP67',
    certifications: ['CE', 'RoHS'],
    price: 680,
    stock: true,
    image: 'https://via.placeholder.com/800x600/1554F6/ffffff?text=AIC-LED-60W-CC'
  },
  {
    id: 'led-100w-dali',
    code: 'AIC-LED-100W-DALI',
    nameTr: 'LED Sürücü 100W DALI Dimmerli',
    nameEn: 'LED Driver 100W DALI Dimmable',
    category: 'led-drivers',
    power: 100,
    voltage: 54,
    current: 1.85,
    efficiency: 94,
    ip: 'IP65',
    certifications: ['CE', 'RoHS', 'ENEC'],
    price: 950,
    stock: true,
    image: 'https://via.placeholder.com/800x600/1554F6/ffffff?text=AIC-LED-100W-DALI'
  },
  {
    id: 'ps-480w-48v',
    code: 'AIC-PS-480W-48V',
    nameTr: 'Yüksek Güç Kaynağı 480W 48V',
    nameEn: 'High Power Supply 480W 48V',
    category: 'power-supplies',
    power: 480,
    voltage: 48,
    current: 10,
    efficiency: 95,
    ip: 'IP65',
    certifications: ['CE', 'RoHS', 'UL'],
    price: 1850,
    stock: true,
    image: 'https://via.placeholder.com/800x600/1554F6/ffffff?text=AIC-PS-480W-48V'
  },
  {
    id: 'sensor-prox-m18',
    code: 'AIC-SEN-M18-PNP',
    nameTr: 'Endüktif Sensör M18 PNP',
    nameEn: 'Inductive Sensor M18 PNP',
    category: 'sensors',
    power: 0,
    voltage: 24,
    current: 0.2,
    efficiency: 0,
    ip: 'IP67',
    certifications: ['CE'],
    price: 320,
    stock: true,
    image: 'https://via.placeholder.com/800x600/1554F6/ffffff?text=AIC-SEN-M18-PNP'
  }
];

export const referenceLogos = [
  { name: 'Bosch', url: 'https://via.placeholder.com/120x60/f5f5f5/666?text=Bosch' },
  { name: 'Siemens', url: 'https://via.placeholder.com/120x60/f5f5f5/666?text=Siemens' },
  { name: 'ABB', url: 'https://via.placeholder.com/120x60/f5f5f5/666?text=ABB' },
  { name: 'Schneider', url: 'https://via.placeholder.com/120x60/f5f5f5/666?text=Schneider' },
  { name: 'TUSAŞ', url: 'https://via.placeholder.com/120x60/f5f5f5/666?text=TUSAS' },
  { name: 'ASELSAN', url: 'https://via.placeholder.com/120x60/f5f5f5/666?text=ASELSAN' },
  { name: 'Ford Otosan', url: 'https://via.placeholder.com/120x60/f5f5f5/666?text=Ford+Otosan' },
  { name: 'TÜPRAŞ', url: 'https://via.placeholder.com/120x60/f5f5f5/666?text=TUPRAS' }
];
