import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export const Header = () => {
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
            Services
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/auth" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            Login
          </Link>
          <Button asChild size="sm" className="bg-gradient-hero hover:opacity-90 transition-opacity">
            <Link to="/auth?mode=signup">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
