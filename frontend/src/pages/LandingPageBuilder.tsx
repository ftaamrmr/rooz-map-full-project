import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  FileText,
  Image,
  Video,
  MessageSquare,
  Layout,
  Eye,
  Save,
  Settings
} from "lucide-react";

const LandingPageBuilder = () => {
  const availableBlocks = [
    { icon: Layout, name: "Hero Section", description: "Header with CTA" },
    { icon: FileText, name: "Text Block", description: "Rich text content" },
    { icon: Image, name: "Image Block", description: "Single or gallery" },
    { icon: Video, name: "Video Block", description: "Embedded video" },
    { icon: MessageSquare, name: "Testimonials", description: "Customer reviews" },
    { icon: Layout, name: "Features Grid", description: "Feature showcase" },
    { icon: Layout, name: "CTA Section", description: "Call to action" },
    { icon: Layout, name: "Form Block", description: "Lead capture form" }
  ];

  const myPages = [
    { id: 1, name: "Summer Sale 2025", status: "published", views: 1234, slug: "summer-sale-2025" },
    { id: 2, name: "New Product Launch", status: "draft", views: 0, slug: "new-product" },
    { id: 3, name: "Black Friday Deals", status: "scheduled", views: 5678, slug: "black-friday" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container px-4 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Landing Page Builder</h1>
            <p className="text-lg text-muted-foreground">
              Create beautiful landing pages with drag-and-drop blocks
            </p>
          </div>
          <Button className="bg-gradient-hero">
            <Plus className="mr-2 h-4 w-4" />
            New Page
          </Button>
        </div>

        {/* My Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">My Pages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPages.map((page) => (
              <Card key={page.id} className="p-6 hover:shadow-lg transition-all border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg">{page.name}</h3>
                  <Badge variant={
                    page.status === 'published' ? 'default' : 
                    page.status === 'draft' ? 'secondary' : 
                    'outline'
                  }>
                    {page.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  /{page.slug}
                </p>

                {page.status === 'published' && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Eye className="h-4 w-4" />
                    {page.views.toLocaleString()} views
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Blocks */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Blocks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableBlocks.map((block, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all border-border/50 cursor-pointer group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-hero text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                  <block.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-1">{block.name}</h3>
                <p className="text-sm text-muted-foreground">{block.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Start Guide */}
        <Card className="mt-12 p-8 bg-gradient-hero text-primary-foreground border-0 shadow-glow">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold mb-4">How to Build Landing Pages</h3>
            <ol className="space-y-2 text-primary-foreground/90">
              <li>1. Click "New Page" to start creating</li>
              <li>2. Drag and drop blocks to build your layout</li>
              <li>3. Customize content, colors, and styles</li>
              <li>4. Set audience rules and actions</li>
              <li>5. Preview and publish your page</li>
            </ol>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandingPageBuilder;
