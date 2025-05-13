document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el contenedor de animación existe
    const container = document.getElementById('animation-container');
    if (!container) {
        console.warn('Contenedor de animación no encontrado, la animación 3D no se inicializará');
        return;
    }
    
    // Configuración inicial
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Variables globales
    let sphere, particles, isExploded = false, resetTimeout, isResetting = false;
    const RESET_DELAY = 6000;
    const MOUSE_DISTANCE_THRESHOLD = 0.6;
    const PARTICLE_COUNT = 2000;
    const originalPositions = [];
    let resetStartTime = 0;
    const TRANSITION_DURATION = 1000; // 1 segundo para la transición

    // Inicialización
    function init() {
        setupRenderer();
        setupCamera();
        setupLights();
        createSphere();
        createParticles();
        setupEventListeners();
        animate();
    }

    function setupRenderer() {
        // Obtener el contenedor de la animación
        const container = document.getElementById('animation-container');
        if (!container) {
            console.error('No se encontró el contenedor de animación');
            return;
        }
        
        // Ajustar el tamaño al contenedor en lugar de la ventana completa
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild(renderer.domElement);
    }

    function setupCamera() {
        camera.position.z = 3.5;
        // Desactivar controles de órbita para una mejor experiencia en el portafolio
        // new THREE.OrbitControls(camera, renderer.domElement);
    }

    function setupLights() {
        scene.add(new THREE.AmbientLight(0x404040));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
    }

    function createSphere() {
        const geometry = new THREE.SphereGeometry(0.8, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0xff0080,
            roughness: 0.2,
            metalness: 0.7,
            transparent: true,
            opacity: 1
        });
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
    }

    function createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);

        // Crear textura para partículas
        const particleTexture = createParticleTexture();

        // Inicializar posiciones y tamaños
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 1;
            
            originalPositions.push({
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.sin(phi) * Math.sin(theta),
                z: radius * Math.cos(phi)
            });
            
            sizes[i] = Math.random() * 0.2 + 0.1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        particles = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x7928ca,
                size: 0.2,
                sizeAttenuation: true,
                transparent: true,
                opacity: 1,
                map: particleTexture,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            })
        );
        particles.visible = false;
        scene.add(particles);
    }

    function createParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        // Crear gradiente para partícula
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();
        
        return new THREE.CanvasTexture(canvas);
    }

    function setupEventListeners() {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        window.addEventListener('mousemove', (event) => {
            // Obtener la posición del contenedor
            const containerRect = container.getBoundingClientRect();
            
            // Verificar si el mouse está dentro del contenedor
            if (
                event.clientX >= containerRect.left && 
                event.clientX <= containerRect.right && 
                event.clientY >= containerRect.top && 
                event.clientY <= containerRect.bottom
            ) {
                // Convertir coordenadas del mouse relativas al contenedor
                mouse.x = ((event.clientX - containerRect.left) / containerRect.width) * 2 - 1;
                mouse.y = -((event.clientY - containerRect.top) / containerRect.height) * 2 + 1;
                
                    // Reinicio por distancia
                const mouseDistance = Math.sqrt(mouse.x**2 + mouse.y**2);
                if (isExploded && mouseDistance > MOUSE_DISTANCE_THRESHOLD) {
                    startResetTransition();
                    return;
                }

                // Detección de colisión
                raycaster.setFromCamera(mouse, camera);
                if (raycaster.intersectObject(sphere).length > 0 && !isExploded) {
                    triggerExplosion();
                }
            }
        });

        window.addEventListener('resize', () => {
            const container = document.getElementById('animation-container');
            if (container) {
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                
                camera.aspect = containerWidth / containerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(containerWidth, containerHeight);
            }
        });
    }

    function triggerExplosion() {
        isExploded = true;
        isResetting = false;
        sphere.visible = false;
        particles.visible = true;
        resetTimeout = setTimeout(startResetTransition, RESET_DELAY);
        animateExplosion();
    }

    function startResetTransition() {
        if (isResetting) return;
        isResetting = true;
        isExploded = false;
        resetStartTime = Date.now();
        particles.visible = true;
        sphere.visible = false;
        if (resetTimeout) clearTimeout(resetTimeout);
    }

    function resetScene() {
        isResetting = false;
        particles.visible = false;
        sphere.visible = true;
        
        // Resetear partículas
        const positions = particles.geometry.attributes.position.array;
        originalPositions.forEach((pos, i) => {
            positions[i * 3] = pos.x;
            positions[i * 3 + 1] = pos.y;
            positions[i * 3 + 2] = pos.z;
        });
        particles.geometry.attributes.position.needsUpdate = true;
    }

    function animateExplosion() {
        const positions = particles.geometry.attributes.position.array;
        const now = Date.now();
        const explosionSpeed = 0.05;

        if (isResetting) {
            // Transición suave de reinicio
            const progress = (now - resetStartTime) / TRANSITION_DURATION;
            
            // Interpolar posiciones
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                positions[i * 3] = THREE.MathUtils.lerp(
                    positions[i * 3],
                    originalPositions[i].x,
                    progress
                );
                positions[i * 3 + 1] = THREE.MathUtils.lerp(
                    positions[i * 3 + 1],
                    originalPositions[i].y,
                    progress
                );
                positions[i * 3 + 2] = THREE.MathUtils.lerp(
                    positions[i * 3 + 2],
                    originalPositions[i].z,
                    progress
                );
            }

            // Interpolar opacidades
            particles.material.opacity = 1 - progress;
            sphere.material.opacity = progress;

            if (progress >= 1) {
                resetScene();
            }
        } else if (isExploded) {
            // Animación de explosión
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const randomDirection = {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                    z: (Math.random() - 0.5) * 2
                };

                positions[i * 3] += randomDirection.x * explosionSpeed;
                positions[i * 3 + 1] += randomDirection.y * explosionSpeed;
                positions[i * 3 + 2] += randomDirection.z * explosionSpeed;
            }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        if (isExploded || isResetting) requestAnimationFrame(animateExplosion);
    }

    function animate() {
        requestAnimationFrame(animate);
        if (!isExploded && !isResetting) {
            sphere.rotation.x += 0.005;
            sphere.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
    }

    // Iniciar la aplicación
    init();
});