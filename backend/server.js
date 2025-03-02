// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const createConnection = require("./db");
const authRoutes = require("./routes/AuthRoutes");

(async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json()); // Permite interpretar JSON en el body

  // Establece la conexión a la BD y la guarda en app.locals o usando app.set()
  const connection = await createConnection();
  app.set("dbConnection", connection);
  // Ahora, en cualquier ruta, se podrá acceder a esta conexión usando req.app.get('dbConnection')

  // Montar las rutas de autenticación bajo el prefijo /api
  app.use("/api", authRoutes);

  // Ruta de prueba
  app.get("/", (req, res) => {
    res.send(
      "Backend con Express y MySQL (con conexión persistente) funcionando!"
    );
  });

  // Inicia el servidor
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
})();
