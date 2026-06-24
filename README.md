# Rooz Auto (اسم مؤقت – يمكن تغييره من لوحة المدير)

منصة SaaS لخدمة المتاجر الإلكترونية، مبنية بـ:

- Backend: FastAPI (Python)
- Scraper Service: FastAPI (Python)
- Frontend: Vite + React + TypeScript (داخل `frontend`)
- قاعدة بيانات: PostgreSQL
- Redis
- مزوّدي ذكاء اصطناعي: Groq + OpenRouter

## 1) تشغيل محليًا باستخدام Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

الخدمات المحلية:

- Backend: http://localhost:8000
  - Health: http://localhost:8000/api/health
- Scraper: http://localhost:8001
  - Health: http://localhost:8001/health
- Postgres: localhost:5433
- Redis: localhost:6379

## 2) النشر على Coolify (جاهز Production)

### أ) Backend Application

- Repository: `https://github.com/ftaamrmr/rooz-map-full-project`
- Base Directory: `backend`
- Build Pack: `Dockerfile`
- Dockerfile Location: `backend/Dockerfile`
- Port: `8000`
- Healthcheck Path: `/api/health`

Environment Variables المطلوبة (من `.env.example`):

- `DATABASE_URL` (من خدمة PostgreSQL في Coolify)
- `REDIS_URL` (من خدمة Redis في Coolify)
- `JWT_SECRET`
- `JWT_ALGORITHM`
- `ACCESS_TOKEN_EXPIRE_MINUTES`
- `BACKEND_CORS_ORIGINS` (دومين الواجهة)
- `SCRAPER_SERVICE_URL` (دومين خدمة السكرابر)
- مفاتيح Groq/OpenRouter حسب الحاجة

### ب) Scraper Application

- Repository: `https://github.com/ftaamrmr/rooz-map-full-project`
- Base Directory: `scraper`
- Build Pack: `Dockerfile`
- Dockerfile Location: `scraper/Dockerfile`
- Port: `8000`
- Healthcheck Path: `/health`

ثم انسخ دومين السكرابر إلى `SCRAPER_SERVICE_URL` في backend وأعد نشر backend.

### ج) Frontend Application

- Repository: `https://github.com/ftaamrmr/rooz-map-full-project`
- Base Directory: `frontend`
- Build Pack: `Dockerfile`
- Dockerfile Location: `frontend/Dockerfile`
- Port: `80`
- Healthcheck Path: `/health`

متغير بيئة frontend:

- `VITE_API_URL=https://<BACKEND_DOMAIN>/api`

> ملاحظة: لأنه Vite SPA، تم إعداد Nginx مع fallback إلى `index.html` لدعم React Router.

## 3) ملاحظات الأمان والإنتاج

- لا ترفع ملف `.env` إلى GitHub.
- استخدم فقط Environment Variables داخل Coolify.
- استخدم قيمة قوية وعشوائية لـ `JWT_SECRET`.
- اجعل `BACKEND_CORS_ORIGINS` محصورًا بدومين/دومينات الواجهة فقط.
