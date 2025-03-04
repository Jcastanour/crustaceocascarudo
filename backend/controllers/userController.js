exports.getAllUsers = async (req, res) => {
  try {
    const connection = req.app.get("dbConnection");
    const [results] = await connection.query(
      "SELECT id, nombre, email, password, rol FROM usuario"
    );
    res.json({ usuarios: results });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};
