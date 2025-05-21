import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function MentorDashboard() {
  // Demo state for metrics, sessions, and filters
  const [metrics] = useState({
    sessions: 24,
    pending: 3,
    approved: 21,
    earnings: 8400,
  });
  const [sessions] = useState([
    { id: "SESS-0001", date: "2025-05-12", status: "paid" },
    { id: "SESS-0002", date: "2025-05-14", status: "pending" },
  ]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  // Filtered sessions logic (demo)
  const filteredSessions = sessions.filter(session => {
    if (statusFilter && session.status !== statusFilter) return false;
    if (dateStart && session.date < dateStart) return false;
    if (dateEnd && session.date > dateEnd) return false;
    return true;
  });

  return (
    <section className="dashboard-section dashboard-bg">
      <div className="container">
        <div className="dashboard-header flex-between">
          <div>
            <h1 className="dashboard-title">Mentor Dashboard</h1>
            <p className="dashboard-desc">Track your sessions, earnings, and profile.</p>
          </div>
          <div className="user-dropdown" id="userDropdown">
            <button className="btn btn-outline" id="mentorDropdownBtn">
              <i className="fas fa-user"></i> Mentor <i className="fas fa-caret-down"></i>
            </button>
            {/* Placeholder for dropdown */}
          </div>
        </div>
        {/* Metrics Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-flex">
              <i className="fas fa-calendar-check metric-icon primary"></i>
              <div>
                <div className="metric-value">{metrics.sessions}</div>
                <div className="metric-label">Sessions</div>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-flex">
              <i className="fas fa-clock metric-icon secondary"></i>
              <div>
                <div className="metric-value">{metrics.pending}</div>
                <div className="metric-label">Pending</div>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-flex">
              <i className="fas fa-check-circle metric-icon accent"></i>
              <div>
                <div className="metric-value">{metrics.approved}</div>
                <div className="metric-label">Approved</div>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-flex">
              <i className="fas fa-wallet metric-icon primary"></i>
              <div>
                <div className="metric-value">${metrics.earnings.toLocaleString()}</div>
                <div className="metric-label">Earnings</div>
              </div>
            </div>
          </div>
        </div>
        {/* Log a New Session */}
        <div className="table-card">
          <h3>Log a New Session</h3>
          <form id="sessionForm" onSubmit={e => { e.preventDefault(); alert("Demo: session logged!"); }}>
            <input type="date" id="session-date" required />
            <input type="text" id="session-topic" placeholder="Topic" required />
            <input type="number" id="session-duration" placeholder="Duration (minutes)" required min="1" />
            <button type="submit" className="btn btn-primary">Log Session</button>
          </form>
          <div id="sessionStatus"></div>
        </div>
        {/* My Sessions Table & Filters */}
        <div className="dashboard-flex">
          <div className="main-content">
            <div className="table-card">
              <div className="table-header flex-between">
                <h3>My Sessions</h3>
                {/* Example: status filter and date picker */}
                <div className="filters">
                  <select
                    name="status"
                    className="filter-select"
                    id="statusFilter"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                  </select>
                  <input
                    type="date"
                    className="filter-date"
                    id="dateStart"
                    title="From date"
                    value={dateStart}
                    onChange={e => setDateStart(e.target.value)}
                  />
                  <input
                    type="date"
                    className="filter-date"
                    id="dateEnd"
                    title="To date"
                    value={dateEnd}
                    onChange={e => setDateEnd(e.target.value)}
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Session ID</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSessions.length === 0 ? (
                      <tr>
                        <td colSpan={3}>No sessions found</td>
                      </tr>
                    ) : (
                      filteredSessions.map(session => (
                        <tr key={session.id}>
                          <td>{session.id}</td>
                          <td>{session.date}</td>
                          <td>
                            <span className={`status-badge ${session.status}`}>
                              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="table-actions">
                <button className="btn btn-outline">
                  <i className="fas fa-plus"></i> Add Session
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-file-csv"></i> Export CSV
                </button>
              </div>
            </div>
            {/* Upload New Sessions */}
            <div className="table-card">
              <h3>Upload New Session</h3>
              <form id="uploadSessionForm" onSubmit={e => { e.preventDefault(); alert("Demo: CSV uploaded!"); }}>
                <input type="file" accept=".csv" id="newSessionFile" className="form-file" />
                <button type="submit" className="btn btn-primary">Upload</button>
                <div className="form-hint">Format: <code>session-details.csv</code></div>
              </form>
            </div>
          </div>
          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            <div className="sidebar-card">
              <h3>Quick Links</h3>
              <ul className="sidebar-actions">
                <li>
                  <NavLink to="/payments" className="btn btn-outline action-btn">
                    <i className="fas fa-file-invoice-dollar"></i> Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="btn btn-outline action-btn">
                    <i className="fas fa-user"></i> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/support" className="btn btn-outline action-btn">
                    <i className="fas fa-comments"></i> Support
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/chat" className="btn btn-outline action-btn">
                    <i className="fas fa-headset"></i> Chat with Admin
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="sidebar-card sidebar-support">
              <h4>Need Help?</h4>
              <p>Contact support or chat with the admin for assistance anytime.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}