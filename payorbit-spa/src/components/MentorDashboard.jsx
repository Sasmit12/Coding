"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, DollarSign, Clock, Calendar } from "lucide-react"

const mockSessions = [
  { id: "1", date: "2024-01-15", type: "1-on-1 Tutoring", duration: 60, rate: 50, status: "completed" },
  { id: "2", date: "2024-01-14", type: "Group Session", duration: 90, rate: 35, status: "completed" },
  { id: "3", date: "2024-01-13", type: "Workshop", duration: 120, rate: 40, status: "pending" },
  { id: "4", date: "2024-01-12", type: "1-on-1 Tutoring", duration: 45, rate: 45, status: "completed" },
]

const mockPayouts = [
  {
    id: "1",
    period: "January 2024",
    sessions: 12,
    grossEarnings: 925.0,
    netPayout: 564.69,
    status: "paid",
    receiptUrl: "#",
  },
  {
    id: "2",
    period: "December 2023",
    sessions: 15,
    grossEarnings: 1200.0,
    netPayout: 732.0,
    status: "paid",
    receiptUrl: "#",
  },
  { id: "3", period: "November 2023", sessions: 8, grossEarnings: 640.0, netPayout: 390.4, status: "processing" },
]

export function MentorDashboard() {
  const [sessions] = useState(mockSessions)
  const [payouts] = useState(mockPayouts)
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSessions = sessions.filter((session) => {
    if (statusFilter !== "all" && session.status !== statusFilter) return false
    if (dateRange.start && session.date < dateRange.start) return false
    if (dateRange.end && session.date > dateRange.end) return false
    return true
  })

  const totalEarnings = payouts.reduce((sum, payout) => sum + payout.netPayout, 0)
  const totalSessions = sessions.length
  const avgEarningsPerSession = totalSessions > 0 ? totalEarnings / totalSessions : 0

  const downloadReceipt = (receiptUrl) => {
    alert("Receipt downloaded!")
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Net payout received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">Sessions completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgEarningsPerSession.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Average earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>View your recent mentoring sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>{session.date}</TableCell>
                    <TableCell>{session.type}</TableCell>
                    <TableCell>{session.duration}min</TableCell>
                    <TableCell>${session.rate}/hr</TableCell>
                    <TableCell>${((session.duration / 60) * session.rate).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          session.status === "completed"
                            ? "default"
                            : session.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {session.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>Track your payment history and download receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Gross Earnings</TableHead>
                  <TableHead>Net Payout</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">{payout.period}</TableCell>
                    <TableCell>{payout.sessions}</TableCell>
                    <TableCell>${payout.grossEarnings.toFixed(2)}</TableCell>
                    <TableCell className="font-medium text-green-600">${payout.netPayout.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payout.status === "paid"
                            ? "default"
                            : payout.status === "processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {payout.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payout.receiptUrl && (
                        <Button variant="outline" size="sm" onClick={() => downloadReceipt(payout.receiptUrl)}>
                          <Download className="mr-2 h-4 w-4" />
                          Receipt
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}