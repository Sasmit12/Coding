export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Join hundreds of satisfied education platforms</p>
        </div>
        <div className="testimonial-slider" id="testimonialSlider">
          <div className="testimonial-card active">
            <div className="testimonial-content">
              <p>
                "PayOrbit reduced our payment processing time by 75% while eliminating errors. Our mentors are happier with the transparency and our admin team has more time for strategic work."
              </p>
            </div>
            <div className="testimonial-author">
              <img src="/assets/testimonial-1.png" alt="Sarah Johnson" />
              <div className="author-info">
                <h4>Sarah Johnson</h4>
                <p>Operations Director, EduLearn Pro</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "As a mentor working with multiple platforms, PayOrbit makes it easy to track my sessions and payments in one place. The receipt generation feature is a lifesaver during tax season!"
              </p>
            </div>
            <div className="testimonial-author">
              <img src="/assets/testimonial-2.png" alt="David Chen" />
              <div className="author-info">
                <h4>David Chen</h4>
                <p>Senior Mentor, CodePath Academy</p>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-dots">
          <span className="dot active" data-index="0"></span>
          <span className="dot" data-index="1"></span>
        </div>
      </div>
    </section>
  );
}