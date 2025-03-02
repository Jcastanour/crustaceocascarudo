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
  return connection;
}

module.exports = createConnection;
