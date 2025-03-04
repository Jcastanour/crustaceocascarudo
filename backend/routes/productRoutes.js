// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middlewares/AuthMiddleware");

const allowRoles = require("../middlewares/roleMiddleware");

// Cualquier usuario autenticado puede ver productos
router.get("/", productController.getProducts);

// Solo admin puede agregar productos
router.post(
  "/",
  verifyToken,
  allowRoles("admin"),
  productController.addProduct
);

module.exports = router;
