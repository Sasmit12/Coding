import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, CheckCircle } from "lucide-react";

export function PayoutOverview({ payouts, onCalculatePayouts }) {
  const sections = [
    {
      label: "Pending",
      count: payouts.pending.count,
      amount: payouts.pending.amount,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      label: "Processing",
      count: payouts.processing.count,
      amount: payouts.processing.amount,
      icon: Play,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Completed",
      count: payouts.completed.count,
      amount: payouts.completed.amount,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <Card className="shadow-material">
      <CardHeader className="border-b border-border">
        <h3 className="text-lg font-medium text-foreground">Payout Overview</h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.label}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 ${section.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {section.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {section.count} payouts
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  ${section.amount.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
        <Button
          onClick={onCalculatePayouts}
          className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Calculate New Payouts
        </Button>
      </CardContent>
    </Card>
  );
}