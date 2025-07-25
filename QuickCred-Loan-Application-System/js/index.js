// Enhanced Index Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Navigation bar scroll effect
    const navBar = document.querySelector('.nav-bar');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
        
        // Show/hide back to top button based on scroll position
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });
    
    // Back to top button functionality
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add ripple effect to button
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            this.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    }
    
    // Check if we're on the enhanced index page with new sections
    const isEnhancedIndex = document.querySelector('.loan-types-section') !== null;
    
    // Functionality for footer links
    function handleFooterLinks(linkType) {
        switch(linkType) {
            case 'privacy':
                showModal('Privacy Policy', 'QuickCred Privacy Policy\n\nWe are committed to protecting your privacy and personal information. This policy explains how we collect, use, and safeguard your data when you use our services.\n\nData Collection:\n• Personal information (name, email, phone)\n• Financial information for loan processing\n• Usage data to improve our services\n\nData Protection:\n• Bank-level encryption\n• Secure servers\n• Limited access controls\n\nWe never sell your personal information to third parties.');
                break;
            case 'terms':
                showModal('Terms of Service', 'QuickCred Terms of Service\n\nBy using QuickCred services, you agree to these terms:\n\n1. Eligibility: You must be 18+ and a legal resident\n2. Loan Terms: Subject to approval and verification\n3. Interest Rates: As disclosed in loan agreements\n4. Repayment: According to agreed schedule\n5. Fees: Clearly disclosed before acceptance\n\nFor complete terms, please contact our support team.');
                break;
            case 'support':
                showModal('Contact Support', 'Get Help When You Need It\n\nOur customer support team is here to help:\n\n📞 Phone: 1-800-QUICKCRED\n✉️ Email: support@quickcred.com\n💬 Live Chat: Available 24/7\n🕒 Hours: Monday-Friday 8AM-8PM EST\n\nFor urgent matters, please call our 24/7 hotline.');
                break;
        }
    }

    function showModal(title, content) {
        // Create a simple modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80%;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        `;
        
        modalContent.innerHTML = `
            <h2 style="margin-top: 0; color: #667eea; font-family: 'Poppins', sans-serif;">${title}</h2>
            <p style="white-space: pre-line; line-height: 1.6; color: #333; font-family: 'Poppins', sans-serif;">${content}</p>
            <button onclick="this.closest('.modal').remove()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                margin-top: 20px;
                font-family: 'Poppins', sans-serif;
                font-weight: 500;
                transition: transform 0.2s ease;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Close</button>
        `;
        
        modal.appendChild(modalContent);
        modal.className = 'modal';
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.remove();
            }
        });
    }
    
    // Add click handlers for footer links - works with both original and expanded footer
    const footerLinks = document.querySelectorAll('a[href="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const text = this.textContent.toLowerCase().replace(/\s+/g, '');
            if (text.includes('privacy')) {
                e.preventDefault();
                handleFooterLinks('privacy');
            } else if (text.includes('terms')) {
                e.preventDefault();
                handleFooterLinks('terms');
            } else if (text.includes('support') || text.includes('help')) {
                e.preventDefault();
                handleFooterLinks('support');
            }
            // Don't prevent default for section navigation links
        });
    });
    
    // Animated counters for trust indicators
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }
    
    // Initialize counters when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const trustNumbers = entry.target.querySelectorAll('.trust-number');
                trustNumbers.forEach(numberEl => {
                    const text = numberEl.textContent;
                    let target = 0;
                    
                    if (text.includes('50,000+')) {
                        target = 50000;
                        animateCounter(numberEl, target);
                        setTimeout(() => numberEl.textContent = '50,000+', 2000);
                    } else if (text.includes('$500M+')) {
                        target = 500;
                        animateCounter(numberEl, target);
                        setTimeout(() => numberEl.textContent = '$500M+', 2000);
                    } else if (text.includes('4.9/5')) {
                        let current = 0;
                        const targetRating = 4.9;
                        const updateRating = () => {
                            current += 0.1;
                            if (current < targetRating) {
                                numberEl.textContent = current.toFixed(1) + '/5';
                                setTimeout(updateRating, 100);
                            } else {
                                numberEl.textContent = '4.9/5';
                            }
                        };
                        updateRating();
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const trustIndicators = document.querySelector('.trust-indicators');
    if (trustIndicators) {
        observer.observe(trustIndicators);
    }
    
    // Button ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = button.querySelector('.btn-ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        ripple.style.animation = 'none';
        ripple.offsetHeight; // Trigger reflow
        ripple.style.animation = 'ripple 0.6s linear';
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Floating shapes animation enhancement
    function enhanceFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 500);
        });
    }
    
    enhanceFloatingShapes();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Feature items hover effect
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
    });
    
    // Logo glow pulse effect
    const logoGlow = document.querySelector('.logo-glow');
    if (logoGlow) {
        setInterval(() => {
            logoGlow.style.opacity = Math.random() * 0.5 + 0.3;
        }, 2000);
    }
    
    // Dynamic welcome message based on time
    function updateWelcomeMessage() {
        const hour = new Date().getHours();
        const welcomeText = document.querySelector('.gradient-text');
        
        if (welcomeText) {
            let greeting = '';
            if (hour < 12) {
                greeting = 'Good Morning! Welcome to QuickCred';
            } else if (hour < 17) {
                greeting = 'Good Afternoon! Welcome to QuickCred';
            } else {
                greeting = 'Good Evening! Welcome to QuickCred';
            }
            
            // Animate text change
            welcomeText.style.opacity = '0';
            setTimeout(() => {
                welcomeText.textContent = greeting;
                welcomeText.style.opacity = '1';
            }, 300);
        }
    }
    
    // Update welcome message
    setTimeout(updateWelcomeMessage, 1000);
    
    // Add loading animation to buttons
    function addLoadingAnimation(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);
    }
    
    // Enhanced button click handlers
    const loginBtn = document.querySelector('a[href*="login"]');
    const signupBtn = document.querySelector('a[href*="signup"]');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addLoadingAnimation(this);
            setTimeout(() => {
                window.location.href = this.href;
            }, 1500);
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addLoadingAnimation(this);
            setTimeout(() => {
                window.location.href = this.href;
            }, 1500);
        });
    }
    
    // Parallax effect for background shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add typing effect to hero description
    function typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        setTimeout(() => {
            typeWriter(heroDescription, originalText, 30);
        }, 2000);
    }
    
    // Add particle effect on hover
    function createParticles(event) {
        const container = event.currentTarget;
        const rect = container.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #667eea;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.8;
                z-index: 1000;
            `;
            
            particle.style.left = (event.clientX - rect.left) + 'px';
            particle.style.top = (event.clientY - rect.top) + 'px';
            
            container.appendChild(particle);
            
            // Animate particle
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 0.8 
                },
                { 
                    transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }
    
    // Add particle effect to welcome container
    const welcomeContainer = document.querySelector('.welcome-container');
    if (welcomeContainer) {
        welcomeContainer.addEventListener('mousemove', createParticles);
    }
    
    // Handle mobile menu toggle if it exists
    if (isEnhancedIndex) {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        
        if (mobileMenuToggle && mobileMenu) {
            // Open mobile menu
            mobileMenuToggle.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                if (overlay) overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                this.classList.add('active');
                
                // Add ripple effect to button
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Handle swipe to close menu on touch devices
            let touchStartX = 0;
            let touchEndX = 0;
            
            mobileMenu.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            mobileMenu.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) {
                    // Swiped left to right
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, false);
        }
        
        // Testimonial slider functionality
        const testimonialSlider = document.querySelector('.testimonial-slider');
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (testimonialSlider && testimonials.length > 0 && prevBtn && nextBtn) {
            let currentSlide = 0;
            
            function showSlide(index) {
                testimonials.forEach((testimonial, i) => {
                    testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
                });
            }
            
            // Initialize slider
            showSlide(currentSlide);
            
            // Previous button
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
                showSlide(currentSlide);
            });
            
            // Next button
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % testimonials.length;
                showSlide(currentSlide);
            });
            
            // Auto-advance slides every 5 seconds
            setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonials.length;
                showSlide(currentSlide);
            }, 5000);
        }
        
        // Animations on scroll
        const animateOnScroll = () => {
          const elements = document.querySelectorAll('.loan-type-card, .step, .testimonial, .about-us-content, .about-us-image, .about-us-stat, .cta-feature');
          
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate');
              }
            });
          }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
          
          elements.forEach(element => {
            observer.observe(element);
          });
          
          // Also handle any elements with the old animation class for backward compatibility
          const oldAnimationElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
          oldAnimationElements.forEach(element => {
            observer.observe(element);
            element.classList.add('animate-on-scroll');
          });
        };
        
        animateOnScroll();
        
        // Loan calculator functionality
        const loanAmountInput = document.querySelector('#loan-amount');
        const interestRateInput = document.querySelector('#interest-rate');
        const loanTermInput = document.querySelector('#loan-term');
        const calculateBtn = document.querySelector('#calculate-loan');
        const monthlyPaymentOutput = document.querySelector('#monthly-payment');
        const totalInterestOutput = document.querySelector('#total-interest');
        const totalAmountOutput = document.querySelector('#total-amount');
        
        if (loanAmountInput && interestRateInput && loanTermInput && calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                const principal = parseFloat(loanAmountInput.value);
                const interestRate = parseFloat(interestRateInput.value) / 100 / 12; // Monthly interest rate
                const loanTerm = parseFloat(loanTermInput.value) * 12; // Months
                
                if (principal > 0 && interestRate > 0 && loanTerm > 0) {
                    // Calculate monthly payment
                    const monthlyPayment = principal * interestRate * Math.pow(1 + interestRate, loanTerm) / (Math.pow(1 + interestRate, loanTerm) - 1);
                    
                    // Calculate total payment and interest
                    const totalPayment = monthlyPayment * loanTerm;
                    const totalInterest = totalPayment - principal;
                    
                    // Display results
                    if (monthlyPaymentOutput) monthlyPaymentOutput.textContent = '$' + monthlyPayment.toFixed(2);
                    if (totalInterestOutput) totalInterestOutput.textContent = '$' + totalInterest.toFixed(2);
                    if (totalAmountOutput) totalAmountOutput.textContent = '$' + totalPayment.toFixed(2);
                    
                    // Animate the results
                    [monthlyPaymentOutput, totalInterestOutput, totalAmountOutput].forEach(el => {
                        if (el) {
                            el.style.animation = 'none';
                            el.offsetHeight; // Trigger reflow
                            el.style.animation = 'pulse 0.5s';
                        }
                    });
                }
            });
        }
    }
    
    // Initialize device preview toggle
function initDevicePreview() {
    const deviceToggleBtns = document.querySelectorAll('.device-toggle-btn');
    const body = document.body;
    
    if (deviceToggleBtns.length > 0) {
        // Set desktop as default active
        const desktopBtn = document.querySelector('.device-toggle-btn[data-device="desktop"]');
        if (desktopBtn) {
            desktopBtn.classList.add('active');
        }
        
        deviceToggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const device = this.getAttribute('data-device');
                
                // Remove all active classes
                deviceToggleBtns.forEach(b => b.classList.remove('active'));
                
                // Remove all preview classes from body
                body.classList.remove('mobile-preview', 'tablet-preview');
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Add appropriate class to body based on device
                if (device === 'mobile') {
                    body.classList.add('mobile-preview');
                } else if (device === 'tablet') {
                    body.classList.add('tablet-preview');
                }
                
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Call all initializations
initDevicePreview();
    
    document.querySelectorAll('.feature-item').forEach((item, idx) => {
        const tooltips = [
            "Lightning-fast loan approval process.",
            "Your data is protected with advanced encryption.",
            "Get the best rates tailored for you."
        ];
        item.setAttribute('data-tooltip', tooltips[idx]);
    });
    
    // FAQ accordion functionality
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.parentElement;
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        item.classList.toggle('active');
    });
});

    console.log('QuickCred Index Page Enhanced! 🚀');
});
