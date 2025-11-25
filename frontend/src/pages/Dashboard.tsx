import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Zap,
  TrendingUp,
  Clock,
  ArrowRight,
  FileText,
  Image,
  Video,
  MessageSquare
} from "lucide-react";

const Dashboard = () => {
  const recentServices = [
    { icon: FileText, name: "Product Description", time: "2 hours ago", points: 2, status: "completed" },
    { icon: Image, name: "Image Enhancement", time: "5 hours ago", points: 3, status: "completed" },
    { icon: MessageSquare, name: "Social Media Post", time: "1 day ago", points: 1, status: "completed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Dashboard Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, User!</p>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Points</p>
                <h3 className="text-3xl font-bold">248</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
            </div>
            <Button asChild variant="link" className="px-0 mt-2 text-accent">
              <Link to="/pricing">
                Add More Points <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Services Used</p>
                <h3 className="text-3xl font-bold">47</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
          </Card>

          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time Saved</p>
                <h3 className="text-3xl font-bold">23h</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 p-6 border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentServices.map((service, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-medium text-accent mb-1">
                      <Zap className="h-3 w-3" />
                      {service.points} points
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 border-border/50">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Button asChild className="w-full justify-start bg-gradient-hero" size="lg">
                <Link to="/services">
                  <Zap className="mr-2 h-4 w-4" />
                  Run New Service
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start" size="lg">
                <Link to="/pricing">
                  Add Points
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start" size="lg">
                <Link to="/landing-pages">
                  Landing Pages
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start" size="lg">
                <Link to="/support">
                  Get Support
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
