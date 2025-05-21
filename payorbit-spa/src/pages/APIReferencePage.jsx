export default function APIReferencePage() {
  return (
    <main>
      <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
        <div className="container">
          <h1>API Reference</h1>
          <p>
            Explore PayOrbit's API endpoints. Use these to integrate PayOrbit with your EdTech platform.
          </p>
          <ul>
            <li><code>POST /api/payouts</code> - Create a new payout</li>
            <li><code>GET /api/mentors</code> - List all mentors</li>
            <li><code>GET /api/transactions</code> - View transaction history</li>
            <li><code>POST /api/auth</code> - Authenticate user</li>
          </ul>
          <p>
            Need more? Email <a href="mailto:support@payorbit.com">support@payorbit.com</a> for detailed API docs.
          </p>
        </div>
      </section>
    </main>
  );
}