export default function BlogPage() {
  return (
    <main>
      <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
        <div className="container">
          <h1>PayOrbit Blog</h1>
          <p>
            Insights, updates, and stories from the PayOrbit team.
          </p>
          <ul>
            <li><a href="#">How to Streamline Mentor Payouts in EdTech</a></li>
            <li><a href="#">5 Tips for Transparent Payment Processing</a></li>
            <li><a href="#">Building Trust with Your Mentors</a></li>
            <li><a href="#">Product Updates: May 2025</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}