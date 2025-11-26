from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
import httpx
from bs4 import BeautifulSoup
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Rooz Auto Scraper Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScrapeRequest(BaseModel):
    url: HttpUrl
    extract_text: bool = True
    extract_images: bool = False
    extract_metadata: bool = True


class ScrapeResponse(BaseModel):
    url: str
    title: str | None = None
    description: str | None = None
    text_content: str | None = None
    images: list[str] = []
    metadata: dict = {}
    status: str = "success"


@app.get("/health")
def health_check():
    """
    نقطة فحص صحة الخدمة
    """
    return {
        "status": "healthy",
        "service": "Rooz Auto Scraper",
        "version": "1.0.0"
    }


@app.post("/scrape", response_model=ScrapeResponse)
async def scrape_url(request: ScrapeRequest):
    """
    استخراج محتوى صفحة ويب من URL
    
    - **url**: رابط الصفحة المراد استخراج محتواها
    - **extract_text**: استخراج النص من الصفحة
    - **extract_images**: استخراج روابط الصور
    - **extract_metadata**: استخراج البيانات الوصفية (meta tags)
    """
    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=30.0) as client:
            response = await client.get(str(request.url))
            response.raise_for_status()
            
        soup = BeautifulSoup(response.text, 'lxml')
        
        # استخراج العنوان
        title = None
        if soup.title:
            title = soup.title.string
        
        # استخراج الوصف
        description = None
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            description = meta_desc['content']
        
        # استخراج النص
        text_content = None
        if request.extract_text:
            # إزالة العناصر غير المرغوب فيها
            for script in soup(["script", "style", "nav", "footer", "header"]):
                script.decompose()
            text_content = soup.get_text(separator=' ', strip=True)
            # تنظيف النص
            text_content = ' '.join(text_content.split())[:5000]  # حد أقصى 5000 حرف
        
        # استخراج الصور
        images = []
        if request.extract_images:
            for img in soup.find_all('img', src=True):
                img_url = img['src']
                # تحويل الروابط النسبية إلى مطلقة
                if img_url.startswith('//'):
                    img_url = 'https:' + img_url
                elif img_url.startswith('/'):
                    base_url = f"{request.url.scheme}://{request.url.host}"
                    img_url = base_url + img_url
                images.append(img_url)
        
        # استخراج البيانات الوصفية
        metadata = {}
        if request.extract_metadata:
            # Open Graph tags
            for tag in soup.find_all('meta', property=True):
                if tag['property'].startswith('og:'):
                    metadata[tag['property']] = tag.get('content', '')
            
            # Twitter Card tags
            for tag in soup.find_all('meta', attrs={'name': True}):
                if tag['name'].startswith('twitter:'):
                    metadata[tag['name']] = tag.get('content', '')
        
        return ScrapeResponse(
            url=str(request.url),
            title=title,
            description=description,
            text_content=text_content,
            images=images[:10],  # حد أقصى 10 صور
            metadata=metadata,
            status="success"
        )
        
    except httpx.HTTPError as e:
        logger.error(f"HTTP error scraping {request.url}: {e}")
        raise HTTPException(status_code=400, detail=f"Error fetching URL: {str(e)}")
    except Exception as e:
        logger.error(f"Error scraping {request.url}: {e}")
        raise HTTPException(status_code=500, detail=f"Scraping error: {str(e)}")


@app.get("/")
def root():
    return {
        "message": "Rooz Auto Scraper Service",
        "endpoints": {
            "health": "/health",
            "scrape": "/scrape (POST)"
        }
    }
