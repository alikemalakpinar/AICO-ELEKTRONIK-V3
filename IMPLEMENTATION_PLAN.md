# Aico Elektronik - JLCPCB-like Instant Quote System
## Detaylı Uygulama Planı

---

## 📋 Genel Bakış

**Tech Stack (Mevcut Ortam):**
- Frontend: React + Tailwind CSS + Shadcn/UI
- Backend: FastAPI (Python)
- Database: MongoDB
- Process Control: Supervisor

**Hedef:** Gerber yükleme → PCB seçenekleri → anında fiyat/termin hesaplama → sipariş → takip sistemi

---

## 🎯 Faz 1: Backend Core + Content Population (Paralel)

### A. Backend Data Models (MongoDB + UUID)

#### 1. Config Collection (Fiyat Katsayıları)
```python
{
    "id": "uuid",
    "key": "pcb_setup_fee",
    "value": 250.0,
    "currency": "TRY",
    "description": "PCB üretim hazırlık ücreti",
    "updated_at": "ISO datetime"
}
```

**Varsayılan Katsayılar:**
- `pcb_setup_fee`: 250 TRY
- `layer_multipliers`: {"2": 1.0, "4": 1.6, "6": 2.2, "8": 3.0, "10": 3.8}
- `coating_multipliers`: {"HASL": 1.0, "ENIG": 1.25, "OSP": 0.95}
- `copper_multipliers`: {"1oz": 1.0, "2oz": 1.3}
- `tolerance_multiplier`: 1.15 (≤0.1mm için)
- `impedance_base_fee`: 200 TRY
- `impedance_multiplier`: 1.10
- `etest_per_cm2`: 0.05
- `leadtime_multipliers`: {"fast": 1.4, "standard": 1.0, "economy": 0.9}
- `smt_setup_single`: 350 TRY
- `smt_setup_double`: 550 TRY
- `placement_per_component`: 0.22 TRY
- `unique_part_fee`: 0.8 TRY
- `bga_premium`: 0.6 TRY
- `stencil_fee`: 450 TRY
- `aoi_per_component`: 0.03 TRY
- `xray_per_bga`: 0.35 TRY
- `01005_multiplier`: 1.2

#### 2. User Collection
```python
{
    "id": "uuid",
    "email": "string",
    "company": "string",
    "locale": "tr | en",
    "created_at": "ISO datetime"
}
```

#### 3. File Collection
```python
{
    "id": "uuid",
    "user_id": "uuid",
    "quote_id": "uuid | null",
    "file_type": "GERBER | BOM | PNP",
    "original_filename": "string",
    "s3_path": "string",
    "file_size": "int (bytes)",
    "scan_status": "PENDING | CLEAN | INFECTED",
    "upload_status": "UPLOADING | COMPLETED | FAILED",
    "revision": "int",
    "created_at": "ISO datetime"
}
```

#### 4. Quote Collection
```python
{
    "id": "uuid",
    "user_id": "uuid | null",
    "file_ids": ["uuid"],
    "pcb_options": {
        "layers": "int",
        "width_mm": "float",
        "height_mm": "float",
        "quantity": "int",
        "coating": "HASL | ENIG | OSP",
        "copper_weight": "1oz | 2oz",
        "min_track_spacing": "float",
        "impedance_control": "boolean",
        "etest": "boolean",
        "leadtime": "fast | standard | economy"
    },
    "smt_options": {
        "enabled": "boolean",
        "sides": "single | double",
        "total_components": "int",
        "unique_parts": "int",
        "bga_count": "int",
        "has_01005": "boolean",
        "aoi": "boolean",
        "xray": "boolean"
    },
    "pricing": {
        "pcb_subtotal": "float",
        "smt_subtotal": "float",
        "shipping": "float",
        "total": "float",
        "currency": "TRY",
        "breakdown": {}
    },
    "status": "DRAFT | SENT | ACCEPTED | EXPIRED",
    "valid_until": "ISO datetime",
    "created_at": "ISO datetime",
    "updated_at": "ISO datetime"
}
```

#### 5. Order Collection
```python
{
    "id": "uuid",
    "quote_id": "uuid",
    "user_id": "uuid",
    "order_number": "string (auto-generated)",
    "payment_status": "PENDING | PAID | FAILED | REFUNDED",
    "payment_method": "STRIPE | BANK_TRANSFER",
    "payment_intent_id": "string | null",
    "tracking_status": "RECEIVED | REVIEW | PRODUCTION | QC | SHIPPED | DELIVERED",
    "tracking_notes": [{"timestamp": "ISO datetime", "status": "string", "note": "string"}],
    "created_at": "ISO datetime",
    "updated_at": "ISO datetime"
}
```

---

### B. Backend API Endpoints

#### 1. Config Management
- `GET /api/config` - Tüm katsayıları getir (public)
- `GET /api/config/:key` - Belirli katsayı
- `PUT /api/config/:key` - Katsayı güncelle (admin)

#### 2. File Upload
- `POST /api/upload/presigned-url` - S3 signed URL oluştur
  - Input: `{file_name, file_type, file_size}`
  - Output: `{upload_url, file_id, expires_at}`
- `POST /api/upload/confirm` - Upload tamamlandığını onayla
  - Input: `{file_id}`
  - Başlatır: Virus scan (background)

#### 3. Quote Calculation
- `POST /api/quote/calculate` - Fiyat hesapla
  - Input: PCB options + SMT options
  - Output: Pricing breakdown + leadtime
- `POST /api/quote/save` - Teklifi kaydet
  - Input: Quote data + file_ids
  - Output: Quote ID
- `GET /api/quote/:id` - Teklif detayları
- `POST /api/quote/:id/accept` - Teklifi onayla

#### 4. Order Management
- `POST /api/order/create` - Quote'tan sipariş oluştur
- `GET /api/order/:id` - Sipariş detayları ve tracking
- `POST /api/order/:id/update-tracking` - Tracking güncelle (admin)

#### 5. Tools (Calculator APIs)
- `POST /api/tools/panelize` - Panelizasyon hesapla
- `POST /api/tools/impedance` - İmpedans hesapla
- `POST /api/tools/bom-coverage` - BOM kapsam analizi

---

### C. Content Population (Frontend Pages)

#### 1. HomePage (`/app/frontend/src/pages/HomePage.jsx`)
✅ Zaten premium hero mevcut
- [ ] Services section metinlerini doldur
- [ ] References section - gerçek müşteri logoları (mock → replace)
- [ ] Newsletter section - entegre et (SendGrid)

#### 2. InstantQuotePage (`/app/frontend/src/pages/InstantQuotePage.jsx`)
**İçerik Skeleti:**
```
[Hero Section]
Başlık: "Anında PCB Teklifi - Gerber Yükle, Fiyatı Gör"
Alt başlık: "30 saniyede profesyonel PCB üretim fiyatı ve termin süresi"

[Upload Zone]
- Drag & drop Gerber/ZIP dosyası
- File format: .zip, .rar (max 50MB)
- Supported: Gerber RS-274X, ODB++

[PCB Options Form - 3 Column Layout]
Katman Sayısı | Boyutlar (mm) | Adet
Kaplama | Bakır Ağırlığı | Termin
[Advanced Toggle] → İmpedans kontrol, E-test, Panelizasyon

[SMT/Assembly Section - Collapsible]
Dizgi Gerekli mi? [Checkbox]
→ BOM yükle | PNP yükle
→ Taraf seçimi | Bileşen sayısı | BGA var mı?

[Live Price Summary Bar - Sticky Bottom]
PCB: ₺XXX | Dizgi: ₺XXX | Toplam: ₺XXX
Termin: X iş günü
[Teklif Kaydet] [Sipariş Ver]
```

#### 3. PCBManufacturingPage
**İçerik:**
```
[Hero]
"Prototipten Seri Üretime PCB Üretimi"

[Capabilities Grid - 4 Columns]
✓ 2-10 Katman | ✓ Min 0.1mm İz/Boşluk | ✓ Impedans Kontrol | ✓ E-Test Standart

[Process Timeline - 5 Steps]
1. Gerber Upload & DFM → 2. Panelizasyon → 3. Üretim → 4. QC → 5. Kargo

[Coating Options - Cards]
HASL | ENIG | OSP
[Her biri: Açıklama + kullanım alanı + fiyat farkı]

[Stackup Examples]
Standart 4L stackup görseli + açıklama

[CTA]
"Hemen Teklif Al" → InstantQuotePage
```

#### 4. PCBAssemblyPage
```
[Hero]
"SMT, THT ve Karma Dizgi Hizmetleri"

[Service Cards - 3 Columns]
SMT (01005'e kadar) | THT | BGA/CSP

[Quality Controls]
AOI | X-Ray | İlk Parça Onayı

[BOM Management]
- Muadil parça önerileri
- Tedarik risk analizi
- Stok kontrol

[CTA]
"BOM'unuzu Yükleyin" → InstantQuotePage
```

#### 5. PCBCapabilitiesPage
```
[Hero]
"PCB Üretim Kapasitelerimiz"

[Specifications Table]
| Parametre | Standart | İleri Seviye |
|-----------|----------|--------------|
| Katman | 2-6L | 8-10L |
| Min iz/boşluk | 0.15mm | 0.1mm |
| Min via | 0.3mm | 0.2mm |
| Bakır ağırlığı | 1oz | 2oz |
| Boyut | 500×500mm | Custom |

[Stackup Library]
2L, 4L, 6L, 8L standart stackup'lar

[Material Options]
FR-4 | High-Tg | Rogers | Aluminium

[CTA]
"Teknik Destek" → ContactPage
```

#### 6. AssemblyCapabilitiesPage
```
[Hero]
"Dizgi Kapasitelerimiz"

[Component Range Table]
| Tip | Min Boyut | Max Boyut |
|-----|-----------|-----------|
| SMT | 01005 | 50×50mm |
| BGA | 0.3mm pitch | - |
| Connector | - | 100 pin |

[Placement Accuracy]
SMT: ±0.02mm | BGA: ±0.05mm

[Quality Standards]
IPC-A-610 Class 2/3

[CTA]
"Teklif Al" → InstantQuotePage
```

#### 7. QualityPage
```
[Hero]
"Kalite Güvencesi ve Sertifikalar"

[Certifications - Badges]
ISO 9001 | ISO 14001 | RoHS | REACH

[Inspection Process]
- AOI (100% kontrol)
- X-Ray (BGA)
- Flying Probe Test
- İlk parça onayı

[Traceability]
Her sipariş → Üretim raporu + test sonuçları

[CTA]
"Kalite Politikamız" [PDF]
```

#### 8. SupportPage
```
[Hero]
"Teknik Destek ve Belgeler"

[Document Grid - 3 Columns]
📄 DFM Kontrol Listesi [PDF]
📄 Panelizasyon Rehberi [PDF]
📄 NDA Şablonu [PDF]
📄 Gerber Export Kılavuzu [PDF]
📄 Stackup Şablonları [ZIP]

[FAQ Accordion - 8-10 Soru]
Q: Minimum sipariş adedi?
A: 1 adet prototip kabul ediyoruz.

Q: Gerber nasıl hazırlanır?
A: [Detaylı açıklama + video linki]

[Contact CTA]
"Canlı Destek" veya "E-posta"
```

#### 9. CaseStudiesPage
```
[Hero]
"Müşteri Hikayeleri"

[Case Study Cards - Grid]
Her kart:
- Müşteri logosu (mock)
- Proje başlığı: "IoT Cihazı için 6L HDI PCB"
- Challenge + Solution (150 kelime)
- Sonuçlar: X% maliyet düşüşü, Y gün termin
- [Devamını Oku] → Modal

[İlk 2-3 Case Study - Placeholder]
1. "Medikal Cihaz 8L Impedans Kontrollü PCB"
2. "1000 Adet SMT Dizgi - 01005 Bileşen"
3. "Hızlı Prototip: 48 Saatte Teslimat"

[CTA]
"Projenizi Başlatalım" → ContactPage
```

---

## 🎯 Faz 2: 3rd Party Integrations

### A. File Upload & Storage (S3)

**Playbook Needed:**
```
INTEGRATION: AWS S3 or S3-compatible storage (Wasabi)
CONSTRAINTS: 
- Chunked upload support (large Gerber files)
- Pre-signed URLs for secure upload
- Private bucket with access control
```

**Implementation:**
- S3 client setup
- Presigned URL generation (15 min expiry)
- File validation (MIME type, size limit)
- Background virus scan trigger

---

### B. Payment Gateway (Stripe)

**Playbook Needed:**
```
INTEGRATION: Stripe Payment Integration (latest SDK)
CONSTRAINTS:
- Support card payments
- TRY currency
- Payment intents API
- Webhook for payment confirmation
```

**Implementation:**
- Stripe client setup
- Payment intent creation
- Webhook handler (`/api/webhooks/stripe`)
- Order status update on payment success

---

### C. Email Service (SendGrid)

**Playbook Needed:**
```
INTEGRATION: SendGrid Email API (latest SDK)
CONSTRAINTS:
- Transactional emails (quote confirmation, order updates)
- Turkish language support
- HTML templates
```

**Email Templates:**
1. Quote Confirmation
2. Order Received
3. Production Started
4. Quality Check Completed
5. Shipped

---

### D. PDF Generation (WeasyPrint or Puppeteer)

**Playbook Needed:**
```
INTEGRATION: PDF generation for quotes and invoices
CONSTRAINTS:
- Turkish characters support
- Logo and branding
- Table formatting
```

**PDF Types:**
1. Quote Summary (Proforma)
2. Invoice
3. Calculator Results (3 calculators)

---

### E. Virus Scanning (ClamAV)

**Playbook Needed:**
```
INTEGRATION: ClamAV virus scanning
CONSTRAINTS:
- Background scanning after upload
- Quarantine infected files
- User notification
```

---

## 🎯 Faz 3: Frontend-Backend Integration

### A. Instant Quote Flow

**Steps:**
1. User uploads Gerber → `POST /api/upload/presigned-url`
2. Frontend uploads to S3 using presigned URL
3. Frontend confirms → `POST /api/upload/confirm`
4. Backend triggers virus scan (background)
5. User fills PCB options → Live calculation via `POST /api/quote/calculate`
6. Live price summary bar updates (sticky bottom)
7. User saves quote → `POST /api/quote/save`
8. User accepts → `POST /api/quote/:id/accept` → Creates order
9. Payment flow → Stripe integration
10. Order tracking → `GET /api/order/:id`

### B. Calculator Tools Integration

**3 Calculators (Backend Logic Needed):**

1. **Panelization Calculator**
   - Input: PCB dimensions, array layout
   - Output: Panel efficiency, cost savings

2. **Impedance Calculator**
   - Input: Stackup, track width, dielectric
   - Output: Impedance value (Ohms)

3. **BOM Coverage Analyzer**
   - Input: BOM file (CSV/Excel)
   - Output: Part availability, alternatives, pricing

---

## 🎯 Faz 4: Testing & Polish

### A. Backend Testing
- [ ] Pricing engine accuracy
- [ ] File upload (large files, chunked)
- [ ] Quote calculation edge cases
- [ ] Order flow end-to-end
- [ ] Payment webhook testing

### B. Frontend Testing
- [ ] Instant Quote wizard (multi-step)
- [ ] File upload progress indicator
- [ ] Live price calculation
- [ ] Responsive design (mobile/tablet)
- [ ] Language switching (TR/EN)

### C. Performance
- [ ] Image optimization (WebP conversion)
- [ ] Lazy loading for images
- [ ] API response caching (Redis)
- [ ] Database indexing

---

## 📊 Priority Matrix

### Phase 1A (Week 1 - IMMEDIATE)
1. ✅ Backend data models (MongoDB + UUID)
2. ✅ Pricing engine v0.1
3. ✅ `/api/quote/calculate` endpoint
4. ✅ Content population (5 priority pages)

### Phase 1B (Week 1-2)
5. ⏳ File upload infrastructure (S3 playbook)
6. ⏳ `/api/upload/*` endpoints
7. ⏳ InstantQuotePage frontend integration
8. ⏳ Live price summary bar

### Phase 2 (Week 2-3)
9. ⏳ Stripe integration (payment flow)
10. ⏳ SendGrid integration (email notifications)
11. ⏳ Order management endpoints
12. ⏳ Order tracking page

### Phase 3 (Week 3-4)
13. ⏳ PDF generation (quote/invoice)
14. ⏳ 3 Calculator tools backend
15. ⏳ Virus scanning (ClamAV)
16. ⏳ Full E2E testing

---

## 🚀 Immediate Next Steps (Today)

1. ✅ Create backend data models (5 collections)
2. ✅ Seed Config collection with pricing coefficients
3. ✅ Implement pricing engine function
4. ✅ Create `/api/quote/calculate` endpoint
5. ✅ Update InstantQuotePage with content skeleton
6. ✅ Test pricing engine with sample data

---

## 📝 Notes

- **No PostgreSQL:** Using MongoDB with UUIDs (not ObjectId)
- **No Next.js:** Using React (client-side) + FastAPI
- **All backend routes:** Must have `/api` prefix
- **Environment variables:** Never hardcode, always use `.env`
- **DateTime:** Always use `datetime.now(timezone.utc)` and ISO strings for MongoDB
- **File uploads:** Chunked uploads to bypass proxy limits

---

## 🔑 API Keys Needed (To Ask User)

### Mandatory for Phase 1:
- None (using mock data initially)

### For Phase 2 (Before Integration):
1. **AWS S3 (or Wasabi):**
   - Access Key ID
   - Secret Access Key
   - Bucket Name
   - Region

2. **Stripe:**
   - Publishable Key (frontend)
   - Secret Key (backend)
   - Webhook Secret

3. **SendGrid:**
   - API Key

### Optional (Phase 3):
- **Cloudflare Turnstile / reCAPTCHA:** Site key + Secret key

---

## 📞 Integration Playbooks to Request

**Now:**
- None (starting with mock pricing)

**Before Phase 2:**
1. AWS S3 / Wasabi S3-compatible storage
2. Stripe Payment Integration
3. SendGrid Email API
4. PDF Generation (WeasyPrint/Puppeteer)

**Before Phase 3:**
5. ClamAV Virus Scanning

---

**Plan Onayı:** Bu planla ilerleyebilir miyim? Herhangi bir değişiklik veya öncelik değişimi var mı?
