// Script para el Portafolio Principal

document.addEventListener('DOMContentLoaded', function() {
    // Animación de intro
    setTimeout(() => {
        document.querySelector('.intro-animation').style.display = 'none';
    }, 4000);

    // Configurar el Intersection Observer para las secciones usando la utilidad compartida
    setupSectionObserver({
        sectionSelector: '#inicio, #portafolio, #acerca, #cv, #blog',
        navLinkSelector: '.nav-links a',
        activeClass: 'active',
        threshold: 0.5,
        rootMargin: '-80px 0px 0px 0px',
        initialSectionId: 'inicio'
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});