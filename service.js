// Services Data (embedded to avoid CORS issues with file:// protocol)
// Only declare if script.js hasn't already loaded it
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

// Reference to servicesData (from window or local scope)

// Load Service Details from embedded data
function loadServiceDetails() {
    // Get the services data (from window or local)
    const data = window.servicesData || servicesData;
    
    if (!data || !data.services) {
        document.getElementById('service-content').innerHTML = `
            <div class="service-detail__header">
                <h1 class="service-detail__title">Error Loading Data</h1>
                <p class="service-detail__description">Unable to load service data.</p>
                <a href="index.html#services" class="btn btn--primary">Back to Services</a>
            </div>
        `;
        return;
    }
    
    // Get service ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    
    if (!serviceId) {
        document.getElementById('service-content').innerHTML = `
            <div class="service-detail__header">
                <h1 class="service-detail__title">Service Not Found</h1>
                <p class="service-detail__description">The requested service could not be found.</p>
                <a href="index.html#services" class="btn btn--primary">Back to Services</a>
            </div>
        `;
        return;
    }
    
    // Find the service
    const service = data.services.find(s => s.id === serviceId);
    
    if (!service) {
        document.getElementById('service-content').innerHTML = `
            <div class="service-detail__header">
                <h1 class="service-detail__title">Service Not Found</h1>
                <p class="service-detail__description">The requested service could not be found.</p>
                <a href="index.html#services" class="btn btn--primary">Back to Services</a>
            </div>
        `;
        return;
    }
    
    // Render service details
    const serviceContent = document.getElementById('service-content');
    serviceContent.className = `service-detail__content service-detail--${service.color}`;
    
    serviceContent.innerHTML = `
        <div class="service-detail__header">
            <div class="service-detail__icon">${service.icon}</div>
            <h1 class="service-detail__title">${service.title}</h1>
            <p class="service-detail__description">${service.details.description}</p>
        </div>
        
        <div class="service-detail__section">
            <h2 class="service-detail__section-title">Key Features</h2>
            <ul class="service-detail__features">
                ${service.details.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="service-detail__section">
            <h2 class="service-detail__section-title">Benefits</h2>
            <ul class="service-detail__benefits">
                ${service.details.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
        </div>
        
        <div class="service-detail__back">
            <a href="index.html#services" class="btn btn--primary">Back to Services</a>
            <a href="index.html#contact" class="btn btn--secondary">Get In Touch</a>
        </div>
    `;
    
    // Update page title
    document.title = `${service.title} - Falcon of Codes`;
}

// Load service details when page loads
if (document.getElementById('service-content')) {
    loadServiceDetails();
}

