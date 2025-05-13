// Script para el Portafolio Principal

document.addEventListener('DOMContentLoaded', function() {
    // Animación de intro
    setTimeout(() => {
        document.querySelector('.intro-animation').style.display = 'none';
    }, 4000);
    
    // Funcionalidad del menú hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    hamburgerMenu.addEventListener('click', function() {
        // Toggle para la clase active en el menú hamburguesa
        this.classList.toggle('active');
        
        // Toggle para mostrar/ocultar el menú de navegación
        navLinks.classList.toggle('active');
        
        // Prevenir scroll cuando el menú está abierto
        document.body.classList.toggle('menu-open');
    });
    
    // Cerrar el menú al hacer clic en un enlace
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Configurar el Intersection Observer para las secciones usando la utilidad compartida
    setupSectionObserver({
        sectionSelector: '#inicio, #portafolio, #acerca, #cv, #blog',
        navLinkSelector: '.nav-links a',
        activeClass: 'active',
        threshold: 0.5,
        rootMargin: '-80px 0px 0px 0px',
        initialSectionId: 'inicio'
    });

    // Seccion Web Desing - Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.portfolio-item');
const DURATION = 400; // coincide con 0.4s de tu CSS

function showProject(proj) {
  // 1) restaurar display para que participe en el grid
  proj.style.display = '';
  // 2) forzamos reflow para que el browser “vea” el display antes de la transición
  proj.getBoundingClientRect();
  // 3) quitamos la clase oculta para que haga fade-in + lift
  proj.classList.remove('is-hidden');
}

function hideProject(proj) {
  // 1) añadimos la clase oculta para que haga fade-out + drop
  proj.classList.add('is-hidden');
  // 2) tras la transición, lo retiramos del flujo
  setTimeout(() => {
    proj.style.display = 'none';
  }, DURATION);
}

function filterProjects(category) {
  projects.forEach(project => {
    const projectCategory = project.getAttribute('data-category');
    const matches = (category === 'all' || projectCategory === category);

    if (matches) {
      showProject(project);
    } else {
      // evita re-hiding si ya está oculto
      if (!project.classList.contains('is-hidden')) {
        hideProject(project);
      }
    }
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-filter');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterProjects(category);
  });
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