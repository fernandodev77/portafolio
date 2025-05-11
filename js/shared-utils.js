/**
 * Utilidades compartidas para los portafolios
 */

/**
 * Configura un Intersection Observer para actualizar dinámicamente el estado activo
 * de los enlaces de navegación cuando las secciones correspondientes son visibles.
 * 
 * @param {Object} config - Configuración del observer
 * @param {string} config.sectionSelector - Selector CSS para las secciones a observar
 * @param {string} config.navLinkSelector - Selector CSS para los enlaces de navegación
 * @param {string} config.activeClass - Clase CSS para marcar elementos activos (por defecto: 'active')
 * @param {number} config.threshold - Umbral de intersección (por defecto: 0.5)
 * @param {string} config.rootMargin - Margen del root (por defecto: '-80px 0px 0px 0px')
 * @param {string} config.initialSectionId - ID de la sección inicial (opcional)
 * @param {Function} config.onSectionChange - Callback cuando cambia la sección visible (opcional)
 */
function setupSectionObserver(config) {
    // Valores por defecto
    const {
        sectionSelector,
        navLinkSelector,
        activeClass = 'active',
        threshold = 0.5,
        rootMargin = '-80px 0px 0px 0px',
        initialSectionId,
        onSectionChange
    } = config;
    
    // Validar parámetros requeridos
    if (!sectionSelector || !navLinkSelector) {
        console.error('setupSectionObserver: sectionSelector y navLinkSelector son requeridos');
        return;
    }
    
    // Función para actualizar el enlace activo en el navbar
    function updateActiveNavLink(sectionId) {
        // Quitar la clase active de todos los enlaces
        document.querySelectorAll(navLinkSelector).forEach(link => {
            link.classList.remove(activeClass);
        });
        
        // Añadir la clase active al enlace correspondiente a la sección visible
        const activeLink = document.querySelector(`${navLinkSelector}[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add(activeClass);
        }
        
        // Ejecutar callback si existe
        if (typeof onSectionChange === 'function') {
            onSectionChange(sectionId);
        }
    }

    // Observer para detectar qué sección está visible
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Solo procesar cuando la sección entra en el viewport
            if (entry.isIntersecting) {
                // Actualizar el estado activo en el navbar
                updateActiveNavLink(entry.target.id);
            }
        });
    }, {
        threshold: threshold,
        rootMargin: rootMargin
    });

    // Observar todas las secciones relevantes
    const allSections = document.querySelectorAll(sectionSelector);

    // Registrar y observar cada sección
    allSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Forzar una actualización inicial si se proporciona un ID de sección inicial
    if (initialSectionId) {
        const initialSection = document.querySelector(`.${activeClass}`) || document.getElementById(initialSectionId);
        if (initialSection) {
            // Establecer el enlace activo inicial en el navbar
            updateActiveNavLink(initialSection.id);
        }
    }
    
    // Devolver el observer y la función de actualización para posible uso externo
    return {
        observer: sectionObserver,
        updateActiveNavLink
    };
}

/**
 * Configura un Intersection Observer para aplicar animaciones a elementos cuando entran en el viewport.
 * 
 * @param {Object} config - Configuración del observer de animaciones
 * @param {string} config.elementsSelector - Selector CSS para los elementos a animar
 * @param {string} config.animationClass - Clase CSS para aplicar cuando el elemento es visible (por defecto: 'animated')
 * @param {string} config.hiddenClass - Clase CSS para elementos ocultos antes de animar (por defecto: 'hidden')
 * @param {string} config.animationType - Tipo de animación: 'fade', 'slide', 'zoom', etc. (por defecto: 'fade')
 * @param {number} config.threshold - Umbral de intersección (por defecto: 0.2)
 * @param {string} config.rootMargin - Margen del root (por defecto: '0px')
 * @param {number} config.delay - Retraso base para la animación en ms (por defecto: 0)
 * @param {number} config.stagger - Tiempo entre animaciones secuenciales en ms (por defecto: 100)
 * @param {boolean} config.once - Si la animación debe ejecutarse solo una vez (por defecto: true)
 * @param {Function} config.onElementVisible - Callback cuando un elemento se vuelve visible (opcional)
 * @param {Function} config.onElementHidden - Callback cuando un elemento se oculta (opcional)
 * @param {Object} config.customAnimations - Objeto con animaciones personalizadas por selector (opcional)
 */
function setupAnimationObserver(config) {
    // Valores por defecto
    const {
        elementsSelector,
        animationClass = 'animated',
        hiddenClass = 'hidden',
        animationType = 'fade',
        threshold = 0.2,
        rootMargin = '0px',
        delay = 0,
        stagger = 100,
        once = true,
        onElementVisible,
        onElementHidden,
        customAnimations = {}
    } = config;
    
    // Validar parámetros requeridos
    if (!elementsSelector) {
        console.error('setupAnimationObserver: elementsSelector es requerido');
        return;
    }
    
    // Preparar los elementos para la animación
    const elements = document.querySelectorAll(elementsSelector);
    let elementIndex = 0;
    
    // Aplicar clase oculta inicial si es necesario
    elements.forEach(element => {
        if (!element.classList.contains(animationClass)) {
            element.classList.add(hiddenClass);
        }
        
        // Asignar un índice para el stagger
        element.dataset.animationIndex = elementIndex++;
        
        // Asignar tipo de animación
        if (animationType && !element.dataset.animationType) {
            element.dataset.animationType = getElementAnimationType(element, animationType, customAnimations);
        }
    });
    
    // Función para determinar el tipo de animación para un elemento específico
    function getElementAnimationType(element, defaultType, customAnimations) {
        // Verificar si hay una animación personalizada para este elemento
        for (const selector in customAnimations) {
            if (element.matches(selector)) {
                return customAnimations[selector];
            }
        }
        
        // Usar el tipo de animación por defecto
        return defaultType;
    }
    
    // Función para aplicar la animación a un elemento
    function animateElement(element, isVisible) {
        const elementAnimationType = element.dataset.animationType || animationType;
        const elementIndex = parseInt(element.dataset.animationIndex) || 0;
        const staggerDelay = elementIndex * stagger;
        const totalDelay = delay + staggerDelay;
        
        if (isVisible) {
            // Aplicar animación con retraso
            setTimeout(() => {
                element.classList.remove(hiddenClass);
                element.classList.add(animationClass);
                element.classList.add(`animation-${elementAnimationType}`);
                
                // Ejecutar callback si existe
                if (typeof onElementVisible === 'function') {
                    onElementVisible(element, elementAnimationType, totalDelay);
                }
            }, totalDelay);
        } else if (!once) {
            // Revertir animación solo si once es false
            element.classList.add(hiddenClass);
            element.classList.remove(animationClass);
            element.classList.remove(`animation-${elementAnimationType}`);
            
            // Ejecutar callback si existe
            if (typeof onElementHidden === 'function') {
                onElementHidden(element, elementAnimationType);
            }
        }
    }
    
    // Observer para detectar cuándo los elementos entran/salen del viewport
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Aplicar o revertir animación según visibilidad
            animateElement(entry.target, entry.isIntersecting);
            
            // Desconectar observer después de animar si once es true
            if (entry.isIntersecting && once) {
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: threshold,
        rootMargin: rootMargin
    });
    
    // Observar todos los elementos seleccionados
    elements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Devolver el observer y funciones útiles para posible uso externo
    return {
        observer: animationObserver,
        elements: elements,
        animateElement: animateElement,
        refresh: function() {
            // Actualizar la lista de elementos y volver a observarlos
            const newElements = document.querySelectorAll(elementsSelector);
            newElements.forEach(element => {
                if (!element.dataset.animationIndex) {
                    element.dataset.animationIndex = elementIndex++;
                    element.dataset.animationType = getElementAnimationType(element, animationType, customAnimations);
                    element.classList.add(hiddenClass);
                    animationObserver.observe(element);
                }
            });
        }
    };
}