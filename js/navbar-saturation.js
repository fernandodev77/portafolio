/**
 * Script para controlar la saturación del navbar según la sección visible
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configuración del observer para cambiar la saturación del navbar
    setupSectionObserver({
        sectionSelector: 'section.section',
        navLinkSelector: '.nav-links a',
        threshold: 0.3,
        rootMargin: '-80px 0px 0px 0px',
        initialSectionId: 'inicio',
        onSectionChange: function(sectionId) {
            // Cambiar la saturación del navbar según la sección visible
            updateNavbarSaturation(sectionId);
        }
    });
    
    /**
     * Actualiza la saturación del navbar según la sección visible
     * @param {string} sectionId - ID de la sección visible
     */
    function updateNavbarSaturation(sectionId) {
        const root = document.documentElement;
        
        // Obtener la variable CSS correspondiente a la sección
        const saturationVar = `--navbar-saturation-${sectionId}`;
        
        // Verificar si existe la variable para esta sección
        const computedStyle = getComputedStyle(root);
        const saturationValue = computedStyle.getPropertyValue(saturationVar);
        
        // Si existe la variable, actualizar la saturación actual
        if (saturationValue && saturationValue.trim() !== '') {
            root.style.setProperty('--navbar-current-saturation', saturationValue);
        } else {
            // Si no existe, usar el valor por defecto
            const defaultSaturation = computedStyle.getPropertyValue('--navbar-saturation-default');
            root.style.setProperty('--navbar-current-saturation', defaultSaturation);
        }
    }
});