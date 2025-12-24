"""
i18n utilities for backend error messages and localization.
"""
import json
from pathlib import Path
from typing import Dict, Any

# Load translation files
LOCALES_DIR = Path(__file__).parent.parent / "locales"

def load_translations(lang: str) -> Dict[str, Any]:
    """Load translations for a given language."""
    try:
        locale_file = LOCALES_DIR / f"{lang}.json"
        if locale_file.exists():
            with open(locale_file, "r", encoding="utf-8") as f:
                return json.load(f)
    except Exception:
        pass
    # Fallback to English
    with open(LOCALES_DIR / "en.json", "r", encoding="utf-8") as f:
        return json.load(f)

# Cache translations
_translations = {
    "en": load_translations("en"),
    "ar": load_translations("ar")
}

def get_text(key: str, lang: str = "en", **kwargs) -> str:
    """
    Get translated text for a given key.
    
    Args:
        key: Translation key in dot notation (e.g., 'errors.email_already_registered')
        lang: Language code ('en' or 'ar')
        **kwargs: Parameters for string formatting
    
    Returns:
        Translated string
    
    Example:
        get_text('errors.api_key_not_set', lang='en', provider='Groq')
    """
    # Normalize language code
    lang = lang.lower() if lang else "en"
    if lang not in _translations:
        lang = "en"
    
    # Navigate through nested keys
    keys = key.split(".")
    value = _translations[lang]
    
    try:
        for k in keys:
            value = value[k]
        
        # Format string with kwargs if provided
        if kwargs:
            return value.format(**kwargs)
        return value
    except (KeyError, TypeError):
        # Fallback to English if key not found
        if lang != "en":
            return get_text(key, "en", **kwargs)
        # Return key itself if not found in English either
        return key

def t(key: str, lang: str = "en", **kwargs) -> str:
    """Shorthand for get_text()."""
    return get_text(key, lang, **kwargs)
