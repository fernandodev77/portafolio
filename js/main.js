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

  
   

   

    // Efecto glitch en texto
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('glitching');
            setTimeout(() => {
                glitchText.classList.remove('glitching');
            }, 200);
        }, 3000);
    }

    // Animación de etiquetas de habilidades
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });

    // Inicializar AOS si está disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Efecto hover en items de portafolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            if(overlay) overlay.style.opacity = '1';
            const links = item.querySelectorAll('.portfolio-link');
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            if(overlay) overlay.style.opacity = '0';
            const links = item.querySelectorAll('.portfolio-link');
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        });
    });

    // Efectos hover en blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    // Animaciones en timeline
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