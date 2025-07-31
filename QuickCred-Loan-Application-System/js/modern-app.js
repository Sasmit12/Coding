// QuickCred - Modern Application JavaScript
// Version: 3.0 - Complete Redesign

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initLoanCalculator();
  initScrollEffects();
  initContactForm();
  initAnimations();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.navbar-link');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Active link highlighting
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Smooth scroll to section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      navbarMenu.classList.remove('active');
    });
  });

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });
  }

  // Update active link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// Loan Calculator functionality
function initLoanCalculator() {
  const loanAmountSlider = document.getElementById('loanAmount');
  const loanTermSelect = document.getElementById('loanTerm');
  const interestRateSlider = document.getElementById('interestRate');
  const amountValue = document.getElementById('amountValue');
  const rateValue = document.getElementById('rateValue');
  const monthlyPayment = document.getElementById('monthlyPayment');
  const totalInterest = document.getElementById('totalInterest');

  if (!loanAmountSlider) return;

  function updateCalculator() {
    const principal = parseFloat(loanAmountSlider.value);
    const rate = parseFloat(interestRateSlider.value) / 100 / 12;
    const term = parseInt(loanTermSelect.value) * 12;

    // Update display values
    amountValue.textContent = principal.toLocaleString();
    rateValue.textContent = parseFloat(interestRateSlider.value).toFixed(1);

    // Calculate monthly payment
    const monthlyPaymentAmount = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPaymentAmount * term;
    const totalInterestAmount = totalPayment - principal;

    // Update results
    monthlyPayment.textContent = '$' + Math.round(monthlyPaymentAmount).toLocaleString();
    totalInterest.textContent = Math.round(totalInterestAmount).toLocaleString();
  }

  // Event listeners
  loanAmountSlider.addEventListener('input', updateCalculator);
  loanTermSelect.addEventListener('change', updateCalculator);
  interestRateSlider.addEventListener('input', updateCalculator);

  // Initial calculation
  updateCalculator();
}

// Scroll effects and animations
function initScrollEffects() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.card, .section-header, .hero-content');
  animateElements.forEach(el => observer.observe(el));

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.querySelector('.contact-form form');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Show success message
      showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      
      // Reset form
      this.reset();
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Animation utilities
function initAnimations() {
  // Add smooth hover effects to cards
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Button ripple effect
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Utility functions
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? 'var(--success-500)' : 'var(--primary-500)'};
    color: white;
    border-radius: var(--rounded-lg);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Loading state management
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Add entrance animations
  const heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Initialize hero content animation
document.addEventListener('DOMContentLoaded', function() {
  const heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
  });
});

// Performance optimization
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload critical images
    const criticalImages = [
      'assets/QuickCred_logo1.png'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  });
}

// Export functions for external use
window.QuickCred = {
  showNotification,
  initLoanCalculator,
  initNavigation
};
