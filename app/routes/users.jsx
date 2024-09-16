// routes/users.js

import { Router } from "express";
import { check, validationResult } from "express-validator";
import { registerUser, authenticateUser } from "../users/index";
import pkg from "jsonwebtoken";
const { sign } = pkg;

const router = Router();

// Ruta de registro de usuario
router.post(
  "/register",
  [
    check("username")
      .isLength({ min: 3 })
      .withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
    check("email").isEmail().withMessage("Debe proporcionar un email válido"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Verificar si el correo ya existe
      const existingUser = await checkIfEmailExists(email);
      if (existingUser) {
        return res.status(400).json({ error: "El correo ya está en uso" });
      }

      await registerUser(username, email, password);
      return res
        .status(201)
        .json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al registrar el usuario" });
    }
  }
);

// Ruta de autenticación de usuario
router.post(
  "/login",
  [
    check("username")
      .notEmpty()
      .withMessage("El nombre de usuario es obligatorio"),
    check("password").notEmpty().withMessage("La contraseña es obligatoria"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await authenticateUser(username, password);
      if (!user) {
        return res.status(400).json({ error: "Credenciales incorrectas" });
      }

      // Generar el token JWT
      const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ token, message: "Inicio de sesión exitoso" });
    } catch (error) {
      return res.status(500).json({ error: "Error al autenticar el usuario" });
    }
  }
);

export default router;
