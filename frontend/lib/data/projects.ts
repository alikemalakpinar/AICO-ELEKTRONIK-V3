// ===========================================
// AICO Engineering - Project Data
// High-End Engineering Portfolio
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
      subtitle: '50ms tepki suresiyle endustriyel guvenligin noral bekcisi.',
      category: 'embedded',
      year: '2023',
      description:
        '50ms tepki suresiyle endustriyel guvenligin noral bekcisi. Yapay sinir aglari ile duman ve isi verilerini anlik isleyen, yanlis alarm oranini %0.01e dusuren edge AI cozumu.',
      fullDetailText: `
        Geleneksel yangin dedektorleri, yuksek yanlis alarm oranlari ve gec tepki sureleri nedeniyle endustriyel ortamlarda ciddi guvenlik aciklarina neden olmaktaydi.

        Bu proje kapsaminda, STM32 mikrodenetleyici uzerinde calisan ozel bir TensorFlow Lite modeli gelistirdik. Sistem, duman yogunlugu, sicaklik degisimi ve partikul analizi verilerini gercek zamanli olarak isleyerek 50ms altinda karar verebiliyor.

        LoRaWAN protokolu ile 2km+ menzilde kablosuz iletisim saglayan sistem, ATEX Zone 1 sertifikasyonuna uygun olarak patlayici ortamlarda guvenle kullanilabiliyor. Altium Designer ile tasarlanan 4 katmanli PCB, EMC uyumluluğunu garanti ediyor.
      `,
      challenge:
        'Geleneksel dedektorlerin %15+ yanlis alarm orani ve 5+ saniye tepki suresi, endustriyel tesislerde guvenlik acigi olusturuyordu.',
      solution:
        'Edge AI ile coklu sensor fuzyon algoritmasi. Duman, isi ve partikul verilerini anlik isleme. Yanlis alarm %0.01, tepki suresi <50ms.',
      techStack: [
        { name: 'STM32H7', icon: 'cpu', category: 'hardware' },
        { name: 'Altium Designer', icon: 'layout', category: 'hardware' },
        { name: 'TensorFlow Lite', icon: 'brain', category: 'software' },
        { name: 'Edge AI', icon: 'brain', category: 'software' },
        { name: 'LoRaWAN', icon: 'radio', category: 'protocol' },
        { name: 'C/C++', icon: 'code', category: 'software' },
      ],
      stats: [
        { label: 'Tepki Suresi', value: '<50ms' },
        { label: 'Yanlis Alarm', value: '%0.01' },
        { label: 'Menzil', value: '2km+' },
        { label: 'Batarya', value: '5 Yil' },
      ],
      tags: ['Edge AI', 'STM32', 'LoRaWAN', 'ATEX', 'Altium', 'Safety'],
      images: [
        { src: '/assets/logos/fire-module.jpg', alt: 'Yangin Modulu PCB', caption: 'Ana kart tasarimi' },
      ],
      featured: true,
      cta: {
        text: 'Benzer bir IoT guvenlik projesi mi dusunuyorsunuz?',
        link: '/tr/contact?subject=consultation',
      },
    },

    // ============================================
    // 2. YERALTI PERSONEL KONUMLANDIRMA AGI
    // ============================================
    {
      id: 'mining-safety-network',
      slug: 'yeralti-personel-konumlandirma-agi',
      title: 'Yeralti Personel Konumlandirma Agi',
      subtitle: "GPS'in ulasamadigi derinliklerde hayat kurtaran RF Mesh agi.",
      category: 'industrial',
      year: '2022',
      description:
        "GPS'in ulasamadigi derinliklerde hayat kurtaran RF Mesh agi. Maden tunellerinde personel takibi ve Man-Down algilama sistemi.",
      fullDetailText: `
        Maden kazalari sirasinda en kritik sorun, mahsur kalan iscilerin konumlarinin belirlenmesidir. GPS sinyallerinin yeralti ortamlarinda calismadigini goz onunde bulundurarak, tamamen RF tabanli bir konumlandirma sistemi gelistirdik.

        Zigbee ve ozel RF protokolleri kullanarak olusturduğumuz mesh agi, metrelerce kaya katmaninin altinda bile guvenilir iletisim sagliyor. Her isci, bileklik tipi cihaz ile anlik olarak takip edilebiliyor.

        Man-Down ozelligi, 30 saniyeden fazla hareketsizlik durumunda otomatik alarm gonderiyor. ATEX Zone 1 sertifikali sistem, patlayici ortamlarda guvenle kullaniliyor.
      `,
      challenge:
        'GPS sinyalinin ulasamadigi maden tunellerinde personel takibi ve acil durumlarda hizli mudahale.',
      solution:
        'RF Mesh teknolojisi ile ±3m hassasiyetinde konum tespiti. Man-Down algilama ve 2 yil batarya omru.',
      techStack: [
        { name: 'RF Mesh', icon: 'radio', category: 'protocol' },
        { name: 'Zigbee', icon: 'wifi', category: 'protocol' },
        { name: 'Embedded C', icon: 'code', category: 'software' },
        { name: 'Low Power', icon: 'battery', category: 'hardware' },
        { name: 'ATEX', icon: 'shield', category: 'hardware' },
        { name: 'Dashboard', icon: 'monitor', category: 'software' },
      ],
      stats: [
        { label: 'Kapsama', value: '2km+' },
        { label: 'Batarya', value: '2 Yil' },
        { label: 'Hassasiyet', value: '±3m' },
        { label: 'Sertifika', value: 'ATEX' },
      ],
      tags: ['RF Mesh', 'Mining', 'Safety', 'ATEX', 'Zigbee', 'IoT'],
      images: [
        { src: '/assets/logos/mining-safety.jpg', alt: 'Maden Guvenlik Sistemi', caption: 'Takip unitesi' },
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
      id: 'barista-automation',
      slug: 'pid-kontrollu-barista-otomasyonu',
      title: 'PID Kontrollu Barista Otomasyonu',
      subtitle: 'Her damlada mukemmel basinc ve isi dengesi.',
      category: 'consumer',
      year: '2023',
      description:
        'Her damlada mukemmel basinc ve isi dengesi. Profesyonel espresso makineleri icin ±0.1°C hassasiyetinde sicaklik kontrolu.',
      fullDetailText: `
        Kahve yapiminda tutarli tat profili, sicaklik ve basinci hassas kontrol etmeyi gerektirir. Bu projede, profesyonel espresso makineleri icin tam otomatik kontrol sistemi gelistirdik.

        PID algoritmasi ile su sicakligini ±0.1°C hassasiyetle kontrol ediyoruz. Akis olcer entegrasyonu sayesinde su miktari gram bazinda ayarlanabiliyor. 7" kapasitif dokunmatik ekran, kullanici profili ve istatistik takibi sunuyor.

        Wi-Fi uzerinden uzaktan izleme ve OTA firmware guncelleme ozellikleri, sistemin gelecege hazir olmasini sagliyor.
      `,
      challenge:
        'Profesyonel kahve makinelerinde tutarli tat icin hassas sicaklik ve basinc kontrolu.',
      solution:
        'PID algoritmalari ile ±0.1°C hassasiyet, akis olcer entegrasyonu, 7" HMI ve IoT baglantisi.',
      techStack: [
        { name: 'PID Control', icon: 'sliders', category: 'software' },
        { name: 'Power Electronics', icon: 'zap', category: 'hardware' },
        { name: 'HMI 7"', icon: 'monitor', category: 'hardware' },
        { name: 'ESP32', icon: 'cpu', category: 'hardware' },
        { name: 'Flow Sensor', icon: 'droplet', category: 'hardware' },
        { name: 'C++', icon: 'code', category: 'software' },
      ],
      stats: [
        { label: 'Hassasiyet', value: '±0.1°C' },
        { label: 'Tutarlilik', value: '%98' },
        { label: 'Tasarruf', value: '%25' },
        { label: 'Ekran', value: '7" Touch' },
      ],
      tags: ['PID', 'HMI', 'Consumer Electronics', 'ESP32', 'Power'],
      images: [
        { src: '/assets/logos/coffee-machine.jpg', alt: 'Kahve Makinesi', caption: 'Kontrol sistemi' },
      ],
      featured: true,
      cta: {
        text: 'Tuketici elektronigi projesi mi planliyorsunuz?',
        link: '/tr/contact?subject=consultation',
      },
    },

    // ============================================
    // 4. YUKSEK VERIMLI GUC YONETIM UNITESI
    // ============================================
    {
      id: 'high-efficiency-pmu',
      slug: 'yuksek-verimli-guc-yonetim-unitesi',
      title: 'Yuksek Verimli Guc Yonetim Unitesi (PMU)',
      subtitle: '%96 verimlilikle enerjiyi yoneten kompakt guc canavari.',
      category: 'embedded',
      year: '2022',
      description:
        '%96 verimlilikle enerjiyi yoneten kompakt guc canavari. LED aydinlatma ve endustriyel uygulamalar icin EMC uyumlu tasarim.',
      fullDetailText: `
        LED aydinlatma sistemleri icin kompakt, yuksek verimli ve EMC uyumlu guc kaynagi tasarimi. Buck/Boost donusturuculer ve aktif PFC ile %96 verimlilik hedeflendi.

        Termal yonetim icin ozel PCB layout teknikleri ve bakir alanlari kullanildi. Kisa devre, asiri yuk ve asiri sicaklik korumalari entegre edildi.

        CE ve EMC sertifikasyon testlerinden basariyla gecen urun, seri uretime hazir hale getirildi.
      `,
      challenge:
        'LED sistemleri icin kompakt, yuksek verimli ve EMC uyumlu guc kaynagi ihtiyaci.',
      solution:
        'Buck/Boost topoloji, aktif PFC, 4 katmanli koruma ve CE/EMC sertifikasyonu.',
      techStack: [
        { name: 'Power Electronics', icon: 'zap', category: 'hardware' },
        { name: 'Buck/Boost', icon: 'activity', category: 'hardware' },
        { name: 'EMC Design', icon: 'shield', category: 'hardware' },
        { name: 'Altium', icon: 'layout', category: 'hardware' },
        { name: 'Thermal Mgmt', icon: 'thermometer', category: 'hardware' },
      ],
      stats: [
        { label: 'Verimlilik', value: '%96' },
        { label: 'Koruma', value: '4 Katman' },
        { label: 'Sertifika', value: 'CE/EMC' },
        { label: 'Cikis', value: '150W' },
      ],
      tags: ['Power Electronics', 'EMC', 'LED Driver', 'Buck Converter'],
      images: [
        { src: '/assets/logos/pmu-board.jpg', alt: 'PMU Board', caption: 'Guc karti' },
      ],
      featured: false,
      cta: {
        text: 'Guc elektronigi projesi icin gorusun',
        link: '/tr/contact?subject=consultation',
      },
    },

    // ============================================
    // 5. KRITIK SOGUK ZINCIR IZLEME SISTEMI
    // ============================================
    {
      id: 'cold-chain-iot',
      slug: 'kritik-soguk-zincir-izleme-sistemi',
      title: 'Kritik Soguk Zincir Izleme Sistemi',
      subtitle: "-40°C'de bile veri kaybina tahammulu olmayanlar icin.",
      category: 'iot',
      year: '2023',
      description:
        "-40°C'de bile veri kaybina tahammulu olmayanlar icin. Ilac ve gida lojistiginde kesintisiz sicaklik takibi.",
      fullDetailText: `
        Soguk zincir lojistiginde sicaklik sapmasi, milyonlarca dolarlik urun kaybina ve halk sagligi risklerine yol acabilir. FDA ve ISO 22000 standartlarina uygun izleme sistemi gelistirdik.

        Ozel tasarlanmis PCB, -40°C ile +85°C arasinda sorunsuz calisabiliyor. Dahili batarya, elektrik kesintisinde 48 saat veri kaydi ve GSM bildirimi sagliyor.

        Bulut tabanli dashboard, tum depolarin anlik sicaklik haritasini gosteriyor. Esik asimlarinda SMS ve e-posta ile aninda alarm.
      `,
      challenge:
        'Ilac ve gida depolarinda -40°C kosullarda kesintisiz izleme ve FDA/ISO uyumluluk.',
      solution:
        'GSM tabanli veri aktarimi, 48 saat otonom calisma, bulut dashboard ve anlik alarm.',
      techStack: [
        { name: 'GSM/GPRS', icon: 'signal', category: 'protocol' },
        { name: 'Cloud IoT', icon: 'cloud', category: 'platform' },
        { name: 'PCB Design', icon: 'layout', category: 'hardware' },
        { name: 'MQTT', icon: 'message-square', category: 'protocol' },
        { name: 'React', icon: 'code', category: 'software' },
      ],
      stats: [
        { label: 'Aralik', value: '-40°C/+85°C' },
        { label: 'Uptime', value: '%99.99' },
        { label: 'Otonom', value: '48 Saat' },
        { label: 'Kayip Azalma', value: '%85' },
      ],
      tags: ['Cold Chain', 'GSM', 'IoT', 'Pharma', 'FDA'],
      images: [
        { src: '/assets/logos/cold-chain.jpg', alt: 'Soguk Zincir', caption: 'Izleme unitesi' },
      ],
      featured: false,
      cta: {
        text: 'Lojistik IoT cozumu mu ariyorsunuz?',
        link: '/tr/contact?subject=new-project',
      },
    },

    // ============================================
    // 6. KESTIRIMCI BAKIM TITRESIM ANALIZORU
    // ============================================
    {
      id: 'predictive-maintenance',
      slug: 'kestirimci-bakim-titresim-analizoru',
      title: 'Kestirimci Bakim & Titresim Analizoru',
      subtitle: 'Makinelerin sesini dinleyerek arizayi 2 hafta onceden duyan yapay kulak.',
      category: 'industrial',
      year: '2024',
      description:
        'Makinelerin sesini dinleyerek arizayi 2 hafta onceden duyan yapay kulak. FFT analizi ve makine ogrenimi ile kestirimci bakim.',
      fullDetailText: `
        Planlanmamis makine duruslari, uretim tesislerinde yillik milyonlarca dolar kayba neden olur. Motor sagligi izleme ve ariza tahmini yapan Industry 4.0 cozumu gelistirdik.

        MEMS akselerometre sensorleri, saniyede 10.000 ornekleme hizinda titresim verisi topluyor. FFT algoritmasi ile frekans domenine donusturulen veri, makine ogrenimi modeline besleniyor.

        Sistem, rulman ve dengesizlik arizalarini 2 hafta oncesinden tahmin edebiliyor. OPC-UA protokolu ile mevcut SCADA sistemlerine entegre oluyor.
      `,
      challenge:
        'Sanayi motorlarinda beklenmedik arizalar ve planlanmamis duruslar.',
      solution:
        'FFT analizi, ML tabanli ariza tahmini, OPC-UA entegrasyonu. 2 hafta onceden uyari.',
      techStack: [
        { name: 'DSP/FFT', icon: 'activity', category: 'software' },
        { name: 'Python/ML', icon: 'brain', category: 'software' },
        { name: 'MEMS Sensor', icon: 'cpu', category: 'hardware' },
        { name: 'OPC-UA', icon: 'server', category: 'protocol' },
        { name: 'SCADA', icon: 'monitor', category: 'platform' },
      ],
      stats: [
        { label: 'Ornekleme', value: '10kHz' },
        { label: 'Tahmin', value: '2 Hafta' },
        { label: 'Durus Azalma', value: '%78' },
        { label: 'ROI', value: '6 Ay' },
      ],
      tags: ['Predictive', 'FFT', 'ML', 'Industry 4.0', 'SCADA'],
      images: [
        { src: '/assets/logos/vibration-analyzer.jpg', alt: 'Titresim Analizoru', caption: 'Sensor unitesi' },
      ],
      featured: false,
      cta: {
        text: 'Industry 4.0 donusumu icin gorusme talep et',
        link: '/tr/contact?subject=consultation',
      },
    },

    // ============================================
    // 7. FABRIKA OEE SISTEMI
    // ============================================
    {
      id: 'factory-oee-system',
      slug: 'fabrika-oee-verimlilik-sistemi',
      title: 'Fabrika OEE & Verimlilik Takibi',
      subtitle: 'Uretim hattindaki her saniyenin dijital ikizi.',
      category: 'industrial',
      year: '2023',
      description:
        'Uretim hattindaki her saniyenin dijital ikizi. Toplam Ekipman Verimliligi (OEE) izleme ve optimizasyon sistemi.',
      fullDetailText: `
        24/7 calisan uretim hattinda kesintisiz enerji izleme ve ekipman saglik takibi. Edge computing tabanli veri toplama ve ML ile anomali tespiti.

        12 uretim hatti es zamanli izleniyor. Her hat icin kullanilabilirlik, performans ve kalite metrikleri gercek zamanli hesaplaniyor.

        Dashboard uzerinden OEE skorlari, durus nedenleri ve iyilestirme onerileri sunuluyor. Sistem, OEE'yi %89'a yukseltmeyi basardi.
      `,
      challenge:
        '24/7 uretimde verimsizlik kaynaklarini tespit ve OEE optimizasyonu.',
      solution:
        'Edge computing, ML anomali tespiti, gercek zamanli OEE dashboard.',
      techStack: [
        { name: 'Edge Computing', icon: 'cpu', category: 'hardware' },
        { name: 'PLC/SCADA', icon: 'server', category: 'platform' },
        { name: 'OPC-UA', icon: 'share-2', category: 'protocol' },
        { name: 'React Dashboard', icon: 'monitor', category: 'software' },
        { name: 'TimescaleDB', icon: 'database', category: 'platform' },
      ],
      stats: [
        { label: 'Hat Sayisi', value: '12' },
        { label: 'Durus Azalma', value: '%78' },
        { label: 'OEE', value: '%89' },
        { label: 'Uptime', value: '%99.5' },
      ],
      tags: ['OEE', 'Manufacturing', 'SCADA', 'Edge', 'Dashboard'],
      images: [
        { src: '/assets/logos/factory-oee.jpg', alt: 'Fabrika OEE', caption: 'Dashboard' },
      ],
      featured: false,
      cta: {
        text: 'Uretim verimliligi projesi icin iletisime gec',
        link: '/tr/contact?subject=new-project',
      },
    },

    // ============================================
    // 8. NUVIA SAAS PLATFORMU
    // ============================================
    {
      id: 'nuvia-platform',
      slug: 'nuvia-saas-platformu',
      title: 'Nuvia SaaS Platformu',
      subtitle: 'Global olcekte etkinlik yonetiminin dijital omurgasi.',
      category: 'saas',
      year: '2024',
      description:
        'Global olcekte etkinlik yonetiminin dijital omurgasi. Enterprise SaaS ile uctan uca organizasyon yonetimi.',
      fullDetailText: `
        Kurumsal etkinlik yonetimi, karmasik planlama, butce takibi ve gercek zamanli koordinasyon gerektirir. Nuvia, bu ihtiyaclari tek catı altinda toplayan SaaS cozumdur.

        Mikroservis mimarisi uzerine insa edilen platform, yuz binlerce kullaniciyi es zamanli destekliyor. React Native mobil uygulama, iOS ve Android'de sorunsuz calisiyor.

        AWS altyapisi uzerinde %99.9 uptime garantisi. Gercek zamanli misafir takibi, QR check-in ve anlik raporlama ozellikleri.
      `,
      challenge:
        'Buyuk olcekli organizasyonlar icin uctan uca planlama ve operasyonel takip.',
      solution:
        'Mikroservis mimarisi, React Native mobil, AWS altyapisi, gercek zamanli takip.',
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
      tags: ['SaaS', 'React Native', 'AWS', 'Enterprise', 'Mobile'],
      images: [
        { src: '/assets/logos/nuvia-platform.jpg', alt: 'Nuvia Platform', caption: 'Dashboard' },
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
    // ENGLISH VERSIONS
    // ============================================
    {
      id: 'fire-analysis-module',
      slug: 'industrial-iot-fire-analysis-module',
      title: 'Industrial IoT Fire Analysis Module',
      subtitle: 'Neural guardian of industrial safety with 50ms response time.',
      category: 'embedded',
      year: '2023',
      description:
        'Neural guardian of industrial safety with 50ms response time. Edge AI solution processing smoke and heat data in real-time, reducing false alarms to 0.01%.',
      fullDetailText: `
        Traditional fire detectors caused serious safety gaps in industrial environments due to high false alarm rates and slow response times.

        We developed a custom TensorFlow Lite model running on STM32 microcontroller. The system processes smoke density, temperature change, and particle analysis data in real-time, making decisions in under 50ms.

        The system provides wireless communication up to 2km+ with LoRaWAN protocol and is ATEX Zone 1 certified for safe use in explosive environments. The 4-layer PCB designed in Altium Designer ensures EMC compliance.
      `,
      challenge:
        'Traditional detectors 15%+ false alarm rate and 5+ second response time created safety gaps in industrial facilities.',
      solution:
        'Edge AI with multi-sensor fusion algorithm. Real-time processing of smoke, heat and particle data. False alarm 0.01%, response time <50ms.',
      techStack: [
        { name: 'STM32H7', icon: 'cpu', category: 'hardware' },
        { name: 'Altium Designer', icon: 'layout', category: 'hardware' },
        { name: 'TensorFlow Lite', icon: 'brain', category: 'software' },
        { name: 'Edge AI', icon: 'brain', category: 'software' },
        { name: 'LoRaWAN', icon: 'radio', category: 'protocol' },
        { name: 'C/C++', icon: 'code', category: 'software' },
      ],
      stats: [
        { label: 'Response', value: '<50ms' },
        { label: 'False Alarm', value: '0.01%' },
        { label: 'Range', value: '2km+' },
        { label: 'Battery', value: '5 Years' },
      ],
      tags: ['Edge AI', 'STM32', 'LoRaWAN', 'ATEX', 'Altium', 'Safety'],
      images: [
        { src: '/assets/logos/fire-module.jpg', alt: 'Fire Module PCB', caption: 'Main board design' },
      ],
      featured: true,
      cta: {
        text: 'Considering a similar IoT safety project?',
        link: '/en/contact?subject=consultation',
      },
    },
    {
      id: 'mining-safety-network',
      slug: 'underground-personnel-positioning-network',
      title: 'Underground Personnel Positioning Network',
      subtitle: 'Life-saving RF Mesh network in depths GPS cannot reach.',
      category: 'industrial',
      year: '2022',
      description:
        'Life-saving RF Mesh network in depths GPS cannot reach. Personnel tracking and Man-Down detection in mine tunnels.',
      fullDetailText: `
        During mining accidents, the most critical issue is determining the location of trapped workers. We developed a fully RF-based positioning system since GPS signals dont work underground.

        The mesh network using Zigbee and custom RF protocols provides reliable communication even under meters of rock. Each worker is tracked in real-time via wristband device.

        Man-Down feature sends automatic alarm after 30 seconds of immobility. ATEX Zone 1 certified system is safe for explosive environments.
      `,
      challenge:
        'Personnel tracking in mine tunnels where GPS cannot reach and rapid intervention in emergencies.',
      solution:
        'RF Mesh technology with ±3m accuracy positioning. Man-Down detection and 2-year battery life.',
      techStack: [
        { name: 'RF Mesh', icon: 'radio', category: 'protocol' },
        { name: 'Zigbee', icon: 'wifi', category: 'protocol' },
        { name: 'Embedded C', icon: 'code', category: 'software' },
        { name: 'Low Power', icon: 'battery', category: 'hardware' },
        { name: 'ATEX', icon: 'shield', category: 'hardware' },
        { name: 'Dashboard', icon: 'monitor', category: 'software' },
      ],
      stats: [
        { label: 'Coverage', value: '2km+' },
        { label: 'Battery', value: '2 Years' },
        { label: 'Accuracy', value: '±3m' },
        { label: 'Certified', value: 'ATEX' },
      ],
      tags: ['RF Mesh', 'Mining', 'Safety', 'ATEX', 'Zigbee', 'IoT'],
      images: [
        { src: '/assets/logos/mining-safety.jpg', alt: 'Mining Safety System', caption: 'Tracking unit' },
      ],
      featured: true,
      cta: {
        text: 'Looking for industrial safety solutions?',
        link: '/en/contact?subject=new-project',
      },
    },
    {
      id: 'barista-automation',
      slug: 'pid-controlled-barista-automation',
      title: 'PID Controlled Barista Automation',
      subtitle: 'Perfect pressure and temperature balance in every drop.',
      category: 'consumer',
      year: '2023',
      description:
        'Perfect pressure and temperature balance in every drop. ±0.1°C precision temperature control for professional espresso machines.',
      fullDetailText: `
        Consistent taste profile in coffee making requires precise control of temperature and pressure. We developed a fully automatic control system for professional espresso machines.

        PID algorithm controls water temperature with ±0.1°C precision. Flow meter integration allows gram-based water quantity adjustment. 7" capacitive touchscreen offers user profiles and statistics.

        Remote monitoring via Wi-Fi and OTA firmware updates ensure the system is future-ready.
      `,
      challenge:
        'Precise temperature and pressure control for consistent taste in professional coffee machines.',
      solution:
        'PID algorithms with ±0.1°C precision, flow meter integration, 7" HMI and IoT connectivity.',
      techStack: [
        { name: 'PID Control', icon: 'sliders', category: 'software' },
        { name: 'Power Electronics', icon: 'zap', category: 'hardware' },
        { name: 'HMI 7"', icon: 'monitor', category: 'hardware' },
        { name: 'ESP32', icon: 'cpu', category: 'hardware' },
        { name: 'Flow Sensor', icon: 'droplet', category: 'hardware' },
        { name: 'C++', icon: 'code', category: 'software' },
      ],
      stats: [
        { label: 'Precision', value: '±0.1°C' },
        { label: 'Consistency', value: '98%' },
        { label: 'Savings', value: '25%' },
        { label: 'Display', value: '7" Touch' },
      ],
      tags: ['PID', 'HMI', 'Consumer Electronics', 'ESP32', 'Power'],
      images: [
        { src: '/assets/logos/coffee-machine.jpg', alt: 'Coffee Machine', caption: 'Control system' },
      ],
      featured: true,
      cta: {
        text: 'Planning a consumer electronics project?',
        link: '/en/contact?subject=consultation',
      },
    },
    {
      id: 'high-efficiency-pmu',
      slug: 'high-efficiency-power-management-unit',
      title: 'High Efficiency Power Management Unit (PMU)',
      subtitle: 'Compact power beast managing energy at 96% efficiency.',
      category: 'embedded',
      year: '2022',
      description:
        'Compact power beast managing energy at 96% efficiency. EMC compliant design for LED lighting and industrial applications.',
      fullDetailText: `
        Compact, high-efficiency, EMC-compliant power supply design for LED lighting systems. Buck/Boost converters and active PFC targeting 96% efficiency.

        Special PCB layout techniques and copper areas used for thermal management. Short circuit, overload and over-temperature protections integrated.

        Product successfully passed CE and EMC certification tests, ready for mass production.
      `,
      challenge:
        'Need for compact, high-efficiency, EMC-compliant power supply for LED systems.',
      solution:
        'Buck/Boost topology, active PFC, 4-layer protection and CE/EMC certification.',
      techStack: [
        { name: 'Power Electronics', icon: 'zap', category: 'hardware' },
        { name: 'Buck/Boost', icon: 'activity', category: 'hardware' },
        { name: 'EMC Design', icon: 'shield', category: 'hardware' },
        { name: 'Altium', icon: 'layout', category: 'hardware' },
        { name: 'Thermal Mgmt', icon: 'thermometer', category: 'hardware' },
      ],
      stats: [
        { label: 'Efficiency', value: '96%' },
        { label: 'Protection', value: '4 Layer' },
        { label: 'Certified', value: 'CE/EMC' },
        { label: 'Output', value: '150W' },
      ],
      tags: ['Power Electronics', 'EMC', 'LED Driver', 'Buck Converter'],
      images: [
        { src: '/assets/logos/pmu-board.jpg', alt: 'PMU Board', caption: 'Power board' },
      ],
      featured: false,
      cta: {
        text: 'Discuss your power electronics project',
        link: '/en/contact?subject=consultation',
      },
    },
    {
      id: 'cold-chain-iot',
      slug: 'critical-cold-chain-monitoring-system',
      title: 'Critical Cold Chain Monitoring System',
      subtitle: 'For those who cannot tolerate data loss even at -40°C.',
      category: 'iot',
      year: '2023',
      description:
        'For those who cannot tolerate data loss even at -40°C. Continuous temperature tracking in pharmaceutical and food logistics.',
      fullDetailText: `
        Temperature deviation in cold chain logistics can lead to millions in product loss and public health risks. We developed FDA and ISO 22000 compliant monitoring system.

        Custom PCB operates seamlessly between -40°C and +85°C. Internal battery provides 48 hours of data recording and GSM notification during power outage.

        Cloud dashboard shows real-time temperature map of all warehouses. Instant SMS and email alarm on threshold violations.
      `,
      challenge:
        'Continuous monitoring at -40°C conditions and FDA/ISO compliance in pharmaceutical and food storage.',
      solution:
        'GSM-based data transmission, 48-hour autonomous operation, cloud dashboard and instant alerts.',
      techStack: [
        { name: 'GSM/GPRS', icon: 'signal', category: 'protocol' },
        { name: 'Cloud IoT', icon: 'cloud', category: 'platform' },
        { name: 'PCB Design', icon: 'layout', category: 'hardware' },
        { name: 'MQTT', icon: 'message-square', category: 'protocol' },
        { name: 'React', icon: 'code', category: 'software' },
      ],
      stats: [
        { label: 'Range', value: '-40°C/+85°C' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Backup', value: '48 Hours' },
        { label: 'Loss Reduction', value: '85%' },
      ],
      tags: ['Cold Chain', 'GSM', 'IoT', 'Pharma', 'FDA'],
      images: [
        { src: '/assets/logos/cold-chain.jpg', alt: 'Cold Chain', caption: 'Monitoring unit' },
      ],
      featured: false,
      cta: {
        text: 'Looking for logistics IoT solutions?',
        link: '/en/contact?subject=new-project',
      },
    },
    {
      id: 'predictive-maintenance',
      slug: 'predictive-maintenance-vibration-analyzer',
      title: 'Predictive Maintenance & Vibration Analyzer',
      subtitle: 'Artificial ear that hears failures 2 weeks ahead by listening to machines.',
      category: 'industrial',
      year: '2024',
      description:
        'Artificial ear that hears failures 2 weeks ahead by listening to machines. FFT analysis and machine learning for predictive maintenance.',
      fullDetailText: `
        Unplanned machine downtime causes millions in losses annually. We developed an Industry 4.0 solution for motor health monitoring and failure prediction.

        MEMS accelerometer sensors collect vibration data at 10,000 samples per second. Data converted to frequency domain via FFT algorithm feeds into ML model.

        System can predict bearing and imbalance failures 2 weeks in advance. Integrates with existing SCADA systems via OPC-UA protocol.
      `,
      challenge:
        'Unexpected failures and unplanned downtime in industrial motors.',
      solution:
        'FFT analysis, ML-based failure prediction, OPC-UA integration. 2-week advance warning.',
      techStack: [
        { name: 'DSP/FFT', icon: 'activity', category: 'software' },
        { name: 'Python/ML', icon: 'brain', category: 'software' },
        { name: 'MEMS Sensor', icon: 'cpu', category: 'hardware' },
        { name: 'OPC-UA', icon: 'server', category: 'protocol' },
        { name: 'SCADA', icon: 'monitor', category: 'platform' },
      ],
      stats: [
        { label: 'Sampling', value: '10kHz' },
        { label: 'Prediction', value: '2 Weeks' },
        { label: 'Downtime Cut', value: '78%' },
        { label: 'ROI', value: '6 Months' },
      ],
      tags: ['Predictive', 'FFT', 'ML', 'Industry 4.0', 'SCADA'],
      images: [
        { src: '/assets/logos/vibration-analyzer.jpg', alt: 'Vibration Analyzer', caption: 'Sensor unit' },
      ],
      featured: false,
      cta: {
        text: 'Request a meeting for Industry 4.0 transformation',
        link: '/en/contact?subject=consultation',
      },
    },
    {
      id: 'factory-oee-system',
      slug: 'factory-oee-efficiency-system',
      title: 'Factory OEE & Efficiency Tracking',
      subtitle: 'Digital twin of every second on the production line.',
      category: 'industrial',
      year: '2023',
      description:
        'Digital twin of every second on the production line. Overall Equipment Effectiveness (OEE) monitoring and optimization system.',
      fullDetailText: `
        Continuous energy monitoring and equipment health tracking in 24/7 production. Edge computing based data collection and ML anomaly detection.

        12 production lines monitored simultaneously. Availability, performance and quality metrics calculated in real-time for each line.

        OEE scores, downtime reasons and improvement suggestions displayed on dashboard. System achieved 89% OEE.
      `,
      challenge:
        'Identifying inefficiency sources in 24/7 production and OEE optimization.',
      solution:
        'Edge computing, ML anomaly detection, real-time OEE dashboard.',
      techStack: [
        { name: 'Edge Computing', icon: 'cpu', category: 'hardware' },
        { name: 'PLC/SCADA', icon: 'server', category: 'platform' },
        { name: 'OPC-UA', icon: 'share-2', category: 'protocol' },
        { name: 'React Dashboard', icon: 'monitor', category: 'software' },
        { name: 'TimescaleDB', icon: 'database', category: 'platform' },
      ],
      stats: [
        { label: 'Lines', value: '12' },
        { label: 'Downtime Cut', value: '78%' },
        { label: 'OEE', value: '89%' },
        { label: 'Uptime', value: '99.5%' },
      ],
      tags: ['OEE', 'Manufacturing', 'SCADA', 'Edge', 'Dashboard'],
      images: [
        { src: '/assets/logos/factory-oee.jpg', alt: 'Factory OEE', caption: 'Dashboard' },
      ],
      featured: false,
      cta: {
        text: 'Contact for manufacturing efficiency project',
        link: '/en/contact?subject=new-project',
      },
    },
    {
      id: 'nuvia-platform',
      slug: 'nuvia-saas-platform',
      title: 'Nuvia SaaS Platform',
      subtitle: 'Digital backbone of event management at global scale.',
      category: 'saas',
      year: '2024',
      description:
        'Digital backbone of event management at global scale. End-to-end organization management with Enterprise SaaS.',
      fullDetailText: `
        Corporate event management requires complex planning, budget tracking and real-time coordination. Nuvia is the SaaS solution bringing these needs under one roof.

        Platform built on microservice architecture supports hundreds of thousands of concurrent users. React Native mobile app runs seamlessly on iOS and Android.

        99.9% uptime guarantee on AWS infrastructure. Real-time guest tracking, QR check-in and instant reporting features.
      `,
      challenge:
        'End-to-end planning and operational tracking for large-scale organizations.',
      solution:
        'Microservice architecture, React Native mobile, AWS infrastructure, real-time tracking.',
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
      tags: ['SaaS', 'React Native', 'AWS', 'Enterprise', 'Mobile'],
      images: [
        { src: '/assets/logos/nuvia-platform.jpg', alt: 'Nuvia Platform', caption: 'Dashboard' },
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
    { id: 'industrial', label: 'Endustriyel IoT' },
    { id: 'iot', label: 'IoT & Baglanti' },
    { id: 'consumer', label: 'Tuketici Elektronigi' },
    { id: 'saas', label: 'Yazilim & SaaS' },
  ],
  en: [
    { id: 'all', label: 'All Projects' },
    { id: 'embedded', label: 'Embedded Systems' },
    { id: 'industrial', label: 'Industrial IoT' },
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
