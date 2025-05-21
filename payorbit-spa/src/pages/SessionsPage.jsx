import { useState } from "react";

export default function SessionsPage() {
  // Example session data
  const [sessions] = useState([
    {
      date: "2025-05-21",
      time: "15:00",
      mentee: "Jane Doe",
      status: "Upcoming",
      action: "View",
      badge: "badge-upcoming",
    },
    {
      date: "2025-05-14",
      time: "10:30",
      mentee: "John Smith",
      status: "Completed",
      action: "Details",
      badge: "badge-completed",
    },
    {
      date: "2025-05-10",
      time: "09:00",
      mentee: "Alice Lee",
      status: "Missed",
      action: "Reschedule",
      badge: "badge-missed",
    },
  ]);

  return (
    <>
      <main>
        <section className="dashboard-section">
          <div className="container">
            <h1>My Sessions</h1>
            <p>View your upcoming and previous mentoring sessions.</p>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Session Date</th>
                    <th>Time</th>
                    <th>Mentee</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s, i) => (
                    <tr key={i}>
                      <td>{s.date}</td>
                      <td>{s.time}</td>
                      <td>{s.mentee}</td>
                      <td>
                        <span className={`badge ${s.badge}`}>{s.status}</span>
                      </td>
                      <td>
                        <button className="btn btn-outline btn-small">{s.action}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary">Schedule New Session</button>
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