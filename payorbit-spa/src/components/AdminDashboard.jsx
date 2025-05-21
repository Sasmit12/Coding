import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  FaUserPlus, FaTasks, FaMoneyCheck, FaFileAlt, 
  FaUsers, FaCalendarCheck, FaClock, FaWallet, 
  FaUserShield, FaCaretDown, FaUserCog, FaSearch, 
  FaCreditCard, FaChartBar
} from "react-icons/fa";

export default function AdminDashboard() {
  const [metrics] = useState({
    mentorCount: 12,
    sessionCount: 43,
    pendingApprovals: 5,
    totalPayouts: 12500,
  });

  const recentActivities = [
    {
      icon: <FaUserPlus className="activity-icon secondary" />,
      text: <>New mentor registered: <strong>Jane Doe</strong></>,
    },
    {
      icon: <FaTasks className="activity-icon primary" />,
      text: <>5 sessions pending approval</>,
    },
    {
      icon: <FaMoneyCheck className="activity-icon accent" />,
      text: <>Payout processed: <strong>$350</strong></>,
    },
    {
      icon: <FaFileAlt className="activity-icon primary" />,
      text: <>Audit report generated</>,
    },
  ];

  const sessions = [
    {
      mentor: "Jane Doe",
      date: "2025-05-18",
      topic: "React Basics",
      duration: "2h",
      status: "Pending",
      id: 1,
    },
    {
      mentor: "John Smith",
      date: "2025-05-17",
      topic: "Node.js Intro",
      duration: "1.5h",
      status: "Approved",
      id: 2,
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
            {/* Dropdown implementation can be added here */}
          </div>
        </div>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="allSessionsTable">
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan={6}>Loading...</td>
                  </tr>
                ) : (
                  sessions.map(session => (
                    <tr key={session.id}>
                      <td>{session.mentor}</td>
                      <td>{session.date}</td>
                      <td>{session.topic}</td>
                      <td>{session.duration}</td>
                      <td>
                        <span className={`status-badge ${session.status.toLowerCase()}`}>{session.status}</span>
                      </td>
                      <td>
                        {session.status === "Pending" ? (
                          <>
                            <button className="btn btn-primary btn-small" style={{ marginRight: 6 }}>Approve</button>
                            <button className="btn btn-outline btn-small">Reject</button>
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