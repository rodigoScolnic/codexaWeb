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

        submitButton.disabled = true;
        formStatus.textContent = "Enviando consulta...";

        try {
            const respuesta = await fetch(
                "https://codexa-q8oa.onrender.com/api/contacto",
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

            formStatus.textContent = resultado.mensaje;
            contactForm.reset();
        } catch (error) {
            console.error("Error al enviar el formulario:", error);

            formStatus.textContent =
                "No pudimos enviar tu consulta. Intentá nuevamente.";
        } finally {
            submitButton.disabled = false;
        }
    });
}