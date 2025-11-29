# دليل البداية السريعة - Rooz Auto

دليل سريع لتشغيل المشروع محلياً أو نشره على Coolify.

## 🚀 التشغيل المحلي (Local Development)

### المتطلبات
- Docker و Docker Compose
- أو: Python 3.11+, Node.js 20+, PostgreSQL, Redis

### الطريقة 1: باستخدام Docker Compose (الأسهل)

```bash
# 1. انسخ ملف البيئة
cp .env.example .env

# 2. عدّل الإعدادات في .env (أضف API keys)
nano .env

# 3. شغّل جميع الخدمات
docker compose up --build
```

الآن يمكنك الوصول إلى:
- Backend: http://localhost:8000
- Backend API Docs: http://localhost:8000/docs
- Scraper: http://localhost:8001
- Frontend: http://localhost:3000

### الطريقة 2: بدون Docker (للتطوير)

#### Backend
```bash
cd backend
pip install -r requirements.txt
cp ../.env.example .env
# عدّل .env وأضف DATABASE_URL و REDIS_URL
uvicorn app.main:app --reload --port 8000
```

#### Scraper
```bash
cd scraper
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

#### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# عدّل VITE_API_URL في .env
npm run dev
```

---

## 🌐 النشر على Coolify

### خطوات سريعة

#### 1. حضّر البنية التحتية في Coolify
- أنشئ PostgreSQL database → احفظ Connection String
- أنشئ Redis database → احفظ Connection String

#### 2. انشر Backend
```
Resource Type: Application
Build Pack: Dockerfile
Base Directory: backend
Dockerfile Location: backend/Dockerfile
```

**Environment Variables** (أضفها كلها):
```env
DATABASE_URL=postgresql://...  # من Coolify
REDIS_URL=redis://...          # من Coolify
JWT_SECRET=<64-char-random-string>
GROQ_API_KEY=<your-groq-key>
OPENROUTER_API_KEY=<your-openrouter-key>
SCRAPER_SERVICE_URL=http://scraper:8000  # سنعدلها لاحقاً
```

احفظ domain الـ Backend: `https://backend.yourdomain.com`

#### 3. انشر Scraper
```
Resource Type: Application
Build Pack: Dockerfile
Base Directory: scraper
Dockerfile Location: scraper/Dockerfile
```

احفظ domain الـ Scraper: `https://scraper.yourdomain.com`

**ارجع للـ Backend** وعدّل:
```env
SCRAPER_SERVICE_URL=https://scraper.yourdomain.com
```
ثم أعد Deploy الـ Backend.

#### 4. انشر Frontend
```
Resource Type: Application
Build Pack: Dockerfile
Base Directory: frontend
Dockerfile Location: frontend/Dockerfile
```

**Environment Variables**:
```env
VITE_API_URL=https://backend.yourdomain.com/api
```

---

## ✅ التحقق من التثبيت

### Backend Health Check
```bash
curl https://backend.yourdomain.com/api/health
```

يجب أن ترى:
```json
{
  "status": "healthy",
  "database": "connected",
  "redis": "connected"
}
```

### Scraper Health Check
```bash
curl https://scraper.yourdomain.com/health
```

### Frontend
افتح المتصفح: `https://app.yourdomain.com`

---

## 🔧 إعدادات إضافية

### توليد JWT_SECRET قوي
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(64))"
```

### الحصول على API Keys
- **Groq**: https://console.groq.com/
- **OpenRouter**: https://openrouter.ai/keys

---

## 📚 المزيد من التفاصيل

- **دليل النشر الكامل**: `DEPLOYMENT.md`
- **المشاكل والحلول**: `CODE_ISSUES.md`
- **API Documentation**: `http://localhost:8000/docs` (Swagger UI)

---

## ⚡ نصائح سريعة

1. **أمان**: غيّر `JWT_SECRET` قبل النشر على Production
2. **CORS**: عدّل `allow_origins` في `backend/app/main.py` للإنتاج
3. **Backups**: فعّل النسخ الاحتياطي التلقائي في Coolify للـ Database
4. **Monitoring**: راقب Logs في Coolify لاكتشاف المشاكل مبكراً
5. **SSL**: Coolify يوفر HTTPS تلقائياً مع Let's Encrypt

---

## 🆘 مشاكل شائعة

### Backend لا يبدأ
- تحقق من `DATABASE_URL` و `REDIS_URL`
- تأكد من أن PostgreSQL و Redis يعملان
- راجع Logs: `docker logs rooz_auto_backend`

### Frontend لا يتصل بـ Backend
- تحقق من `VITE_API_URL` في `.env`
- افتح Developer Tools → Network في المتصفح
- تأكد من CORS settings في Backend

### Scraper يفشل
- بعض المواقع تحظر bots - هذا طبيعي
- للمواقع المعقدة، قد تحتاج Playwright
- راجع Logs للتفاصيل

---

**ملاحظة**: المشروع الآن جاهز للتشغيل والنشر! جميع الملفات الضرورية موجودة ✨
