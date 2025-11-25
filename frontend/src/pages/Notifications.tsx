import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  Zap,
  Trash2
} from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Service Completed",
      message: "Your Product Description service has been completed successfully",
      time: "5 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "info",
      title: "New Service Available",
      message: "Check out our new Email Campaign Builder service",
      time: "2 hours ago",
      read: false
    },
    {
      id: 3,
      type: "warning",
      title: "Low Points Balance",
      message: "You have only 48 points remaining. Consider adding more points.",
      time: "1 day ago",
      read: true
    },
    {
      id: 4,
      type: "success",
      title: "Payment Successful",
      message: "Your premium plan payment of $29.99 has been processed",
      time: "2 days ago",
      read: true
    },
    {
      id: 5,
      type: "info",
      title: "Welcome to Rooz Auto",
      message: "Start exploring our automation services and save time!",
      time: "5 days ago",
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-accent" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "info":
        return <Info className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container px-4 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Notifications</h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with your latest activities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-w-4xl space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`p-6 border-border/50 transition-all hover:shadow-md ${
                !notification.read ? 'bg-primary/5 border-primary/20' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  notification.type === 'success' ? 'bg-accent/10' :
                  notification.type === 'warning' ? 'bg-destructive/10' :
                  'bg-primary/10'
                }`}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>

                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State (if no notifications) */}
        {/* Uncomment when implementing real notifications
        <Card className="p-12 text-center border-border/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Bell className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No notifications</h3>
          <p className="text-muted-foreground">
            You're all caught up! Check back later for updates.
          </p>
        </Card>
        */}
      </div>
    </div>
  );
};

export default Notifications;
