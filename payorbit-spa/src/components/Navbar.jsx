import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(v => !v);
  const closeNav = () => setNavOpen(false);

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src="/assets/logo.png" alt="PayOrbit Logo" />
            <span>PayOrbit</span>
          </div>
          <div className={`nav-links${navOpen ? " active" : ""}`} id="navLinks">
            <ul>
              {/* Main Dashboard Navigation */}
              <li>
                <NavLink to="/dashboard" onClick={closeNav}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/mentors" onClick={closeNav}>
                  Mentors
                </NavLink>
              </li>
              <li>
                <NavLink to="/sessions" onClick={closeNav}>
                  Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/payouts" onClick={closeNav}>
                  Payouts
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" onClick={closeNav}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/receipt" onClick={closeNav}>
                  Receipt
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" onClick={closeNav}>
                  Reports
                </NavLink>
              </li>
              <li>
                <NavLink to="/chat" onClick={closeNav}>
                  Chat
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" onClick={closeNav}>
                  Settings
                </NavLink>
              </li>
              {/* Landing page navigation (keep previous links as well) */}
              <li>
                <NavLink to="/features" onClick={closeNav}>Features</NavLink>
              </li>
              <li>
                <NavLink to="/payment" onClick={closeNav}>Payments</NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={closeNav}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/support" onClick={closeNav}>
                  Support
                </NavLink>
              </li>
              <li>
                <NavLink to="/mentor-dashboard" onClick={closeNav}>
                  Mentor Dashboard
                </NavLink>
              </li>
              <li>
                <a href="#testimonials" onClick={closeNav}>
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" onClick={closeNav}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="auth-buttons">
            {/* If you want to show "Logout" only when logged in, handle that with auth state */}
            <Link to="/login" className="btn btn-outline" onClick={closeNav}>
              Logout
            </Link>
            <Link to="/signup" className="btn btn-primary" onClick={closeNav}>
              Sign Up
            </Link>
          </div>
          <div
            className={`hamburger${navOpen ? " active" : ""}`}
            id="hamburgerBtn"
            aria-label="Open menu"
            tabIndex={0}
            onClick={toggleNav}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggleNav()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>
    </header>
  );
}