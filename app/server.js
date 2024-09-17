import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());

// #region authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // if (!token) {
  //   return res.sendStatus(401); // Unauthorized if no token is present
  // }

  // Here, you would verify the token. For simplicity, we'll accept any token.
  next();
}
// #endregion

// #region tasks model
let tasks = [];
let currentId = 1;

export function getTasks() {
  return tasks;
}

export function addTask(description) {
  const newTask = { id: currentId++, description };
  tasks.push(newTask);
  return newTask;
}

export function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId, 10));
}
// #endregion

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
