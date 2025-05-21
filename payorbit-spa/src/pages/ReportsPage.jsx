export default function ReportsPage() {
  return (
    <>
      <main>
        <section className="dashboard-section">
          <div className="container">
            <h1>Reports</h1>
            <p>View and export various reports on platform activity.</p>
            <ul>
              <li>
                <a href="#">Session Summary Report</a>
              </li>
              <li>
                <a href="#">Mentor Performance Report</a>
              </li>
              <li>
                <a href="#">Payout Audit Report</a>
              </li>
            </ul>
            <button className="btn btn-primary">Export as CSV</button>
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