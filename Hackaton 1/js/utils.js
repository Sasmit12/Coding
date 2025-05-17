// Mobile menu toggle with accessibility
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        function toggleMenu() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        }
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === "Enter" || e.key === " ") {
                toggleMenu();
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
});