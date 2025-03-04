exports.createOrder = async (req, res) => {
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
      await connection.query(
        "INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad_producto) VALUES (?, ?, ?)",
        [orderId, id_producto, cantidad_producto]
      );
    }
    res
      .status(201)
      .json({ message: "Pedido registrado exitosamente", orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el pedido" });
  }
};

exports.getOrdersForUser = async (req, res) => {
  try {
    // req.user lo pusimos en el middleware verifyToken
    const id_cliente = req.user.id;
    const connection = req.app.get("dbConnection");

    // Join de pedidos y detalles de pedidos segun id_cliente
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
    const pedidos = Object.values(pedidosMap);
    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};

exports.getAllOrders = async (req, res) => {
  // Para el Admin, ver todos los pedidos join pedido y pedido_detalle
  try {
    const connection = req.app.get("dbConnection");
    const [rows] = await connection.query(
      `
      SELECT 
        p.id AS pedido_id,
        p.fecha_venta,
        p.estado,
        d.id_producto,
        d.cantidad_producto,
        pr.name AS nombre_producto,
        p.id_cliente
      FROM pedido p
      JOIN pedido_detalle d ON p.id = d.id_pedido
      JOIN product pr ON d.id_producto = pr.id
      ORDER BY p.fecha_venta DESC
      `
    );

    // Agrupar pedidos
    const pedidosMap = {};
    for (const row of rows) {
      const {
        pedido_id,
        fecha_venta,
        estado,
        id_producto,
        cantidad_producto,
        nombre_producto,
        id_cliente,
      } = row;
      if (!pedidosMap[pedido_id]) {
        pedidosMap[pedido_id] = {
          id: pedido_id,
          fecha_venta,
          estado,
          id_cliente,
          detalles: [],
        };
      }
      pedidosMap[pedido_id].detalles.push({
        id_producto,
        nombre_producto,
        cantidad_producto,
      });
    }
    const pedidos = Object.values(pedidosMap);
    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener todos los pedidos:", error);
    res.status(500).json({ message: "Error al obtener todos los pedidos" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  // Para el Chef, marcar un pedido como entregado
  const { orderId } = req.params;
  try {
    const connection = req.app.get("dbConnection");
    const [result] = await connection.query(
      "UPDATE pedido SET estado = 'entregado' WHERE id = ?",
      [orderId]
    );
    res.json({ message: "Pedido actualizado" });
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    res.status(500).json({ message: "Error al actualizar el pedido" });
  }
};
