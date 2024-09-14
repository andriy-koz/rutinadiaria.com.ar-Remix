const express = require("express");
const { createTaskList, addTaskToList } = require("../app/tasks/index");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Ruta para crear una lista de tareas (requiere autenticación)
router.post("/create", authenticateToken, async (req, res) => {
  const { userId, date } = req.body;

  try {
    await createTaskList(req.user.userId, date); // req.user.userId proviene del middleware
    res.status(201).json({ message: "Lista de tareas creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la lista de tareas" });
  }
});

// Otras rutas que también pueden estar protegidas por el middleware
router.post("/add-task", authenticateToken, async (req, res) => {
  const { taskListId, description } = req.body;

  try {
    await addTaskToList(taskListId, description);
    res.status(201).json({ message: "Tarea añadida exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al añadir la tarea" });
  }
});

module.exports = router;
