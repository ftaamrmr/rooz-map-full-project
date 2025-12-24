import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";
import { 
  Zap, 
  Shield, 
  Globe, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";

const Home = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Zap,
      title: t('home.features.automated.title'),
      description: t('home.features.automated.description')
    },
    {
      icon: Shield,
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description')
    },
    {
      icon: Globe,
      title: t('home.features.multilang.title'),
      description: t('home.features.multilang.description')
    },
    {
      icon: Sparkles,
      title: t('home.features.ai.title'),
      description: t('home.features.ai.description')
    }
  ];

  const stats = [
    { icon: Users, value: "10K+", label: t('home.stats.users') },
    { icon: Zap, value: "1M+", label: t('home.stats.services') },
    { icon: Clock, value: "500K+", label: t('home.stats.hours') },
    { icon: TrendingUp, value: "99.9%", label: t('home.stats.uptime') }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="container px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            {t('home.hero.badge')}
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            {t('home.hero.title')}
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              {t('home.hero.titleHighlight')}
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('home.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-lg">
              <Link to="/auth?mode=signup">
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">{t('home.hero.viewServices')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-2">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('home.features.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('home.features.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-border/50">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-hero text-primary-foreground mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t('home.howItWorks.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.howItWorks.description')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: t('home.howItWorks.step1.title'), description: t('home.howItWorks.step1.description') },
              { step: "2", title: t('home.howItWorks.step2.title'), description: t('home.howItWorks.step2.description') },
              { step: "3", title: t('home.howItWorks.step3.title'), description: t('home.howItWorks.step3.description') }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20">
        <Card className="max-w-4xl mx-auto p-12 bg-gradient-hero text-primary-foreground border-0 shadow-glow">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t('home.cta.title')}</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              {t('home.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/auth?mode=signup">
                  {t('home.cta.button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <CheckCircle2 className="h-4 w-4" />
                {t('home.cta.noCard')}
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <CheckCircle2 className="h-4 w-4" />
                {t('home.cta.cancelAnytime')}
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              Rooz Auto
            </div>
            <p className="text-sm text-muted-foreground">
              {t('home.footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
