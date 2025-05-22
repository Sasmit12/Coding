import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setStatus("");
  }

  function togglePassword() {
    setShowPassword((v) => !v);
  }
  function toggleConfirm() {
    setShowConfirm((v) => !v);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("");
    if (!form.name || !form.email || !form.role || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.name });
      setStatus("Signup successful! Please check your email to verify your account.");
      setForm({
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message);
    }
  }

  function handleGoogleSignUp() {
    setStatus("Google signup coming soon!");
  }
  function handleFacebookSignUp() {
    setStatus("Facebook signup coming soon!");
  }

  return (
    <>
      <main>
        <section className="auth-section">
          <div className="container">
            <div className="auth-form-wrapper">
              <div className="auth-form">
                <h2>Create Your PayOrbit Account</h2>
                <form id="signupForm" autoComplete="on" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="fas fa-user"></i> Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="fas fa-envelope"></i> Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">
                      <i className="fas fa-user-shield"></i> Sign Up As
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      autoComplete="off"
                      value={form.role}
                      onChange={handleChange}
                    >
                      <option value="">Select role</option>
                      <option value="admin">Administrator</option>
                      <option value="mentor">Mentor</option>
                    </select>
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
                        autoComplete="new-password"
                        value={form.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={0}
                        onClick={togglePassword}
                      >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="form-group password-group">
                    <label htmlFor="confirmPassword">
                      <i className="fas fa-lock"></i> Confirm Password
                    </label>
                    <div className="password-wrapper">
                      <input
                        type={showConfirm ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        autoComplete="new-password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                        tabIndex={0}
                        onClick={toggleConfirm}
                      >
                        <i className={`fas ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
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
                    Sign Up
                  </button>
                </form>
                <div className="form-footer">
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
                <div className="divider">
                  <span>or</span>
                </div>
                <div className="social-login">
                  <button
                    id="googleSignUpBtn"
                    className="btn btn-outline social-btn"
                    type="button"
                    onClick={handleGoogleSignUp}
                  >
                    <i className="fab fa-google"></i> Sign up with Google
                  </button>
                  <button
                    id="facebookSignUpBtn"
                    className="btn btn-outline social-btn"
                    type="button"
                    onClick={handleFacebookSignUp}
                  >
                    <i className="fab fa-facebook-f"></i> Sign up with Facebook
                  </button>
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