import { useState } from "react";

const mockAuditLogs = [
  {
    timestamp: "2025-05-16 17:45",
    user: "admin1",
    userType: "admin",
    action: "CREATE",
    target: "Mentor",
    details: <>Added new mentor <strong>Jane Doe</strong></>,
    ip: "192.168.1.100",
  },
  {
    timestamp: "2025-05-16 17:40",
    user: "mentor5",
    userType: "mentor",
    action: "LOGIN",
    target: "Account",
    details: <>Successful login</>,
    ip: "192.168.1.23",
  },
  {
    timestamp: "2025-05-16 17:32",
    user: "admin2",
    userType: "admin",
    action: "PAYOUT",
    target: "Payout",
    details: <>Processed payout <strong>$500</strong> to <strong>mentor3</strong></>,
    ip: "192.168.1.115",
  },
  {
    timestamp: "2025-05-16 17:25",
    user: "mentor2",
    userType: "mentor",
    action: "UPDATE",
    target: "Profile",
    details: <>Updated email address</>,
    ip: "192.168.1.48",
  },
  {
    timestamp: "2025-05-16 17:18",
    user: "admin1",
    userType: "admin",
    action: "DELETE",
    target: "Session",
    details: <>Deleted session <strong>SESS-0005</strong></>,
    ip: "192.168.1.100",
  },
  {
    timestamp: "2025-05-16 17:10",
    user: "mentor1",
    userType: "mentor",
    action: "UPDATE",
    target: "Session",
    details: <>Updated session details <strong>SESS-0007</strong></>,
    ip: "192.168.1.53",
  },
  {
    timestamp: "2025-05-16 17:06",
    user: "admin1",
    userType: "admin",
    action: "PAYOUT",
    target: "Payout",
    details: <>Processed payout <strong>$350</strong> to <strong>mentor2</strong></>,
    ip: "192.168.1.100",
  },
];

function getUserIcon(type) {
  if (type === "admin")
    return <i className="fas fa-user-shield" style={{ color: "var(--primary-color)", marginRight: 4 }} />;
  return <i className="fas fa-user" style={{ color: "var(--secondary-color)", marginRight: 4 }} />;
}

function getActionClass(action) {
  switch (action) {
    case "CREATE":
      return "audit-type create";
    case "LOGIN":
      return "audit-type login";
    case "UPDATE":
      return "audit-type update";
    case "DELETE":
      return "audit-type delete";
    case "PAYOUT":
      return "audit-type payout";
    default:
      return "audit-type";
  }
}

export default function AuditPage() {
  // You can expand features (filter, search, export) as needed.
  const [logs] = useState(mockAuditLogs);

  return (
    <>
      <main>
        <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
          <div className="container">
            <div
              className="dashboard-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 38,
              }}
            >
              <div>
                <h1 style={{ marginBottom: "0.2em" }}>Audit Logs</h1>
                <p style={{ color: "var(--text-color-light)" }}>
                  Track all important actions, changes, and access for compliance and transparency.
                </p>
              </div>
              <div className="user-dropdown" style={{ position: "relative" }}>
                <button className="btn btn-outline" id="adminDropdownBtn">
                  <i className="fas fa-user-shield"></i> Admin{" "}
                  <i className="fas fa-caret-down"></i>
                </button>
              </div>
            </div>
            <div
              style={{
                background: "var(--light-color)",
                padding: 24,
                borderRadius: "var(--border-radius)",
                boxShadow: "var(--box-shadow)",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}
              >
                <h3 style={{ marginBottom: 0 }}>Audit Trail</h3>
                <button className="btn btn-outline" style={{ marginBottom: 8 }}>
                  <i className="fas fa-file-csv"></i> Export CSV
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="audit-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>User</th>
                      <th>Action</th>
                      <th>Target</th>
                      <th>Details</th>
                      <th>IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log, idx) => (
                      <tr key={idx}>
                        <td>{log.timestamp}</td>
                        <td>
                          {getUserIcon(log.userType)}
                          {log.user}
                        </td>
                        <td>
                          <span className={getActionClass(log.action)}>{log.action}</span>
                        </td>
                        <td>{log.target}</td>
                        <td>{log.details}</td>
                        <td>{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              style={{
                background: "var(--background-light)",
                padding: 20,
                borderRadius: "var(--border-radius)",
                boxShadow: "var(--box-shadow)",
              }}
            >
              <h4 style={{ marginBottom: 10 }}>What is an Audit Log?</h4>
              <p style={{ fontSize: "0.97rem", marginBottom: 12 }}>
                Audit logs record all important actions, changes, and access events in the system for transparency and
                compliance. Only admins can view all logs. For more details, see the{" "}
                <a
                  href="#"
                  style={{ color: "var(--primary-color)", textDecoration: "underline" }}
                >
                  documentation
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; 2025 PayOrbit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}