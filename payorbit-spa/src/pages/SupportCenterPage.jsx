export default function SupportCenterPage() {
  return (
    <main>
      <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
        <div className="container">
          <h1>Support Center</h1>
          <p>
            Need help? Browse our FAQs or reach out to our support team.
          </p>
          <ul>
            <li><a href="#">How do I reset my password?</a></li>
            <li><a href="#">How do I invite a new mentor?</a></li>
            <li><a href="#">Why is my payout delayed?</a></li>
            <li><a href="#">Contact Support</a></li>
          </ul>
          <p>
            You can always email us at <a href="mailto:support@payorbit.com">support@payorbit.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}