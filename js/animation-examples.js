/**
 * Ejemplos de uso de setupAnimationObserver
 * Este archivo muestra diferentes configuraciones para implementar animaciones
 * en los distintos portafolios utilizando la función setupAnimationObserver.
 */

/**
 * Ejemplo 1: Configuración básica de animaciones
 * Anima todos los elementos con la clase .animate-me con un efecto de fade
 */
function ejemploAnimacionBasica() {
    const animacionBasica = setupAnimationObserver({
        elementsSelector: '.animate-me',
        animationType: 'fade',
        threshold: 0.2,
        once: true
    });
    
    // Para actualizar los elementos después de cambios en el DOM
    // animacionBasica.refresh();
}

/**
 * Ejemplo 2: Animaciones con stagger (escalonadas)
 * Anima elementos en secuencia con un retraso entre cada uno
 */
function ejemploAnimacionEscalonada() {
    const animacionEscalonada = setupAnimationObserver({
        elementsSelector: '.portfolio-item',
        animationType: 'slide-up',
        delay: 100,      // Retraso inicial
        stagger: 150,    // Tiempo entre animaciones
        threshold: 0.1,
        rootMargin: '-50px'
    });
}

/**
 * Ejemplo 3: Animaciones personalizadas por selector
 * Aplica diferentes tipos de animación según el selector
 */
function ejemploAnimacionPersonalizada() {
    const animacionPersonalizada = setupAnimationObserver({
        elementsSelector: '.section-content > *',  // Selecciona todos los elementos dentro de .section-content
        animationType: 'fade',  // Tipo por defecto
        threshold: 0.2,
        delay: 50,
        stagger: 100,
        customAnimations: {
            'h2, h3': 'slide-down',           // Títulos se deslizan desde arriba
            'p': 'fade',                      // Párrafos con fade
            'img': 'zoom',                    // Imágenes con zoom
            '.card': 'slide-right',           // Cards se deslizan desde la izquierda
            '.btn': 'slide-up'                // Botones se deslizan desde abajo
        },
        onElementVisible: function(element, animationType, delay) {
            console.log(`Elemento visible: ${element.tagName}, animación: ${animationType}, delay: ${delay}ms`);
        }
    });
}

/**
 * Ejemplo 4: Animación para portafolio de diseño
 * Configuración específica para el portafolio de diseño
 */
function setupAnimacionesPortafolioDiseno() {
    return setupAnimationObserver({
        elementsSelector: '.design-section .animate',
        animationType: 'fade',
        threshold: 0.3,
        rootMargin: '-100px',
        delay: 200,
        stagger: 200,
        customAnimations: {
            '.design-section .hero-content': 'slide-right',
            '.design-section .hero-image': 'slide-left',
            '.design-section .project-card': 'zoom',
            '.design-section .skill-item': 'slide-up'
        }
    });
}

/**
 * Ejemplo 5: Animación para portafolio de desarrollo
 * Configuración específica para el portafolio de desarrollo
 */
function setupAnimacionesPortafolioDesarrollo() {
    return setupAnimationObserver({
        elementsSelector: '.dev-section .animate',
        animationType: 'slide-up',
        threshold: 0.2,
        rootMargin: '-50px',
        delay: 100,
        stagger: 150,
        customAnimations: {
            '.dev-section .code-block': 'slide-right',
            '.dev-section .tech-stack': 'zoom',
            '.dev-section .project-showcase': 'fade'
        }
    });
}

/**
 * Inicialización de animaciones según el tipo de portafolio
 * Detecta el tipo de portafolio y aplica las animaciones correspondientes
 */
function inicializarAnimaciones() {
    // Detectar el tipo de portafolio por la clase en el body o algún otro indicador
    const isPortafolioDiseno = document.body.classList.contains('design-portfolio');
    const isPortafolioDesarrollo = document.body.classList.contains('dev-portfolio');
    
    // Aplicar animaciones básicas para todos los portafolios
    ejemploAnimacionBasica();
    
    // Aplicar animaciones específicas según el tipo de portafolio
    if (isPortafolioDiseno) {
        setupAnimacionesPortafolioDiseno();
    } else if (isPortafolioDesarrollo) {
        setupAnimacionesPortafolioDesarrollo();
    } else {
        // Portafolio genérico o no identificado
        ejemploAnimacionPersonalizada();
    }
}

// Inicializar animaciones cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarAnimaciones);