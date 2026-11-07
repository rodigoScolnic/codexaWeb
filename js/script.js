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
        descripcion: ` <span class="head-info">Tener una web es darle a tu negocio una presencia profesional, generar confianza y llegar a nuevos clientes.</span> 

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
        titulo: " Desarrollo de aplicaciones",
        descripcion: `Transformá tus ideas en aplicaciones que simplifican tareas, conectan personas y potencian tu negocio.

¿QUÉ BENEFICIOS OBTENÉS?

✦ Soluciones a medida
Aplicaciones adaptadas a tus necesidades.

✦ Mayor productividad
Optimizá tareas y procesos cotidianos.

✦ Acceso desde cualquier lugar
Conectá con tus herramientas cuando las necesites.

✦ Nuevas oportunidades
Ofrecé mejores experiencias a tus clientes.
Tu idea puede convertirse en una herramienta que haga la diferencia.`
    },

    marketing: {
        titulo: "Marketin digital",
        descripcion: `Hacé crecer tu marca, conectá con nuevos clientes y destacate en el mundo digital con estrategias pensadas para tu negocio.

¿QUÉ BENEFICIOS OBTENÉS?

✦ Mayor alcance
Llegá a más personas y potenciales clientes.

✦ Identidad de marca
Construí una imagen sólida y reconocible.

✦ Más interacción
Generá vínculos con tu comunidad y clientes.

✦ Crecimiento estratégico
Convertí tu presencia digital en nuevas oportunidades.

Tu marca tiene algo para ofrecer. Hagamos que todos la conozcan.`
    },

    domotica: {
        titulo: "Domótica",
        descripcion: `Convertí tu hogar o espacio de trabajo en un entorno inteligente, conectando tecnología para simplificar tu día a día.

¿QUÉ BENEFICIOS OBTENÉS?

✦ Mayor comodidad
Controlá dispositivos y espacios de forma sencilla.

✦ Seguridad inteligente
Monitoreá y protegé tus ambientes en tiempo real.

✦ Ahorro energético
Optimizá el consumo de electricidad y recursos.

✦ Control remoto
Gestioná tus dispositivos desde cualquier lugar.

La tecnología trabaja por vos. Viví de una manera más inteligente.`
    },

    consultoria: {
        titulo: "Consultorias personalizadas",
        descripcion: `Cada negocio tiene desafíos diferentes. Te ayudamos a encontrar las mejores soluciones tecnológicas para crecer, optimizar recursos y alcanzar tus objetivos.

¿QUÉ BENEFICIOS OBTENÉS?

✦Asesoramiento personalizado
Analizamos tus necesidades y objetivos.

✦ Decisiones estratégicas
Identificá oportunidades de mejora y crecimiento.

✦ Optimización de recursos
Aprovechá mejor tus herramientas y procesos.

✦ Soluciones eficientes
Encontrá la tecnología adecuada para tu negocio.

Las mejores decisiones comienzan con una buena estrategia.`
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

