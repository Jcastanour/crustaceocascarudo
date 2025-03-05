// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middlewares/AuthMiddleware");
const upload = require("../middlewares/multerMiddleware"); // Asegúrate de que la ruta sea correcta
const allowRoles = require("../middlewares/roleMiddleware");

// Cualquier usuario autenticado puede ver productos
router.get("/", productController.getProducts);

// Solo admin puede agregar productos
router.post(
  "/",
  verifyToken,
  allowRoles("admin"),
  upload.single("image"),
  productController.addProduct
);

router.put(
  "/:id",
  verifyToken,
  allowRoles("admin"),
  upload.single("image"),
  productController.updateProduct
);
router.delete(
  "/:id",
  verifyToken,
  allowRoles("admin"),
  productController.deleteProduct
);

module.exports = router;
