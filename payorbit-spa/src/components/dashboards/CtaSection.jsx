import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Streamline Your EdTech Payment System?</h2>
          <p>Join PayOrbit today and transform how you manage mentor payments.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary btn-large">
              Get Started Now
            </Link>
            <a href="#contact" className="btn btn-outline btn-large">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}