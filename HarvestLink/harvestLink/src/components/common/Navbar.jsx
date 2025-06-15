import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg w-full">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left side */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-farmer-primary">
                🌾 HarvestLink
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Right side */}
          <div className="hidden md:flex items-center">
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-8 mr-8">
              <Link
                to="/market"
                className="text-gray-600 hover:text-farmer-primary"
              >
                Market
              </Link>
              <Link
                to="/forum"
                className="text-gray-600 hover:text-farmer-primary"
              >
                Forum
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-farmer-primary"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-farmer-primary"
              >
                Contact
              </Link>
            </div>

            {/* Auth Links */}
            <div className="flex items-center space-x-6 pl-8 border-l border-gray-200">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-farmer-primary"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-farmer-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-farmer-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-farmer-primary text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-farmer-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/market"
                className="block px-3 py-2 text-gray-600 hover:text-farmer-primary"
              >
                Market
              </Link>
              <Link
                to="/forum"
                className="block px-3 py-2 text-gray-600 hover:text-farmer-primary"
              >
                Forum
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-600 hover:text-farmer-primary"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-600 hover:text-farmer-primary"
              >
                Contact
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-600 hover:text-farmer-primary"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-farmer-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-600 hover:text-farmer-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 bg-farmer-primary text-white hover:bg-green-600 rounded-md"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
