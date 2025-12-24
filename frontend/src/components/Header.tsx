import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./LanguageToggle";

export const Header = () => {
  const { t } = useTranslation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          Rooz Auto
        </Link>
        
        <nav className="ml-auto flex items-center gap-6">
          <Link to="/services" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            {t('nav.services')}
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            {t('nav.pricing')}
          </Link>
          <Link to="/auth" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            {t('nav.login')}
          </Link>
          <LanguageToggle />
          <Button asChild size="sm" className="bg-gradient-hero hover:opacity-90 transition-opacity">
            <Link to="/auth?mode=signup">{t('nav.signup')}</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
