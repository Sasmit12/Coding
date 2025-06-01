import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/assets/logo.png" alt="PayOrbit Logo" />
              <span>PayOrbit</span>
            </div>
            <p>Streamlining payments for EdTech platforms and their mentors worldwide.</p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Twitter" tabIndex={-1}><FaTwitter /></a>
              <a href="#" className="social-link" aria-label="LinkedIn" tabIndex={-1}><FaLinkedinIn /></a>
              <a href="#" className="social-link" aria-label="Facebook" tabIndex={-1}><FaFacebookF /></a>
              <a href="#" className="social-link" aria-label="Instagram" tabIndex={-1}><FaInstagram /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><NavLink to="/features">Features</NavLink></li>
              <li><NavLink to="/how-it-works">How It Works</NavLink></li>
              <li><NavLink to="/testimonials">Testimonials</NavLink></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li>
                <NavLink to="/documentation">Documentation</NavLink>
              </li>
              <li>
                <NavLink to="/api-reference">API Reference</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/support-center">Support Center</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li>
                <NavLink to="/about-us">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/careers">Careers</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PayOrbit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}