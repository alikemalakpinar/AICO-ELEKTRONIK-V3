// ===========================================
// AICO Engineering - Project Data
// Merkezi Proje Veritabani
// ===========================================

import type { Project, LocalizedContent, CategoryFilter } from '@/types';

// ===========================================
// GERCEK MUHENDISLIK PROJELERI
// ===========================================

export const PROJECTS: LocalizedContent<Project[]> = {
  tr: [
    // ============================================
    // 1. ENDUSTRIYEL IOT YANGIN ANALIZ MODULU
    // ============================================
    {
      id: 'fire-analysis-module',
      slug: 'endustriyel-iot-yangin-analiz-modulu',
      title: 'Endustriyel IoT Yangin Analiz Modulu',
      subtitle: 'Edge AI Destekli Akilli Guvenlik Sistemi',
      category: 'embedded',
      year: '2023',
      description:
        'Yapay sinir aglari ile duman ve isi verilerini nanosaniyeler icinde isleyen, yanlis alarm orani %0.01 olan, kendi kendine karar verebilen uc (edge) guvenlik donanimi.',
      fullDetailText: `
        Geleneksel yangin dedektorleri, yuksek yanlis alarm oranlari ve gec tepki sureleri nedeniyle endustriyel ortamlarda ciddi guvenlik aciklarina neden olmaktaydi. Bu proje kapsaminda, yapay zeka destekli yeni nesil bir yangin algilama sistemi gelistirdik.

        Sistemimiz, STM32 mikrodenetleyici uzerinde calisan ozel bir sinir agi modeli kullanarak duman yogunlugu, sicaklik degisimi ve partikul analizi verilerini gercek zamanli olarak isliyor. Edge computing yaklasimi sayesinde, bulut baglantisi olmadan bile milisaniyeler icinde karar verebiliyor.

        LoRaWAN protokolu ile 2km+ menzilde kablosuz iletisim saglayan sistem, ATEX sertifikasyonuna uygun olarak tehlikeli ortamlarda guvenle kullanilabiliyor.
      `,
      challenge:
        'Geleneksel yangin dedektorlerinin yuksek yanlis alarm orani (%15+) ve gec tepki suresi (>5 saniye) sorunlarinin cozumu.',
      solution:
        'Yapay sinir aglari ile duman ve isi verilerini nanosaniyeler icinde isleyen, ucta (edge) karar verebilen donanim tasarimi. Coklu sensor fuzyon algoritmasi ile yanlis alarm oranini %0.01e dusurduk.',
      techStack: [
        { name: 'STM32', icon: 'cpu', category: 'hardware' },
        { name: 'Altium Designer', icon: 'layout', category: 'hardware' },
        { name: 'Edge AI', icon: 'brain', category: 'software' },
        { name: 'C/C++', icon: 'code', category: 'software' },
        { name: 'LoRaWAN', icon: 'radio', category: 'protocol' },
        { name: 'TensorFlow Lite', icon: 'brain', category: 'software' },
      ],
      stats: [
        { label: 'Algilama Suresi', value: '<50ms' },
        { label: 'Yanlis Alarm', value: '%0.01' },
        { label: 'Menzil', value: '2km+' },
        { label: 'Batarya Omru', value: '5 Yil' },
      ],
      tags: ['Altium', 'STM32', 'Edge AI', 'C++', 'LoRaWAN', 'ATEX'],
      images: [
        { src: '/assets/projects/fire-module-pcb.jpg', alt: 'Yangin Modulu PCB', caption: 'Ana kart tasarimi' },
        { src: '/assets/projects/fire-module-render.jpg', alt: '3D Render', caption: 'Urun gorsellestirmesi' },
      ],
      featured: true,
      cta: {
        text: 'Benzer bir IoT projesi mi dusunuyorsunuz?',
        link: '/tr/contact?subject=consultation',
      },
    },

    // ============================================
    // 2. YERALTI PERSONEL KONUMLANDIRMA AGI
    // ============================================
    {
      id: 'underground-mining-safety',
      slug: 'yeralti-personel-konumlandirma-agi',
      title: 'Yeralti Personel Konumlandirma Agi',
      subtitle: 'Maden Guvenligi icin RF Mesh Teknolojisi',
      category: 'industrial',
      year: '2022',
      description:
        'GPS sinyalinin olmadigi maden tunellerinde, RF Mesh teknolojisi ile personelin anlik konumunu ve saglik durumunu (Man-Down) takip eden ATEX uyumlu guvenlik sistemi.',
      fullDetailText: `
        Maden kazalari sirasinda en kritik sorun, mahsur kalan isciloerin konumlarinin belirlenmesidir. GPS sinyallerinin yeralti ortamlarinda calismadigini goz onunde bulundurarak, tamamen RF tabanli bir konumlandirma sistemi gelistirdik.

        Zigbee ve ozel RF protokolleri kullanarak olusturduiumuz mesh agi, metrelerce kaya katmaninin altinda bile guvenilir iletisim sagliyor. Her isci, uzerinde tasidigi bileklik tipi cihaz sayesinde anlik olarak takip edilebiliyor.

        Man-Down (hareketsizlik) algilama ozelligi, bir iscinin 30 saniyeden fazla hareketsiz kaldiginda otomatik alarm gonderiyor. Sistem, ATEX Zone 1 sertifikasina sahip olup patlayici ortamlarda guvenle kullanilabiliyor.
      `,
      challenge:
        'GPS sinyalinin olmadigi maden tunellerinde personel takibi ve acil durum haberlesme sisteminin kurulmasi.',
      solution:
        'RF Mesh teknolojisi ile metrelerce kaya altinda bile calisan, Man-Down (hareketsizlik) algilama ozellikli, ATEX uyumlu tasarim.',
      techStack: [
        { name: 'RF Mesh', icon: 'radio', category: 'protocol' },
        { name: 'Zigbee', icon: 'wifi', category: 'protocol' },
        { name: 'Embedded C', icon: 'code', category: 'software' },
        { name: 'Low Power Design', icon: 'battery', category: 'hardware' },
        { name: 'ATEX Certification', icon: 'shield', category: 'hardware' },
      ],
      stats: [
        { label: 'Kapsama Alani', value: '2km+' },
        { label: 'Batarya Omru', value: '2 Yil' },
        { label: 'Konum Hassasiyeti', value: '±3m' },
        { label: 'Sertifikasyon', value: 'ATEX Zone 1' },
      ],
      tags: ['RF Mesh', 'Zigbee', 'Embedded C', 'Safety', 'ATEX', 'Mining'],
      images: [
        { src: '/assets/projects/mining-wearable.jpg', alt: 'Maden Takip Cihazi', caption: 'Bileklik tipi izleme unitesi' },
        { src: '/assets/projects/mining-gateway.jpg', alt: 'Gateway Unitesi', caption: 'Tunel icidoor gateway' },
      ],
      featured: true,
      cta: {
        text: 'Endustriyel guvenlik cozumu mu ariyorsunuz?',
        link: '/tr/contact?subject=new-project',
      },
    },

    // ============================================
    // 3. PID KONTROLLU BARISTA OTOMASYONU
    // ============================================
    {
      id: 'smart-coffee-automation',
      slug: 'pid-kontrollu-barista-otomasyonu',
      title: 'PID Kontrollu Barista Otomasyonu',
      subtitle: 'Hassas Sicaklik Yonetimi ile Mukemmel Kahve',
      category: 'consumer',
      year: '2023',
      description:
        'Profesyonel kahve makineleri icin gelistirilen; basinc profili ve su sicakligini 0.1°C hassasiyetle kontrol eden, dokunmatik ekranli ana kart tasarimi.',
      fullDetailText: `
        Kahve yapiminda tutarli tat profili elde etmek, sicaklik ve basinci hassas bir sekilde kontrol etmeyi gerektirir. Bu proje kapsaminda, profesyonel espresso makineleri icin tam otomatik bir kontrol sistemi gelistirdik.

        PID (Proportional-Integral-Derivative) algoritmasi kullanarak su sicakligini ±0.1°C hassasiyetle kontrol ediyoruz. Akis olcer entegrasyonu sayesinde su miktari da gram bazinda ayarlanabiliyor.

        7" kapasitif dokunmatik ekran uzerindeki ozel arayuz, kullanicilara profil olusturma, zaman ayarlama ve istatistik takibi imkani sunuyor. Sistem ayrica Wi-Fi uzerinden uzaktan izlenebiliyor.
      `,
      challenge:
        'Profesyonel kahve makinelerinde tutarli tat profili icin hassas sicaklik (±0.5°C) ve basinc kontrolu.',
      solution:
        'PID algoritmalari ile 0.1°C hassasiyetinde isi yonetimi, akis olcer entegrasyonu ve 7" dokunmatik HMI tasarimi. IoT baglantisi ile uzaktan izleme.',
      techStack: [
        { name: 'PID Control', icon: 'sliders', category: 'software' },
        { name: 'HMI Design', icon: 'monitor', category: 'hardware' },
        { name: 'Embedded C++', icon: 'code', category: 'software' },
        { name: 'Power Electronics', icon: 'zap', category: 'hardware' },
        { name: 'Flow Sensor', icon: 'droplet', category: 'hardware' },
      ],
      stats: [
        { label: 'Sicaklik Hassasiyeti', value: '±0.1°C' },
        { label: 'Tutarlilik', value: '%98' },
        { label: 'Enerji Tasarrufu', value: '%25' },
        { label: 'Ekran', value: '7" Touch' },
      ],
      tags: ['PID Control', 'HMI Design', 'Embedded C++', 'Power Electronics', 'IoT'],
      images: [
        { src: '/assets/projects/coffee-pcb.jpg', alt: 'Kahve Makinesi PCB', caption: 'Ana kontrol karti' },
        { src: '/assets/projects/coffee-hmi.jpg', alt: 'HMI Ekrani', caption: 'Kullanici arayuzu' },
      ],
      featured: true,
      cta: {
        text: 'Tuketici elektronigi projesi mi planliyorsunuz?',
        link: '/tr/contact?subject=consultation',
      },
    },

    // ============================================
    // 4. KRITIK SOGUK ZINCIR IZLEME SISTEMI
    // ============================================
    {
      id: 'cold-chain-monitoring',
      slug: 'kritik-soguk-zincir-izleme-sistemi',
      title: 'Kritik Soguk Zincir Izleme Sistemi',
      subtitle: 'Ilac ve Gida Guvenliginde %99.99 Uptime',
      category: 'iot',
      year: '2023',
      description:
        'Ilac ve gida depolari icin -40°C zorlu kosullarda calisan, elektrik kesintisinde dahi 48 saat veri aktarabilen GSM tabanli izleme unitesi.',
      fullDetailText: `
        Soguk zincir lojistiginde sicaklik sapmasi, milyonlarca dolarlik urun kaybina ve halk sagligi risklerine yol acabilir. Bu proje kapsaminda, FDA ve ISO 22000 standartlarina uygun bir izleme sistemi gelistirdik.

        Ozel tasarlanmis PCB, -40°C ile +85°C arasinda sorunsuz calisabiliyor. Dahili batarya sistemi, elektrik kesintisinde 48 saat boyunca veri kaydi ve GSM uzerinden bildirim gondermeye devam ediyor.

        Bulut tabanli dashboard, tum depolarin anlik sicaklik haritasini gosteriyor. Esik degeri asimlarinda SMS ve e-posta ile aninda alarm gonderiyor.
      `,
      challenge:
        'Ilac ve gida depolarinda -40°C kosullarda kesintisiz sicaklik izleme ve FDA/ISO uyumluluk.',
      solution:
        'Ozel PCB tasarimi ile -40°C dayanim, GSM tabanli veri aktarimi, bulut dashboard ve 48 saat otonom calisma suresi.',
      techStack: [
        { name: 'GSM/GPRS', icon: 'signal', category: 'protocol' },
        { name: 'Cloud IoT', icon: 'cloud', category: 'platform' },
        { name: 'PCB Design', icon: 'layout', category: 'hardware' },
        { name: 'MQTT', icon: 'message-square', category: 'protocol' },
        { name: 'React Dashboard', icon: 'monitor', category: 'software' },
      ],
      stats: [
        { label: 'Calisma Araligi', value: '-40°C / +85°C' },
        { label: 'Sistem Uptime', value: '%99.99' },
        { label: 'Otonom Sure', value: '48 Saat' },
        { label: 'Urun Kaybi Azalmasi', value: '%85' },
      ],
      tags: ['GSM/GPRS', 'Cloud IoT', 'PCB Design', 'MQTT', 'FDA', 'ISO 22000'],
      images: [
        { src: '/assets/projects/cold-chain-device.jpg', alt: 'Soguk Zincir Cihazi', caption: 'Izleme unitesi' },
        { src: '/assets/projects/cold-chain-dashboard.jpg', alt: 'Cloud Dashboard', caption: 'Izleme paneli' },
      ],
      featured: false,
      cta: {
        text: 'Lojistik IoT cozumu mu ariyorsunuz?',
        link: '/tr/contact?subject=new-project',
      },
    },

    // ============================================
    // 5. KESTIRIMCI BAKIM & TITRESIM ANALIZORU
    // ============================================
    {
      id: 'predictive-maintenance',
      slug: 'kestirimci-bakim-titresim-analizoru',
      title: 'Kestirimci Bakim & Titresim Analizoru',
      subtitle: 'Arizayi 2 Hafta Onceden Tahmin Eden AI',
      category: 'industrial',
      year: '2024',
      description:
        'Sanayi motorlarinin titresimlerini FFT algoritmalarıyla analiz ederek, rulman arizalarini olusmadan 2 hafta once tespit eden yapay zeka destekli sistem.',
      fullDetailText: `
        Planlanmamis makine duruslari, uretim tesislerinde yillik milyonlarca dolar kayba neden olur. Bu proje kapsaminda, motor sagligi izleme ve ariza tahmini yapan bir Industry 4.0 cozumu gelistirdik.

        Yuksek hassasiyetli MEMS akselerometre sensorleri, saniyede 10.000 ornekleme hizinda titresim verisi topluyor. Bu veri, FFT (Fast Fourier Transform) algoritmasi ile frekans domenine donusturuluyor.

        Makine ogrenimi modeli, titresim desenlerindeki anomalileri tespit ederek rulman, yataklandirma ve dengesizlik arizalarini 2 hafta oncesinden tahmin edebiliyor. Sistem, OPC-UA protokolu ile mevcut SCADA sistemlerine entegre oluyor.
      `,
      challenge:
        'Sanayi motorlarinda beklenmedik arizalarin once tespiti ve planli bakim optimizasyonu.',
      solution:
        'FFT (Fast Fourier Transform) algoritmalari ile titresim analizi, makine ogrenimi tabanli ariza tahmini, OPC-UA entegrasyonu.',
      techStack: [
        { name: 'DSP', icon: 'activity', category: 'software' },
        { name: 'Python', icon: 'code', category: 'software' },
        { name: 'FFT Analysis', icon: 'bar-chart', category: 'software' },
        { name: 'Machine Learning', icon: 'brain', category: 'software' },
        { name: 'OPC-UA', icon: 'server', category: 'protocol' },
        { name: 'SCADA', icon: 'monitor', category: 'platform' },
      ],
      stats: [
        { label: 'Ornekleme Hizi', value: '10kHz' },
        { label: 'Tahmin Suresi', value: '2 Hafta' },
        { label: 'Durus Azalmasi', value: '%78' },
        { label: 'ROI', value: '6 Ay' },
      ],
      tags: ['DSP', 'Python', 'FFT', 'Machine Learning', 'Industry 4.0', 'SCADA'],
      images: [
        { src: '/assets/projects/vibration-sensor.jpg', alt: 'Titresim Sensoru', caption: 'MEMS akselerometre' },
        { src: '/assets/projects/vibration-dashboard.jpg', alt: 'Analiz Ekrani', caption: 'FFT spektrum analizi' },
      ],
      featured: false,
      cta: {
        text: 'Industry 4.0 donusumu icin gorusme talep et',
        link: '/tr/contact?subject=consultation',
      },
    },

    // ============================================
    // 6. NUVIA ETKINLIK YONETIM PLATFORMU
    // ============================================
    {
      id: 'nuvia-crm',
      slug: 'nuvia-etkinlik-yonetim-platformu',
      title: 'Nuvia Etkinlik Yonetim Platformu',
      subtitle: 'Enterprise SaaS ile Olceklenebilir Organizasyon',
      category: 'saas',
      year: '2024',
      description:
        'Buyuk olcekli organizasyonlar icin uctan uca planlama, butce yonetimi ve operasyonel takip saglayan, modern web ve mobil tabanli CRM altyapisi.',
      fullDetailText: `
        Kurumsal etkinlik yonetimi, karmasik planlama, butce takibi ve gercek zamanli koordinasyon gerektirir. Nuvia platformu, bu ihtiyaclari tek bir cati altinda toplayan kapsamli bir SaaS cozumudur.

        Mikroservis mimarisi uzerine insa edilen platform, yuz binlerce kullaniciyi es zamanli olarak destekleyebiliyor. React Native ile gelistirilen mobil uygulama, iOS ve Android platformlarinda sorunsuz calisıyor.

        AWS altyapisi uzerinde calisan sistem, %99.9 uptime garantisi sunuyor. Gercek zamanli misafir takibi, QR kodlu check-in ve anlık raporlama ozellikleri ile etkinlik yoneticilerine tam kontrol sagliyor.
      `,
      challenge:
        'Buyuk olcekli organizasyonlar icin uctan uca planlama, butce ve operasyonel takip ihtiyaci.',
      solution:
        'Mikroservis mimarisi, React Native mobil, AWS altyapisi ve gercek zamanli misafir takibi ile enterprise seviye olceklenebilirlik.',
      techStack: [
        { name: 'React Native', icon: 'smartphone', category: 'software' },
        { name: 'Node.js', icon: 'server', category: 'software' },
        { name: 'AWS', icon: 'cloud', category: 'platform' },
        { name: 'MongoDB', icon: 'database', category: 'platform' },
        { name: 'GraphQL', icon: 'share-2', category: 'protocol' },
        { name: 'Redis', icon: 'zap', category: 'platform' },
      ],
      stats: [
        { label: 'Platform', value: 'Web/Mobile' },
        { label: 'Olcek', value: 'Enterprise' },
        { label: 'Uptime', value: '%99.9' },
        { label: 'Musteri', value: '50+' },
      ],
      tags: ['React Native', 'Node.js', 'AWS', 'MongoDB', 'SaaS', 'Enterprise'],
      images: [
        { src: '/assets/projects/nuvia-dashboard.jpg', alt: 'Nuvia Dashboard', caption: 'Yonetim paneli' },
        { src: '/assets/projects/nuvia-mobile.jpg', alt: 'Mobil Uygulama', caption: 'iOS ve Android' },
      ],
      featured: false,
      cta: {
        text: 'Ozel yazilim projesi gorusmesi icin iletisime gec',
        link: '/tr/contact?subject=new-project',
      },
    },
  ],

  en: [
    // ============================================
    // 1. INDUSTRIAL IOT FIRE ANALYSIS MODULE
    // ============================================
    {
      id: 'fire-analysis-module',
      slug: 'industrial-iot-fire-analysis-module',
      title: 'Industrial IoT Fire Analysis Module',
      subtitle: 'Edge AI Powered Smart Safety System',
      category: 'embedded',
      year: '2023',
      description:
        'Hardware design with neural networks processing smoke and heat data in nanoseconds, with 0.01% false alarm rate, capable of autonomous edge decision-making.',
      fullDetailText: `
        Traditional fire detectors cause serious safety gaps in industrial environments due to high false alarm rates and slow response times. In this project, we developed a next-generation AI-powered fire detection system.

        Our system uses a custom neural network model running on STM32 microcontroller to process smoke density, temperature change, and particle analysis data in real-time. Thanks to the edge computing approach, it can make decisions within milliseconds even without cloud connectivity.

        The system provides wireless communication up to 2km+ range with LoRaWAN protocol and can be safely used in hazardous environments with ATEX certification compliance.
      `,
      challenge:
        'Solving the high false alarm rate (15%+) and slow response time (>5 seconds) of traditional fire detectors.',
      solution:
        'Hardware design with neural networks processing smoke and heat data in nanoseconds, capable of edge decision-making. Multi-sensor fusion algorithm reduced false alarm rate to 0.01%.',
      techStack: [
        { name: 'STM32', icon: 'cpu', category: 'hardware' },
        { name: 'Altium Designer', icon: 'layout', category: 'hardware' },
        { name: 'Edge AI', icon: 'brain', category: 'software' },
        { name: 'C/C++', icon: 'code', category: 'software' },
        { name: 'LoRaWAN', icon: 'radio', category: 'protocol' },
        { name: 'TensorFlow Lite', icon: 'brain', category: 'software' },
      ],
      stats: [
        { label: 'Detection Time', value: '<50ms' },
        { label: 'False Alarm', value: '0.01%' },
        { label: 'Range', value: '2km+' },
        { label: 'Battery Life', value: '5 Years' },
      ],
      tags: ['Altium', 'STM32', 'Edge AI', 'C++', 'LoRaWAN', 'ATEX'],
      images: [
        { src: '/assets/projects/fire-module-pcb.jpg', alt: 'Fire Module PCB', caption: 'Main board design' },
        { src: '/assets/projects/fire-module-render.jpg', alt: '3D Render', caption: 'Product visualization' },
      ],
      featured: true,
      cta: {
        text: 'Considering a similar IoT project?',
        link: '/en/contact?subject=consultation',
      },
    },

    // ============================================
    // 2. UNDERGROUND PERSONNEL POSITIONING NETWORK
    // ============================================
    {
      id: 'underground-mining-safety',
      slug: 'underground-personnel-positioning-network',
      title: 'Underground Personnel Positioning Network',
      subtitle: 'RF Mesh Technology for Mining Safety',
      category: 'industrial',
      year: '2022',
      description:
        'ATEX-compliant safety system that tracks personnel location and health status (Man-Down) in real-time using RF Mesh technology in mine tunnels without GPS signal.',
      fullDetailText: `
        During mining accidents, the most critical issue is determining the location of trapped workers. Considering that GPS signals do not work in underground environments, we developed a fully RF-based positioning system.

        The mesh network we created using Zigbee and custom RF protocols provides reliable communication even under meters of rock layers. Each worker can be tracked in real-time through a wristband-type device.

        The Man-Down (immobility) detection feature automatically sends an alarm when a worker remains motionless for more than 30 seconds. The system is ATEX Zone 1 certified and can be safely used in explosive environments.
      `,
      challenge:
        'Establishing personnel tracking and emergency communication in mine tunnels without GPS signal.',
      solution:
        'RF Mesh technology working even under meters of rock, with Man-Down (immobility) detection feature, ATEX-compliant design.',
      techStack: [
        { name: 'RF Mesh', icon: 'radio', category: 'protocol' },
        { name: 'Zigbee', icon: 'wifi', category: 'protocol' },
        { name: 'Embedded C', icon: 'code', category: 'software' },
        { name: 'Low Power Design', icon: 'battery', category: 'hardware' },
        { name: 'ATEX Certification', icon: 'shield', category: 'hardware' },
      ],
      stats: [
        { label: 'Coverage Area', value: '2km+' },
        { label: 'Battery Life', value: '2 Years' },
        { label: 'Position Accuracy', value: '±3m' },
        { label: 'Certification', value: 'ATEX Zone 1' },
      ],
      tags: ['RF Mesh', 'Zigbee', 'Embedded C', 'Safety', 'ATEX', 'Mining'],
      images: [
        { src: '/assets/projects/mining-wearable.jpg', alt: 'Mining Tracking Device', caption: 'Wristband tracking unit' },
        { src: '/assets/projects/mining-gateway.jpg', alt: 'Gateway Unit', caption: 'In-tunnel gateway' },
      ],
      featured: true,
      cta: {
        text: 'Looking for industrial safety solutions?',
        link: '/en/contact?subject=new-project',
      },
    },

    // ============================================
    // 3. PID CONTROLLED BARISTA AUTOMATION
    // ============================================
    {
      id: 'smart-coffee-automation',
      slug: 'pid-controlled-barista-automation',
      title: 'PID Controlled Barista Automation',
      subtitle: 'Perfect Coffee with Precision Temperature Management',
      category: 'consumer',
      year: '2023',
      description:
        'Main board design for professional coffee machines featuring pressure profile and water temperature control with 0.1°C precision, with touchscreen interface.',
      fullDetailText: `
        Achieving consistent taste profile in coffee making requires precise control of temperature and pressure. In this project, we developed a fully automatic control system for professional espresso machines.

        Using PID (Proportional-Integral-Derivative) algorithm, we control water temperature with ±0.1°C precision. Flow meter integration allows water quantity to be adjusted on a gram basis.

        The custom interface on the 7" capacitive touchscreen offers users profile creation, time adjustment, and statistics tracking. The system can also be monitored remotely via Wi-Fi.
      `,
      challenge:
        'Precise temperature (±0.5°C) and pressure control for consistent taste profile in professional coffee machines.',
      solution:
        'PID algorithms with 0.1°C precision heat management, flow meter integration, and 7" touchscreen HMI design. Remote monitoring via IoT connectivity.',
      techStack: [
        { name: 'PID Control', icon: 'sliders', category: 'software' },
        { name: 'HMI Design', icon: 'monitor', category: 'hardware' },
        { name: 'Embedded C++', icon: 'code', category: 'software' },
        { name: 'Power Electronics', icon: 'zap', category: 'hardware' },
        { name: 'Flow Sensor', icon: 'droplet', category: 'hardware' },
      ],
      stats: [
        { label: 'Temperature Precision', value: '±0.1°C' },
        { label: 'Consistency', value: '98%' },
        { label: 'Energy Savings', value: '25%' },
        { label: 'Display', value: '7" Touch' },
      ],
      tags: ['PID Control', 'HMI Design', 'Embedded C++', 'Power Electronics', 'IoT'],
      images: [
        { src: '/assets/projects/coffee-pcb.jpg', alt: 'Coffee Machine PCB', caption: 'Main control board' },
        { src: '/assets/projects/coffee-hmi.jpg', alt: 'HMI Screen', caption: 'User interface' },
      ],
      featured: true,
      cta: {
        text: 'Planning a consumer electronics project?',
        link: '/en/contact?subject=consultation',
      },
    },

    // ============================================
    // 4. CRITICAL COLD CHAIN MONITORING SYSTEM
    // ============================================
    {
      id: 'cold-chain-monitoring',
      slug: 'critical-cold-chain-monitoring-system',
      title: 'Critical Cold Chain Monitoring System',
      subtitle: '99.99% Uptime in Pharmaceutical and Food Safety',
      category: 'iot',
      year: '2023',
      description:
        'GSM-based monitoring unit for pharmaceutical and food storage that operates in -40°C harsh conditions and can transmit data for 48 hours even during power outages.',
      fullDetailText: `
        Temperature deviations in cold chain logistics can lead to millions of dollars in product loss and public health risks. In this project, we developed a monitoring system compliant with FDA and ISO 22000 standards.

        The specially designed PCB operates seamlessly between -40°C and +85°C. The internal battery system continues data recording and GSM notification for 48 hours during power outages.

        The cloud-based dashboard shows real-time temperature maps of all warehouses. It sends instant alarms via SMS and email when threshold values are exceeded.
      `,
      challenge:
        'Continuous temperature monitoring in -40°C conditions and FDA/ISO compliance in pharmaceutical and food storage.',
      solution:
        'Custom PCB design with -40°C durability, GSM-based data transmission, cloud dashboard, and 48-hour autonomous operation time.',
      techStack: [
        { name: 'GSM/GPRS', icon: 'signal', category: 'protocol' },
        { name: 'Cloud IoT', icon: 'cloud', category: 'platform' },
        { name: 'PCB Design', icon: 'layout', category: 'hardware' },
        { name: 'MQTT', icon: 'message-square', category: 'protocol' },
        { name: 'React Dashboard', icon: 'monitor', category: 'software' },
      ],
      stats: [
        { label: 'Operating Range', value: '-40°C / +85°C' },
        { label: 'System Uptime', value: '99.99%' },
        { label: 'Autonomous Time', value: '48 Hours' },
        { label: 'Product Loss Reduction', value: '85%' },
      ],
      tags: ['GSM/GPRS', 'Cloud IoT', 'PCB Design', 'MQTT', 'FDA', 'ISO 22000'],
      images: [
        { src: '/assets/projects/cold-chain-device.jpg', alt: 'Cold Chain Device', caption: 'Monitoring unit' },
        { src: '/assets/projects/cold-chain-dashboard.jpg', alt: 'Cloud Dashboard', caption: 'Monitoring panel' },
      ],
      featured: false,
      cta: {
        text: 'Looking for logistics IoT solutions?',
        link: '/en/contact?subject=new-project',
      },
    },

    // ============================================
    // 5. PREDICTIVE MAINTENANCE & VIBRATION ANALYZER
    // ============================================
    {
      id: 'predictive-maintenance',
      slug: 'predictive-maintenance-vibration-analyzer',
      title: 'Predictive Maintenance & Vibration Analyzer',
      subtitle: 'AI That Predicts Failures 2 Weeks in Advance',
      category: 'industrial',
      year: '2024',
      description:
        'AI-powered system that analyzes industrial motor vibrations with FFT algorithms and detects bearing failures 2 weeks before they occur.',
      fullDetailText: `
        Unplanned machine downtimes cause millions of dollars in losses annually in production facilities. In this project, we developed an Industry 4.0 solution for motor health monitoring and failure prediction.

        High-precision MEMS accelerometer sensors collect vibration data at 10,000 samples per second. This data is converted to the frequency domain using FFT (Fast Fourier Transform) algorithm.

        The machine learning model can predict bearing, bushing, and imbalance failures 2 weeks in advance by detecting anomalies in vibration patterns. The system integrates with existing SCADA systems via OPC-UA protocol.
      `,
      challenge:
        'Early detection of unexpected failures and planned maintenance optimization in industrial motors.',
      solution:
        'Vibration analysis with FFT (Fast Fourier Transform) algorithms, machine learning-based failure prediction, OPC-UA integration.',
      techStack: [
        { name: 'DSP', icon: 'activity', category: 'software' },
        { name: 'Python', icon: 'code', category: 'software' },
        { name: 'FFT Analysis', icon: 'bar-chart', category: 'software' },
        { name: 'Machine Learning', icon: 'brain', category: 'software' },
        { name: 'OPC-UA', icon: 'server', category: 'protocol' },
        { name: 'SCADA', icon: 'monitor', category: 'platform' },
      ],
      stats: [
        { label: 'Sampling Rate', value: '10kHz' },
        { label: 'Prediction Time', value: '2 Weeks' },
        { label: 'Downtime Reduction', value: '78%' },
        { label: 'ROI', value: '6 Months' },
      ],
      tags: ['DSP', 'Python', 'FFT', 'Machine Learning', 'Industry 4.0', 'SCADA'],
      images: [
        { src: '/assets/projects/vibration-sensor.jpg', alt: 'Vibration Sensor', caption: 'MEMS accelerometer' },
        { src: '/assets/projects/vibration-dashboard.jpg', alt: 'Analysis Screen', caption: 'FFT spectrum analysis' },
      ],
      featured: false,
      cta: {
        text: 'Request a meeting for Industry 4.0 transformation',
        link: '/en/contact?subject=consultation',
      },
    },

    // ============================================
    // 6. NUVIA EVENT MANAGEMENT PLATFORM
    // ============================================
    {
      id: 'nuvia-crm',
      slug: 'nuvia-event-management-platform',
      title: 'Nuvia Event Management Platform',
      subtitle: 'Scalable Organization with Enterprise SaaS',
      category: 'saas',
      year: '2024',
      description:
        'Comprehensive web and mobile-based CRM infrastructure providing end-to-end planning, budget management, and operational tracking for large-scale organizations.',
      fullDetailText: `
        Corporate event management requires complex planning, budget tracking, and real-time coordination. Nuvia platform is a comprehensive SaaS solution that brings these needs under one roof.

        Built on microservice architecture, the platform can simultaneously support hundreds of thousands of users. The mobile application developed with React Native works seamlessly on iOS and Android platforms.

        Running on AWS infrastructure, the system offers 99.9% uptime guarantee. Real-time guest tracking, QR-coded check-in, and instant reporting features provide full control to event managers.
      `,
      challenge:
        'End-to-end planning, budget, and operational tracking needs for large-scale organizations.',
      solution:
        'Microservice architecture, React Native mobile, AWS infrastructure, and real-time guest tracking for enterprise-level scalability.',
      techStack: [
        { name: 'React Native', icon: 'smartphone', category: 'software' },
        { name: 'Node.js', icon: 'server', category: 'software' },
        { name: 'AWS', icon: 'cloud', category: 'platform' },
        { name: 'MongoDB', icon: 'database', category: 'platform' },
        { name: 'GraphQL', icon: 'share-2', category: 'protocol' },
        { name: 'Redis', icon: 'zap', category: 'platform' },
      ],
      stats: [
        { label: 'Platform', value: 'Web/Mobile' },
        { label: 'Scale', value: 'Enterprise' },
        { label: 'Uptime', value: '99.9%' },
        { label: 'Clients', value: '50+' },
      ],
      tags: ['React Native', 'Node.js', 'AWS', 'MongoDB', 'SaaS', 'Enterprise'],
      images: [
        { src: '/assets/projects/nuvia-dashboard.jpg', alt: 'Nuvia Dashboard', caption: 'Management panel' },
        { src: '/assets/projects/nuvia-mobile.jpg', alt: 'Mobile App', caption: 'iOS and Android' },
      ],
      featured: false,
      cta: {
        text: 'Contact for custom software project discussion',
        link: '/en/contact?subject=new-project',
      },
    },
  ],
};

// ===========================================
// KATEGORI FILTRELERI
// ===========================================

export const PROJECT_CATEGORIES: LocalizedContent<CategoryFilter[]> = {
  tr: [
    { id: 'all', label: 'Tum Projeler' },
    { id: 'embedded', label: 'Gomulu Sistemler' },
    { id: 'industrial', label: 'Endustriyel' },
    { id: 'iot', label: 'IoT & Baglanti' },
    { id: 'consumer', label: 'Tuketici Elektronigi' },
    { id: 'saas', label: 'Yazilim & SaaS' },
  ],
  en: [
    { id: 'all', label: 'All Projects' },
    { id: 'embedded', label: 'Embedded Systems' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'iot', label: 'IoT & Connectivity' },
    { id: 'consumer', label: 'Consumer Electronics' },
    { id: 'saas', label: 'Software & SaaS' },
  ],
};

// ===========================================
// HELPER FONKSIYONLAR
// ===========================================

export function getProjectBySlug(slug: string, lang: 'tr' | 'en'): Project | undefined {
  return PROJECTS[lang].find((p) => p.slug === slug);
}

export function getProjectById(id: string, lang: 'tr' | 'en'): Project | undefined {
  return PROJECTS[lang].find((p) => p.id === id);
}

export function getFeaturedProjects(lang: 'tr' | 'en'): Project[] {
  return PROJECTS[lang].filter((p) => p.featured);
}

export function getProjectsByCategory(category: string, lang: 'tr' | 'en'): Project[] {
  if (category === 'all') return PROJECTS[lang];
  return PROJECTS[lang].filter((p) => p.category === category);
}

export function getAllProjectSlugs(lang: 'tr' | 'en'): string[] {
  return PROJECTS[lang].map((p) => p.slug);
}
