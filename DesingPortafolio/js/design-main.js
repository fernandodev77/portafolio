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

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
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
            delay: 5000,
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
            delay: 8000,
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

    // Animación al hacer scroll
    const animateElements = document.querySelectorAll('.design-section, .section-title, .section-description, .design-card, .logo-item, .merch-item');
    
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    }

    // Comprobar posición inicial
    checkScroll();

    // Comprobar al hacer scroll
    window.addEventListener('scroll', checkScroll);

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

    // Cambiar color de la barra de navegación al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});