// src/js/landing.js

// --- Testimonial Slider Logic ---

/**
 * Given the total number of testimonials, returns the next index for the slider.
 * @param {number} currentIndex
 * @param {number} total
 * @returns {number}
 */
export function getNextTestimonialIndex(currentIndex, total) {
  return (currentIndex + 1) % total;
}

/**
 * Returns a new array indicating which testimonial (by index) is active.
 * @param {number} total
 * @param {number} activeIndex
 * @returns {boolean[]}
 */
export function getTestimonialActiveStates(total, activeIndex) {
  return Array.from({ length: total }, (_, i) => i === activeIndex);
}

// --- Contact Form Fake Submit ---

/**
 * Simulates contact form submission (demo only).
 * @returns {string} Message to show the user.
 */
export function handleContactFormFakeSubmit() {
  return 'Thank you for your message! We will get back to you soon.';
}