import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      points: "100",
      description: "Perfect for trying out our services",
      features: [
        "100 points per month",
        "Access to all services",
        "Email support",
        "Basic analytics",
        "Community access"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      points: "300",
      description: "Most popular choice for growing businesses",
      features: [
        "300 points per month",
        "Access to all services",
        "Priority email support",
        "Advanced analytics",
        "API access",
        "Custom integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      points: "1000",
      description: "For teams that need unlimited power",
      features: [
        "1000 points per month",
        "Access to all services",
        "24/7 phone & email support",
        "Advanced analytics & reporting",
        "Full API access",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container px-4 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your needs. All plans include access to all services.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 relative ${
                plan.popular 
                  ? 'border-primary shadow-glow scale-105' 
                  : 'border-border/50'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-accent">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3 text-accent font-medium">
                  <Zap className="h-4 w-4" />
                  {plan.points} points included
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-hero' 
                    : ''
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-border/50">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Flexible Points</h4>
                <p className="text-sm text-muted-foreground">
                  Unused points roll over to the next month
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cancel Anytime</h4>
                <p className="text-sm text-muted-foreground">
                  No long-term contracts or commitments
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">24/7 Support</h4>
                <p className="text-sm text-muted-foreground">
                  Our team is here to help you succeed
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
