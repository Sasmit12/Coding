import React from "react";
import { CreditCard, Users, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Payouts",
      value: `$${stats.totalPayouts.toLocaleString()}`,
      change: "12% from last month",
      changeType: "positive",
      icon: CreditCard,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Mentors",
      value: stats.activeMentors.toString(),
      change: "3 new this week",
      changeType: "positive",
      icon: Users,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Sessions This Month",
      value: stats.sessionsCount.toString(),
      change: "5% from last month",
      changeType: "negative",
      icon: Calendar,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Pending Payouts",
      value: stats.pendingPayouts.toString(),
      change: "Requires attention",
      changeType: "neutral",
      icon: Clock,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="shadow-material">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {card.value}
                  </p>
                  <p
                    className={`text-sm flex items-center mt-1 ${
                      card.changeType === "positive"
                        ? "text-success"
                        : card.changeType === "negative"
                        ? "text-warning"
                        : "text-muted-foreground"
                    }`}
                  >
                    {card.change}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}