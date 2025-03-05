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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol } = req.body;
    const connection = req.app.get("dbConnection");

    // Actualizamos la información del usuario en la base de datos.
    const [result] = await connection.query(
      "UPDATE usuario SET nombre = ?, email = ?, password = ?, rol = ? WHERE id = ?",
      [nombre, email, password, rol, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Opcional: obtenemos el usuario actualizado para devolverlo.
    const [rows] = await connection.query(
      "SELECT id, nombre, email, password, rol FROM usuario WHERE id = ?",
      [id]
    );

    res.json({ usuario: rows[0] });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = req.app.get("dbConnection");

    const [result] = await connection.query(
      "DELETE FROM usuario WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const connection = req.app.get("dbConnection");

    // Verificar si el correo ya está registrado
    const [existingUser] = await connection.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Insertar el nuevo usuario en la base de datos
    const [result] = await connection.query(
      "INSERT INTO usuario (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, password, rol || "cliente"]
    );

    // Retornar el nuevo usuario creado
    const [newUser] = await connection.query(
      "SELECT id, nombre, email, password, rol FROM usuario WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({ usuario: newUser[0] });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};
