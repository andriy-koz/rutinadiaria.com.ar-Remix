import express from "express";
import { body, validationResult } from "express-validator";
import { createTaskList, addTaskToList } from "../tasks/index.js";
import authenticateToken from "../middlewares/auth.js"; // Usa import en lugar de require

const router = express.Router();

// Ruta para crear una lista de tareas (requiere autenticación)
router.post(
  "/create",
  authenticateToken,
  [body("date").isDate().withMessage("Debe proporcionar una fecha válida")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date } = req.body;

    try {
      await createTaskList(req.user.userId, date);
      res.status(201).json({ message: "Lista de tareas creada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al crear la lista de tareas" });
    }
  }
);

// Otras rutas que también pueden estar protegidas por el middleware
router.post(
  "/add-task",
  authenticateToken,
  [body("description").notEmpty().withMessage("La descripción es obligatoria")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { taskListId, description } = req.body;

    try {
      await addTaskToList(taskListId, description);
      res.status(201).json({ message: "Tarea añadida exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al añadir la tarea" });
    }
  }
);

export default router;
