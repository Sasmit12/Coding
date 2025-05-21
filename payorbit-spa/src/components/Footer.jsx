import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

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
              <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
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
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
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