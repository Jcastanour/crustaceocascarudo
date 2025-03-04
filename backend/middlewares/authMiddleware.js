const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Leer el encabezado Authorization
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No se envió token" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Asignar la información decodificada a req.user
    req.user = decoded;
    next(); // Continuar al siguiente middleware o a la ruta
  } catch (error) {
    console.error("Error al verificar token:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = verifyToken;
