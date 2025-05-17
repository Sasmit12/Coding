console.log("Firebase apps:", firebase.apps); 
// Should show an array with one app

// Smooth scrolling, testimonial slider, and contact form handling for landing page
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider logic
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let activeIndex = 0;
    function setActiveTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        activeIndex = index;
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => setActiveTestimonial(index));
    });

    // Contact form fake submit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});