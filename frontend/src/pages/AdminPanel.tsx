import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Users,
  Zap,
  TrendingUp,
  AlertCircle,
  Settings,
  FileText,
  CreditCard,
  Globe,
  BarChart3
} from "lucide-react";

const AdminPanel = () => {
  const stats = [
    { icon: Users, label: "Active Users", value: "10,248", change: "+12.5%" },
    { icon: Zap, label: "Points Used Today", value: "45,892", change: "+8.3%" },
    { icon: FileText, label: "Services Run", value: "1,234", change: "+23.1%" },
    { icon: AlertCircle, label: "Errors", value: "12", change: "-34.2%" }
  ];

  const adminSections = [
    { icon: Users, title: "User Management", description: "View, edit users and manage points", href: "#" },
    { icon: Zap, title: "Services", description: "Add, edit and manage automation services", href: "#" },
    { icon: CreditCard, title: "Payments & Plans", description: "Manage pricing, subscriptions and payments", href: "#" },
    { icon: Globe, title: "Landing Pages", description: "Visual page builder with analytics", href: "#" },
    { icon: BarChart3, title: "Analytics", description: "Detailed usage and performance metrics", href: "#" },
    { icon: Settings, title: "Settings", description: "System configuration and integrations", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Admin Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="mb-2 bg-accent text-accent-foreground">Admin Panel</Badge>
              <h1 className="text-3xl font-bold">System Dashboard</h1>
              <p className="text-muted-foreground">Manage all aspects of Rooz Auto</p>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Site</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge variant={stat.change.startsWith("+") ? "secondary" : "destructive"} className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Admin Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Admin Sections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all group border-border/50 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-hero text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 border-border/50">
          <h2 className="text-xl font-semibold mb-6">Recent System Activity</h2>
          <div className="space-y-4">
            {[
              { user: "user@example.com", action: "Created new service", time: "5 minutes ago" },
              { user: "admin@example.com", action: "Updated pricing plan", time: "1 hour ago" },
              { user: "manager@example.com", action: "Added 1000 points to user", time: "2 hours ago" },
              { user: "system", action: "Completed scheduled backup", time: "3 hours ago" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <h4 className="font-medium">{activity.action}</h4>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                </div>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
