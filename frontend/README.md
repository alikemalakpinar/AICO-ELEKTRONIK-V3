# AICO Elektronik Frontend

Next.js 14 App Router application for AICO Elektronik's engineering portfolio.

## Architecture

### Same-Origin API Proxy

This app uses a **same-origin proxy architecture** for API calls:

```
┌─────────────────────────────────────────────────────────────┐
│                        NGINX (Port 80)                       │
│                                                              │
│   /api/*  ──────────▶  Backend (FastAPI :8001)              │
│   /*      ──────────▶  Frontend (Next.js :3000)             │
└─────────────────────────────────────────────────────────────┘
```

**Benefits:**
- No `NEXT_PUBLIC_BACKEND_URL` needed - same Docker image works across staging/prod
- Client-side API calls use relative URLs (`/api/...`)
- Proper rate limiting with real client IP via `X-Forwarded-For`
- Simplified CORS configuration (same-origin)

### Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Build-time | Site URL for SEO metadata |
| `NEXT_PUBLIC_IMAGE_DOMAINS` | Build-time | Allowed domains for `next/image` |
| `INTERNAL_API_URL` | Runtime | Backend URL for SSR (Docker internal) |

**Note:** API calls do NOT use `NEXT_PUBLIC_*` variables.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start
```

## Docker Deployment

### Development

```bash
docker-compose up --build
```

Access the app at http://localhost:80 (via nginx proxy)

### Production

```bash
# Set environment variables
export SITE_URL=https://aicoelektronik.com
export ALLOWED_ORIGINS=https://aicoelektronik.com
export SECRET_KEY=your-secret-key
export MONGO_ROOT_USER=admin
export MONGO_ROOT_PASSWORD=secure-password
export REDIS_PASSWORD=secure-password

# Deploy
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Key Configuration

1. **CORS**: Set `ALLOWED_ORIGINS` to your production domain only
2. **Rate Limiting**: nginx passes `X-Real-IP` and `X-Forwarded-For` headers
3. **Image Domains**: Set `NEXT_PUBLIC_IMAGE_DOMAINS` if using external CDN

## API Client Usage

```typescript
import { api } from '@/lib/api';

// All API calls use relative URLs automatically
const projects = await api.getProjects({ featured: true });
const project = await api.getProject('smart-villa');
await api.submitConsultation({ name: '...', email: '...', ... });
```

## Project Structure

```
frontend/
├── app/                    # Next.js 14 App Router
│   ├── [lang]/             # Locale-based routing (tr/en)
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
├── components/
│   ├── premium/            # Premium UI components
│   │   └── 3d/             # Three.js 3D scenes
│   ├── seo/                # JSON-LD structured data
│   └── ui/                 # Base UI components
├── lib/
│   ├── api.ts              # API client (same-origin)
│   ├── hooks/              # Custom React hooks
│   ├── i18n.ts             # Translations
│   └── motion.ts           # Animation constants
└── nginx.conf              # Nginx reverse proxy config
```
