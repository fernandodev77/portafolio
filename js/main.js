// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the page after intro animation
    const introAnimation = document.querySelector('.intro-animation');
    setTimeout(() => {
        if (introAnimation) {
            introAnimation.style.opacity = '0';
            introAnimation.style.visibility = 'hidden';
            setTimeout(() => {
                introAnimation.style.display = 'none';
            }, 1000);
        }
        initPage();
    }, 4000); // 4 seconds for the intro animation

    // Scroll event listener for navbar and section highlighting
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Find which section is in view
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
});

function initPage() {
    // Show all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'block';
        section.style.visibility = 'visible';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    });

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to section instead of hiding/showing
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Offset for navbar height
                behavior: 'smooth'
            });
            
            // Add active class to target section
            sections.forEach(section => section.classList.remove('active'));
            targetSection.classList.add('active');
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Initialize all items as visible
    portfolioItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
    
    // Función para filtrar los elementos del portafolio
    function filterPortfolio(filterValue) {
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    }
    
    // Agregar eventos de clic a los botones de filtro
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            filterPortfolio(filterValue);
        });
    });
    
    // Aplicar el filtro activo al cargar la página
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    if (activeFilterBtn) {
        const initialFilterValue = activeFilterBtn.getAttribute('data-filter');
        filterPortfolio(initialFilterValue);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Glitch text effect
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('glitching');
            setTimeout(() => {
                glitchText.classList.remove('glitching');
            }, 200);
        }, 3000);
    }

    // Skill tags animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });

    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Add hover effect to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.portfolio-overlay').style.opacity = '1';
            const links = item.querySelectorAll('.portfolio-link');
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });

        item.addEventListener('mouseleave', () => {
            item.querySelector('.portfolio-overlay').style.opacity = '0';
            const links = item.querySelectorAll('.portfolio-link');
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        });
    });

    // Blog card hover effects
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    // Add animations to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
        item.classList.add('animate');
    });
}

// Animation keyframes
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; visibility: hidden; }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes morphShape {
    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
    50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
    75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
    100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}

@keyframes glitch {
    0% { text-shadow: none; }
    20% { text-shadow: none; }
    21% { text-shadow: 2px 0 var(--accent-primary), -2px 0 var(--accent-secondary); }
    23% { text-shadow: none; }
    40% { text-shadow: none; }
    41% { text-shadow: -2px 0 var(--accent-primary), 2px 0 var(--accent-secondary); }
    43% { text-shadow: none; }
    80% { text-shadow: none; }
    81% { text-shadow: 2px 2px var(--accent-primary), -2px -2px var(--accent-secondary); }
    83% { text-shadow: none; }
}

@keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
</style>
`);