// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section[id]');
const header = document.querySelector('.header');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    const headerHeight = header.offsetHeight;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Sticky Header on Scroll
let lastScroll = 0;
function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Neobrutalism style - keep border consistent
    // No shadow changes needed for neobrutalism
    
    lastScroll = currentScroll;
    updateActiveNav();
}

window.addEventListener('scroll', handleScroll);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Services Data (embedded to avoid CORS issues with file:// protocol)
// Use window object to make it globally accessible
if (typeof window.servicesData === 'undefined') {
    window.servicesData = {
  "services": [
    {
      "id": "website-development",
      "icon": "🌐",
      "title": "Website and Application Development",
      "shortDescription": "Custom website and application development solutions tailored to your business needs.",
      "color": "primary",
      "details": {
        "description": "We provide custom website and application development solutions tailored to your business needs, with modern design and exceptional user experience that helps you attract customers and increase sales.",
        "features": [
          "Professional website design",
          "E-commerce stores",
          "Android & iOS applications",
          "Latest technologies",
          "Technical support after delivery"
        ],
        "benefits": [
          "Modern design and exceptional user experience",
          "Help attract customers and increase sales",
          "Responsive and mobile-friendly solutions",
          "Custom solutions tailored to your business"
        ]
      }
    },
    {
      "id": "it-solutions",
      "icon": "💻",
      "title": "IT, Server, and Artificial Intelligence Solutions",
      "shortDescription": "Comprehensive IT infrastructure and intelligent systems to optimize your business operations.",
      "color": "blue",
      "details": {
        "description": "Network and server management, hosting and cloud computing, backup and data recovery, customer data analysis, and AI solutions. We provide comprehensive IT infrastructure and intelligent systems to optimize your business operations.",
        "features": [
          "Network and server management",
          "Hosting and cloud computing",
          "Backup and data recovery",
          "Customer data analysis",
          "AI solutions"
        ],
        "benefits": [
          "Optimize business operations",
          "Secure and reliable infrastructure",
          "Scalable cloud solutions",
          "Data-driven insights"
        ]
      }
    },
    {
      "id": "digital-marketing",
      "icon": "📈",
      "title": "Digital Marketing",
      "shortDescription": "Build a strong and sustainable digital presence that drives growth and engagement.",
      "color": "green",
      "details": {
        "description": "Social media management, content creation, paid advertising, SEO, results analysis, digital identity building, and digital transformation. We help you build a strong and sustainable digital presence that drives growth and engagement.",
        "features": [
          "Social media management",
          "Content creation",
          "Paid advertising",
          "SEO optimization",
          "Results analysis",
          "Digital identity building",
          "Digital transformation"
        ],
        "benefits": [
          "Increase brand visibility",
          "Drive growth and engagement",
          "Build strong digital presence",
          "Data-driven marketing strategies"
        ]
      }
    },
    {
      "id": "financial-services",
      "icon": "💰",
      "title": "Financial and Accounting Services",
      "shortDescription": "Professional financial services to help you maintain accurate records and make informed decisions.",
      "color": "pink",
      "details": {
        "description": "Auditing and review, financial statement preparation, cost accounting, budget management and cash flow management. Professional financial services to help you maintain accurate records and make informed business decisions.",
        "features": [
          "Auditing and review",
          "Financial statement preparation",
          "Cost accounting",
          "Budget management",
          "Cash flow management"
        ],
        "benefits": [
          "Maintain accurate financial records",
          "Make informed business decisions",
          "Compliance with regulations",
          "Better financial planning"
        ]
      }
    },
    {
      "id": "legal-consulting",
      "icon": "⚖️",
      "title": "Legal Consulting",
      "shortDescription": "Expert legal guidance to protect your business interests and ensure compliance.",
      "color": "yellow",
      "details": {
        "description": "Contract drafting, agreement review, specialized legal consultations with complete confidentiality. Expert legal guidance to protect your business interests and ensure compliance with regulations.",
        "features": [
          "Contract drafting",
          "Agreement review",
          "Specialized legal consultations",
          "Complete confidentiality"
        ],
        "benefits": [
          "Protect business interests",
          "Ensure compliance with regulations",
          "Expert legal guidance",
          "Complete confidentiality"
        ]
      }
    }
  ]
};
}

// Load Services from embedded data
function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    
    if (!servicesGrid) return;
    
    const data = window.servicesData;
    if (!data || !data.services) return;
    
    servicesGrid.innerHTML = '';
    
    data.services.forEach(service => {
        const serviceCard = document.createElement('article');
        serviceCard.className = `service__card service__card--${service.color}`;
        serviceCard.setAttribute('data-service-id', service.id);
        
        serviceCard.innerHTML = `
            <div class="service__icon">${service.icon}</div>
            <h3 class="service__title">${service.title}</h3>
            <p class="service__description">${service.shortDescription}</p>
            <a href="service.html?id=${service.id}" class="btn btn--service">Learn More</a>
        `;
        
        servicesGrid.appendChild(serviceCard);
        
        // Observe each new card for animation
        observer.observe(serviceCard);
    });
}

// Observe elements for animation (non-service elements)
const animateElements = document.querySelectorAll('.feature__item, .about__content, .cta__content');
animateElements.forEach(el => {
    observer.observe(el);
});

// Load services on page load
if (document.getElementById('services-grid')) {
    loadServices();
}

// Initialize active nav on page load
updateActiveNav();

// Handle hash on page load
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            setTimeout(() => {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const fullname = formData.get('fullname');
        const contact = formData.get('contact');
        const details = formData.get('details');
        
        // Basic validation
        if (!fullname || !contact || !details) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you! Your message has been sent. We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const star = document.querySelector('.star-of-life-icon');
  
  // Define how much to rotate per pixel scrolled. 
  // 0.5 means 1 pixel scroll = 0.5 degrees rotation.
  const rotationFactor = 0.5; 

  window.addEventListener('scroll', () => {
    // 1. Get the current vertical scroll position
    const scrollPosition = window.scrollY;
    
    // 2. Calculate the rotation angle
    // The modulo operation (%) ensures the degree value wraps around (0-360) for cleaner numbers, though CSS handles this anyway.
    const rotationAngle = (scrollPosition * rotationFactor) % 360; 
    
    // 3. Apply the rotation via the transform style
    star.style.transform = `rotate(${rotationAngle}deg)`;
  });
});

// Add this function to animate hero content on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero content immediately on page load
    const heroTitle = document.querySelector('.hero__content h1');
    const heroText = document.querySelector('.hero__content p');
    const heroImage = document.querySelector('.hero__image');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add('visible');
        }, 100);
    }
    
    if (heroText) {
        setTimeout(() => {
            heroText.classList.add('visible');
        }, 300);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('visible');
            
            // Add continuous floating animation after initial animation
            setTimeout(() => {
                const heroImgElement = heroImage.querySelector('img');
                if (heroImgElement) {
                    heroImgElement.style.animation = 'float 3s ease-in-out infinite';
                }
            }, 1200);
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const shapeContainer = document.querySelector('.hero__shape-container');

    if (!shapeContainer) return;

    // --- Mouse Follow Effect Setup ---
    
    // REDUCED FACTOR: 0.02 means the shape moves only 2% of the mouse's distance 
    // from the center, making the effect much more subtle.
    const movementFactor = 0.02; 

    window.addEventListener('mousemove', (e) => {
        // Get the center of the window
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate the mouse distance from the center
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate the desired translation (movement)
        const translateX = mouseX * movementFactor;
        const translateY = mouseY * movementFactor;
        
        // Apply the translation to the shape container
        shapeContainer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const heroSvgContainer = document.querySelector('.hero-svg-container');
    
    if (heroSvgContainer) {
        // Get the SVG paths for animation - targeting both hero-curve_1 and hero-curve_2
        const heroCurve1 = heroSvgContainer.querySelector('.hero-curve_1');
        const heroCurve2 = heroSvgContainer.querySelector('.hero-curve_2');
        
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {                
                if (entry.isIntersecting) {                
                    // Add visible class to container for opacity/transform animation
                    heroSvgContainer.classList.add('visible');
                    
                    // Animate first path with 50 strokeDashoffset
                    if (heroCurve1) {
                        heroCurve1.style.strokeDashoffset = '50';
                        heroCurve1.getBoundingClientRect(); // Trigger reflow
                        setTimeout(() => {
                            heroCurve1.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                            heroCurve1.style.strokeDashoffset = '0';
                        }, 0);
                    }
                    
                    // Animate second path with 500 strokeDashoffset
                    if (heroCurve2) {
                        heroCurve2.style.strokeDashoffset = '500';
                        heroCurve2.getBoundingClientRect(); // Trigger reflow
                        setTimeout(() => {
                            heroCurve2.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                            heroCurve2.style.strokeDashoffset = '0';
                        }, 300); // Slight delay for second path
                    }
                } else {                    
                    // Remove visible class to reset
                    heroSvgContainer.classList.remove('visible');
                    
                    // Reset first path
                    if (heroCurve1) {
                        heroCurve1.style.transition = 'none';
                        heroCurve1.style.strokeDashoffset = '50';
                    }
                    
                    // Reset second path
                    if (heroCurve2) {
                        heroCurve2.style.transition = 'none';
                        heroCurve2.style.strokeDashoffset = '500';
                    }
                }
            });
        }, {
            threshold: 0.1 // Lower threshold to trigger sooner
        });
        
        heroObserver.observe(heroSvgContainer);
    }
    
    // Keep your existing about section observer
    const aboutSection = document.querySelector('.about.section');
    const aboutSvgContainer = document.querySelector('.about-svg-container');
    
    if (aboutSection && aboutSvgContainer) {        
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {                
                if (entry.isIntersecting) {
                    aboutSvgContainer.classList.add('visible');
                } else {
                    aboutSvgContainer.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.3
        });
        
        aboutObserver.observe(aboutSection);
    }
});
