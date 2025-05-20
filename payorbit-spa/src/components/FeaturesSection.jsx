export default function FeaturesSection() {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Everything you need to manage mentor payments efficiently</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <h3>Automated Payouts</h3>
            <p>
              Process payments automatically based on mentor sessions with customizable payment cycles.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <h3>Session Tracking</h3>
            <p>
              Log and verify teaching sessions with detailed reporting and approval workflows.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Real-time Support</h3>
            <p>
              Connect mentors and admins through an integrated chat system for quick issue resolution.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <h3>Receipt Generation</h3>
            <p>
              Automatically create and distribute professional payment receipts for every transaction.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Secure Authentication</h3>
            <p>
              Role-based access control with Firebase Authentication ensures data security.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Payment Analytics</h3>
            <p>
              Gain insights from comprehensive reports on mentor activity and payment history.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}