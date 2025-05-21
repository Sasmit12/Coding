import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const toggleNav = () => setNavOpen(v => !v);
  const closeNav = () => setNavOpen(false);

  // Check authentication status on component mount
  useEffect(() => {
    // In a real app, you would check your auth service, local storage, or context
    // This is just a placeholder example - replace with your actual auth check
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };
    
    checkAuthStatus();
  }, []);

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
              {isLoggedIn ? (
                // Navigation links for logged-in users
                <>
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
                </>
              ) : (
                // Navigation links for visitors (not logged in)
                <>
                  <li>
                    <NavLink to="/features" onClick={closeNav}>Features</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" onClick={closeNav}>About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/testimonial" onClick={closeNav}>Testimonial</NavLink>
                  </li>                  
                  <li>
                    <NavLink to="/contact" onClick={closeNav}>Contact</NavLink>
                  </li>                  
                </>
              )}
            </ul>
          </div>
          
          <div className="auth-buttons">
            {isLoggedIn ? (
              // For logged-in users: show logout button
              <Link 
                to="/" 
                className="btn btn-outline" 
                onClick={() => {
                  // Handle logout logic here
                  localStorage.removeItem('authToken');
                  setIsLoggedIn(false);
                  closeNav();
                }}
              >
                Logout
              </Link>
            ) : (
              // For visitors: show login and signup buttons
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