const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Buscar usuario y contraseña en la base de datos
  const query = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
  try {
    const connection = req.app.get("dbConnection");
    const [results] = await connection.query(query, [email, password]);
    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const usuario = results[0];
    // console.log(results);
    // console.log(usuario);
    res.json({ message: "Login exitoso", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al intentar loguear al usuario" });
  }
});

router.post("/register", async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const connection = req.app.get("dbConnection");

    // Verificar si el email ya está registrado

    const [selectResults] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if (selectResults.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    const [insertResults] = await connection.query(
      "INSERT INTO usuario (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, password, rol || "cliente"]
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      userId: insertResults.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al intentar registrar al usuario" });
  }
});

router.post("/captcha", async (req, res) => {
  try {
    const payload = { captchaPassed: true };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 30, // Ejemplo: "1m"
    });

    res.json({ message: "Captcha validado", token });
  } catch (error) {
    console.error("Error en /captcha:", error);
    res.status(500).json({ message: "Error al validar captcha" });
  }
});

router.get("/productos", async (req, res) => {
  try {
    const connection = req.app.get("dbConnection");
    const [results] = await connection.query("SELECT * FROM product");
    res.json({ productos: results });
    console.log(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al intentar obtener los productos" });
  }
});

module.exports = router;
