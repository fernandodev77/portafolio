/**
 * Configuración de animaciones para el portafolio principal
 * Implementa el sistema modular de animaciones usando setupAnimationObserver
 */

document.addEventListener('DOMContentLoaded', function() {
    // Añadir clase 'animate' a los elementos que queremos animar
    prepararElementosParaAnimacion();
    
    // Configurar animaciones para cada sección
    const animacionesPortafolio = {
        // Animaciones para la sección de inicio
        inicio: setupAnimationObserver({
            elementsSelector: '#inicio .hero-content > *, #inicio .hero-image > *',
            animationType: 'fade',
            threshold: 0.2,
            delay: 200,
            stagger: 150,
            once: false,
            customAnimations: {
                '#inicio h1': 'slide-right',
                '#inicio .subtitle': 'slide-right',
                '#inicio .cta-buttons': 'slide-up',
                '#inicio .shape': 'zoom',
                '#inicio .profile-img': 'slide-left'
            }
        }),
        
        // Animaciones para la sección de portafolio
        portafolio: setupAnimationObserver({
            elementsSelector: '#portafolio .section-title, #portafolio .portfolio-filter, #portafolio .portfolio-item',
            animationType: 'fade',
            threshold: 0.1,
            delay: 100,
            stagger: 150,
            once: false,
            customAnimations: {
                '#portafolio .section-title': 'slide-down',
                '#portafolio .portfolio-filter': 'slide-up',
                '#portafolio .portfolio-item': 'zoom'
            }
        }),
        
        // Animaciones para la sección acerca de mí
        acerca: setupAnimationObserver({
            elementsSelector: '#acerca .section-title, #acerca .about-image, #acerca .about-text > *',
            animationType: 'fade',
            threshold: 0.2,
            delay: 150,
            stagger: 200,
            once: false,
            customAnimations: {
                '#acerca .section-title': 'slide-down',
                '#acerca .about-image': 'slide-right',
                '#acerca .highlight': 'slide-left',
                '#acerca .skills': 'slide-up'
            }
        }),
        
        // Animaciones para la sección CV
        cv: setupAnimationObserver({
            elementsSelector: '#cv .section-title, #cv .cv-section, #cv .timeline-item, #cv .cv-download',
            animationType: 'fade',
            threshold: 0.15,
            delay: 100,
            stagger: 150,
            once: false,
            customAnimations: {
                '#cv .section-title': 'slide-down',
                '#cv .cv-section-title': 'slide-right',
                '#cv .timeline-item': 'slide-up',
                '#cv .cv-download': 'zoom'
            }
        }),
        
        // Animaciones para la sección blog
        blog: setupAnimationObserver({
            elementsSelector: '#blog .section-title, #blog .blog-card',
            animationType: 'fade',
            threshold: 0.2,
            delay: 150,
            stagger: 200,
            once: false,
            customAnimations: {
                '#blog .section-title': 'slide-down',
                '#blog .blog-card': 'slide-up'
            }
        })
    };
    
    /**
     * Prepara los elementos del DOM para ser animados
     * Añade la clase 'hidden' a los elementos que serán animados
     */
    function prepararElementosParaAnimacion() {
        // Elementos de la sección inicio
        document.querySelectorAll('#inicio .hero-content > *, #inicio .hero-image > *').forEach(el => {
            el.classList.add('hidden');
        });
        
        // Elementos de la sección portafolio
        document.querySelectorAll('#portafolio .section-title, #portafolio .portfolio-filter, #portafolio .portfolio-item').forEach(el => {
            el.classList.add('hidden');
        });
        
        // Elementos de la sección acerca
        document.querySelectorAll('#acerca .section-title, #acerca .about-image, #acerca .about-text > *').forEach(el => {
            el.classList.add('hidden');
        });
        
        // Elementos de la sección CV
        document.querySelectorAll('#cv .section-title, #cv .cv-section, #cv .timeline-item, #cv .cv-download').forEach(el => {
            el.classList.add('hidden');
        });
        
        // Elementos de la sección blog
        document.querySelectorAll('#blog .section-title, #blog .blog-card').forEach(el => {
            el.classList.add('hidden');
        });
    }
});