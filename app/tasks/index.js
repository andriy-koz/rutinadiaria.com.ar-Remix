import { openDb } from "../../db.js"; // Subir dos niveles para encontrar el archivo en la raíz

export async function createTaskList(userId, date) {
  const db = await openDb();
  await db.run("INSERT INTO task_lists (user_id, date) VALUES (?, ?)", [
    userId,
    date,
  ]);
}

export async function addTaskToList(taskListId, description) {
  const db = await openDb();
  await db.run("INSERT INTO tasks (task_list_id, description) VALUES (?, ?)", [
    taskListId,
    description,
  ]);
}
