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

    // Special handling for home section (top of page)
    if (scrollY === 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
        return;
    }

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
            // Remove unobserve to allow animations to replay
            // observer.unobserve(entry.target);
        } else {
            // Remove visible class when leaving view to allow replay
            entry.target.classList.remove('visible');
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

// Works Data (Latest Works / Portfolio)
if (typeof window.worksData === 'undefined') {
    window.worksData = {
        "works": [
            {
                "id": "create-identity",
                "title": "Create Your Identity",
                "description": "We provide a stunning brand identity video showcasing creative design and modern aesthetics.",
                "category": "Branding",
                "thumbnail": "assets/portfolio/Create-Your-Identity.jpg",
                "videoUrl": "https://slategrey-dog-729906.hostingersite.com/wp-content/uploads/2024/09/Create-Your-Identity-6.mp4"
            },
            {
                "id": "high-quality-printing",
                "title": "High-Quality printing",
                "description": "We provide high-quality printing services to help you create professional and engaging visual content.",
                "category": "Web Design",
                "thumbnail": "assets/portfolio/High-Quality-printing.jpg",
                "videoUrl": "https://slategrey-dog-729906.hostingersite.com/wp-content/uploads/2024/09/High-Quality-printing-5.mp4"
            },
            {
                "id": "international-exhibition",
                "title": "International Exhibition",
                "description": "We provide international exhibition services to help you showcase your products and services to a global audience.",
                "category": "App Development",
                "thumbnail": "assets/portfolio/International-Exhbition.jpg",
                "videoUrl": "https://slategrey-dog-729906.hostingersite.com/wp-content/uploads/2024/09/International-Exhbition-3.mp4"
            },
            {
                "id": "one-name-to-success",
                "title": "One Name to Success",
                "description": "We help you to be successful.",
                "category": "Branding",
                "thumbnail": "assets/portfolio/Motivation-to-Achieve-Goals.jpg",
                "videoUrl": "assets/portfolio/video/Motivation-to-achieve-goals-1.mp4"
            },
            {
                "id": "motivation-to-achieve-goals",
                "title": "Motivation to Achieve Goals",
                "description": "We help you to be motivated to achieve your goals.",
                "category": "Branding",
                "thumbnail": "assets/portfolio/One-Name-to-Success.jpg",
                "videoUrl": "https://slategrey-dog-729906.hostingersite.com/wp-content/uploads/2024/09/One-Name-to-Success-2.mp4"
            },
            {
                "id": "willingness-drives-to-creativity",
                "title": "Willingness Drives to Creativity",
                "description": "We help you to be creative and innovative.",
                "category": "Branding",
                "thumbnail": "assets/portfolio/Willingness-Drives-to-Creativity.jpg",
                "videoUrl": "https://slategrey-dog-729906.hostingersite.com/wp-content/uploads/2024/09/Willingness-Drives-to-Creativity-4.mp4"
            }
        ]
    };
}

// Load Works from embedded data
function loadWorks() {
    const worksGrid = document.getElementById('works-grid');

    if (!worksGrid) return;

    const data = window.worksData;
    if (!data || !data.works) return;

    worksGrid.innerHTML = '';

    data.works.forEach(work => {
        const workCard = document.createElement('article');
        workCard.className = 'work__card';
        workCard.setAttribute('data-work-id', work.id);
        workCard.setAttribute('data-video-url', work.videoUrl);

        workCard.innerHTML = `
            <div class="work__thumbnail">
                <img src="${work.thumbnail}" alt="${work.title}" loading="lazy">
                <div class="work__play-icon">▶</div>
            </div>
            <div class="work__content">
                <h3 class="work__title">${work.title}</h3>
                <p class="work__description">${work.description}</p>
                <span class="work__category">${work.category}</span>
            </div>
        `;

        // Add click event to open video in fullscreen
        workCard.addEventListener('click', () => {
            openVideoModal(work.videoUrl);
        });

        worksGrid.appendChild(workCard);

        // Observe each new card for animation
        observer.observe(workCard);
    });
}

// Fullscreen Video Modal Functions
function openVideoModal(videoUrl) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    const source = video.querySelector('source');

    if (!modal || !video || !source) return;

    // Set video source
    source.src = videoUrl;
    video.load();

    // Show modal
    modal.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Play video
    video.play().catch(err => {
        console.log('Video autoplay prevented:', err);
    });
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');

    if (!modal || !video) return;

    // Pause and reset video
    video.pause();
    video.currentTime = 0;

    // Hide modal
    modal.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';
}

// Video Modal Event Listeners
const videoModal = document.getElementById('video-modal');
const videoModalClose = document.getElementById('video-modal-close');

if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
}

if (videoModal) {
    // Close on background click
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

// Load works on page load
if (document.getElementById('works-grid')) {
    loadWorks();
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
    contactForm.addEventListener('submit', function (e) {
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
    const star = document.querySelector('.star-of-button-icon');

    // Define how much to rotate per pixel scrolled. 
    // 0.1 means 1 pixel scroll = 0.1 degrees rotation (5x slower).
    const rotationFactor = 0.1;

    window.addEventListener('scroll', () => {
        // 1. Get the current vertical scroll position
        const scrollPosition = window.scrollY;

        // 2. Calculate the rotation angle
        // The modulo operation (%) ensures the degree value wraps around (0-360) for cleaner numbers, though CSS handles this anyway.
        const rotationAngle = (scrollPosition * rotationFactor) % 360;

        // 3. Apply the rotation via the transform style
        // Preserve the translateY from CSS and add rotation
        // star.style.transform = `translateY(-50%) rotate(${rotationAngle}deg)`;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Add scroll-triggered animations for hero content
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero__content h1');
    const heroText = document.querySelector('.hero__content p');
    const heroImage = document.querySelector('.hero__image');

    if (heroSection && heroTitle && heroText) {
        const heroContentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class to hero content elements
                    heroTitle.classList.add('visible');
                    heroText.classList.add('visible');
                    if (heroImage) {
                        heroImage.classList.add('visible');

                        // Add continuous floating animation after initial animation
                        setTimeout(() => {
                            const heroImgElement = heroImage.querySelector('img');
                            if (heroImgElement) {
                                heroImgElement.style.animation = 'float 3s ease-in-out infinite';
                            }
                        }, 1200);
                    }
                } else {
                    // Remove visible class when leaving view to allow replay
                    heroTitle.classList.remove('visible');
                    heroText.classList.remove('visible');
                    if (heroImage) {
                        heroImage.classList.remove('visible');

                        // Remove floating animation
                        const heroImgElement = heroImage.querySelector('img');
                        if (heroImgElement) {
                            heroImgElement.style.animation = '';
                        }
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        heroContentObserver.observe(heroSection);
    }

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

// Mouse move animation for the decorative line in about section
document.addEventListener('DOMContentLoaded', function () {
    const aboutContent = document.querySelector('.about__content');

    if (aboutContent) {
        // Create a more subtle mouse move effect
        aboutContent.addEventListener('mousemove', (e) => {
            const rect = aboutContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate movement as a percentage of container size
            const xPos = (x / rect.width) - 0.5; // -0.5 to 0.5
            const yPos = (y / rect.height) - 0.5; // -0.5 to 0.5

            // Subtle movement (only 2-3 pixels)
            const moveX = xPos * 6;
            const moveY = yPos * 6;

            // Apply transform to the pseudo-element via a CSS variable
            aboutContent.style.setProperty('--mouse-x', `${moveX}px`);
            aboutContent.style.setProperty('--mouse-y', `${moveY}px`);
        });

        // Reset position when mouse leaves
        aboutContent.addEventListener('mouseleave', () => {
            aboutContent.style.setProperty('--mouse-x', '0px');
            aboutContent.style.setProperty('--mouse-y', '0px');
        });
    }

    // Mouse move animation for the features section
    const featuresSection = document.querySelector('.features');

    if (featuresSection) {
        // Create a more subtle mouse move effect
        featuresSection.addEventListener('mousemove', (e) => {
            const rect = featuresSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate movement as a percentage of container size
            const xPos = (x / rect.width) - 0.5; // -0.5 to 0.5
            const yPos = (y / rect.height) - 0.5; // -0.5 to 0.5

            // Subtle movement (only 2-3 pixels)
            const moveX = xPos * 6;
            const moveY = yPos * 6;

            // Apply transform to the features section via a CSS variable
            featuresSection.style.setProperty('--mouse-x', `${moveX}px`);
            featuresSection.style.setProperty('--mouse-y', `${moveY}px`);
        });

        // Reset position when mouse leaves
        featuresSection.addEventListener('mouseleave', () => {
            featuresSection.style.setProperty('--mouse-x', '0px');
            featuresSection.style.setProperty('--mouse-y', '0px');
        });
    }
});

// Hero Target Slider
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
const totalSlides = 4;
let autoSlideInterval;

function updateSlider() {
    const translateX = -currentSlide * 25;
    slider.style.transform = `translateX(${translateX}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000); // 4 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
}

// Pause auto-scroll on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
}

// Start auto-slide on load
startAutoSlide();
