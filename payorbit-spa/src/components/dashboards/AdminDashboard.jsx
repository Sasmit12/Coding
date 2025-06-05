"use client"

// --- SHADCN/UI STATIC MOCK DASHBOARD (named export) ---
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const mockSessions = [
  {
    id: "1",
    mentor: "Dr. Sarah Johnson",
    date: "2024-01-15",
    type: "1-on-1 Tutoring",
    duration: 60,
    rate: 50,
    status: "completed",
  },
  {
    id: "2",
    mentor: "Prof. Mike Chen",
    date: "2024-01-14",
    type: "Group Session",
    duration: 90,
    rate: 35,
    status: "completed",
  },
  {
    id: "3",
    mentor: "Dr. Emily Davis",
    date: "2024-01-13",
    type: "Workshop",
    duration: 120,
    rate: 40,
    status: "pending",
  },
  {
    id: "4",
    mentor: "John Smith",
    date: "2024-01-12",
    type: "1-on-1 Tutoring",
    duration: 45,
    rate: 45,
    status: "completed",
  },
]

export function AdminDashboardMock({ simulationMode }) {
  const [sessions, setSessions] = useState(mockSessions)
  const [filterType, setFilterType] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSession, setNewSession] = useState({
    mentor: "",
    date: "",
    type: "",
    duration: "",
    rate: "",
  })

  const filteredSessions = sessions.filter((session) => {
    if (filterType !== "all" && session.type !== filterType) return false
    if (dateRange.start && session.date < dateRange.start) return false
    if (dateRange.end && session.date > dateRange.end) return false
    return true
  })

  const addSession = () => {
    if (newSession.mentor && newSession.date && newSession.type && newSession.duration && newSession.rate) {
      const session = {
        id: (sessions.length + 1).toString(),
        mentor: newSession.mentor,
        date: newSession.date,
        type: newSession.type,
        duration: Number.parseInt(newSession.duration),
        rate: Number.parseFloat(newSession.rate),
        status: "completed",
      }
      setSessions([...sessions, session])
      setNewSession({ mentor: "", date: "", type: "", duration: "", rate: "" })
      setIsAddDialogOpen(false)
    }
  }

  const totalEarnings = filteredSessions.reduce((sum, session) => sum + (session.duration / 60) * session.rate, 0)
  const totalSessions = filteredSessions.length
  const avgSessionDuration = filteredSessions.reduce((sum, session) => sum + session.duration, 0) / totalSessions || 0

  return (
    <div className="space-y-6">
      {simulationMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Simulation Mode:</strong> All changes are temporary and will not affect real data.
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              {filteredSessions.filter((s) => s.status === "completed").length} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Before platform fees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSessionDuration.toFixed(0)}min</div>
            <p className="text-xs text-muted-foreground">Per session</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>Add, view, and filter mentor sessions</CardDescription>
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
              <Label htmlFor="session-type">Session Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="1-on-1 Tutoring">1-on-1 Tutoring</SelectItem>
                  <SelectItem value="Group Session">Group Session</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Session</DialogTitle>
                  <DialogDescription>Enter the details for the new mentoring session.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mentor">Mentor Name</Label>
                    <Input
                      id="mentor"
                      value={newSession.mentor}
                      onChange={(e) => setNewSession({ ...newSession, mentor: e.target.value })}
                      placeholder="Enter mentor name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="session-date">Date</Label>
                    <Input
                      id="session-date"
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Session Type</Label>
                    <Select
                      value={newSession.type}
                      onValueChange={(value) => setNewSession({ ...newSession, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-on-1 Tutoring">1-on-1 Tutoring</SelectItem>
                        <SelectItem value="Group Session">Group Session</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newSession.duration}
                      onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                      placeholder="60"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rate">Rate ($/hour)</Label>
                    <Input
                      id="rate"
                      type="number"
                      value={newSession.rate}
                      onChange={(e) => setNewSession({ ...newSession, rate: e.target.value })}
                      placeholder="50"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addSession}>Add Session</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Sessions Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor</TableHead>
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
                    <TableCell className="font-medium">{session.mentor}</TableCell>
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
    </div>
  )
}

// --- FIREBASE REAL-TIME ADMIN DASHBOARD (default export) ---
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";
import {
  FaUserPlus, FaTasks, FaMoneyCheck, FaFileAlt,
  FaUsers, FaCalendarCheck, FaClock, FaWallet,
  FaUserShield, FaCaretDown, FaUserCog, FaSearch,
  FaCreditCard, FaChartBar
} from "react-icons/fa";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    mentorCount: 0,
    sessionCount: 0,
    pendingApprovals: 0,
    totalPayouts: 0,
  });
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Approve/Reject handlers
  const handleApprove = async (sessionId) => {
    try {
      await updateDoc(doc(db, "sessions", sessionId), { status: "Approved" });
    } catch (err) {
      setError("Failed to approve session.");
    }
  };

  const handleReject = async (sessionId) => {
    try {
      await updateDoc(doc(db, "sessions", sessionId), { status: "Rejected" });
    } catch (err) {
      setError("Failed to reject session.");
    }
  };

  useEffect(() => {
    setLoading(true);
    setError("");
    // Real-time mentors
    const unsubMentors = onSnapshot(collection(db, "mentors"), (mentorsSnap) => {
      setMetrics((prev) => ({ ...prev, mentorCount: mentorsSnap.size }));
    }, (err) =>
      {
        console.error("Mentors snapshot error", err); 
        setError("Failed to load mentors.")
      } 
    );
    // Real-time sessions
    const unsubSessions = onSnapshot(collection(db, "sessions"), (sessionsSnap) => {
      const sessionsData = [];
      let pendingApprovals = 0, totalPayouts = 0;
      sessionsSnap.forEach(docSnap => {
        const data = docSnap.data();
        sessionsData.push({ id: docSnap.id, ...data });
        if (data.status === "Pending") pendingApprovals++;
        if (data.status === "Approved" && data.payout) totalPayouts += Number(data.payout || 0);
      });
      setMetrics(prev => ({
        ...prev,
        sessionCount: sessionsData.length,
        pendingApprovals,
        totalPayouts,
      }));
      setSessions(sessionsData);
      setLoading(false);
    }, (err) => setError("Failed to load sessions."));

    return () => {
      unsubMentors();
      unsubSessions();
    };
  }, []);

  const recentActivities = [
    {
      icon: <FaUserPlus className="activity-icon secondary" />,
      text: <>New mentor registered</>,
    },
    {
      icon: <FaTasks className="activity-icon primary" />,
      text: <>{metrics.pendingApprovals} sessions pending approval</>,
    },
    {
      icon: <FaMoneyCheck className="activity-icon accent" />,
      text: <>Payout processed: <strong>${metrics.totalPayouts}</strong></>,
    },
    {
      icon: <FaFileAlt className="activity-icon primary" />,
      text: <>Audit report generated</>,
    },
  ];

  return (
    <section className="dashboard-section dashboard-bg">
      <div className="container">
        <div className="dashboard-header flex-between">
          <div>
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-desc">
              Overview and management tools for payouts, mentors, and sessions.
            </p>
          </div>
          <div className="user-dropdown" id="userDropdown">
            <button className="btn btn-outline" id="adminDropdownBtn" aria-haspopup="true" aria-expanded="false">
              <FaUserShield /> Admin <FaCaretDown />
            </button>
          </div>
        </div>

        {error && (
          <div className="error-msg" style={{ color: "red", marginBottom: 16 }}>
            {error}
          </div>
        )}

        {/* Metrics Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-flex">
              <FaUsers className="metric-icon primary" />
              <div>
                <div className="metric-value" id="mentorCount">{metrics.mentorCount}</div>
                <div className="metric-label">Mentors</div>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-flex">
              <FaCalendarCheck className="metric-icon secondary" />
              <div>
                <div className="metric-value" id="sessionCount">{metrics.sessionCount}</div>
                <div className="metric-label">Sessions</div>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-flex">
              <FaClock className="metric-icon accent" />
              <div>
                <div className="metric-value" id="pendingApprovals">{metrics.pendingApprovals}</div>
                <div className="metric-label">Pending Approvals</div>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-flex">
              <FaWallet className="metric-icon primary" />
              <div>
                <div className="metric-value" id="totalPayouts">${metrics.totalPayouts.toLocaleString()}</div>
                <div className="metric-label">Total Payouts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity and File Upload */}
        <div className="dashboard-flex">
          {/* Recent Activities */}
          <div className="recent-activity">
            <div className="activity-card">
              <h3>Recent Activities</h3>
              <ul className="activity-list" id="recentActivities">
                {recentActivities.map((a, i) => (
                  <li key={i}>
                    {a.icon} {a.text}
                  </li>
                ))}
              </ul>
            </div>
            {/* Upload Sessions CSV */}
            <div className="activity-card">
              <h3>Upload Sessions</h3>
              <form id="uploadSessionsForm" onSubmit={e => { e.preventDefault(); alert("Upload not implemented"); }}>
                <input type="file" accept=".csv" id="sessionsFile" className="form-file" />
                <button type="submit" className="btn btn-primary">Upload</button>
                <div className="form-hint">
                  Sample format: <code>session-details.csv</code>
                </div>
              </form>
            </div>
          </div>
          {/* Sidebar Management */}
          <aside className="dashboard-sidebar">
            <div className="sidebar-card">
              <h3>Quick Actions</h3>
              <ul className="sidebar-actions">
                <li>
                  <Link to="/mentors" className="btn btn-outline action-btn">
                    <FaUserCog /> Manage Mentors
                  </Link>
                </li>
                <li>
                  <Link to="/sessions" className="btn btn-outline action-btn">
                    <FaSearch /> Verify Sessions
                  </Link>
                </li>
                <li>
                  <Link to="/payouts" className="btn btn-outline action-btn">
                    <FaCreditCard /> Process Payouts
                  </Link>
                </li>
                <li>
                  <Link to="/reports" className="btn btn-outline action-btn">
                    <FaChartBar /> View Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sidebar-card sidebar-support">
              <h4>Support</h4>
              <p>
                Need help? <Link to="/support" className="support-link">Contact Support</Link>
              </p>
            </div>
          </aside>
        </div>
        {/* Approve/Reject Sessions Table */}
        <div className="table-card" style={{ marginTop: "2rem" }}>
          <h3>All Mentor Sessions</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Mentor</th>
                  <th>Date</th>
                  <th>Topic</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Payout</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="allSessionsTable">
                {loading ? (
                  <tr>
                    <td colSpan={7}>Loading...</td>
                  </tr>
                ) : sessions.length === 0 ? (
                  <tr>
                    <td colSpan={7}>No sessions found.</td>
                  </tr>
                ) : (
                  sessions.map(session => (
                    <tr key={session.id}>
                      <td>{session.mentor}</td>
                      <td>{session.date}</td>
                      <td>{session.topic}</td>
                      <td>{session.duration}</td>
                      <td>
                        <span className={`status-badge ${session.status?.toLowerCase()}`}>{session.status}</span>
                      </td>
                      <td>${session.payout || 0}</td>
                      <td>
                        {session.status === "Pending" ? (
                          <>
                            <button className="btn btn-primary btn-small" style={{ marginRight: 6 }} onClick={() => handleApprove(session.id)}>
                              Approve
                            </button>
                            <button className="btn btn-outline btn-small" onClick={() => handleReject(session.id)}>
                              Reject
                            </button>
                          </>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div id="adminSessionStatus"></div>
        </div>
      </div>
    </section>
  );
}