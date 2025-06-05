"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, User, DollarSign, Receipt, MessageSquare } from "lucide-react"

const mockAuditLog = [
  {
    id: "1",
    action: "UPDATE",
    entity: "Session",
    entityId: "SES-001",
    user: "Admin User",
    userRole: "admin",
    timestamp: "2024-01-15 14:35:22",
    changes: [
      { field: "status", oldValue: "pending", newValue: "completed" },
      { field: "duration", oldValue: "45", newValue: "60" },
    ],
    description: "Updated session status and duration for Dr. Sarah Johnson",
  },
  {
    id: "2",
    action: "CREATE",
    entity: "Payout",
    entityId: "PAY-002",
    user: "System",
    userRole: "system",
    timestamp: "2024-01-15 14:30:15",
    changes: [
      { field: "amount", oldValue: "", newValue: "564.69" },
      { field: "status", oldValue: "", newValue: "pending" },
    ],
    description: "Generated payout for January 2024 - Dr. Sarah Johnson",
  },
  {
    id: "3",
    action: "UPDATE",
    entity: "Mentor",
    entityId: "MEN-003",
    user: "Prof. Mike Chen",
    userRole: "mentor",
    timestamp: "2024-01-15 12:20:10",
    changes: [{ field: "rate", oldValue: "45", newValue: "50" }],
    description: "Updated hourly rate",
  },
  {
    id: "4",
    action: "DELETE",
    entity: "Session",
    entityId: "SES-004",
    user: "Admin User",
    userRole: "admin",
    timestamp: "2024-01-15 11:15:30",
    changes: [{ field: "status", oldValue: "cancelled", newValue: "deleted" }],
    description: "Removed cancelled session from system",
  },
  {
    id: "5",
    action: "SEND",
    entity: "Receipt",
    entityId: "REC-005",
    user: "Admin User",
    userRole: "admin",
    timestamp: "2024-01-15 10:45:18",
    changes: [],
    description: "Sent payout receipt to Dr. Emily Davis",
  },
  {
    id: "6",
    action: "CREATE",
    entity: "Message",
    entityId: "MSG-006",
    user: "Dr. Sarah Johnson",
    userRole: "mentor",
    timestamp: "2024-01-15 09:30:45",
    changes: [],
    description: "Sent message regarding payout inquiry",
  },
]

const actionIcons = {
  Session: FileText,
  Payout: DollarSign,
  Receipt: Receipt,
  Mentor: User,
  Message: MessageSquare,
}

const actionColors = {
  CREATE: "bg-green-100 text-green-800",
  UPDATE: "bg-blue-100 text-blue-800",
  DELETE: "bg-red-100 text-red-800",
  SEND: "bg-purple-100 text-purple-800",
}

export function AuditLog() {
  const [auditEntries] = useState(mockAuditLog)
  const [filterAction, setFilterAction] = useState("all")
  const [filterEntity, setFilterEntity] = useState("all")
  const [filterUser, setFilterUser] = useState("")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  const filteredEntries = auditEntries.filter((entry) => {
    if (filterAction !== "all" && entry.action !== filterAction) return false
    if (filterEntity !== "all" && entry.entity !== filterEntity) return false
    if (filterUser && !entry.user.toLowerCase().includes(filterUser.toLowerCase())) return false
    if (dateRange.start && entry.timestamp < dateRange.start) return false
    if (dateRange.end && entry.timestamp > dateRange.end) return false
    return true
  })

  const getEntityIcon = (entity) => {
    const Icon = actionIcons[entity] || FileText
    return <Icon className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
        <CardDescription>Track all system activities and changes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="filter-action">Action</Label>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger id="filter-action">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="CREATE">Create</SelectItem>
                <SelectItem value="UPDATE">Update</SelectItem>
                <SelectItem value="DELETE">Delete</SelectItem>
                <SelectItem value="SEND">Send</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter-entity">Entity</Label>
            <Select value={filterEntity} onValueChange={setFilterEntity}>
              <SelectTrigger id="filter-entity">
                <SelectValue placeholder="Filter by entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="Session">Session</SelectItem>
                <SelectItem value="Payout">Payout</SelectItem>
                <SelectItem value="Receipt">Receipt</SelectItem>
                <SelectItem value="Mentor">Mentor</SelectItem>
                <SelectItem value="Message">Message</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter-user">User</Label>
            <Input
              id="filter-user"
              placeholder="Filter by user..."
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="filter-start-date">Start Date</Label>
              <Input
                id="filter-start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filter-end-date">End Date</Label>
              <Input
                id="filter-end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entity</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getEntityIcon(entry.entity)}
                    <div>
                      <div className="font-medium">{entry.entity}</div>
                      <div className="text-xs text-muted-foreground">{entry.entityId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={actionColors[entry.action]}>{entry.action}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{entry.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{entry.user}</div>
                      <div className="text-xs text-muted-foreground">{entry.userRole}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{entry.description}</div>
                  {entry.changes.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {entry.changes.map((c, i) => (
                        <div key={i}>
                          <strong>{c.field}:</strong> {c.oldValue ? `${c.oldValue} -> ${c.newValue}` : `set to ${c.newValue}`}
                        </div>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">{entry.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )


}
