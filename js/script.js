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
        descripcion: `Tener una web es darle a tu negocio una presencia profesional, generar confianza y llegar a nuevos clientes.

¿QUÉ BENEFICIOS OBTENÉS?

✦ Mayor visibilidad
Llegá a más personas y potenciales clientes.

✦ Imagen profesional
Transmití confianza y destacate de la competencia.

✦ Disponibilidad 24/7
Mostrá tus servicios en cualquier momento.

✦ Más oportunidades
Convertí visitas en consultas y ventas.

Tu negocio crece. Tu presencia digital también.`
    },

    apps: {
        titulo: "Apps",
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

    automatizacion: {
        titulo: "Automatización",
        descripcion: "Desarrollamos soluciones para automatizar tareas, optimizar procesos y mejorar la productividad de tu negocio."
    },

    domotica: {
        titulo: "Domótica",
        descripcion: "Integramos tecnología inteligente para controlar y automatizar diferentes espacios, mejorando la comodidad y seguridad."
    }

};


// ABRIR MODAL

document.querySelectorAll("a.open-modal").forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const tipo = link.dataset.modal;

        if (!contenido[tipo]) return;

        title.textContent = contenido[tipo].titulo;

        description.textContent = contenido[tipo].descripcion;

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

