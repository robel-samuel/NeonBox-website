// Navbar functionality
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
    
// Toggle mobile menu
burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
        
    // Burger animation
    burger.classList.toggle('toggle');
    
    // Prevent background scrolling when menu is open
    if (navLinks.classList.contains('nav-active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (navLinks.classList.contains('nav-active') && 
        !navLinks.contains(event.target) && 
        !burger.contains(event.target)) {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
        document.body.style.overflow = 'auto';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Preloader functionality
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    
    // Wait for preloader transition to finish before removing
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get all photo filenames
    const photoFiles = [
        'aleksei-malenchik-su5BRP1DhUQ-unsplash.jpg',
        'atle-mo-VjueI0vRTNQ-unsplash.jpg',
        'backlit-high-quality.jpg',
        'brendan-ng-AKvIf98CWIY-unsplash.jpg',
        'custom-designs.jpg',
        'dhehaivan-FXCvslpSeUY-unsplash.jpg',
        'download (10).jpg',
        'download (6).jpg',
        'download (7).jpg',
        'download (8).jpg',
        'download (9).jpg',
        'images (1).jpg',
        'images (2).jpg',
        'images (3).jpg',
        'images (4).jpg',
        'images.jpg',
        'jahanzeb-ahsan-94mSHSF15M4-unsplash.jpg',
        'leonardo-sanches-Da2MDslJjyY-unsplash.jpg',
        'lorenzo-fatto-offidani-DNDfoz8yZVI-unsplash.jpg',
        'mdf-high-quality.jpg',
        'neon-high-quality.jpg',
        'night-glow-2vBX1iqci58-unsplash (1).jpg',
        'night-glow-2vBX1iqci58-unsplash.jpg',
        'noah-pienaar-WNwJhWRWAgE-unsplash.jpg',
        'tanya-barrow-Gaocfj4ospc-unsplash.jpg',
        'vlad-surkov-pPdZE8fu1YI-unsplash.jpg',
        'zuzanna-adamczyk-cG6uTzOkCkg-unsplash.jpg'
    ];

    // Populate portfolio with images
    const portfolioTrack = document.querySelector('.portfolio-track');
    
    photoFiles.forEach((file, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `<img src="photo/${file}" alt="Neon Box Design ${index + 1}">`;
        portfolioTrack.appendChild(portfolioItem);
    });

    // Enhanced scroll animation functionality with staggered effects
    const animateOnScroll = () => {
        // Create observer for staggered animations
        const staggeredObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    const elements = container.querySelectorAll(
                        '.service, .testimonial, .step, .info-card, .social-tile'
                    );
                    
                    // Apply staggered animation to children
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('animate');
                        }, index * 150); // 150ms delay between each element
                    });
                    
                    // Stop observing this container after animation
                    staggeredObserver.unobserve(container);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        // Observe containers that need staggered animations
        const staggeredContainers = document.querySelectorAll('.services, .testimonial-grid, .process-steps, .contact-info-cards, .social-grid');
        staggeredContainers.forEach(container => {
            staggeredObserver.observe(container);
        });
        
        // Create observer for individual elements
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Stop observing this element after animation
                    elementObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        // Observe individual elements
        const individualElements = document.querySelectorAll(
            '.scroll-animate, .portfolio-item, .footer-content > div, .hero-content, .about h2, .about p, .portfolio h2, .portfolio p, .locations h2, .locations p, .testimonials h2, .testimonials p, .process h2, .process p, .contact-header h2, .contact-header p'
        );
        individualElements.forEach(element => {
            elementObserver.observe(element);
        });
    };
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Parallax effect for hero section
    const parallaxEffect = () => {
        const heroBanner = document.querySelector('.hero-banner');
        if (heroBanner) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                // Apply parallax while preserving the zoom animation
                heroBanner.style.transform = `translateY(${scrollPosition * 0.5}px) scale(1.1)`;
            });
        }
    };
    
    // Initialize parallax effect
    parallaxEffect();
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed navbar
                behavior: 'smooth'
            });
        });
    });
    
    // Portfolio slider functionality
    const portfolioSlider = document.querySelector('.portfolio-slider');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioSlider && portfolioItems.length > 0) {
        let activeItem = portfolioItems[0];
        activeItem.classList.add('active');
        
        portfolioSlider.addEventListener('scroll', function() {
            // Remove active class from all items
            portfolioItems.forEach(item => item.classList.remove('active'));
            
            // Find the item most in view
            let mostVisibleItem = null;
            let highestVisibility = 0;
            
            portfolioItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const sliderRect = portfolioSlider.getBoundingClientRect();
                
                // Calculate visibility percentage
                const visibleWidth = Math.min(rect.right, sliderRect.right) - Math.max(rect.left, sliderRect.left);
                const visibility = Math.max(0, visibleWidth / rect.width);
                
                if (visibility > highestVisibility) {
                    highestVisibility = visibility;
                    mostVisibleItem = item;
                }
            });
            
            // Add active class to the most visible item
            if (mostVisibleItem) {
                mostVisibleItem.classList.add('active');
            }
        });
    }
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    
    // Open lightbox when clicking on portfolio item
    portfolioTrack.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            const clickedItem = e.target.closest('.portfolio-item');
            const allItems = Array.from(portfolioTrack.querySelectorAll('.portfolio-item'));
            currentIndex = allItems.indexOf(clickedItem);
            
            lightbox.style.display = 'block';
            lightboxImg.src = e.target.src;
            captionText.innerHTML = e.target.alt;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', function() {
        const allItems = Array.from(portfolioTrack.querySelectorAll('.portfolio-item img'));
        currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
        lightboxImg.src = allItems[currentIndex].src;
        captionText.innerHTML = allItems[currentIndex].alt;
    });
    
    nextBtn.addEventListener('click', function() {
        const allItems = Array.from(portfolioTrack.querySelectorAll('.portfolio-item img'));
        currentIndex = (currentIndex + 1) % allItems.length;
        lightboxImg.src = allItems[currentIndex].src;
        captionText.innerHTML = allItems[currentIndex].alt;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
});