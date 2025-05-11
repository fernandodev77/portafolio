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