const express = require("express");
const usersRoutes = require("./routes/users");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de usuarios
app.use("/users", usersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
