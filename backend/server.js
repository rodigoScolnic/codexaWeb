require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify()
    .then(() => {
        console.log("✅ Nodemailer está listo para enviar correos");
    })
    .catch((error) => {
        console.error("❌ Error al conectar con Gmail:", error.message);
    });

const app = express();
const PORT = process.env.PORT || 3001;

const frontendURL =
    process.env.FRONTEND_URL || "http://localhost:5500";

app.use(helmet());

app.use(cors({
    origin: frontendURL,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false
});

app.get("/", (req, res) => {
    res.json({
        mensaje: "Backend de CODEXA funcionando 🚀"
    });
});

app.post("/api/contacto", contactLimiter, async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (
        typeof nombre !== "string" ||
        typeof email !== "string" ||
        typeof mensaje !== "string" ||
        !nombre.trim() ||
        !email.trim() ||
        !mensaje.trim()
    ) {
        return res.status(400).json({
            error: "Completá todos los campos correctamente."
        });
    }

    const nombreLimpio = nombre.trim();
    const emailLimpio = email.trim();
    const mensajeLimpio = mensaje.trim();

    try {
        await transporter.sendMail({
            from: `"Codexa Web" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: emailLimpio,
            subject: `Nueva consulta de ${nombreLimpio}`,
            text: `Nueva consulta recibida desde Codexa.

Nombre: ${nombreLimpio}
Email: ${emailLimpio}

Mensaje:
${mensajeLimpio}`
        });

        console.log("Correo enviado correctamente:", emailLimpio);

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

app.listen(PORT, () => {
    console.log(`Backend de CODEXA activo en el puerto ${PORT}`);
});