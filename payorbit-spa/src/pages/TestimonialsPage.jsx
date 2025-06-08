import { useState } from "react";

export default function TestimonialsPage() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    testimonial: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [testimonials, setTestimonials] = useState([
    {
      name: "Jane Doe",
      role: "Mentor",
      testimonial:
        "PayOrbit made my payment processing seamless and transparent. Highly recommended!",
      rating: 5,
    },
    {
      name: "John Smith",
      role: "Learner",
      testimonial:
        "The mentors are top-notch and the simulation tools helped me understand my payouts.",
      rating: 4,
    },
  ]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value, 10) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTestimonials((prev) => [
      { ...form },
      ...prev,
    ]);
    setSubmitted(true);
    setForm({
      name: "",
      role: "",
      testimonial: "",
      rating: 5,
    });
  }

  function handleClose() {
    setSubmitted(false);
  }

  return (
    <>
      <main>
        {/* Example: Apply a class for section styling instead of inline style */}
        <section className="dashboard-section testimonials-page-section">
          <div className="container">
            <div className="dashboard-header testimonials-page-header">
              <div>
                <h1 style={{ marginBottom: "0.2em" }}>Testimonials</h1>
                <p style={{ color: "var(--text-color-light)" }}>
                  Share your experience or read what others say about PayOrbit.
                </p>
              </div>
              {/* Consider removing this admin dropdown if not applicable to this public page */}
              {/* <div className="user-dropdown" style={{ position: "relative" }}>
                <button className="btn btn-outline" id="adminDropdownBtn">
                  <i className="fas fa-user-shield"></i> Admin <i className="fas fa-caret-down"></i>
                </button>
              </div> */}
            </div>
            <div className="testimonials-page-content-wrapper">
              <div className="testimonials-form-container">
                <div className="card testimonials-form-card">
                  <h3 style={{ marginBottom: 18 }}>Share your Testimonial</h3>
                  <form id="testimonialForm" style={{ marginBottom: 18 }} onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">
                        <i className="fas fa-user"></i> Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. Jane Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">
                        <i className="fas fa-briefcase"></i> Your Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        placeholder="e.g. Mentor, Learner"
                        value={form.role}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="testimonial">
                        <i className="fas fa-comments"></i> Testimonial
                      </label>
                      <textarea
                        id="testimonial"
                        name="testimonial"
                        placeholder="Share your experience..."
                        value={form.testimonial}
                        onChange={handleChange}
                        rows={3}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="rating">
                        <i className="fas fa-star"></i> Rating
                      </label>
                      <select
                        id="rating"
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        style={{ width: 60 }}
                        required
                      >
                        {[5, 4, 3, 2, 1].map((star) => (
                          <option key={star} value={star}>
                            {star}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-large">
                      Submit
                    </button>
                  </form>
                  {submitted && (
                    <div id="testimonialResult" className="testimonial-result-message">
                      <h4 style={{ marginBottom: 10 }}>Thank you for your feedback!</h4>
                      <p>Your testimonial has been submitted.</p>
                      <button className="btn btn-outline" onClick={handleClose}>
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="dashboard-sidebar testimonials-sidebar">
                <div className="card testimonials-list-card">
                  <h3 style={{ marginBottom: 14 }}>Recent Testimonials</h3>
                  <div className="testimonials-list-scroll">
                    {testimonials.map((item, idx) => (
                      <div
                        key={idx}
                        className="testimonial-item-card"
                      >
                        <p style={{ fontStyle: "italic", marginBottom: 6 }}>
                          "{item.testimonial}"
                        </p>
                        <div style={{ fontSize: 13, color: "var(--text-color-light)" }}>
                          <span>
                            <i className="fas fa-user"></i> {item.name} ({item.role})
                          </span>
                          <span style={{ float: "right" }}>
                            {[...Array(item.rating)].map((_, i) => (
                              <i key={i} className="fas fa-star" style={{ color: "#FFD700" }}></i>
                            ))}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card testimonials-info-card">
                  <h4 style={{ marginBottom: 10 }}>Why Testimonials Matter?</h4>
                  <p style={{ fontSize: "0.97rem", marginBottom: 12 }}>
                    Your feedback helps us improve and inspires others to join our platform!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer is handled globally by App.jsx, so it's removed from here */}
    </>
  );
}