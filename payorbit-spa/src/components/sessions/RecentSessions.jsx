import React from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function RecentSessions({ sessions }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "in progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "scheduled":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "1-on-1 coaching":
      case "1on1":
        return "bg-primary/10 text-primary border-primary/20";
      case "group workshop":
      case "group":
        return "bg-warning/10 text-warning border-warning/20";
      case "career review":
      case "review":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <Card className="xl:col-span-2 shadow-material">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">
            Recent Sessions
          </h3>
          <Link href="/sessions">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Mentor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {sessions.map((session) => (
                <tr
                  key={session.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-foreground">
                          {session.mentorName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ID: {session.mentorId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className={getTypeColor(session.sessionType)}
                    >
                      {session.sessionType}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {formatDuration(session.duration)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    ${session.hourlyRate}/hr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className={getStatusColor(session.status)}
                    >
                      {session.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}