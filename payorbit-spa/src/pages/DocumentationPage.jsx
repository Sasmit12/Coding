export default function DocumentationPage() {
  return (
    <main>
      <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
        <div className="container">
          <h1>Documentation</h1>
          <p>Find guides and user manuals for using PayOrbit's features.</p>
          <ul>
            <li><a href="#">Getting Started</a></li>
            <li><a href="#">Mentor Payouts</a></li>
            <li><a href="#">Admin Dashboard</a></li>
            <li><a href="#">Troubleshooting</a></li>
          </ul>
          <p>
            For more help, visit our <a href="/support-center">Support Center</a>.
          </p>
        </div>
      </section>
    </main>
  );
}