const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const aMenu = document.querySelectorAll(".option")

if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
        const isOpen = hamburgerBtn.classList.toggle('open');

        navMenu.classList.toggle('open', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
}

aMenu.forEach(e => {
    e.addEventListener('click', ()=>{
        navMenu.classList.remove('open')
        hamburgerBtn.classList.remove('open')

         document.body.classList.remove('menu-open')
    })
})

const modal = document.getElementById("modal");

const title = document.getElementById("modal-title");

const description = document.getElementById("modal-description");

const closeModal = document.querySelector(".close-modal");


// CONTENIDO DE CADA MODAL

const contenido = {

    web: {
        titulo: "Desarrollo web",
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
        titulo: "Domótica",
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

    consultoria: {
        titulo: "Consultorías personalizadas",
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


// ABRIR MODAL

document.querySelectorAll("a.open-modal").forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const tipo = link.dataset.modal;

        if (!contenido[tipo]) return;

        title.textContent = contenido[tipo].titulo;

        description.innerHTML = contenido[tipo].descripcion;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// CERRAR MODAL CON LA X

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

    document.body.style.overflow = "";

});


// CERRAR AL HACER CLICK AFUERA

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }

});


// CERRAR CON ESCAPE

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }

});

