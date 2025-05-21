import { useState } from "react";

const testimonials = [
  {
    content:
      '"PayOrbit reduced our payment processing time by 75% while eliminating errors. Our mentors are happier with the transparency and our admin team has more time for strategic work."',
    img: "/assets/testimonial-1.png",
    alt: "Sarah Johnson",
    name: "Sarah Johnson",
    title: "Operations Director, EduLearn Pro",
  },
  {
    content:
      '"As a mentor working with multiple platforms, PayOrbit makes it easy to track my sessions and payments in one place. The receipt generation feature is a lifesaver during tax season!"',
    img: "/assets/testimonial-2.png",
    alt: "David Chen",
    name: "David Chen",
    title: "Senior Mentor, CodePath Academy",
  },
];

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Join hundreds of satisfied education platforms</p>
        </div>
        <div className="testimonial-slider" id="testimonialSlider">
          {testimonials.map((t, idx) => (
            <div
              className={`testimonial-card${activeIdx === idx ? " active" : ""}`}
              key={t.name}
              aria-hidden={activeIdx !== idx}
            >
              <div className="testimonial-content">
                <p>{t.content}</p>
              </div>
              <div className="testimonial-author">
                <img src={t.img} alt={t.alt} />
                <div className="author-info">
                  <h4>{t.name}</h4>
                  <p>{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, idx) => (
            <span
              className={`dot${activeIdx === idx ? " active" : ""}`}
              data-index={idx}
              key={idx}
              onClick={() => setActiveIdx(idx)}
              tabIndex={0}
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && setActiveIdx(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              role="button"
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}