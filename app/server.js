import express from "express";
import usersRoutes from "./routes/users.js"; // Importar las rutas con extensión .js
import tasksRoutes from "./routes/tasks.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(morgan("combined")); // Middleware de logs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de usuarios y tareas
app.use("/users", usersRoutes);
app.use("/tasks", tasksRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
