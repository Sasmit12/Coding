import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      setError("Login failed. Check your credentials.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google sign-in coming soon!");
  };
  const handleFacebookLogin = () => {
    alert("Facebook sign-in coming soon!");
  };

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-form-wrapper">
          <div className="auth-form">
            <h2>Sign In to PayOrbit</h2>
            <form id="loginForm" autoComplete="on" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group password-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i> Password
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={0}
                    onClick={() => setShowPassword(v => !v)}
                  >
                    <i className={`fas fa-eye${showPassword ? "-slash" : ""}`}></i>
                  </button>
                </div>
              </div>
              {error && <div className="form-error" style={{ color: "red", marginBottom: 6 }}>{error}</div>}
              <button type="submit" className="btn btn-primary btn-large">
                Login
              </button>
            </form>
            <div className="form-footer">
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
              <p>
                <Link to="/reset-password">Forgot password?</Link>
              </p>
            </div>
            <div className="divider">
              <span>or</span>
            </div>
            <button
              id="googleSignInBtn"
              className="btn btn-outline social-btn"
              type="button"
              onClick={handleGoogleLogin}
            >
              <i className="fab fa-google"></i> Sign in with Google
            </button>
            <button
              id="facebookSignInBtn"
              className="btn btn-outline social-btn"
              type="button"
              onClick={handleFacebookLogin}
            >
              <i className="fab fa-facebook-f"></i> Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}