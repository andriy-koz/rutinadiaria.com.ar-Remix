import { openDb } from "../../db.js"; // Subir dos niveles para encontrar el archivo en la raíz

// Crear una nueva tarea en la lista de tareas
export async function addTaskToList(taskListId, description) {
  const db = await openDb();
  await db.run("INSERT INTO tasks (task_list_id, description) VALUES (?, ?)", [
    taskListId,
    description,
  ]);
}

// Obtener todas las tareas del usuario autenticado
export async function getTasksByUserId(userId) {
  const db = await openDb();
  return await db.all("SELECT * FROM tasks WHERE user_id = ?", [userId]);
}

// Actualizar una tarea específica
export async function updateTask(taskId, userId, description) {
  const db = await openDb();
  await db.run(
    "UPDATE tasks SET description = ? WHERE id = ? AND user_id = ?",
    [description, taskId, userId]
  );
}

// Eliminar una tarea específica
export async function deleteTask(taskId, userId) {
  const db = await openDb();
  await db.run("DELETE FROM tasks WHERE id = ? AND user_id = ?", [
    taskId,
    userId,
  ]);
}
