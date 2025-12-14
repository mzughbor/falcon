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

