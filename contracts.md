# Aico Elektronik - API Contracts & Integration Plan

## Overview
Premium B2B electronics platform with products catalog, services, and engineering tools.

---

## 1. DATA MODELS

### Product
```python
{
    "id": str (uuid),
    "code": str (unique, e.g., "AIC-PS-240W-24V"),
    "name_tr": str,
    "name_en": str,
    "category": str (power-supplies, led-drivers, sensors, etc.),
    "power": int (watts),
    "voltage": int (volts),
    "current": float (amperes),
    "efficiency": int (percentage),
    "ip_rating": str,
    "certifications": [str],
    "price": float,
    "stock": bool,
    "image_url": str,
    "datasheet_url": str (optional),
    "created_at": datetime,
    "updated_at": datetime
}
```

### Service
```python
{
    "id": str (uuid),
    "slug": str (pcb-manufacturing, pcb-assembly, etc.),
    "title_tr": str,
    "title_en": str,
    "description_tr": str,
    "description_en": str,
    "features": [{"tr": str, "en": str}],
    "active": bool,
    "created_at": datetime
}
```

### Quote Request
```python
{
    "id": str (uuid),
    "type": str (product | service | custom),
    "name": str,
    "email": str,
    "phone": str,
    "company": str,
    "message": str,
    "product_ids": [str] (optional),
    "service_id": str (optional),
    "files": [str] (file URLs for Gerber, etc.),
    "status": str (pending | processing | quoted | completed),
    "created_at": datetime,
    "updated_at": datetime
}
```

### Newsletter Subscription
```python
{
    "id": str (uuid),
    "email": str (unique),
    "language": str (tr | en),
    "subscribed_at": datetime,
    "active": bool
}
```

### Calculator Result
```python
{
    "id": str (uuid),
    "type": str (power-supply | led-driver | cable-voltage),
    "inputs": dict (calculator parameters),
    "results": dict (calculation results),
    "email": str (optional),
    "created_at": datetime
}
```

---

## 2. API ENDPOINTS

### Products
- `GET /api/products` - List all products with filters
  - Query params: category, minPower, maxPower, voltage, ipRating, certification
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories with counts

### Services
- `GET /api/services` - List all services
- `GET /api/services/:slug` - Get single service

### Quote Requests
- `POST /api/quotes` - Create new quote request
  - Body: { name, email, phone, company, message, type, product_ids?, service_id?, files? }
  - Returns: { id, status, message }
- `GET /api/quotes/:id` - Get quote status (optional, for tracking)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
  - Body: { email, language }
  - Returns: { success, message }

### Calculators
- `POST /api/calculators/power-supply` - Power supply calculation
  - Body: { outputVoltage, outputCurrent, efficiency, etc. }
  - Returns: { outputPower, inputPower, recommendedPower, products[] }
- `POST /api/calculators/led-driver` - LED driver calculation
- `POST /api/calculators/cable-voltage` - Cable calculation
- `POST /api/calculators/save` - Save calculation result (optional)

---

## 3. MOCK DATA TO REPLACE

### File: `/app/frontend/src/mock.js`

**Remove from frontend:**
- `mockProducts` array → fetch from `GET /api/products`
- `services` array → fetch from `GET /api/services`
- `referenceLogos` → can stay as static (no backend needed)
- `productCategories` → fetch from `GET /api/products/categories`

**Keep in frontend:**
- `translations` - stays static
- `calculatorTools` - stays static (UI config)
- `sectors` - stays static

---

## 4. FRONTEND INTEGRATION POINTS

### Homepage (`src/pages/HomePage.jsx`)
- Services component: Fetch services on mount
- Categories component: Fetch categories on mount
- References: No changes (static)

### Product Pages (`src/pages/ProductListPage.jsx`, `ProductDetailPage.jsx`)
- Replace `mockProducts` with API calls
- Add loading states
- Add error handling

### Calculator Pages
- POST calculation results to backend
- Get product recommendations from API
- Optional: Save results via email

### Quote/Contact Forms
- Newsletter: POST to `/api/newsletter/subscribe`
- Product quote: POST to `/api/quotes` with product_ids
- Service quote: POST to `/api/quotes` with service_id

---

## 5. BACKEND IMPLEMENTATION STEPS

### Phase 1: Database Setup
1. Create MongoDB collections:
   - `products`
   - `services`
   - `quote_requests`
   - `newsletter_subscriptions`
   - `calculator_results` (optional)

2. Seed initial data:
   - Port `mockProducts` to database
   - Port `services` to database

### Phase 2: API Routes
1. Products CRUD (GET only for MVP)
2. Services CRUD (GET only for MVP)
3. Quote requests (POST + GET)
4. Newsletter subscription (POST)
5. Calculator endpoints (POST)

### Phase 3: Business Logic
1. Quote request email notifications
2. Newsletter confirmation emails (optional)
3. Calculator result recommendations logic
4. File upload handling for quote requests (Gerber files)

---

## 6. ENVIRONMENT VARIABLES

```env
# Already exists
MONGO_URL=mongodb://localhost:27017/aico
DB_NAME=aico_db

# To add
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@aico.com.tr
ADMIN_EMAIL=info@aico.com.tr
```

---

## 7. PRIORITY ORDER

1. **Products API** - Most critical for catalog functionality
2. **Quote Request API** - Core business functionality
3. **Newsletter API** - Lead generation
4. **Calculator APIs** - Value-added features
5. **Services API** - Informational

---

## 8. TESTING CHECKLIST

- [ ] Products listing with filters work
- [ ] Product detail page loads correctly
- [ ] Quote form submits successfully
- [ ] Newsletter subscription works
- [ ] Email notifications sent for quotes
- [ ] Calculator results return product recommendations
- [ ] Mobile responsive on all pages
- [ ] TR/EN language switching works
- [ ] Loading states display correctly
- [ ] Error handling works gracefully

---

## Notes
- All API responses should support TR/EN based on Accept-Language header or query param
- File uploads should be handled with multipart/form-data
- Rate limiting should be applied to quote and newsletter endpoints
- CORS is already configured in server.py
