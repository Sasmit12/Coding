import { useState } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({
    supportEmail: "",
    supportSubject: "",
    supportMessage: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false); // For loading state

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) { // Make async for potential backend call
    e.preventDefault();
    setStatus("");
    setError("");

    if (!form.supportEmail || !form.supportSubject || !form.supportMessage) {
      setError("All fields are required.");
      return;
    }

    setSubmitting(true);

    try {
      // TODO: Implement actual backend submission here.
      // Example: await addDoc(collection(db, "supportTickets"), { ...form, createdAt: serverTimestamp() });
      // Simulate network delay for demo purposes:
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStatus("Thank you! Your message has been sent.");
      setForm({
        supportEmail: "",
        supportSubject: "",
        supportMessage: "",
      });
    } catch (err) {
      console.error("Support submission error:", err);
      setError("Failed to send your message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
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
                <div className="form-message form-success">
                  {status}
                </div>
              )}
              {error && (
                <div className="form-message form-error">
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </main>
      {/* Footer is handled globally by App.jsx */}
    </>
  );
}