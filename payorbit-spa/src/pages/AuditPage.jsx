import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  History,
  User,
  Calendar,
  Eye,
} from "lucide-react";
import { api } from "@/lib/api";

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resourceFilter, setResourceFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");

  const { data: auditData, isLoading } = useQuery({
    queryKey: ["/api/audit-logs", resourceFilter === "all" ? undefined : resourceFilter],
    queryFn: () =>
      api.auditLogs.getAll(resourceFilter === "all" ? {} : { resource: resourceFilter }),
  });

  const auditLogs = auditData?.logs || [];

  const getActionColor = (action) => {
    switch (action.toLowerCase()) {
      case "create":
        return "bg-success/10 text-success border-success/20";
      case "update":
      case "update_status":
        return "bg-primary/10 text-primary border-primary/20";
      case "delete":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "calculate":
      case "generate":
        return "bg-warning/10 text-warning border-warning/20";
      case "send":
      case "mark_read":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getResourceIcon = (resource) => {
    switch (resource.toLowerCase()) {
      case "session":
        return "📅";
      case "mentor":
        return "👨‍🏫";
      case "payout":
        return "💰";
      case "receipt":
        return "🧾";
      case "chat_message":
        return "💬";
      default:
        return "📄";
    }
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction =
      actionFilter === "all" ||
      log.action.toLowerCase() === actionFilter.toLowerCase();

    return matchesSearch && matchesAction;
  });

  const uniqueActions = [...new Set(auditLogs.map((log) => log.action))];
  const uniqueResources = [...new Set(auditLogs.map((log) => log.resource))];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading audit logs...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-foreground">Audit Logs</h2>
            <p className="text-sm text-muted-foreground">
              Track system activities and changes ({auditData?.total || 0} total
              entries)
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            </div>

            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                {uniqueResources.map((resource) => (
                  <SelectItem key={resource} value={resource}>
                    {resource}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {uniqueActions.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {filteredLogs.length === 0 ? (
          <Card className="shadow-material">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <History className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No audit logs found
              </h3>
              <p className="text-muted-foreground text-center">
                {searchTerm ||
                resourceFilter !== "all" ||
                actionFilter !== "all"
                  ? "No logs match your search criteria."
                  : "System activities will appear here as they occur."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-material">
            <CardHeader>
              <h3 className="text-lg font-medium">
                Activity Log ({filteredLogs.length} entries)
                {auditData?.limited && (
                  <span className="text-sm text-muted-foreground ml-2">
                    (showing latest 100)
                  </span>
                )}
              </h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Resource
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        IP Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {filteredLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                            <div>
                              <div>
                                {new Date(log.createdAt).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(log.createdAt).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-foreground">
                                {log.userId}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {log.userType}
                              </Badge>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant="outline"
                            className={getActionColor(log.action)}
                          >
                            {log.action}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          <div className="flex items-center">
                            <span className="mr-2">
                              {getResourceIcon(log.resource)}
                            </span>
                            <div>
                              <div className="font-medium">{log.resource}</div>
                              {log.resourceId && (
                                <div className="text-xs text-muted-foreground">
                                  ID: {log.resourceId.slice(0, 8)}...
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground max-w-xs">
                          {log.changes ? (
                            <div className="space-y-1">
                              {Object.entries(log.changes)
                                .slice(0, 2)
                                .map(([key, value]) => (
                                  <div key={key} className="text-xs">
                                    <span className="font-medium">{key}:</span>{" "}
                                    <span className="text-muted-foreground">
                                      {typeof value === "object"
                                        ? JSON.stringify(value).slice(0, 30) +
                                          "..."
                                        : String(value).slice(0, 30)}
                                    </span>
                                  </div>
                                ))}
                              {Object.keys(log.changes).length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{Object.keys(log.changes).length - 2} more
                                  changes
                                </div>
                              )}
                            </div>
                          ) : log.metadata ? (
                            <div className="text-xs text-muted-foreground">
                              {JSON.stringify(log.metadata).slice(0, 50)}...
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              No details
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {log.ipAddress || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}