import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import {
  Zap,
  Plus,
  TrendingUp,
  Clock,
  ArrowRight,
  CreditCard
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Wallet = () => {
  const { t } = useTranslation();

  const transactions = [
    { id: 1, type: "credit", amount: 100, description: "Plan Purchase - Premium", date: "2025-01-15", balance: 348 },
    { id: 2, type: "debit", amount: -2, description: "Product Description Service", date: "2025-01-14", balance: 248 },
    { id: 3, type: "debit", amount: -3, description: "Image Enhancement Service", date: "2025-01-14", balance: 250 },
    { id: 4, type: "credit", amount: 200, description: "Plan Purchase - Pro", date: "2025-01-10", balance: 253 }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container px-4 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('nav.wallet')}
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your points balance and view transaction history
          </p>
        </div>

        {/* Balance Card */}
        <Card className="p-8 mb-8 bg-gradient-hero text-primary-foreground border-0 shadow-glow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-primary-foreground/80 mb-2">Total Balance</p>
              <div className="flex items-center gap-3">
                <Zap className="h-10 w-10" />
                <h2 className="text-5xl font-bold">248</h2>
                <span className="text-2xl">Points</span>
              </div>
            </div>
            <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/pricing">
                <Plus className="mr-2 h-5 w-5" />
                Add Points
              </Link>
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">47</h3>
            <p className="text-sm text-muted-foreground">Points Used This Month</p>
          </Card>

          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">23h</h3>
            <p className="text-sm text-muted-foreground">Time Saved</p>
          </Card>

          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">3</h3>
            <p className="text-sm text-muted-foreground">Total Purchases</p>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="p-6 border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Transaction History</h2>
            <Button variant="outline" size="sm">Export</Button>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'credit' 
                      ? 'bg-accent/10 text-accent' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <Plus className="h-5 w-5" />
                    ) : (
                      <Zap className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{transaction.description}</h4>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold mb-1 ${
                    transaction.type === 'credit' ? 'text-accent' : 'text-foreground'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Balance: {transaction.balance}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bottom CTA */}
        <Card className="mt-8 p-8 bg-gradient-hero text-primary-foreground border-0 shadow-glow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Running Low on Points?</h3>
              <p className="text-primary-foreground/80">
                Upgrade your plan to get more points and unlock premium features
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/pricing">
                View Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
