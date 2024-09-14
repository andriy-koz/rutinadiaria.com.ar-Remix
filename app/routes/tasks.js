import express from "express";
import { body, param, validationResult } from "express-validator";
import {
  createTaskList,
  addTaskToList,
  getTasksByUserId,
  updateTask,
  deleteTask,
} from "../tasks/index.js";
import authenticateToken from "../middlewares/auth.js"; // Middleware para JWT

const router = express.Router();

// Ruta para crear una nueva tarea
router.post(
  "/",
  authenticateToken,
  [
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    body("taskListId")
      .isInt()
      .withMessage("Se requiere un ID de lista de tareas válido"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { taskListId, description } = req.body;

    try {
      await addTaskToList(taskListId, description);
      res.status(201).json({ message: "Tarea creada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al crear la tarea" });
    }
  }
);

// Ruta para obtener todas las tareas del usuario autenticado
router.get("/", authenticateToken, async (req, res) => {
  try {
    const tasks = await getTasksByUserId(req.user.userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

// Ruta para editar una tarea
router.put(
  "/:id",
  authenticateToken,
  [
    param("id").isInt().withMessage("Se requiere un ID de tarea válido"),
    body("description")
      .notEmpty()
      .withMessage("La nueva descripción es obligatoria"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { description } = req.body;

    try {
      await updateTask(id, req.user.userId, description);
      res.status(200).json({ message: "Tarea actualizada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la tarea" });
    }
  }
);

// Ruta para eliminar una tarea
router.delete(
  "/:id",
  authenticateToken,
  [param("id").isInt().withMessage("Se requiere un ID de tarea válido")],
  async (req, res) => {
    const { id } = req.params;

    try {
      await deleteTask(id, req.user.userId);
      res.status(200).json({ message: "Tarea eliminada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la tarea" });
    }
  }
);

export default router;
