// Script para el Portafolio de Diseño

document.addEventListener('DOMContentLoaded', function() {
    // Animación de intro
    setTimeout(() => {
        document.querySelector('.intro-animation').style.display = 'none';
    }, 4000);

    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace y actualizar estado activo
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                // Cerrar menú hamburguesa
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                
                // Actualizar estado activo en el navbar
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
                
                // Obtener el ID de la sección desde el href
                const sectionId = link.getAttribute('href').substring(1);
                
                // Actualizar el color del navbar según la sección
                const section = document.getElementById(sectionId);
                if (section) {
                    const relevantClass = Array.from(section.classList).find(cls => sectionColors[cls]);
                    if (relevantClass) {
                        updateNavbarColor(relevantClass);
                    } else if (sectionId === 'hero') {
                        updateNavbarColor('active');
                    }
                }
            });
        });

    }
    
    // Crear modal para visualización de imágenes en pantalla completa
    const body = document.body;
    const modal = document.createElement('div');
    modal.className = 'fullscreen-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Imagen en pantalla completa" class="modal-image">
            <video src="" autoplay loop muted class="modal-video"></video>
        </div>
    `;
    body.appendChild(modal);

    const modalImage = modal.querySelector('.modal-image');
    const modalVideo = modal.querySelector('.modal-video');
    const closeModal = modal.querySelector('.close-modal');

    // Función para abrir el modal con la imagen o video seleccionado
    function openModal(src) {
        if (src.includes('.mp4')) {
            modalImage.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = src;
        } else {
            modalVideo.style.display = 'none';
            modalImage.style.display = 'block';
            modalImage.src = src;
        }
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
    }

    // Cerrar modal al hacer clic en la X
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    });

    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }
    });

    // Inicializar Swiper para la sección de Diseño Web
    const webSwiper = new Swiper('.web-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
    
    // Inicializar Swiper para cada contenedor de logos
    const logoSwipers = [];
    document.querySelectorAll('.logo-swiper').forEach((swiperContainer, index) => {
        logoSwipers[index] = new Swiper(swiperContainer, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: swiperContainer.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: swiperContainer.querySelector('.swiper-button-next'),
                prevEl: swiperContainer.querySelector('.swiper-button-prev'),
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    });
    
    // Slider para la sección de Serigrafía
    const serigrafiaItems = document.querySelectorAll('.serigrafia-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showSlide(index) {
        serigrafiaItems.forEach(item => item.classList.remove('active'));
        serigrafiaItems[index].classList.add('active');
    }

    if (prevBtn && nextBtn && serigrafiaItems.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % serigrafiaItems.length;
            showSlide(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + serigrafiaItems.length) % serigrafiaItems.length;
            showSlide(currentIndex);
        });

        // Auto rotación del slider
        setInterval(() => {
            currentIndex = (currentIndex + 1) % serigrafiaItems.length;
            showSlide(currentIndex);
        }, 7000);
    }

    // Inicializar Swiper para la sección de Merchandising
    const merchSwiper = new Swiper('.merch-showcase', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.merch-showcase .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.merch-showcase .swiper-button-next',
            prevEl: '.merch-showcase .swiper-button-prev',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
    
    // Mantener compatibilidad con los controles existentes
    const merchPrevBtn = document.querySelector('.merch-prev-btn');
    const merchNextBtn = document.querySelector('.merch-next-btn');
    
    if (merchPrevBtn && merchNextBtn && merchSwiper) {
        merchNextBtn.addEventListener('click', () => {
            merchSwiper.slideNext();
        });

        merchPrevBtn.addEventListener('click', () => {
            merchSwiper.slidePrev();
        });
    }

    // Reproducir automáticamente el video MP4 en bucle
    const videoContainer = document.querySelector('.design-card .design-img img[src*=".mp4"]');
    if (videoContainer) {
        const videoSrc = videoContainer.src;
        const parentDiv = videoContainer.parentElement;
        const video = document.createElement('video');
        video.src = videoSrc;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        parentDiv.replaceChild(video, videoContainer);
    }

    // Hacer que todas las imágenes sean clickeables para ver en pantalla completa
    document.querySelectorAll('.design-img img, .logo-img img, .serigrafia-item img, .merch-img img, .design-img video').forEach(media => {
        media.style.cursor = 'pointer';
        media.addEventListener('click', () => {
            const src = media.src || media.currentSrc;
            openModal(src);
        });
    });

    // Sistema de animaciones utilizando setupAnimationObserver
    // Añadir clase 'animate' a los elementos que queremos animar
    document.querySelectorAll('.section-title, .section-description').forEach(element => {
        element.classList.add('animate');
    });
    
    document.querySelectorAll('.design-card').forEach(element => {
        element.classList.add('animate');
    });
    
    document.querySelectorAll('.logo-item').forEach(element => {
        element.classList.add('animate');
    });
    
    document.querySelectorAll('.serigrafia-item, .serigrafia-showcase').forEach(element => {
        element.classList.add('animate');
    });
    
    document.querySelectorAll('.merch-item, .merch-showcase').forEach(element => {
        element.classList.add('animate');
    });
    
    // Configurar animaciones para cada sección
    // Hero section
    const heroAnimations = setupAnimationObserver({
        elementsSelector: '#hero .animate',
        animationType: 'fade',
        threshold: 0.3,
        delay: 100,
        stagger: 150,
        customAnimations: {
            'h1': 'slide-down',
            'p': 'slide-up',
            '.cta-buttons': 'zoom'
        },
        once: false // Permite que las animaciones se repitan al hacer scroll hacia arriba
    });
    
    // Web design section
    const webAnimations = setupAnimationObserver({
        elementsSelector: '#web-design .animate',
        animationType: 'slide-up',
        threshold: 0.2,
        delay: 100,
        stagger: 150,
        customAnimations: {
            '.section-title': 'slide-down',
            '.section-description': 'fade',
            '.design-card': 'slide-right'
        },
        once: false // Permite que las animaciones se repitan al hacer scroll hacia arriba
    });
    
    // Logo design section
    const logoAnimations = setupAnimationObserver({
        elementsSelector: '#logo-design .animate',
        animationType: 'fade',
        threshold: 0.2,
        delay: 100,
        stagger: 200,
        customAnimations: {
            '.section-title': 'slide-down',
            '.section-description': 'fade',
            '.logo-item': 'zoom'
        },
        once: false // Permite que las animaciones se repitan al hacer scroll hacia arriba
    });
    
    // Serigrafia section
    const serigrafiaAnimations = setupAnimationObserver({
        elementsSelector: '#serigrafia .animate',
        animationType: 'slide-left',
        threshold: 0.2,
        delay: 100,
        stagger: 150,
        customAnimations: {
            '.section-title': 'slide-down',
            '.section-description': 'fade',
            '.serigrafia-item': 'zoom',
            '.serigrafia-showcase': 'fade'
        },
        once: false // Permite que las animaciones se repitan al hacer scroll hacia arriba
    });
    
    // Merchandising section
    const merchAnimations = setupAnimationObserver({
        elementsSelector: '#merchandising .animate',
        animationType: 'slide-right',
        threshold: 0.2,
        delay: 100,
        stagger: 150,
        customAnimations: {
            '.section-title': 'slide-down',
            '.section-description': 'fade',
            '.merch-item': 'zoom',
            '.merch-showcase': 'fade'
        },
        once: false // Permite que las animaciones se repitan al hacer scroll hacia arriba
    });
    
    // Actualizar animaciones cuando cambia el DOM
    function refreshAnimations() {
        heroAnimations.refresh();
        webAnimations.refresh();
        logoAnimations.refresh();
        serigrafiaAnimations.refresh();
        merchAnimations.refresh();
    }

// Configuración para el cambio de color del navbar según la sección visible
const navbar = document.querySelector('.design-navbar');

// Asegurar que el navbar tenga una transición suave para todos los cambios TIME-NAVCOLOR
navbar.style.transition = 'background-image 0.6s ease-in-out';

// Colores para cada sección
const sectionColors = {
  'web-section': 'rgba(108, 92, 231, .90)',      // Rosa para Diseño Web
  'logo-section': 'rgba(0, 184, 148, .90)',     // Amarillo para Logotipos
  'serigrafia-section': 'rgba(219, 8, 247, .90)', // Púrpura para Serigrafía
  'merch-section': 'rgba(253, 203, 110, .90)',     // Rojo para Merchandising
  'active': 'rgba(255, 2, 196, 0.90)'             // Color por defecto para la sección hero
};

// Color inicial para el navbar (sección hero/active)
navbar.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.95) 70%, ${sectionColors['active']} 100%)`;

// Función para actualizar el color del navbar
function updateNavbarColor(sectionClass) {
  if (sectionColors[sectionClass]) {
    navbar.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.95) 70%, ${sectionColors[sectionClass]} 100%)`;
    console.log('Navbar color actualizado para:', sectionClass, sectionColors[sectionClass]);
  }
}

// Configurar el Intersection Observer para las secciones usando la utilidad compartida
const { observer: sectionObserver, updateActiveNavLink } = setupSectionObserver({
  sectionSelector: '#hero, #web-design, #logo-design, #serigrafia, #merchandising',
  navLinkSelector: '.nav-link',
  activeClass: 'active',
  threshold: 0.5,
  rootMargin: '-86px 0px 0px 0px',
  initialSectionId: 'hero',
  onSectionChange: function(sectionId) {
    // Obtener la sección
    const section = document.getElementById(sectionId);
    if (section) {
      // Obtener todas las clases del elemento
      const classList = Array.from(section.classList);
      
      // Buscar la clase que coincide con alguna de las secciones definidas
      for (const className of classList) {
        if (sectionColors[className]) {
          updateNavbarColor(className);
          break;
        }
      }
      
      // Si es la sección hero/active
      if (sectionId === 'hero' && section.classList.contains('active')) {
        updateNavbarColor('active');
      }
    }
  }
});

// Observar todas las secciones relevantes
const allSections = document.querySelectorAll('#hero, #web-design, #logo-design, #serigrafia, #merchandising');

// Asegurarse de que cada sección tenga las clases correctas para el cambio de color
allSections.forEach(section => {
  // Registrar información de la sección para depuración
  console.log('Observando sección:', section.id, Array.from(section.classList));
  
  // Asegurarse de que cada sección tenga las clases correctas para el cambio de color
  if (section.id === 'web-design' && !section.classList.contains('web-section')) {
    section.classList.add('web-section');
  } else if (section.id === 'logo-design' && !section.classList.contains('logo-section')) {
    section.classList.add('logo-section');
  } else if (section.id === 'serigrafia' && !section.classList.contains('serigrafia-section')) {
    section.classList.add('serigrafia-section');
  } else if (section.id === 'merchandising' && !section.classList.contains('merch-section')) {
    section.classList.add('merch-section');
  }
});

// Añadir un listener para el scroll para verificar el funcionamiento
let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
  // Limitar la frecuencia de verificación para mejorar el rendimiento
  const currentPosition = window.scrollY;
  if (Math.abs(currentPosition - lastScrollPosition) < 50) return;
  lastScrollPosition = currentPosition;
  
  // Verificar qué secciones están visibles
  allSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    // Una sección se considera visible si ocupa una parte significativa de la pantalla
    const isVisible = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3;
    
    if (isVisible) {
      // Identificar la clase relevante para el color
      const relevantClass = Array.from(section.classList).find(cls => sectionColors[cls]);
      if (relevantClass) {
        updateNavbarColor(relevantClass);
      } else if (section.id === 'hero') {
        updateNavbarColor('active');
      }
      
      // Actualizar también el enlace activo en el navbar durante el scroll
      updateActiveNavLink(section.id);
    }
  });
});

// Forzar una actualización inicial
const initialSection = document.querySelector('.section.active') || document.getElementById('hero');
if (initialSection) {
  const initialClass = Array.from(initialSection.classList).find(cls => sectionColors[cls]) || 'active';
  updateNavbarColor(initialClass);
  
  // Establecer el enlace activo inicial en el navbar
  updateActiveNavLink(initialSection.id);
  
  // Asegurar que el enlace de Inicio esté activo al cargar la página si estamos en la sección hero
  if (initialSection.id === 'hero') {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    const homeLink = document.querySelector('.nav-link[href="#hero"]');
    if (homeLink) {
      homeLink.classList.add('active');
    }
  }
}








   

    
   

    // // Navegación suave
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function(e) {
    //         e.preventDefault();
            
    //         const targetId = this.getAttribute('href');
    //         if (targetId === '#') return;
            
    //         // Actualizar el estado activo en el navbar
    //         document.querySelectorAll('.nav-link').forEach(link => {
    //             link.classList.remove('active');
    //         });
    //         this.classList.add('active');
            
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             window.scrollTo({
    //                 top: targetElement.offsetTop - 80,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });

});