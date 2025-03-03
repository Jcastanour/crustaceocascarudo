// db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST, // Ej: "localhost"
    user: process.env.DB_USER, // Ej: "root"
    password: process.env.DB_PASSWORD, // Tu contraseña
    database: process.env.DB_NAME, // Ej: "crustaceodb"
  });
  console.log("Conexión a MySQL exitosa");
  if (!connection) {
    console.log("Error al conectar a la base de datos");
    return;
  }
  return connection;
}

module.exports = createConnection;
