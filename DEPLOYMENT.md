# دليل النشر على Coolify - Rooz Auto

هذا الدليل الشامل لنشر مشروع Rooz Auto على Coolify.

## المتطلبات الأساسية

1. حساب على Coolify أو خادم Coolify خاص
2. مستودع GitHub مع كود المشروع
3. مفاتيح API للخدمات الخارجية:
   - Groq API Key
   - OpenRouter API Key (اختياري)

## البنية التحتية

المشروع يتكون من 5 خدمات رئيسية:
1. **Backend** - FastAPI (Python) - المنطق الأساسي والـ API
2. **Scraper** - FastAPI (Python) - خدمة استخراج البيانات من المواقع
3. **Frontend** - React + Vite - الواجهة الأمامية
4. **PostgreSQL** - قاعدة البيانات
5. **Redis** - التخزين المؤقت

---

## خطوات النشر التفصيلية

### 1. إعداد قواعد البيانات في Coolify

#### أ) PostgreSQL
1. في لوحة تحكم Coolify، اذهب إلى **Databases**
2. اضغط على **+ New Database**
3. اختر **PostgreSQL**
4. أدخل التفاصيل:
   - **Name**: rooz-auto-postgres
   - **Database Name**: rooz_auto
   - **Username**: postgres
   - **Password**: اختر كلمة سر قوية
5. اضغط **Create**
6. **مهم**: احفظ **Connection String** الذي سيظهر لك

#### ب) Redis
1. في لوحة تحكم Coolify، اذهب إلى **Databases**
2. اضغط على **+ New Database**
3. اختر **Redis**
4. أدخل التفاصيل:
   - **Name**: rooz-auto-redis
5. اضغط **Create**
6. **مهم**: احفظ **Connection String** الذي سيظهر لك

---

### 2. نشر Backend Service

1. في Coolify، اضغط على **+ New Resource**
2. اختر **Application**
3. اختر **Public Repository**
4. أدخل التفاصيل:
   - **Git Repository URL**: `https://github.com/YOUR_USERNAME/YOUR_REPO.git`
   - **Branch**: `main`
   - **Base Directory**: `backend`
   - **Build Pack**: `Dockerfile`
   - **Dockerfile Location**: `backend/Dockerfile`

5. في تبويب **Environment Variables**، أضف المتغيرات التالية:

```env
# Database
DATABASE_URL=postgresql://postgres:PASSWORD@postgres-host:5432/rooz_auto

# Redis
REDIS_URL=redis://default:PASSWORD@redis-host:6379/0

# JWT
JWT_SECRET=YOUR_VERY_SECURE_SECRET_KEY_HERE
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Groq
GROQ_API_KEY=your-groq-api-key-here
GROQ_API_BASE=https://api.groq.com/openai/v1
GROQ_MODEL_FAST=mixtral-8x7b-32768
GROQ_MODEL_CHAT=llama-3.1-70b-versatile

# OpenRouter (اختياري)
OPENROUTER_API_KEY=your-openrouter-api-key-here
OPENROUTER_API_BASE=https://openrouter.ai/api/v1
OR_MODEL_PREMIUM=openai/gpt-4.1-mini
OR_MODEL_ULTRA=anthropic/claude-3.5-sonnet

# Model Router Policy (JSON)
MODEL_ROUTER_POLICY={"product_description":{"provider":"groq","model_env":"GROQ_MODEL_FAST"},"reviews_analysis":{"provider":"groq","model_env":"GROQ_MODEL_FAST"},"seo_basic":{"provider":"groq","model_env":"GROQ_MODEL_FAST"},"chatbot":{"provider":"groq","model_env":"GROQ_MODEL_CHAT"},"ads_copy":{"provider":"openrouter_ultra","model_env":"OR_MODEL_ULTRA"},"seo_advanced":{"provider":"openrouter_premium","model_env":"OR_MODEL_PREMIUM"},"strategic_analysis":{"provider":"openrouter_ultra","model_env":"OR_MODEL_ULTRA"},"fallback":{"provider":"groq","model_env":"GROQ_MODEL_FAST"}}

# Scraper Service (سنضيفه لاحقاً)
SCRAPER_SERVICE_URL=http://scraper:8000
```

6. في تبويب **Domains**، أضف دومين للـ Backend (مثلاً: `backend.yourdomain.com`)
7. اضغط **Deploy**
8. انتظر حتى يكتمل النشر
9. جرّب الوصول إلى: `https://backend.yourdomain.com/api/health`

---

### 3. نشر Scraper Service

1. في Coolify، اضغط على **+ New Resource**
2. اختر **Application**
3. اختر **Public Repository**
4. أدخل التفاصيل:
   - **Git Repository URL**: نفس المستودع
   - **Branch**: `main`
   - **Base Directory**: `scraper`
   - **Build Pack**: `Dockerfile`
   - **Dockerfile Location**: `scraper/Dockerfile`

5. في تبويب **Domains**، أضف دومين للـ Scraper (مثلاً: `scraper.yourdomain.com`)
6. اضغط **Deploy**
7. بعد النشر، جرّب الوصول إلى: `https://scraper.yourdomain.com/health`

8. **مهم**: ارجع إلى **Backend Service** وعدّل متغير البيئة:
   ```
   SCRAPER_SERVICE_URL=https://scraper.yourdomain.com
   ```
9. أعد نشر الـ Backend

---

### 4. نشر Frontend

1. في Coolify، اضغط على **+ New Resource**
2. اختر **Application**
3. اختر **Public Repository**
4. أدخل التفاصيل:
   - **Git Repository URL**: نفس المستودع
   - **Branch**: `main`
   - **Base Directory**: `frontend`
   - **Build Pack**: `Dockerfile`
   - **Dockerfile Location**: `frontend/Dockerfile`

5. في تبويب **Environment Variables**، أضف:
```env
VITE_API_URL=https://backend.yourdomain.com/api
```

6. في تبويب **Domains**، أضف الدومين الرئيسي (مثلاً: `app.yourdomain.com`)
7. اضغط **Deploy**

---

## التحقق من النشر

بعد نشر جميع الخدمات، تحقق من:

### Backend
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

### Scraper
```bash
curl https://scraper.yourdomain.com/health
```
يجب أن ترى:
```json
{
  "status": "healthy",
  "service": "Rooz Auto Scraper",
  "version": "1.0.0"
}
```

### Frontend
افتح المتصفح واذهب إلى: `https://app.yourdomain.com`

---

## إعداد CORS للأمان

بعد التأكد من عمل كل شيء، عدّل ملف `backend/app/main.py` لتحديد الدومينات المسموح بها:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://app.yourdomain.com",
        "https://yourdomain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## استكشاف الأخطاء الشائعة

### 1. Backend لا يتصل بقاعدة البيانات
- تأكد من `DATABASE_URL` صحيح
- تحقق من أن PostgreSQL يعمل
- في Coolify، تأكد من أن Backend والـ Database في نفس **Network**

### 2. CORS Errors في المتصفح
- تأكد من أن `VITE_API_URL` في Frontend صحيح
- تحقق من إعدادات CORS في Backend

### 3. Scraper Service لا يستجيب
- تحقق من Logs في Coolify
- تأكد من أن الدومين صحيح في `SCRAPER_SERVICE_URL`

### 4. Frontend لا يعرض البيانات
- افتح Developer Console في المتصفح
- تحقق من Network Tab لرؤية طلبات API
- تأكد من `VITE_API_URL` صحيح

---

## النسخ الاحتياطي

### قاعدة البيانات
في Coolify، يمكنك إعداد نسخ احتياطية تلقائية لـ PostgreSQL:
1. اذهب إلى Database Settings
2. فعّل **Automated Backups**
3. اختر التكرار (يومي/أسبوعي)

### الكود
الكود محفوظ في GitHub، لكن يُنصح بـ:
1. عمل Tags للإصدارات المهمة
2. حفظ نسخة من متغيرات البيئة في مكان آمن

---

## التحديثات المستقبلية

عند تحديث الكود:
1. ادفع التغييرات إلى GitHub
2. في Coolify، اذهب إلى التطبيق المراد تحديثه
3. اضغط **Redeploy**

أو يمكنك تفعيل **Auto Deploy** في Coolify لينشر تلقائياً عند كل Push إلى GitHub.

---

## ملاحظات مهمة

1. **JWT_SECRET**: استخدم قيمة عشوائية قوية جداً (64+ حرف)
2. **كلمات السر**: لا ترفع ملفات `.env` إلى GitHub أبداً
3. **API Keys**: احفظها في مكان آمن
4. **Database Backups**: فعّل النسخ الاحتياطي التلقائي
5. **SSL/HTTPS**: Coolify يوفر شهادات SSL مجانية تلقائياً
6. **Monitoring**: استخدم لوحة Monitoring في Coolify لمتابعة الأداء

---

## الدعم والمساعدة

إذا واجهت مشاكل:
1. تحقق من Logs في Coolify لكل خدمة
2. راجع قسم استكشاف الأخطاء أعلاه
3. تأكد من أن جميع متغيرات البيئة صحيحة

## الخطوات التالية

بعد النشر الناجح:
1. أنشئ حساب مدير من خلال API
2. ابدأ في تخصيص البراندنج من لوحة الإدارة
3. اختبر جميع الميزات
4. راجع إعدادات الأمان

---

**ملاحظة**: هذا الدليل يفترض استخدام Coolify v4+. قد تختلف بعض الخطوات حسب الإصدار.
