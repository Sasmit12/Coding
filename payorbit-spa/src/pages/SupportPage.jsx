import { useState } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({
    supportEmail: "",
    supportSubject: "",
    supportMessage: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setError("");
    if (!form.supportEmail || !form.supportSubject || !form.supportMessage) {
      setError("All fields are required.");
      return;
    }
    // Here, you would send the message to your support backend.
    setStatus("Thank you! Your message has been sent.");
    setForm({
      supportEmail: "",
      supportSubject: "",
      supportMessage: "",
    });
  }

  return (
    <>
      <main>
        <section className="dashboard-section">
          <div className="container">
            <h1>Support</h1>
            <p>Need help? Reach out to our support team.</p>
            <form className="support-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="supportEmail">Your Email</label>
                <input
                  type="email"
                  id="supportEmail"
                  name="supportEmail"
                  value={form.supportEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="supportSubject">Subject</label>
                <input
                  type="text"
                  id="supportSubject"
                  name="supportSubject"
                  value={form.supportSubject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="supportMessage">Message</label>
                <textarea
                  id="supportMessage"
                  name="supportMessage"
                  rows={4}
                  value={form.supportMessage}
                  onChange={handleChange}
                  required
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
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
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