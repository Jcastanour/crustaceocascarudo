// controllers/productController.js

exports.getProducts = async (req, res) => {
  try {
    const connection = req.app.get("dbConnection");
    const [results] = await connection.query("SELECT * FROM product");
    res.json({ productos: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  // Si se subió un archivo, usa el nombre generado;
  const image = req.file
    ? `images/${req.file.filename}`
    : req.body.image || null;

  console.log("addProduct req.body:", req.body);
  try {
    const connection = req.app.get("dbConnection");
    const [insertResults] = await connection.query(
      "INSERT INTO product (name, description, price, image) VALUES (?, ?, ?, ?)",
      [name, description, price, image]
    );
    res.status(201).json({
      message: "Producto agregado exitosamente",
      productId: insertResults.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar el producto" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  console.log("updateProduct req.body:", req.body);
  try {
    const connection = req.app.get("dbConnection");
    let query, params;

    if (req.file) {
      // Si se envió una nueva imagen, se actualiza la columna image
      const image = `images/${req.file.filename}`;
      query =
        "UPDATE product SET name = ?, description = ?, price = ?, image = ? WHERE id = ?";
      params = [name, description, price, image, id];
    } else {
      // Si no se envió imagen nueva, se actualizan solo los demás campos
      query =
        "UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?";
      params = [name, description, price, id];
    }

    const [result] = await connection.query(query, params);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = req.app.get("dbConnection");
    const [result] = await connection.query(
      "DELETE FROM product WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
