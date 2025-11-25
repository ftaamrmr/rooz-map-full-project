import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  FileText,
  Image,
  Video,
  MessageSquare,
  TrendingUp,
  Mail,
  Zap,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: FileText,
      name: "Product Description Generator",
      description: "Generate compelling product descriptions in multiple languages using AI",
      category: "Content",
      points: 2,
      popular: true
    },
    {
      id: 2,
      icon: Image,
      name: "Image Enhancement",
      description: "Enhance and optimize product images automatically",
      category: "Media",
      points: 3,
      popular: false
    },
    {
      id: 3,
      icon: Video,
      name: "Video Thumbnail Creator",
      description: "Create eye-catching video thumbnails with AI",
      category: "Media",
      points: 2,
      popular: false
    },
    {
      id: 4,
      icon: MessageSquare,
      name: "Social Media Post Generator",
      description: "Generate engaging social media content for all platforms",
      category: "Content",
      points: 1,
      popular: true
    },
    {
      id: 5,
      icon: TrendingUp,
      name: "SEO Optimizer",
      description: "Optimize your content for search engines automatically",
      category: "Marketing",
      points: 3,
      popular: false
    },
    {
      id: 6,
      icon: Mail,
      name: "Email Campaign Builder",
      description: "Create professional email campaigns in minutes",
      category: "Marketing",
      points: 2,
      popular: true
    }
  ];

  const categories = ["All", "Content", "Media", "Marketing"];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container px-4 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Automation Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose from our collection of powerful AI-powered services. Each service costs points based on complexity.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className={category === "All" ? "bg-gradient-hero" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="p-6 hover:shadow-lg transition-all group border-border/50">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-gradient-hero group-hover:text-primary-foreground transition-all">
                    <service.icon className="h-6 w-6" />
                  </div>
                  {service.popular && (
                    <Badge className="bg-accent text-accent-foreground">Popular</Badge>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm font-medium text-accent">
                      <Zap className="h-3 w-3" />
                      {service.points} points
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full group-hover:bg-gradient-hero transition-all" variant="outline">
                  <Link to={`/service/${service.id}`}>
                    Run Service
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card className="p-8 bg-gradient-hero text-primary-foreground border-0 shadow-glow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need More Points?</h3>
              <p className="text-primary-foreground/80">
                Upgrade your plan to get more points and unlock all features
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/pricing">
                View Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Services;
