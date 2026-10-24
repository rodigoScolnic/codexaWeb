require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

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

app.post("https://codexa-q8oa.onrender.com/api/contacto", contactLimiter, (req, res) => {
    const { nombre, email, mensaje } = req.body;
    console.log("Datos recibidos:", req.body);
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

    console.log("Nueva consulta recibida:", {
        nombre: nombre.trim(),
        email: email.trim(),
        mensaje: mensaje.trim()
    });

    res.status(200).json({
        mensaje: "Consulta recibida correctamente."
    });
});

app.listen(PORT, () => {
    console.log(`Backend de CODEXA activo en el puerto ${PORT}`);
});