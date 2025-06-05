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

