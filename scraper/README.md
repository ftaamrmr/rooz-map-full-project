# Rooz Auto Scraper Service

خدمة استخراج البيانات من المواقع (Web Scraping) لمشروع Rooz Auto.

## الميزات

- استخراج النصوص من صفحات الويب
- استخراج الصور
- استخراج البيانات الوصفية (Meta Tags)
- دعم Open Graph و Twitter Cards
- معالجة الأخطاء الشاملة
- API سهل الاستخدام

## API Endpoints

### GET /health
فحص صحة الخدمة

**Response:**
```json
{
  "status": "healthy",
  "service": "Rooz Auto Scraper",
  "version": "1.0.0"
}
```

### POST /scrape
استخراج محتوى من URL

**Request Body:**
```json
{
  "url": "https://example.com",
  "extract_text": true,
  "extract_images": false,
  "extract_metadata": true
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "title": "عنوان الصفحة",
  "description": "وصف الصفحة",
  "text_content": "محتوى النص...",
  "images": ["https://example.com/image1.jpg"],
  "metadata": {
    "og:title": "عنوان OG",
    "og:description": "وصف OG"
  },
  "status": "success"
}
```

## التشغيل المحلي

```bash
cd scraper
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## النشر على Coolify

راجع ملف `DEPLOYMENT.md` في المجلد الرئيسي للمشروع.

## المكتبات المستخدمة

- **FastAPI**: إطار عمل API السريع
- **httpx**: HTTP client غير متزامن
- **BeautifulSoup4**: تحليل HTML
- **lxml**: Parser سريع للـ HTML/XML
- **Playwright**: للصفحات التي تحتاج JavaScript (مستقبلاً)
