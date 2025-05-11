# Documentación de Animaciones

## Introducción

Este documento explica cómo utilizar el sistema de animaciones modular implementado en el portafolio. El sistema permite configurar animaciones personalizadas para diferentes elementos cuando entran en el viewport del usuario.

## Archivos Principales

- **shared-utils.js**: Contiene la función `setupAnimationObserver` que configura las animaciones.
- **animations.css**: Contiene los estilos CSS necesarios para las animaciones.
- **animation-examples.js**: Contiene ejemplos de uso para diferentes escenarios.

## Cómo Usar las Animaciones

### 1. Incluir los Archivos Necesarios

Asegúrate de incluir los siguientes archivos en tu HTML:

```html
<!-- En el head -->
<link rel="stylesheet" href="css/animations.css">

<!-- Antes del cierre del body -->
<script src="js/shared-utils.js"></script>
```

### 2. Marcar los Elementos a Animar

Agrega la clase `animate-me` (o el selector que prefieras usar) a los elementos que deseas animar:

```html
<div class="animate-me">Este elemento se animará</div>
<p class="animate-me">Este párrafo también se animará</p>
```

### 3. Configurar el Observer de Animaciones

```javascript
// Configuración básica
const animaciones = setupAnimationObserver({
    elementsSelector: '.animate-me',
    animationType: 'fade'
});

// Configuración avanzada
const animacionesAvanzadas = setupAnimationObserver({
    elementsSelector: '.section-content > *',
    animationType: 'slide-up',
    threshold: 0.2,
    delay: 100,
    stagger: 150,
    customAnimations: {
        'h2': 'slide-down',
        'img': 'zoom',
        '.card': 'slide-right'
    }
});
```

## Parámetros de Configuración

| Parámetro | Tipo | Valor Predeterminado | Descripción |
|-----------|------|----------------------|-------------|
| elementsSelector | string | - | Selector CSS para los elementos a animar (requerido) |
| animationClass | string | 'animated' | Clase CSS para aplicar cuando el elemento es visible |
| hiddenClass | string | 'hidden' | Clase CSS para elementos ocultos antes de animar |
| animationType | string | 'fade' | Tipo de animación: 'fade', 'slide-up', 'zoom', etc. |
| threshold | number | 0.2 | Umbral de intersección (0.0 - 1.0) |
| rootMargin | string | '0px' | Margen del root (formato CSS) |
| delay | number | 0 | Retraso base para la animación en ms |
| stagger | number | 100 | Tiempo entre animaciones secuenciales en ms |
| once | boolean | true | Si la animación debe ejecutarse solo una vez |
| onElementVisible | function | - | Callback cuando un elemento se vuelve visible |
| onElementHidden | function | - | Callback cuando un elemento se oculta |
| customAnimations | object | {} | Objeto con animaciones personalizadas por selector |

## Tipos de Animaciones Disponibles

- **fade**: Aparición gradual
- **slide-up**: Deslizamiento hacia arriba
- **slide-down**: Deslizamiento hacia abajo
- **slide-right**: Deslizamiento hacia la derecha
- **slide-left**: Deslizamiento hacia la izquierda
- **zoom**: Efecto de zoom
- **rotate**: Rotación
- **flip**: Efecto de volteo

## Clases Modificadoras

Puedes combinar las animaciones con estas clases para personalizar su comportamiento:

- **animation-duration-fast**: Duración más corta (0.3s)
- **animation-duration-slow**: Duración más larga (1s)
- **animation-duration-very-slow**: Duración muy larga (1.5s)
- **animation-ease-in**: Timing function ease-in
- **animation-ease-out**: Timing function ease-out
- **animation-bounce**: Efecto de rebote

## Ejemplos de Uso

Consulta el archivo `animation-examples.js` para ver ejemplos completos de implementación para diferentes escenarios y tipos de portafolios.

## Personalización por Portafolio

Para cada portafolio específico, puedes crear una configuración personalizada:

```javascript
// Para portafolio de diseño
const animacionesDiseno = setupAnimationObserver({
    elementsSelector: '.design-section .animate',
    animationType: 'fade',
    customAnimations: {
        '.hero-content': 'slide-right',
        '.project-card': 'zoom'
    }
});

// Para portafolio de desarrollo
const animacionesDesarrollo = setupAnimationObserver({
    elementsSelector: '.dev-section .animate',
    animationType: 'slide-up',
    customAnimations: {
        '.code-block': 'slide-right',
        '.tech-stack': 'zoom'
    }
});
```