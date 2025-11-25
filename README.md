# Rooz Auto (اسم مؤقت – يمكن تغييره من لوحة المدير)

هذا المشروع عبارة عن منصة SaaS لخدمة المتاجر الإلكترونية، مبنية بـ:

- Backend: FastAPI (Python)
- Scraper Service: FastAPI (Python)
- Frontend: المشروع الذي أرفقته (rooz-auto-hub-main) داخل مجلد frontend
- قاعدة بيانات: PostgreSQL
- Redis
- مزوّدي ذكاء اصطناعي: Groq + OpenRouter
- إدارة الإعدادات والبراندنج من لوحة المدير

> ملاحظة: اسم "Rooz Auto" مؤقت، ويمكن تغييره بالكامل من لوحة المدير عبر إعدادات البراندنج.

## 1) تشغيل محليًا باستخدام Docker Compose

تأكد أن لديك Docker و Docker Compose على جهازك، ثم:

```bash
cp .env.example .env
# عدّل القيم داخل .env حسب الحاجة
docker compose up --build
```

سيعمل:

- الباك إند على: http://localhost:8000
  - Health: http://localhost:8000/api/health
- السكرابر على: http://localhost:8001
  - Health: http://localhost:8001/health

## 2) رفع المشروع على GitHub

من داخل مجلد المشروع الرئيسي:

```bash
git init
git add .
git commit -m "Initial Rooz Auto SaaS (Python backend + scraper + frontend)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

> TODO: # عدّل YOUR_USERNAME و YOUR_REPO باسم المستخدم والمستودع الخاص بك في GitHub.

## 3) النشر على Coolify (الطريقة الموصى بها)

### أ) نشر الباك إند

1. في Coolify اختر: "New Application"
2. اختر "Public Repository"
3. ضع رابط المستودع:
   - `https://github.com/YOUR_USERNAME/YOUR_REPO.git`
4. Base Directory:
   - `backend`
5. Build Pack:
   - Dockerfile
6. Dockerfile Location:
   - `backend/Dockerfile`
7. اربط التطبيق بشبكة قواعد البيانات (PostgreSQL) وRedis من Coolify.
8. أضف متغيرات البيئة من `.env.example` داخل تبويب Environment Variables (لا ترفع ملف .env نفسه).
9. اضغط Deploy.
10. جرّب `https://BACKEND_DOMAIN/api/health`

### ب) نشر السكرابر

1. "New Application" مرة أخرى.
2. نفس المستودع.
3. Base Directory:
   - `scraper`
4. Dockerfile Location:
   - `scraper/Dockerfile`
5. أضف متغيرات بسيطة إن احتجت.
6. Deploy.
7. خذ دومين السكرابر، وضعه في متغير `SCRAPER_SERVICE_URL` في الباك إند (من Coolify)، ثم أعد نشر الباك إند.

## 4) ربط الواجهة الأمامية (frontend)

داخل مجلد `frontend` يوجد مشروع الواجهة الذي أرفقته. يمكنك تشغيله محليًا مثلاً:

```bash
cd frontend
npm install
npm run dev
```

ثم عدّل إعدادات الاتصال بالباك إند مثلاً عبر:

- ملف `.env` أو `vite.config` أو `src/config.ts` (بحسب المشروع)
- وضع متغير مثل:

  ```env
  VITE_API_URL=https://BACKEND_DOMAIN/api
  ```

ثم في الكود تستدعي:

```ts
await fetch(`${import.meta.env.VITE_API_URL}/ai/generate`, { ... })
```

## 5) ملاحظات مهمة

- كل مكان يحتوي على تعليق `# TODO: # ...` هو نقطة تحتاج منك تعبئة مثل:
  - مفاتيح API
  - روابط الخدمات (الدومين)
  - سياسة الراوتر بين النماذج
  - إعدادات الأمان (CORS / JWT_SECRET)
- يفضّل لاحقاً إضافة نظام ترحيل قواعد البيانات (Alembic) بدل `Base.metadata.create_all`.

## 6) تغيير اسم المشروع والشعار من لوحة المدير

- يوجد راوتر `admin` يحتوي على:
  - `GET /api/admin/settings`
  - `POST /api/admin/settings`
- يمكن عبره التحكم بـ:
  - `competitive_mode` (python / ai)
  - `branding_settings` (اسم المشروع، الشعار، الألوان، الثيم، ...)

يمكنك ربط هذه الـ API مع صفحة في لوحة المدير في الواجهة الأمامية لتسمح بالتحكم الكامل بالبراندنج دون تعديل الكود.
