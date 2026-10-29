const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.toggle('open');

    navMenu.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    hamburgerBtn.setAttribute('aria-expanded', isOpen);
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

let timeoutMensaje;

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const formData = new FormData(contactForm);

        const datos = {
            nombre: formData.get("nombre"),
            email: formData.get("email"),
            mensaje: formData.get("mensaje")
        };

        // Evitar que quede un mensaje anterior
        clearTimeout(timeoutMensaje);

        formStatus.classList.remove("ocultar");
        formStatus.textContent = "Enviando consulta...";
        formStatus.className = "form-status";

        submitButton.disabled = true;

        try {
            const respuesta = await fetch(
                "https://codexa-web-kj03.onrender.com/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                }
            );

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    resultado.error || "No se pudo enviar la consulta."
                );
            }

            formStatus.textContent =
                "¡Gracias por contactarnos! Recibimos tu consulta correctamente. Nos pondremos en contacto con vos a la brevedad.";

            formStatus.className = "form-status success";
            contactForm.reset();

        } catch (error) {
            console.error("Error al enviar el formulario:", error);

            formStatus.textContent =
                "No pudimos enviar tu consulta. Por favor, intentá nuevamente en unos minutos.";

            formStatus.className = "form-status error";

        } finally {
            submitButton.disabled = false;
        }

        // Desaparecer el mensaje después de 4 segundos
        timeoutMensaje = setTimeout(() => {
            formStatus.classList.add("ocultar");

            // Limpiar el mensaje cuando termine la animación
            setTimeout(() => {
                formStatus.textContent = "";
                formStatus.className = "form-status";
            }, 500);

        }, 4000);
    });
}