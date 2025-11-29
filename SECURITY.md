# Security Notes - ملاحظات الأمان

## الثغرات المعروفة والمقبولة

### 1. SSRF في خدمة Scraper

**الوصف**: خدمة Scraper مصممة لاستخراج البيانات من URLs التي يقدمها المستخدم، مما يعني أنها تقوم بـ HTTP requests إلى عناوين يحددها المستخدم.

**الحماية المطبقة**:
- ✅ منع الوصول إلى `localhost` و `127.0.0.1`
- ✅ منع الوصول إلى private network ranges (10.x.x.x, 172.16-31.x.x, 192.168.x.x)
- ✅ منع الوصول إلى cloud metadata endpoints (AWS, GCP)
- ✅ السماح فقط بـ HTTP و HTTPS schemes
- ✅ Timeout على الطلبات (30 ثانية)

**المخاطر المتبقية**:
- المستخدم قد يطلب scraping لمواقع ضارة أو مخالفة
- قد يتم استخدام الخدمة لـ DDoS على مواقع خارجية

**التوصيات للإنتاج**:
1. **Rate Limiting**: حدد عدد الطلبات لكل مستخدم (مثلاً 10 طلبات/دقيقة)
2. **Authentication**: اجعل الخدمة متاحة فقط للمستخدمين المسجلين
3. **Whitelist/Blacklist**: احتفظ بقائمة من الدومينات المسموح بها أو المحظورة
4. **Monitoring**: راقب استخدام الخدمة لاكتشاف أي نشاط مشبوه
5. **Network Isolation**: ضع الـ scraper في شبكة منفصلة بدون وصول للشبكات الداخلية

### مثال لإضافة Rate Limiting:

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/scrape", response_model=ScrapeResponse)
@limiter.limit("10/minute")  # 10 طلبات في الدقيقة
async def scrape_url(request: Request, scrape_request: ScrapeRequest):
    # ... الكود الحالي
```

---

## إعدادات الأمان الموصى بها

### 1. JWT Secret
- استخدم سر قوي جداً (64+ حرف عشوائي)
- لا تشارك السر أبداً
- غيّره بشكل دوري (كل 6 أشهر على الأقل)

**توليد سر قوي**:
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(64))"
```

### 2. CORS Origins
في الإنتاج، غيّر `allow_origins=["*"]` في `backend/app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://yourdomain.com",
        "https://app.yourdomain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Database Credentials
- استخدم كلمات سر قوية لـ PostgreSQL
- غيّر كلمة السر الافتراضية `postgres`
- لا تستخدم `postgres` كـ username في الإنتاج

### 4. Environment Variables
- لا ترفع ملفات `.env` إلى GitHub أبداً
- استخدم Coolify Environment Variables بدلاً من ملفات `.env`
- راجع جميع المتغيرات قبل النشر

### 5. HTTPS
- استخدم HTTPS على جميع الخدمات
- Coolify يوفر Let's Encrypt تلقائياً
- تأكد من تجديد الشهادات تلقائياً

### 6. Database Backups
- فعّل النسخ الاحتياطي التلقائي في Coolify
- اختبر استعادة النسخ الاحتياطية بشكل دوري
- احفظ نسخة من البيانات في مكان منفصل

---

## Dependency Security

### فحص الثغرات في المكتبات

**للـ Python**:
```bash
pip install safety
safety check -r requirements.txt
```

**للـ Node.js**:
```bash
npm audit
npm audit fix
```

### التحديثات الدورية
- راجع تحديثات المكتبات بشكل شهري
- اقرأ Changelogs قبل التحديث
- اختبر بعد كل تحديث

---

## Security Headers

تم إضافة Security Headers في `frontend/nginx.conf`:
- `X-Frame-Options: SAMEORIGIN` - يمنع clickjacking
- `X-Content-Type-Options: nosniff` - يمنع MIME type sniffing
- `X-XSS-Protection: 1; mode=block` - حماية XSS إضافية

**يمكنك إضافة المزيد**:
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

---

## Monitoring & Logging

### ما يجب مراقبته:
1. **Failed Login Attempts** - محاولات تسجيل دخول فاشلة متكررة
2. **Unusual API Usage** - طلبات غير عادية أو مشبوهة
3. **Error Rates** - زيادة مفاجئة في الأخطاء
4. **Response Times** - تباطؤ في الأداء
5. **Resource Usage** - استخدام غير عادي للموارد

### أدوات موصى بها:
- **Sentry** - تتبع الأخطاء
- **Datadog** - مراقبة الأداء
- **Cloudflare** - WAF و DDoS protection
- **Fail2ban** - منع brute force attacks

---

## Incident Response Plan

في حالة اكتشاف ثغرة أمنية:

1. **تقييم الخطر**: حدد مدى خطورة الثغرة
2. **عزل المشكلة**: أوقف الخدمة المتأثرة إذا لزم الأمر
3. **إصلاح الثغرة**: طبق الإصلاح فوراً
4. **الاختبار**: اختبر الإصلاح جيداً
5. **النشر**: انشر الإصلاح للإنتاج
6. **التوثيق**: وثّق الحادثة والإصلاح
7. **الإبلاغ**: أبلغ المستخدمين إذا تأثرت بياناتهم

---

## Contacts & Resources

### Security Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [React Security Best Practices](https://snyk.io/learn/react-security/)

### للإبلاغ عن ثغرات
إذا اكتشفت ثغرة أمنية، يرجى:
1. **لا** تشاركها علناً
2. اتصل بمدير المشروع مباشرة
3. أعط تفاصيل كافية لإعادة إنتاج الثغرة
4. انتظر الإصلاح قبل الإفصاح العام

---

**آخر تحديث**: راجع تاريخ آخر commit في هذا الملف
