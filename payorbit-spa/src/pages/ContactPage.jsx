import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  function handleClose() {
    setSubmitted(false);
  }

  return (
    <>
      <main>
        <section className="dashboard-section" style={{ background: "var(--background-light)" }}>
          <div className="container">
            <div
              className="dashboard-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 38,
              }}
            >
              <div>
                <h1 style={{ marginBottom: "0.2em" }}>Contact Us</h1>
                <p style={{ color: "var(--text-color-light)" }}>
                  We're here to help! Reach out for support, feedback, or partnership.
                </p>
              </div>
              <div className="user-dropdown" style={{ position: "relative" }}>
                <button className="btn btn-outline" id="adminDropdownBtn">
                  <i className="fas fa-user-shield"></i> Admin <i className="fas fa-caret-down"></i>
                </button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div style={{ flex: 2, minWidth: 300 }}>
                <div
                  style={{
                    background: "var(--light-color)",
                    padding: "32px 28px 28px 28px",
                    borderRadius: "var(--border-radius)",
                    boxShadow: "var(--box-shadow)",
                  }}
                >
                  <h3 style={{ marginBottom: 18 }}>Send us a message</h3>
                  <form id="contactForm" style={{ marginBottom: 18 }} onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">
                        <i className="fas fa-user"></i> Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
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
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">
                        <i className="fas fa-tag"></i> Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">
                        <i className="fas fa-comment-dots"></i> Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Type your message here..."
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-large">
                      Send Message
                    </button>
                  </form>
                  {submitted && (
                    <div
                      id="contactResult"
                      style={{
                        background: "var(--background-darker)",
                        padding: "22px 18px",
                        marginTop: 14,
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      <h4 style={{ marginBottom: 10 }}>Thank you for reaching out!</h4>
                      <p>Your message has been sent. We'll get back to you soon.</p>
                      <button className="btn btn-outline" onClick={handleClose}>
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="dashboard-sidebar" style={{ flex: 1, minWidth: 260 }}>
                <div
                  style={{
                    background: "var(--light-color)",
                    padding: 24,
                    borderRadius: "var(--border-radius)",
                    boxShadow: "var(--box-shadow)",
                    marginBottom: 28,
                  }}
                >
                  <h3 style={{ marginBottom: 14 }}>Contact Information</h3>
                  <ul style={{ paddingLeft: 0, listStyle: "none", fontSize: 15 }}>
                    <li style={{ marginBottom: 10 }}>
                      <i className="fas fa-envelope"></i> support@payorbit.com
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <i className="fas fa-phone"></i> +91 98765 43210
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <i className="fas fa-map-marker-alt"></i> Mumbai, India
                    </li>
                  </ul>
                </div>
                <div
                  style={{
                    background: "var(--background-light)",
                    padding: 20,
                    borderRadius: "var(--border-radius)",
                    boxShadow: "var(--box-shadow)",
                  }}
                >
                  <h4 style={{ marginBottom: 10 }}>Our Commitment</h4>
                  <p style={{ fontSize: "0.97rem", marginBottom: 12 }}>
                    We respond to all queries within 24-48 hours on business days.
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