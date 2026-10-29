
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Seguridad y configuración
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

const frontendURL = process.env.FRONTEND_URL;

app.use(
    cors({
        origin: frontendURL,
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"]
    })
);

// Límite de solicitudes al formulario
const contactoLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Demasiados intentos. Esperá unos minutos y volvé a intentarlo."
    }
});

// Ruta principal para comprobar que el backend funciona
app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "Backend de Codexa funcionando correctamente."
    });
});

// Formulario de contacto
app.post("/api/contacto", contactoLimiter, async (req, res) => {
    const { nombre, email, mensaje } = req.body || {};

    // Validaciones
    if (
        typeof nombre !== "string" ||
        typeof email !== "string" ||
        typeof mensaje !== "string"
    ) {
        return res.status(400).json({
            error: "Completá todos los campos correctamente."
        });
    }

    const nombreLimpio = nombre.trim();
    const emailLimpio = email.trim();
    const mensajeLimpio = mensaje.trim();

    if (!nombreLimpio || !emailLimpio || !mensajeLimpio) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios."
        });
    }

    if (
        nombreLimpio.length > 100 ||
        emailLimpio.length > 254 ||
        mensajeLimpio.length > 5000
    ) {
        return res.status(400).json({
            error: "Uno de los campos supera la longitud permitida."
        });
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio);

    if (!emailValido) {
        return res.status(400).json({
            error: "Ingresá una dirección de email válida."
        });
    }

    // Envío del correo mediante Resend
    try {
        const { data, error } = await resend.emails.send({
            from: "Codexa <onboarding@resend.dev>",
            to: [process.env.EMAIL_USER],
            replyTo: emailLimpio,
            subject: `Nueva consulta de ${nombreLimpio}`,
            text: `Nueva consulta recibida desde Codexa.

Nombre: ${nombreLimpio}
Email: ${emailLimpio}

Mensaje:
${mensajeLimpio}`
        });

        if (error) {
            console.error("Error de Resend:", error);

            return res.status(500).json({
                error: "No pudimos enviar tu consulta."
            });
        }

        console.log("Correo enviado correctamente:", data.id);

        return res.status(200).json({
            mensaje: "Consulta recibida correctamente."
        });
    } catch (error) {
        console.error("Error al enviar el correo:", error);

        return res.status(500).json({
            error: "No pudimos enviar tu consulta. Intentá nuevamente más tarde."
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
