export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Streamline Payments for EdTech Mentors</h1>
          <p>
            PayOrbit automates your EdTech platform's payment processing, making mentor payouts simple, transparent, and error-free.
          </p>
          <div className="cta-buttons">
            <a href="/signup" className="btn btn-primary btn-large">
              Get Started
            </a>
            <a href="#demo" className="btn btn-outline btn-large">
              Watch Demo
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/assets/hero-dashboard.png" alt="PayOrbit Dashboard Preview" />
        </div>
      </div>
    </section>
  );
}