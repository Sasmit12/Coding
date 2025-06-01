import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => setNavOpen(v => !v);
  const closeNav = () => setNavOpen(false);

  const handleLogout = async () => {
    await logout();
    closeNav();
    navigate("/"); // Redirect to home or login after logout
  };

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src="/assets/logo.png" alt="PayOrbit Logo" />
            <span>PayOrbit</span>
          </div>
          {/* Only ONE nav-links */}
          <div className={`nav-links${navOpen ? " active" : ""}`} id="navLinks">
            <ul>
              {currentUser ? (
                <>
                  <li><NavLink to="/dashboard" onClick={closeNav}>Dashboard</NavLink></li>
                  <li><NavLink to="/mentors" onClick={closeNav}>Mentors</NavLink></li>
                  <li><NavLink to="/sessions" onClick={closeNav}>Sessions</NavLink></li>
                  <li><NavLink to="/payouts" onClick={closeNav}>Payouts</NavLink></li>
                  <li><NavLink to="/profile" onClick={closeNav}>Profile</NavLink></li>
                  <li><NavLink to="/receipt" onClick={closeNav}>Receipt</NavLink></li>
                  <li><NavLink to="/reports" onClick={closeNav}>Reports</NavLink></li>
                  <li><NavLink to="/chat" onClick={closeNav}>Chat</NavLink></li>
                  <li><NavLink to="/settings" onClick={closeNav}>Settings</NavLink></li>
                  <li className="nav-auth-mobile">
                    <button className="btn btn-outline" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><NavLink to="/features" onClick={closeNav}>Features</NavLink></li>
                  <li><NavLink to="/about" onClick={closeNav}>About</NavLink></li>
                  <li><NavLink to="/testimonials" onClick={closeNav}>Testimonials</NavLink></li>
                  <li><NavLink to="/contact" onClick={closeNav}>Contact</NavLink></li>
                  <li className="nav-auth-mobile">
                    <Link to="/login" className="btn btn-outline" onClick={closeNav}>
                      Login
                    </Link>
                    <Link to="/signup" className="btn btn-primary" onClick={closeNav}>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* Desktop auth buttons */}
          <div className="auth-buttons">
            {currentUser ? (
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline" onClick={closeNav}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary" onClick={closeNav}>
                  Sign Up
                </Link>
              </>
            )}
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