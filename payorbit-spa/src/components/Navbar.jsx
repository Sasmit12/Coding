import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  // Toggle mobile nav
  const toggleNav = () => setNavOpen((v) => !v);
  const closeNav = () => setNavOpen(false);

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <img src="/assets/logo.png" alt="PayOrbit Logo" />
            <span>PayOrbit</span>
          </div>
          {/* Nav Links */}
          <div className={`nav-links${navOpen ? " active" : ""}`} id="navLinks">
            <ul>
              <li>
                <NavLink to="/features" onClick={closeNav}>
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={closeNav}>
                  About
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
          {/* Auth Buttons */}
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline" onClick={closeNav}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary" onClick={closeNav}>
              Sign Up
            </Link>
          </div>
          {/* Hamburger for Mobile */}
          <div
            className={`hamburger${navOpen ? " active" : ""}`}
            id="hamburgerBtn"
            aria-label="Open menu"
            tabIndex={0}
            onClick={toggleNav}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleNav();
            }}
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