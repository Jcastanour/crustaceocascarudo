const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/authMiddleware");

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Buscar usuario y contraseña en la base de datos
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
      expiresIn: "1h", // Puedes ajustar el tiempo de expiración según tus necesidades.
    });
    // console.log(results);
    // console.log(usuario);
    res.json({ message: "Login exitoso", token });
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
});

router.post("/captcha", async (req, res) => {
  try {
    const payload = { captchaPassed: true };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Ejemplo: "1m"
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

router.post("/pedidos", async (req, res) => {
  const { id_cliente, productos } = req.body;

  try {
    const connection = req.app.get("dbConnection");

    const [headerResult] = await connection.query(
      "INSERT INTO pedido (id_cliente, estado) VALUES (?, 'pendiente')",
      [id_cliente]
    );
    const orderId = headerResult.insertId;

    for (let producto of productos) {
      const { id_producto, cantidad_producto } = producto;

      const [insertResults] = await connection.query(
        "INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad_producto) VALUES (?, ?, ?)",
        [orderId, id_producto, cantidad_producto]
      );
    }
    res.status(201).json({ message: "Pedido registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al intentar registrar el pedido" });
  }
});

router.get("/orders", verifyToken, async (req, res) => {
  try {
    const id_cliente = req.user.id;
    const connection = req.app.get("dbConnection");

    // Consulta SQL que une pedido y pedido_detalle,
    // join y filtrado por id_cliente
    const [rows] = await connection.query(
      `
      SELECT 
        p.id AS pedido_id,
        p.fecha_venta,
        p.estado,
        d.id_producto,
        d.cantidad_producto,
        pr.name AS nombre_producto
      FROM pedido p
      JOIN pedido_detalle d ON p.id = d.id_pedido
      JOIN product pr ON d.id_producto = pr.id
      WHERE p.id_cliente = ?
      ORDER BY p.fecha_venta DESC
    `,
      [id_cliente]
    );

    console.log(rows);

    // rows contendrá varias filas, una por cada producto de cada pedido.
    // Necesitamos agruparlas por pedido para enviarlas en un formato organizado.
    const pedidosMap = {};

    for (const row of rows) {
      const {
        pedido_id,
        fecha_venta,
        estado,
        id_producto,
        cantidad_producto,
        nombre_producto,
      } = row;

      if (!pedidosMap[pedido_id]) {
        pedidosMap[pedido_id] = {
          id: pedido_id,
          fecha_venta,
          estado,
          detalles: [],
        };
      }
      pedidosMap[pedido_id].detalles.push({
        id_producto,
        nombre_producto,
        cantidad_producto,
      });
    }

    // Convertimos el objeto pedidosMap en un array
    const pedidos = Object.values(pedidosMap);

    console.log(pedidos);

    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
});

module.exports = router;
