export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p style={{ maxWidth: 700, margin: "18px 0" }}>
            Your privacy is important to us. PayOrbit collects only the information necessary to provide and improve our services. We never sell your data to third parties. All data is stored securely and handled in compliance with applicable data protection laws.
          </p>
          <h3>What We Collect</h3>
          <ul>
            <li>Account information (name, email, role)</li>
            <li>Payment and transaction data</li>
            <li>Usage analytics</li>
          </ul>
          <h3>How We Use Data</h3>
          <ul>
            <li>To provide services and process payments</li>
            <li>To improve our product and user experience</li>
            <li>To communicate important updates</li>
          </ul>
          <h3>Contact</h3>
          <p>
            For privacy-related questions, email us at <a href="mailto:privacy@payorbit.com">privacy@payorbit.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}