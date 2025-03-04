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
  const { name, description, price, image } = req.body;
  try {
    const connection = req.app.get("dbConnection");
    const [insertResults] = await connection.query(
      "INSERT INTO product (name, description, price, image ) VALUES (?, ?, ?, ?)",
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
