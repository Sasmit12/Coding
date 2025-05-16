 // Mobile menu toggle (adds accessibility)
        const hamburger = document.getElementById('hamburgerBtn');
        const navLinks = document.getElementById('navLinks');
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === "Enter" || e.key === " ") {
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
            }
        });

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
            });
            hamburger.addEventListener('keydown', function(e) {
                if (e.key === "Enter" || e.key === " ") {
                    navLinks.classList.toggle('active');
                    this.classList.toggle('active');
                }
            });
        }

 // Smooth scrolling for anchor links (skip if href is just "#")
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const hash = this.getAttribute('href');
                if (hash.length > 1 && document.querySelector(hash)) {
                    e.preventDefault();
                    document.querySelector(hash).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Simple form handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would send this data to your backend
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });

        // Testimonial slider
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
