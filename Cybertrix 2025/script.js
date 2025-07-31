// CYBERTRIX 2025 - Magical JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all magical features
    initializeLoading();
    initializeNavigation();
    initializeCountdown();
    initializeQuotesCarousel();
    initializeScrollEffects();
    initializeEventCards();
    initializeRegistrationForm();
    initializeContactForm();
    initializeBackToTop();
    initializeMagicalEffects();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 1500);
    });
}

// Navigation
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effects
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background blur on scroll
        if (scrollTop > 100) {
            navbar.style.background = 'linear-gradient(135deg, hsl(210, 15%, 12%, 0.98), hsl(210, 12%, 8%, 0.95))';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, hsl(210, 15%, 12%, 0.95), hsl(210, 12%, 8%, 0.9))';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        lastScrollTop = scrollTop;
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

// Countdown Timer
function initializeCountdown() {
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    // Set the target date (March 15, 2025)
    const targetDate = new Date('March 15, 2025 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (countdownElements.days) countdownElements.days.textContent = String(days).padStart(2, '0');
            if (countdownElements.hours) countdownElements.hours.textContent = String(hours).padStart(2, '0');
            if (countdownElements.minutes) countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
            if (countdownElements.seconds) countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
        } else {
            // Event has started
            if (countdownElements.days) countdownElements.days.textContent = '00';
            if (countdownElements.hours) countdownElements.hours.textContent = '00';
            if (countdownElements.minutes) countdownElements.minutes.textContent = '00';
            if (countdownElements.seconds) countdownElements.seconds.textContent = '00';
        }
    }

    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Quotes Carousel
function initializeQuotesCarousel() {
    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;

    if (quotes.length === 0) return;

    function showNextQuote() {
        quotes[currentQuote].classList.remove('active');
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].classList.add('active');
    }

    // Change quote every 5 seconds
    setInterval(showNextQuote, 5000);
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe all magical cards and sections
    const elementsToAnimate = document.querySelectorAll('.magical-card, .about-card, .route-card, .stat-card, .coordinator-card, .institution-info');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Event Cards Hover Effects
function initializeEventCards() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            addSparkleEffect(card);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Registration Form
function initializeRegistrationForm() {
    const registrationForm = document.getElementById('registration-form');
    const idCardTemplate = document.getElementById('id-card-template');

    if (!registrationForm) return;

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registrationForm);
        const fullName = formData.get('fullName');
        const college = formData.get('college');
        const department = formData.get('department');
        const events = formData.getAll('events');
        
        // Generate registration number
        const regNumber = generateRegistrationNumber();
        
        // Populate ID card
        populateIdCard(fullName, college, department, events, regNumber);
        
        // Show success message
        showMagicalAlert('Registration Successful! 🎉', 'Your magical ID card has been generated. Please download it for the event.');
        
        // Reset form
        registrationForm.reset();
    });

    // Form validation with magical effects
    const inputs = registrationForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            input.style.boxShadow = '0 0 20px hsl(45, 65%, 55%, 0.4)';
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
            input.style.boxShadow = '';
        });

        input.addEventListener('input', () => {
            if (input.value) {
                input.style.borderColor = 'hsl(120, 50%, 50%)';
            } else {
                input.style.borderColor = '';
            }
        });
    });
}

function generateRegistrationNumber() {
    const prefix = 'CYBRX';
    const year = '25';
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}-${year}-${random}`;
}

function populateIdCard(name, college, department, events, regNumber) {
    const idCard = document.getElementById('id-card-template');
    
    if (!idCard) return;

    // Populate card fields
    document.getElementById('card-name').textContent = name;
    document.getElementById('card-college').textContent = college;
    document.getElementById('card-department').textContent = department;
    document.getElementById('card-reg-no').textContent = regNumber;
    
    // Format events
    const eventNames = {
        'paper-presentation': 'Technical Paper Presentation',
        'coding-contest': 'Coding Championship',
        'web-design': 'Web Design Wizardry',
        'hackathon': '24-Hour Hackathon',
        'ai-challenge': 'AI Magic Challenge',
        'cyber-security': 'Cybersecurity Quest'
    };
    
    const formattedEvents = events.map(event => eventNames[event] || event).join(', ');
    document.getElementById('card-events').textContent = formattedEvents;
    
    // Show and download ID card
    idCard.style.display = 'block';
    
    // Create download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Magical ID Card';
    downloadBtn.className = 'spell-button';
    downloadBtn.style.marginTop = '1rem';
    downloadBtn.addEventListener('click', () => downloadIdCard(idCard));
    
    idCard.appendChild(downloadBtn);
    
    // Scroll to ID card
    idCard.scrollIntoView({ behavior: 'smooth' });
}

function downloadIdCard(idCard) {
    // Create a canvas to convert the ID card to image
    html2canvas(idCard, {
        scale: 2,
        backgroundColor: null,
        useCORS: true
    }).then(canvas => {
        // Create download link
        const link = document.createElement('a');
        link.download = 'CYBERTRIX-2025-ID-Card.png';
        link.href = canvas.toDataURL();
        link.click();
    }).catch(error => {
        console.log('Download feature requires html2canvas library');
        // Fallback: open print dialog
        window.print();
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simulate owl delivery animation
        const owlDelivery = document.querySelector('.owl-delivery');
        if (owlDelivery) {
            owlDelivery.style.animation = 'float 0.5s ease-in-out infinite';
            owlDelivery.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                owlDelivery.style.animation = 'float 4s ease-in-out infinite';
                owlDelivery.style.transform = 'scale(1)';
            }, 2000);
        }
        
        // Show success message
        showMagicalAlert('Message Sent! 🦉', 'Your magical message has been delivered via owl post. We will respond soon!');
        
        // Reset form
        contactForm.reset();
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add magical effect
        addSparkleEffect(backToTopBtn);
    });
}

// Magical Effects
function initializeMagicalEffects() {
    // Add sparkle effects to buttons
    const spellButtons = document.querySelectorAll('.spell-button');
    spellButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            addSparkleEffect(button);
            createMagicalRipple(e);
        });
    });

    // Add floating animation to various elements
    const floatingElements = document.querySelectorAll('.icon, .stat-icon, .event-icon');
    floatingElements.forEach((element, index) => {
        element.style.animation = `float ${3 + (index % 3)}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.2}s`;
    });

    // Create magical particles in background
    createMagicalParticles();
}

// Utility Functions

function addSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-effect';
    sparkle.style.position = 'fixed';
    sparkle.style.left = '50%';
    sparkle.style.top = '50%';
    sparkle.style.width = '100px';
    sparkle.style.height = '100px';
    sparkle.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.transform = 'translate(-50%, -50%)';
    sparkle.style.animation = 'sparkle 2s ease-in-out forwards';
    sparkle.style.zIndex = '9999';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        document.body.removeChild(sparkle);
    }, 2000);
}

function createMagicalRipple(event) {
    const ripple = document.createElement('div');
    const rect = event.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    event.target.style.position = 'relative';
    event.target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.transform = 'scale(2)';
        ripple.style.opacity = '0';
    }, 50);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function createMagicalParticles() {
    function createParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-20px';
        particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.animation = `fall ${Math.random() * 3 + 5}s linear forwards`;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles occasionally
    setInterval(createParticle, 3000);
}

function showMagicalAlert(title, message) {
    // Create custom magical alert
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    alertDiv.style.background = 'var(--gradient-parchment)';
    alertDiv.style.color = 'hsl(210, 15%, 20%)';
    alertDiv.style.border = '3px solid hsl(45, 30%, 60%)';
    alertDiv.style.borderRadius = '15px';
    alertDiv.style.padding = '2rem';
    alertDiv.style.maxWidth = '400px';
    alertDiv.style.textAlign = 'center';
    alertDiv.style.zIndex = '10000';
    alertDiv.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.5)';
    alertDiv.style.animation = 'fadeInUp 0.5s ease-out';
    
    alertDiv.innerHTML = `
        <h3 style="font-family: 'Uncial Antiqua', cursive; margin-bottom: 1rem; color: hsl(45, 65%, 35%);">${title}</h3>
        <p style="font-family: 'MedievalSharp', cursive; margin-bottom: 1.5rem; line-height: 1.5;">${message}</p>
        <button class="spell-button" onclick="this.parentElement.remove()">Magical!</button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 500);
        }
    }, 5000);
}

// Add CSS animations for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0.8;
        }
        100% {
            transform: translateY(100vh) translateX(20px);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    .nav-link.active {
        color: var(--primary);
        text-shadow: 0 0 10px var(--primary);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);