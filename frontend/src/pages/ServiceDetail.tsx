import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams, Link } from "react-router-dom";
import {
  FileText,
  Zap,
  ArrowLeft,
  Play,
  CheckCircle2
} from "lucide-react";

const ServiceDetail = () => {
  const { id } = useParams();

  // Mock service data
  const service = {
    id: 1,
    icon: FileText,
    name: "Product Description Generator",
    description: "Generate compelling product descriptions in multiple languages using AI. Perfect for e-commerce stores and online marketplaces.",
    longDescription: "Our AI-powered product description generator creates engaging, SEO-optimized content that converts browsers into buyers. Simply provide your product URL or details, and we'll craft professional descriptions in your preferred language.",
    category: "Content",
    points: 2,
    popular: true,
    features: [
      "Multi-language support (Arabic, English, and more)",
      "SEO-optimized content",
      "Natural and engaging tone",
      "Customizable length and style",
      "Instant generation"
    ],
    videoUrl: "https://www.youtube.com/embed/example"
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container px-4 py-12">
        {/* Back Button */}
        <Link to="/services">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Header */}
            <Card className="p-8 border-border/50">
              <div className="flex items-start gap-6 mb-6">
                <div className="h-16 w-16 rounded-lg bg-gradient-hero text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <service.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{service.name}</h1>
                    {service.popular && (
                      <Badge className="bg-accent text-accent-foreground">Popular</Badge>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{service.category}</Badge>
                    <div className="flex items-center gap-2 text-accent font-medium">
                      <Zap className="h-4 w-4" />
                      {service.points} points per use
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-foreground">{service.longDescription}</p>
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6 border-border/50">
              <h2 className="text-xl font-semibold mb-4">What's Included</h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Video Tutorial */}
            <Card className="p-6 border-border/50">
              <h2 className="text-xl font-semibold mb-4">Video Tutorial</h2>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Play className="h-12 w-12 text-muted-foreground" />
              </div>
            </Card>
          </div>

          {/* Sidebar - Run Service */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border/50 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Run Service</h2>
              
              <form className="space-y-4">
                <div>
                  <Label htmlFor="productUrl">Product URL</Label>
                  <Input 
                    id="productUrl" 
                    placeholder="https://example.com/product"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language" 
                    className="w-full mt-1.5 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="ar">Arabic</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="tone">Tone</Label>
                  <select 
                    id="tone" 
                    className="w-full mt-1.5 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any specific requirements..."
                    className="mt-1.5"
                    rows={3}
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <span className="text-sm font-medium">Cost:</span>
                    <div className="flex items-center gap-1 text-accent font-bold">
                      <Zap className="h-4 w-4" />
                      {service.points} points
                    </div>
                  </div>

                  <Button asChild className="w-full bg-gradient-hero" size="lg">
                    <Link to={`/service/${id}/result`}>
                      <Play className="mr-2 h-4 w-4" />
                      Run Service
                    </Link>
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Your current balance: 248 points
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
