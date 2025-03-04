const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.rol)) {
      next();
    } else {
      return res.status(403).json({ message: "Acceso denegado" });
    }
  };
};

module.exports = allowRoles;
