// controllers/authController.js
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM usuario WHERE email = ? AND password = ?";
  try {
    const connection = req.app.get("dbConnection");
    const [results] = await connection.query(query, [email, password]);
    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const usuario = results[0];
    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al intentar loguear al usuario" });
  }
};

exports.register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  try {
    const connection = req.app.get("dbConnection");
    const [selectResults] = await connection.query(
      "SELECT * FROM usuario WHERE email = ?",
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
};

exports.captcha = async (req, res) => {
  try {
    const payload = { captchaPassed: true };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Captcha validado", token });
  } catch (error) {
    console.error("Error en /captcha:", error);
    res.status(500).json({ message: "Error al validar captcha" });
  }
};
