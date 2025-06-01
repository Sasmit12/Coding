import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, UserPlus, Receipt, Download } from "lucide-react";

export function QuickActions({
  onAddSession,
  onAddMentor,
  onGenerateReceipts,
  onExportData,
}) {
  const actions = [
    {
      label: "Add Session",
      icon: Plus,
      onClick: onAddSession,
    },
    {
      label: "Add Mentor",
      icon: UserPlus,
      onClick: onAddMentor,
    },
    {
      label: "Generate Receipts",
      icon: Receipt,
      onClick: onGenerateReceipts,
    },
    {
      label: "Export Data",
      icon: Download,
      onClick: onExportData,
    },
  ];

  return (
    <Card className="shadow-material">
      <CardHeader className="border-b border-border">
        <h3 className="text-lg font-medium text-foreground">Quick Actions</h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                className="flex flex-col items-center p-4 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors group"
              >
                <div className="w-12 h-12 bg-muted group-hover:bg-primary/10 rounded-lg flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}