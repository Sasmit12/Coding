import { useState } from "react";
import { Link } from "react-router-dom";
// If using Firebase or other auth, import your password reset function here
// import { sendPasswordResetEmail } from "../firebase/auth";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    try {
      // await sendPasswordResetEmail(email);
      setStatus("If there's an account with this email, a reset link has been sent.");
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <>
      <main>
        <section className="auth-section">
          <div className="container">
            <div className="auth-form-wrapper">
              <div className="auth-form">
                <h2>Reset Your Password</h2>
                <form id="resetPasswordForm" onSubmit={handleReset}>
                  <div className="form-group">
                    <label htmlFor="resetEmail">
                      <i className="fas fa-envelope"></i> Email
                    </label>
                    <input
                      type="email"
                      id="resetEmail"
                      name="resetEmail"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  {status && (
                    <div className="form-success" style={{ color: "green", marginBottom: 8 }}>
                      {status}
                    </div>
                  )}
                  {error && (
                    <div className="form-error" style={{ color: "red", marginBottom: 8 }}>
                      {error}
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary btn-large">
                    Send Reset Link
                  </button>
                </form>
                <div className="form-footer">
                  <p>
                    Remembered your password? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; 2025 PayOrbit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}