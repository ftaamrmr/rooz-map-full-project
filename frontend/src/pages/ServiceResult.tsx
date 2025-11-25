import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  Download,
  Copy,
  ArrowLeft,
  FileText,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ServiceResult = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const result = {
    jobId: "job_abc123",
    service: "Product Description Generator",
    status: "completed",
    pointsUsed: 2,
    executedAt: "2025-01-15 14:30:00",
    output: "Discover the ultimate blend of style and functionality with this premium product. Crafted with precision and attention to detail, it offers unmatched quality and performance. Whether you're looking to enhance your daily routine or seeking a reliable solution, this product delivers excellence in every aspect. Experience the difference today!\n\nKey Features:\n• Premium quality materials\n• Modern and elegant design\n• Easy to use and maintain\n• Durable and long-lasting\n• Perfect for everyday use\n\nOrder now and enjoy the perfect combination of innovation and sophistication!"
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.output);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container px-4 py-12">
        {/* Back Button */}
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Success Header */}
        <Card className="p-8 mb-8 bg-gradient-hero text-primary-foreground border-0 shadow-glow">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-background/20 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Service Completed Successfully!</h1>
              <p className="text-primary-foreground/80">Your result is ready</p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Result */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Generated Content</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-muted/50 whitespace-pre-wrap font-mono text-sm">
                {result.output}
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6 border-border/50">
              <h3 className="font-semibold mb-4">What's Next?</h3>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to={`/service/${id}`}>
                    Run Again
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/services">
                    Browse Services
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/dashboard">
                    View Dashboard
                  </Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar - Job Details */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border/50 sticky top-6">
              <h3 className="font-semibold mb-6">Job Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Service</p>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-medium">{result.service}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    {result.status}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Points Used</p>
                  <div className="flex items-center gap-1 text-accent font-bold">
                    <Zap className="h-4 w-4" />
                    {result.pointsUsed}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Job ID</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{result.jobId}</code>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Executed At</p>
                  <p className="text-sm font-medium">{result.executedAt}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Remaining Balance</p>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  <span className="text-2xl font-bold">246</span>
                  <span className="text-sm text-muted-foreground">points</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceResult;
