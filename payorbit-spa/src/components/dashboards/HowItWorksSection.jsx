export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How PayOrbit Works</h2>
          <p>Simple, efficient payment processing in just a few steps</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Session Recording</h3>
              <p>Mentors log their teaching sessions manually or upload batch files.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Verification</h3>
              <p>Admins review and approve submitted sessions.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Payment Processing</h3>
              <p>System calculates payments based on approved sessions and rates.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Documentation</h3>
              <p>Receipts are generated and payment records are maintained.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}