"use strict";

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
const menuLinks = document.querySelectorAll(".nav-menu a");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeModalBtn = document.querySelector(".close-modal");
const modalCta = document.querySelector(".modal-btn");

const WHATSAPP_BASE = "https://wa.me/5491139068165?text=";
const DEFAULT_MESSAGE = "Hola, me interesa hacer una consulta sobre sus servicios.";

const contenido = {
    web: {
        titulo: "Desarrollo web",
        mensaje: "Hola, me interesa consultar por el servicio de desarrollo web.",
        descripcion: `<span class="head-info">Tener una web es darle a tu negocio una presencia profesional, generar confianza y llegar a nuevos clientes.</span>

¿QUÉ BENEFICIOS OBTENÉS?

<span>✦ Mayor visibilidad</span>
Llegá a más personas y potenciales clientes.

<span>✦ Imagen profesional</span>
Transmití confianza y destacate de la competencia.

<span>✦ Disponibilidad 24/7</span>
Mostrá tus servicios en cualquier momento.

<span>✦ Más oportunidades</span>
Convertí visitas en consultas y ventas.

<span class="head-info">Tu negocio crece. Tu presencia digital también.</span>`
    },

    apps: {
        titulo: "Desarrollo de aplicaciones",
        mensaje: "Hola, me interesa consultar por el servicio de desarrollo de aplicaciones.",
        descripcion: `<span class="head-info">Transformá tus ideas en aplicaciones que simplifican tareas, conectan personas y potencian tu negocio.</span>

¿QUÉ BENEFICIOS OBTENÉS?

<span>✦ Soluciones a medida</span>
Aplicaciones adaptadas a tus necesidades.

<span>✦ Mayor productividad</span>
Optimizá tareas y procesos cotidianos.

<span>✦ Acceso desde cualquier lugar</span>
Conectá con tus herramientas cuando las necesites.

<span>✦ Nuevas oportunidades</span>
Ofrecé mejores experiencias a tus clientes.

<span class="head-info">Tu idea puede convertirse en una herramienta que haga la diferencia.</span>`
    },

    marketing: {
        titulo: "Marketing digital",
        mensaje: "Hola, me interesa consultar por el servicio de marketing digital.",
        descripcion: `<span class="head-info">Hacé crecer tu marca, conectá con nuevos clientes y destacate en el mundo digital con estrategias pensadas para tu negocio.</span>

¿QUÉ BENEFICIOS OBTENÉS?

<span>✦ Mayor alcance</span>
Llegá a más personas y potenciales clientes.

<span>✦ Identidad de marca</span>
Construí una imagen sólida y reconocible.

<span>✦ Más interacción</span>
Generá vínculos con tu comunidad y clientes.

<span>✦ Crecimiento estratégico</span>
Convertí tu presencia digital en nuevas oportunidades.

<span class="head-info">Tu marca tiene algo para ofrecer. Hagamos que todos la conozcan.</span>`
    },

    domotica: {
        titulo: "Domótica y automatización",
        mensaje: "Hola, me interesa consultar por el servicio de domótica y automatización.",
        descripcion: `<span class="head-info">Convertí tu hogar o espacio de trabajo en un entorno inteligente, conectando tecnología para simplificar tu día a día.</span>

¿QUÉ BENEFICIOS OBTENÉS?

<span>✦ Mayor comodidad</span>
Controlá dispositivos y espacios de forma sencilla.

<span>✦ Seguridad inteligente</span>
Monitoreá y protegé tus ambientes en tiempo real.

<span>✦ Ahorro energético</span>
Optimizá el consumo de electricidad y recursos.

<span>✦ Control remoto</span>
Gestioná tus dispositivos desde cualquier lugar.

<span class="head-info">La tecnología trabaja por vos. Viví de una manera más inteligente.</span>`
    },

    procesos: {
        titulo: "Automatización de procesos",
        mensaje: "Hola, me interesa consultar por el servicio de automatización de procesos.",
        descripcion: `<span class="head-info">Simplificá el trabajo de tu negocio automatizando tareas repetitivas y conectando las herramientas que usás todos los días.</span>

¿QUÉ BENEFICIOS OBTENÉS?

<span>✦ Ahorro de tiempo</span>
Automatizá tareas manuales para enfocarte en lo importante.

<span>✦ Menos errores</span>
Reducí equivocaciones en tareas repetitivas y carga de información.

<span>✦ Procesos conectados</span>
Integrá aplicaciones, formularios y sistemas para que trabajen en conjunto.

<span>✦ Mayor productividad</span>
Agilizá flujos de trabajo y optimizá los recursos de tu negocio.

<span class="head-info">Hacé que tus procesos trabajen de forma más simple y eficiente.</span>`
    },

    consultoria: {
        titulo: "Consultoría tecnológica",
        mensaje: "Hola, me interesa consultar por el servicio de consultoría tecnológica.",
        descripcion: `<span class="head-info">Cada negocio tiene desafíos diferentes. Te ayudamos a encontrar las mejores soluciones tecnológicas para crecer, optimizar recursos y alcanzar tus objetivos.</span>

¿QUÉ BENEFICIOS OBTENÉS?

<span>✦ Asesoramiento personalizado</span>
Analizamos tus necesidades y objetivos.

<span>✦ Decisiones estratégicas</span>
Identificá oportunidades de mejora y crecimiento.

<span>✦ Optimización de recursos</span>
Aprovechá mejor tus herramientas y procesos.

<span>✦ Soluciones eficientes</span>
Encontrá la tecnología adecuada para tu negocio.

<span class="head-info">Las mejores decisiones comienzan con una buena estrategia.</span>`
    }
};

let lastFocusedElement = null;

function setMenuState(isOpen) {
    if (!hamburgerBtn || !navMenu) return;

    hamburgerBtn.classList.toggle("open", isOpen);
    navMenu.classList.toggle("open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    hamburgerBtn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
}

function closeMenu() {
    setMenuState(false);
}

function openModal(serviceKey, triggerElement) {
    const service = contenido[serviceKey];
    if (!service || !modal || !modalTitle || !modalDescription) return;

    closeMenu();
    lastFocusedElement = triggerElement || document.activeElement;

    modalTitle.textContent = service.titulo;
    // El HTML es contenido estático definido en este archivo.
    modalDescription.innerHTML = service.descripcion;

    modal.dataset.message = service.mensaje;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (closeModalBtn) closeModalBtn.focus();
}

function closeModal() {
    if (!modal || !modal.classList.contains("active")) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
        const isOpen = hamburgerBtn.getAttribute("aria-expanded") !== "true";
        setMenuState(isOpen);
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 701px)").matches) closeMenu();
    });
}

document.querySelectorAll(".open-modal[data-modal]").forEach(card => {
    card.addEventListener("click", () => {
        openModal(card.dataset.modal, card);
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
}

if (modal) {
    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal();
    });
}

if (modalCta) {
    modalCta.addEventListener("click", () => {
        const message = modal?.dataset.message || DEFAULT_MESSAGE;
        const url = WHATSAPP_BASE + encodeURIComponent(message);
        window.open(url, "_blank", "noopener,noreferrer");
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();

    if (event.key === "Tab" && modal?.classList.contains("active")) {
        const focusable = modal.querySelectorAll(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});


// Carrusel de proyectos destacados
(() => {
    const track = document.getElementById("projectsTrack");
    const slides = [...document.querySelectorAll(".project-slide")];
    const dots = [...document.querySelectorAll(".carousel-dot")];
    const previous = document.getElementById("projectPrev");
    const next = document.getElementById("projectNext");
    if (!track || slides.length === 0 || !previous || !next) return;

    let current = 0;
    const showProject = index => {
        current = Math.max(0, Math.min(index, slides.length - 1));
        track.style.transform = `translateX(-${current * 100}%)`;
        slides.forEach((slide, i) => {
            const active = i === current;
            slide.classList.toggle("is-active", active);
            slide.setAttribute("aria-hidden", String(!active));
            slide.querySelectorAll("a").forEach(link => {
                if (active) link.removeAttribute("tabindex");
                else link.setAttribute("tabindex", "-1");
            });
        });
        dots.forEach((dot, i) => {
            const active = i === current;
            dot.classList.toggle("active", active);
            dot.setAttribute("aria-current", String(active));
        });
        previous.disabled = current === 0;
        next.disabled = current === slides.length - 1;
    };
    previous.addEventListener("click", () => showProject(current - 1));
    next.addEventListener("click", () => showProject(current + 1));
    dots.forEach(dot => dot.addEventListener("click", () => showProject(Number(dot.dataset.slide))));
    const carousel = track.closest(".projects-carousel");
    let touchStart = 0;
    carousel.addEventListener("touchstart", event => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener("touchend", event => {
        const delta = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(delta) > 55) showProject(current + (delta < 0 ? 1 : -1));
    }, { passive: true });
    showProject(0);
})();
