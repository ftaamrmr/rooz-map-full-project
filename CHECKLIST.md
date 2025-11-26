# قائمة التحقق - Deployment Checklist

استخدم هذه القائمة للتأكد من إكمال جميع الخطوات قبل وأثناء وبعد النشر.

## ✅ قبل النشر (Pre-Deployment)

### الكود والملفات
- [ ] المشروع محفوظ في GitHub
- [ ] جميع الملفات الحساسة (`.env`) في `.gitignore`
- [ ] تم مراجعة الكود والتأكد من عدم وجود أخطاء واضحة
- [ ] تم تحديث التوثيق (README, DEPLOYMENT.md)

### البيئة والإعدادات
- [ ] حساب Coolify جاهز ويعمل
- [ ] دومينات جاهزة (أو ستستخدم subdomains من Coolify)
- [ ] حصلت على API Keys:
  - [ ] Groq API Key
  - [ ] OpenRouter API Key (اختياري)

### الأمان
- [ ] ولّدت `JWT_SECRET` قوي (64+ حرف)
- [ ] حفظت جميع الأسرار وكلمات السر في مكان آمن
- [ ] لن ترفع ملفات `.env` إلى GitHub

---

## 📦 أثناء النشر (During Deployment)

### 1. قواعد البيانات في Coolify

#### PostgreSQL
- [ ] أنشأت PostgreSQL database في Coolify
- [ ] Database Name: `rooz_auto`
- [ ] حفظت Connection String
- [ ] اختبرت الاتصال (اختياري)
- [ ] فعّلت Automated Backups

#### Redis
- [ ] أنشأت Redis database في Coolify
- [ ] حفظت Connection String

### 2. Backend Service

- [ ] أنشأت Application في Coolify
- [ ] اخترت Public Repository
- [ ] Repository URL صحيح
- [ ] Branch: `main`
- [ ] Base Directory: `backend`
- [ ] Build Pack: Dockerfile
- [ ] Dockerfile Location: `backend/Dockerfile`

**Environment Variables**:
- [ ] `DATABASE_URL`
- [ ] `REDIS_URL`
- [ ] `JWT_SECRET`
- [ ] `JWT_ALGORITHM=HS256`
- [ ] `ACCESS_TOKEN_EXPIRE_MINUTES=1440`
- [ ] `GROQ_API_KEY`
- [ ] `GROQ_API_BASE=https://api.groq.com/openai/v1`
- [ ] `GROQ_MODEL_FAST=mixtral-8x7b-32768`
- [ ] `GROQ_MODEL_CHAT=llama-3.1-70b-versatile`
- [ ] `OPENROUTER_API_KEY`
- [ ] `OPENROUTER_API_BASE=https://openrouter.ai/api/v1`
- [ ] `OR_MODEL_PREMIUM=openai/gpt-4.1-mini`
- [ ] `OR_MODEL_ULTRA=anthropic/claude-3.5-sonnet`
- [ ] `MODEL_ROUTER_POLICY` (JSON string)
- [ ] `SCRAPER_SERVICE_URL=http://scraper:8000` (مؤقت)

**Domain & Deployment**:
- [ ] أضفت Domain للـ Backend
- [ ] ضغطت Deploy
- [ ] انتظرت حتى اكتمل Build
- [ ] حفظت Backend Domain: `________________`

### 3. Scraper Service

- [ ] أنشأت Application في Coolify
- [ ] Repository URL صحيح
- [ ] Branch: `main`
- [ ] Base Directory: `scraper`
- [ ] Build Pack: Dockerfile
- [ ] Dockerfile Location: `scraper/Dockerfile`
- [ ] أضفت Domain للـ Scraper
- [ ] ضغطت Deploy
- [ ] حفظت Scraper Domain: `________________`

**تحديث Backend**:
- [ ] رجعت إلى Backend Settings
- [ ] عدّلت `SCRAPER_SERVICE_URL` إلى Scraper Domain
- [ ] أعدت Deploy للـ Backend

### 4. Frontend Service

- [ ] أنشأت Application في Coolify
- [ ] Repository URL صحيح
- [ ] Branch: `main`
- [ ] Base Directory: `frontend`
- [ ] Build Pack: Dockerfile
- [ ] Dockerfile Location: `frontend/Dockerfile`

**Environment Variables**:
- [ ] `VITE_API_URL=https://[backend-domain]/api`

**Domain & Deployment**:
- [ ] أضفت Domain للـ Frontend (الدومين الرئيسي)
- [ ] ضغطت Deploy
- [ ] حفظت Frontend Domain: `________________`

---

## 🧪 التحقق من النشر (Verification)

### Backend Health Check
- [ ] فتحت `https://[backend-domain]/api/health`
- [ ] رأيت response صحيح:
```json
{
  "status": "healthy",
  "database": "connected",
  "redis": "connected"
}
```

### Backend API Docs
- [ ] فتحت `https://[backend-domain]/docs`
- [ ] صفحة Swagger UI ظهرت بشكل صحيح

### Scraper Health Check
- [ ] فتحت `https://[scraper-domain]/health`
- [ ] رأيت response صحيح:
```json
{
  "status": "healthy",
  "service": "Rooz Auto Scraper",
  "version": "1.0.0"
}
```

### Frontend
- [ ] فتحت `https://[frontend-domain]`
- [ ] الصفحة الرئيسية ظهرت بشكل صحيح
- [ ] لا توجد أخطاء في Browser Console
- [ ] يمكنني التنقل بين الصفحات

### Integration Tests
- [ ] جربت إنشاء حساب جديد
- [ ] جربت تسجيل الدخول
- [ ] جربت استدعاء AI endpoint
- [ ] جربت Scraper من خلال Backend
- [ ] كل شيء يعمل بشكل متكامل

---

## 🔒 إعدادات الأمان (Security)

### CORS Configuration
- [ ] عدّلت `backend/app/main.py`
- [ ] غيّرت `allow_origins=["*"]` إلى قائمة الدومينات:
```python
allow_origins=[
    "https://[frontend-domain]",
    "https://www.[frontend-domain]"
]
```
- [ ] أعدت Deploy للـ Backend
- [ ] اختبرت Frontend للتأكد من عمل CORS

### Environment Variables Review
- [ ] راجعت جميع Environment Variables
- [ ] تأكدت من عدم وجود قيم افتراضية أو ضعيفة
- [ ] تأكدت من أن JWT_SECRET قوي جداً

---

## 📊 Monitoring & Maintenance

### Logs & Monitoring
- [ ] فعّلت Log viewing في Coolify
- [ ] راجعت Logs لكل service للتأكد من عدم وجود أخطاء
- [ ] أعددت Alerts (اختياري)

### Backups
- [ ] فعّلت Automated Backups للـ PostgreSQL
- [ ] اخترت تكرار النسخ الاحتياطي (يومي موصى به)
- [ ] اختبرت استعادة Backup (اختياري لكن موصى به)

### Performance
- [ ] راجعت استخدام الموارد (CPU, Memory, Disk)
- [ ] تأكدت من أن كل Service يعمل بكفاءة
- [ ] راقبت Response Times للـ API

---

## 🚀 After Launch

### Documentation
- [ ] حدّثت README مع الدومينات الفعلية
- [ ] وثّقت أي تخصيصات إضافية قمت بها
- [ ] حفظت نسخة من جميع الإعدادات

### Users & Access
- [ ] أنشأت حساب Admin
- [ ] اختبرت جميع الميزات من خلال UI
- [ ] دربت المستخدمين (إن وجد)

### Continuous Deployment
- [ ] فعّلت Auto Deploy من GitHub (اختياري)
- [ ] أو حفظت خطوات Manual Deploy للمستقبل

### Maintenance Plan
- [ ] أنشأت خطة للتحديثات
- [ ] أنشأت خطة للنسخ الاحتياطي
- [ ] أنشأت خطة لمراقبة الأداء

---

## 📝 ملاحظات إضافية

استخدم هذا المكان لتدوين أي ملاحظات، مشاكل واجهتها، أو حلول وجدتها:

```
[مساحة للملاحظات]









```

---

## ✨ تم الانتهاء!

إذا أكملت جميع النقاط أعلاه، مبروك! 🎉

المشروع الآن منشور ويعمل على الإنتاج.

### الخطوات التالية:
1. راقب Logs بشكل منتظم خلال الأيام الأولى
2. اجمع feedback من المستخدمين
3. خطط للتحسينات والميزات الجديدة
4. حافظ على النسخ الاحتياطية والأمان

---

**نسخة الملف**: 1.0
**آخر تحديث**: راجع تاريخ آخر commit
