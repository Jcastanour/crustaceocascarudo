require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = "secreto"; // Normalmente esto iría en .env

app.use(express.json());
app.use(cors());

let users = [];  // Aquí guardamos usuarios temporalmente
let products = [ // Lista de productos simulados
    { id: 1, name: "Pizza", price: 10000 },
    { id: 2, name: "Hamburguesa", price: 8000 },
    { id: 3, name: "Sushi", price: 12000 }
];  


app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

