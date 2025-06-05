import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState({ submitting: false, success: "", error: "" });

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submit and send to Firestore
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ submitting: true, success: "", error: "" });
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...form,
        timestamp: serverTimestamp(),
      });
      setStatus({ submitting: false, success: "Message sent! We will get back to you soon.", error: "" });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus({ submitting: false, success: "", error: "Failed to send message. Please try again." });
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Have questions? Our team is here to help.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-form">
            <form id="contactForm" onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" value={form.company} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={status.submitting}>
                {status.submitting ? "Sending..." : "Send Message"}
              </button>
              {status.success && <div style={{ color: "green", marginTop: 10 }}>{status.success}</div>}
              {status.error && <div style={{ color: "red", marginTop: 10 }}>{status.error}</div>}
            </form>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-content">
                <h4>Email</h4>
                <p>support@payorbit.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FaPhoneAlt />
              </div>
              <div className="info-content">
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <h4>Office</h4>
                <p>123 Innovation Drive<br />San Francisco, CA 94103</p>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}