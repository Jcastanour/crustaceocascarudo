// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const createConnection = require("./db/db");
const authRoutes = require("./routes/AuthRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

(async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json()); // Permite interpretar JSON en el body

  // Conexion BD
  const connection = await createConnection();
  app.set("dbConnection", connection);

  // Rutas con prefijos
  app.use("/api/auth", authRoutes);
  app.use("/api/productos", productRoutes);
  app.use("/api", orderRoutes);
  app.use("/api", userRoutes);

  // Ruta de prueba
  app.get("/", (req, res) => {
    res.send(
      "Backend con Express y MySQL (con conexión funcionando melo) funcionando!"
    );
  });

  // Inicia el servidor
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
})();
