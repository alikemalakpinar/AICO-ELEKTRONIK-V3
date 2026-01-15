"""
Seed data for Projects collection
This file contains sample engineering projects for the portfolio
"""

SAMPLE_PROJECTS = [
    {
        "slug": "yuksek-hizli-fpga-karti",
        "title": "Yuksek Hizli FPGA Gelistirme Karti",
        "title_en": "High-Speed FPGA Development Board",
        "subtitle": "Savunma Sanayii icin 10 Gbps Veri Isleme Cozumu",
        "subtitle_en": "10 Gbps Data Processing Solution for Defense Industry",
        "hero_image": "/assets/projects/fpga-board-hero.jpg",
        "thumbnail": "/assets/projects/fpga-board-thumb.jpg",
        "client_industry": "Savunma Sanayii",
        "client_industry_en": "Defense Industry",
        "project_type": "pcb-design",

        "challenge_text": "Musterimiz, radar sistemleri icin saniyede 10 gigabit veri isleyebilen, son derece dusuk gecikmeli bir FPGA tabanli sinyal isleme karti talep ediyordu. Mevcut cozumler ya cok pahali ya da performans gereksinimlerini karsilamiyordu. Ayrica kartın -40 derece ile +85 derece arasinda calisabilmesi gerekiyordu.",
        "challenge_text_en": "Our client required an FPGA-based signal processing board capable of processing 10 gigabits of data per second with extremely low latency for radar systems. Existing solutions were either too expensive or did not meet performance requirements. Additionally, the board needed to operate between -40 and +85 degrees Celsius.",

        "solution_text": "Xilinx Kintex UltraScale FPGA cevresinde 10 katmanli, empedans kontrollu bir PCB tasarladik. DDR4 bellek arayuzu ve yuksek hizli SerDes hatlarinin sinyal butunlugunu saglamak icin gelismis simülasyon araclari kullandik. Termal yonetim icin ozel bakirli katmanlar ve via stitching teknikleri uyguladik.",
        "solution_text_en": "We designed a 10-layer, impedance-controlled PCB around the Xilinx Kintex UltraScale FPGA. We used advanced simulation tools to ensure signal integrity of the DDR4 memory interface and high-speed SerDes lines. We applied special copper layers and via stitching techniques for thermal management.",

        "approach_text": "Projeye once detayli bir gereksinim analizi ile basladik. SI/PI simulasyonlari yaparak kritik sinyallerin yonlendirmesini optimize ettik. Prototip asamasinda VNA ve osiloskop ile kapsamli testler gerceklestirdik.",
        "approach_text_en": "We started the project with a detailed requirements analysis. We optimized the routing of critical signals through SI/PI simulations. During the prototype phase, we performed comprehensive tests with VNA and oscilloscope.",

        "results_text": "Proje, musterinin tum gereksinimlerini karsiladi. 12 Gbps veri isleme kapasitesi, hedefin %20 uzerinde performans sagladi. Kart, MIL-STD-810G cevresel testlerinden ilk seferde gecti. Birim maliyeti rakip cozumlerin %35 altinda.",
        "results_text_en": "The project met all customer requirements. 12 Gbps data processing capacity provided 20% above target performance. The board passed MIL-STD-810G environmental tests on the first attempt. Unit cost is 35% below competing solutions.",

        "technologies": ["Altium Designer", "Xilinx Vivado", "DDR4", "SerDes", "FPGA", "High-Speed PCB", "Impedance Control"],

        "tech_specs": [
            {
                "category": "PCB",
                "items": [
                    {"label": "Katman Sayisi", "value": "10"},
                    {"label": "Min Track/Space", "value": "3/3 mil"},
                    {"label": "Via Boyutu", "value": "8 mil"},
                    {"label": "Materyal", "value": "Megtron 6"}
                ]
            },
            {
                "category": "Performans",
                "items": [
                    {"label": "Veri Hizi", "value": "12 Gbps"},
                    {"label": "Bellek", "value": "8GB DDR4"},
                    {"label": "Arayuzler", "value": "PCIe Gen3 x8"}
                ]
            }
        ],

        "phases": [
            {
                "title": "Faz 1: Analiz ve Planlama",
                "title_en": "Phase 1: Analysis and Planning",
                "description": "Gereksinim analizi, blok sema tasarimi ve kritik bilesenlerin secimi yapildi.",
                "description_en": "Requirements analysis, block diagram design and selection of critical components were performed.",
                "image_url": "/assets/projects/fpga-phase1.jpg",
                "icon": "FileSearch"
            },
            {
                "title": "Faz 2: Sematik Tasarim",
                "title_en": "Phase 2: Schematic Design",
                "description": "FPGA, bellek, guc ve arayuz devrelerinin sematik tasarimi tamamlandi.",
                "description_en": "Schematic design of FPGA, memory, power and interface circuits was completed.",
                "image_url": "/assets/projects/fpga-phase2.jpg",
                "icon": "PenTool"
            },
            {
                "title": "Faz 3: PCB Layout ve Simülasyon",
                "title_en": "Phase 3: PCB Layout and Simulation",
                "description": "10 katmanli PCB tasarimi ve SI/PI simulasyonlari gerceklestirildi.",
                "description_en": "10-layer PCB design and SI/PI simulations were performed.",
                "image_url": "/assets/projects/fpga-phase3.jpg",
                "icon": "Layers"
            },
            {
                "title": "Faz 4: Prototip ve Test",
                "title_en": "Phase 4: Prototype and Test",
                "description": "Prototip uretimi, dogrulama testleri ve optimizasyon calısmalari yapildi.",
                "description_en": "Prototype production, verification tests and optimization work were performed.",
                "image_url": "/assets/projects/fpga-phase4.jpg",
                "icon": "TestTube"
            }
        ],

        "metrics": {
            "size_reduction": None,
            "cost_savings": "%35",
            "performance_improvement": "%20",
            "time_to_market": "4 ay",
            "custom": {
                "Sicaklik Araligi": "-40C ile +85C",
                "EMC Uyumluluk": "MIL-STD-461"
            }
        },

        "testimonial": "AICO ekibi, karmasik teknik gereksinimlerimizi anladi ve beklentilerimizin otesinde bir cozum sundu.",
        "testimonial_author": "Proje Muduru, Savunma Sanayi Firmasi",

        "gallery_images": [
            "/assets/projects/fpga-gallery-1.jpg",
            "/assets/projects/fpga-gallery-2.jpg",
            "/assets/projects/fpga-gallery-3.jpg"
        ],

        "pcb_layers": [
            "/assets/projects/fpga-layer-top.png",
            "/assets/projects/fpga-layer-gnd1.png",
            "/assets/projects/fpga-layer-sig1.png",
            "/assets/projects/fpga-layer-pwr.png",
            "/assets/projects/fpga-layer-gnd2.png",
            "/assets/projects/fpga-layer-bottom.png"
        ],

        "featured": True,
        "order": 1,
        "visible": True
    },
    {
        "slug": "endustriyel-iot-gateway",
        "title": "Endustriyel IoT Gateway Cozumu",
        "title_en": "Industrial IoT Gateway Solution",
        "subtitle": "Akilli Fabrika icin Edge Computing Platformu",
        "subtitle_en": "Edge Computing Platform for Smart Factory",
        "hero_image": "/assets/projects/iot-gateway-hero.jpg",
        "thumbnail": "/assets/projects/iot-gateway-thumb.jpg",
        "client_industry": "Endustri 4.0",
        "client_industry_en": "Industry 4.0",
        "project_type": "iot-solution",

        "challenge_text": "Buyuk bir uretim tesisi, yuzlerce makineden gelen verileri toplayip analiz edebilecek, ayni zamanda yerel edge computing yapabilecek bir IoT gateway sistemi ariyordu. Sistem, mevcut Modbus, CAN ve Ethernet protokollerini desteklemeli ve 7/24 kesintisiz calismaliydi.",
        "challenge_text_en": "A large manufacturing facility was looking for an IoT gateway system that could collect and analyze data from hundreds of machines while performing local edge computing. The system needed to support existing Modbus, CAN and Ethernet protocols and operate 24/7 without interruption.",

        "solution_text": "ARM Cortex-A53 islemci tabanli, ozel tasarim bir gateway karti gelistirdik. Kart uzerinde izole Modbus RS-485, CAN 2.0B, Gigabit Ethernet ve 4G/LTE baglantisi bulunuyor. Linux tabanli yazilimla edge analytics ve cloud entegrasyonu saglandi.",
        "solution_text_en": "We developed a custom gateway board based on ARM Cortex-A53 processor. The board includes isolated Modbus RS-485, CAN 2.0B, Gigabit Ethernet and 4G/LTE connectivity. Edge analytics and cloud integration were provided with Linux-based software.",

        "results_text": "Gateway sistemi, 500'den fazla makineden veri topluyor ve yerel anomali tespiti yapiyor. Sistem kesintisiz 18 aydir calisiyor. Enerji tuketimi %40 dusuruldu ve ariza oncesi bakim sayesinde uretim verimi %15 artti.",
        "results_text_en": "The gateway system collects data from over 500 machines and performs local anomaly detection. The system has been running uninterrupted for 18 months. Energy consumption was reduced by 40% and production efficiency increased by 15% thanks to predictive maintenance.",

        "technologies": ["ARM Cortex-A53", "Linux", "Modbus", "CAN Bus", "MQTT", "Docker", "Node-RED", "InfluxDB"],

        "phases": [
            {
                "title": "Faz 1: Ihtiyac Analizi",
                "title_en": "Phase 1: Needs Analysis",
                "description": "Fabrika ziyareti, mevcut sistem analizi ve gereksinim dokumantasyonu.",
                "description_en": "Factory visit, existing system analysis and requirements documentation.",
                "icon": "ClipboardList"
            },
            {
                "title": "Faz 2: Donanim Tasarimi",
                "title_en": "Phase 2: Hardware Design",
                "description": "Gateway PCB tasarimi, arayuz kartlari ve muhafaza tasarimi.",
                "description_en": "Gateway PCB design, interface cards and enclosure design.",
                "icon": "Cpu"
            },
            {
                "title": "Faz 3: Yazilim Gelistirme",
                "title_en": "Phase 3: Software Development",
                "description": "Linux BSP, protokol driverlari ve edge analytics yazilimi.",
                "description_en": "Linux BSP, protocol drivers and edge analytics software.",
                "icon": "Code"
            },
            {
                "title": "Faz 4: Saha Kurulumu",
                "title_en": "Phase 4: Field Installation",
                "description": "Pilot kurulum, test ve tam olcekli yaygin.",
                "description_en": "Pilot installation, testing and full-scale deployment.",
                "icon": "Wrench"
            }
        ],

        "metrics": {
            "cost_savings": "%40 enerji",
            "performance_improvement": "%15 verimlilik",
            "time_to_market": "6 ay",
            "custom": {
                "Bagli Makine": "500+",
                "Uptime": "%99.9"
            }
        },

        "featured": True,
        "order": 2,
        "visible": True
    },
    {
        "slug": "medikal-cihaz-kontrol-karti",
        "title": "Medikal Cihaz Kontrol Karti",
        "title_en": "Medical Device Control Board",
        "subtitle": "ISO 13485 Uyumlu Hassas Motor Kontrol Sistemi",
        "subtitle_en": "ISO 13485 Compliant Precision Motor Control System",
        "hero_image": "/assets/projects/medical-hero.jpg",
        "thumbnail": "/assets/projects/medical-thumb.jpg",
        "client_industry": "Medikal",
        "client_industry_en": "Medical",
        "project_type": "embedded-system",

        "challenge_text": "Bir medikal cihaz ureticisi, ameliyat robotlari icin mikron hassasiyetinde motor kontrol karti gelistirmemizi istedi. Kart, FDA ve CE onay sureclerine uygun olmali, EMC standartlarini karsilamali ve yedekli guvenlik sistemleri icermeliydi.",
        "challenge_text_en": "A medical device manufacturer requested us to develop a micron-precision motor control board for surgical robots. The board needed to comply with FDA and CE approval processes, meet EMC standards, and include redundant safety systems.",

        "solution_text": "STM32H7 mikrodenetleyici tabanli, cift CPU'lu yedekli bir mimari tasarladik. 24-bit ADC ile pozisyon geri beslemesi, izole motor suruculer ve kapsamli hata izleme ozellikleri eklendi. Tum tasarim IEC 62304 yazilim yasam dongusu standardina uygun gerceklestirildi.",
        "solution_text_en": "We designed a dual-CPU redundant architecture based on STM32H7 microcontroller. Position feedback with 24-bit ADC, isolated motor drivers and comprehensive fault monitoring features were added. All design was performed in compliance with IEC 62304 software lifecycle standard.",

        "results_text": "Sistem, 0.5 mikron pozisyon hassasiyeti sagliyor. FDA 510(k) ve CE MDR onaylari ilk basvuruda alindi. Sifir hata ile 10,000 saatten fazla calisma suresi kaydedildi.",
        "results_text_en": "The system provides 0.5 micron position accuracy. FDA 510(k) and CE MDR approvals were obtained on first application. Over 10,000 hours of operation time was recorded with zero failures.",

        "technologies": ["STM32H7", "IEC 62304", "ISO 13485", "EtherCAT", "Functional Safety", "24-bit ADC"],

        "metrics": {
            "performance_improvement": "0.5um hassasiyet",
            "time_to_market": "8 ay",
            "custom": {
                "Sertifikasyon": "FDA 510(k), CE MDR",
                "Hata Orani": "0"
            }
        },

        "featured": True,
        "order": 3,
        "visible": True
    }
]


# Site configuration for the portfolio
SITE_CONFIG = {
    "key": "site.config",
    "enabled": True,
    "data": {
        "company_name": "AICO Elektronik",
        "tagline": "Muhendislik ve Ar-Ge Danismanligi",
        "tagline_en": "Engineering and R&D Consulting",
        "contact_email": "info@aicoelektronik.com",
        "contact_phone": "+90 312 555 0000",
        "address": "Ankara, Turkiye",
        "social": {
            "linkedin": "https://linkedin.com/company/aicoelektronik",
            "twitter": "https://twitter.com/aicoelektronik"
        },
        "industries": [
            {"slug": "savunma", "name": "Savunma Sanayii", "name_en": "Defense Industry"},
            {"slug": "medikal", "name": "Medikal", "name_en": "Medical"},
            {"slug": "endustri40", "name": "Endustri 4.0", "name_en": "Industry 4.0"},
            {"slug": "otomasyon", "name": "Otomasyon", "name_en": "Automation"},
            {"slug": "enerji", "name": "Enerji", "name_en": "Energy"}
        ],
        "project_types": [
            {"slug": "pcb-design", "name": "PCB Tasarimi", "name_en": "PCB Design"},
            {"slug": "embedded-system", "name": "Gomulu Sistem", "name_en": "Embedded System"},
            {"slug": "iot-solution", "name": "IoT Cozumu", "name_en": "IoT Solution"},
            {"slug": "power-electronics", "name": "Guc Elektronigi", "name_en": "Power Electronics"}
        ]
    }
}


async def seed_config(db):
    """Seed the database with portfolio data"""
    from datetime import datetime, timezone
    import uuid

    # Seed site configuration
    existing_config = await db.config.find_one({"key": "site.config"})
    if not existing_config:
        config_doc = {
            "id": str(uuid.uuid4()),
            "key": SITE_CONFIG["key"],
            "enabled": SITE_CONFIG["enabled"],
            "data": SITE_CONFIG["data"],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.config.insert_one(config_doc)
        print(f"Seeded site config: {SITE_CONFIG['key']}")
    else:
        await db.config.update_one(
            {"key": "site.config"},
            {
                "$set": {
                    "data": SITE_CONFIG["data"],
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        print(f"Updated site config: {SITE_CONFIG['key']}")

    # Seed sample projects
    for project in SAMPLE_PROJECTS:
        existing_project = await db.projects.find_one({"slug": project["slug"]})
        if not existing_project:
            project_doc = {
                "id": str(uuid.uuid4()),
                **project,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
            await db.projects.insert_one(project_doc)
            print(f"Seeded project: {project['title']}")
        else:
            # Update existing project
            await db.projects.update_one(
                {"slug": project["slug"]},
                {
                    "$set": {
                        **{k: v for k, v in project.items() if k != "slug"},
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }
                }
            )
            print(f"Updated project: {project['title']}")

    print("Database seeding completed!")
