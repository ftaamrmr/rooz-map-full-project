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

## 📋 حالة المشروع والخدمات

للاطلاع على حالة المشروع التفصيلية والخدمات المتاحة للعملاء:
- **[حالة المشروع (بالعربية)](PROJECT_STATUS.md)** - وثيقة شاملة تشرح ما تم إنجازه والخدمات المتاحة
- **[Project Status (English)](PROJECT_STATUS_EN.md)** - Complete documentation of project progress and customer services

**الإنجاز العام:** 75% ✅ - المشروع جاهز تقريباً للإطلاق!

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

---

## 7) 🌍 Internationalization (i18n) | الترجمة والدعم متعدد اللغات

This project supports multiple languages with full RTL (Right-to-Left) support for Arabic.

### Supported Languages | اللغات المدعومة

- **English (en)** - Default | الافتراضية
- **Arabic (ar)** - With RTL support | مع دعم الكتابة من اليمين لليسار

### Frontend i18n

#### Language Detection | كشف اللغة

The system automatically detects the user's language preference in this order:
1. **User preference** stored in `localStorage` (persists across sessions)
2. **Query parameter** `?lang=ar` or `?lang=en`
3. **Browser language** from `Accept-Language` header
4. **Fallback** to English if no preference is found

#### Changing Language | تغيير اللغة

Users can change the language using the language toggle button in the header (top right corner). The selection is automatically saved and persists across sessions.

#### Translation Files | ملفات الترجمة

Frontend translations are located in:
- `frontend/src/i18n/locales/en.json` - English translations
- `frontend/src/i18n/locales/ar.json` - Arabic translations

#### Translation Key Structure | بنية مفاتيح الترجمة

```json
{
  "nav": { "home": "Home", "services": "Services" },
  "home": {
    "hero": { "title": "Powerful Automation" },
    "features": { ... }
  },
  "services": { ... },
  "dashboard": { ... }
}
```

#### Using Translations in Components | استخدام الترجمات في المكونات

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.hero.title')}</h1>
      <p>{t('home.hero.description')}</p>
    </div>
  );
};
```

### Backend i18n

#### Language Detection | كشف اللغة

The backend detects language from the `X-Lang` header in API requests:

```bash
# English (default)
curl -H "X-Lang: en" http://localhost:8000/api/auth/login

# Arabic
curl -H "X-Lang: ar" http://localhost:8000/api/auth/login
```

If no `X-Lang` header is provided, the backend defaults to English.

#### Translation Files | ملفات الترجمة

Backend translations are located in:
- `backend/locales/en.json` - English error messages
- `backend/locales/ar.json` - Arabic error messages

#### Error Message Structure | بنية رسائل الأخطاء

```json
{
  "errors": {
    "email_already_registered": "Email already registered",
    "incorrect_credentials": "Incorrect email or password"
  },
  "success": {
    "user_created": "User created successfully"
  },
  "validation": {
    "email_required": "Email is required"
  }
}
```

#### Using Translations in Backend | استخدام الترجمات في الخادم

```python
from app.i18n import t
from app.deps import get_language

@router.post("/some-endpoint")
def my_endpoint(lang: str = Depends(get_language)):
    if error:
        raise HTTPException(
            status_code=400,
            detail=t("errors.email_already_registered", lang)
        )
```

### Adding a New Language | إضافة لغة جديدة

#### Frontend | الواجهة الأمامية

1. **Create translation file** | إنشاء ملف الترجمة:
   ```bash
   # Create a new file, e.g., for French
   cp frontend/src/i18n/locales/en.json frontend/src/i18n/locales/fr.json
   ```

2. **Translate all keys** | ترجمة جميع المفاتيح:
   ```json
   {
     "nav": {
       "home": "Accueil",
       "services": "Services"
     },
     ...
   }
   ```

3. **Register in i18n config** | التسجيل في إعدادات i18n:
   ```typescript
   // frontend/src/i18n/config.ts
   import fr from './locales/fr.json';
   
   i18n.init({
     resources: {
       en: { translation: en },
       ar: { translation: ar },
       fr: { translation: fr }  // Add new language
     },
     ...
   });
   ```

4. **Add to language toggle** | الإضافة إلى مفتاح اللغة:
   ```tsx
   // frontend/src/components/LanguageToggle.tsx
   <DropdownMenuItem onClick={() => changeLanguage('fr')}>
     Français
   </DropdownMenuItem>
   ```

5. **Add RTL support if needed** | إضافة دعم RTL إذا لزم الأمر:
   ```typescript
   // frontend/src/i18n/config.ts
   const rtlLanguages = ['ar', 'he', 'fa'];  // Hebrew, Farsi
   const direction = rtlLanguages.includes(lng) ? 'rtl' : 'ltr';
   ```

#### Backend | الخادم

1. **Create translation file** | إنشاء ملف الترجمة:
   ```bash
   cp backend/locales/en.json backend/locales/fr.json
   ```

2. **Translate all keys** | ترجمة جميع المفاتيح:
   ```json
   {
     "errors": {
       "email_already_registered": "Email déjà enregistré"
     }
   }
   ```

3. **Update i18n.py** | تحديث i18n.py:
   ```python
   # backend/app/i18n.py
   _translations = {
       "en": load_translations("en"),
       "ar": load_translations("ar"),
       "fr": load_translations("fr")  # Add new language
   }
   ```

4. **Update deps.py** | تحديث deps.py:
   ```python
   # backend/app/deps.py
   def get_language(x_lang: Optional[str] = Header(None, alias="X-Lang")) -> str:
       if x_lang and x_lang.lower() in ["en", "ar", "fr"]:  # Add "fr"
           return x_lang.lower()
       return "en"
   ```

### RTL (Right-to-Left) Support | دعم الكتابة من اليمين لليسار

The application automatically switches to RTL layout for Arabic:

- **HTML direction**: `<html dir="rtl">`
- **CSS**: Tailwind CSS automatically handles RTL with `rtl:` prefix
- **Icons**: No mirroring needed, icons stay in logical positions
- **Text alignment**: Automatically adjusted

### Testing i18n | اختبار الترجمة

#### Frontend Testing:
```bash
cd frontend
npm run dev
# Open http://localhost:5173
# Click language toggle in header
# Verify translations and RTL layout for Arabic
```

#### Backend Testing:
```bash
# Test English (default)
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"short"}'

# Test Arabic
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "X-Lang: ar" \
  -d '{"email":"test@test.com","password":"short"}'
```

### Best Practices | أفضل الممارسات

1. **Always use translation keys**, never hardcode text
2. **Keep keys organized** by feature/page
3. **Use descriptive key names**: `home.hero.title` not `text1`
4. **Test both languages** after adding new features
5. **Keep translations in sync** across all language files
6. **Use placeholder syntax** for dynamic values: `{name}`, `{count}`

### Example: Adding a New Feature with i18n

#### 1. Add translation keys:
```json
// en.json
{
  "profile": {
    "title": "User Profile",
    "edit": "Edit Profile",
    "save": "Save Changes"
  }
}

// ar.json
{
  "profile": {
    "title": "الملف الشخصي",
    "edit": "تعديل الملف الشخصي",
    "save": "حفظ التغييرات"
  }
}
```

#### 2. Use in component:
```tsx
const Profile = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('profile.title')}</h1>
      <button>{t('profile.edit')}</button>
    </div>
  );
};
```

---
