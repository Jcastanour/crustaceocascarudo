// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyToken = require("../middlewares/AuthMiddleware");
const allowRoles = require("../middlewares/roleMiddleware");

// Para crear un pedido (puede ser accedido por cualquier cliente)
router.post("/pedidos", orderController.createOrder);

// Para que el cliente vea su historial de pedidos
router.get("/orders", verifyToken, orderController.getOrdersForUser);

router.get(
  "/chefpanel/orders",
  verifyToken,
  allowRoles("chef"),
  orderController.getPendingOrders
);

// Para el Admin: ver todos los pedidos
router.get(
  "/adminpanel/orders",
  verifyToken,
  allowRoles("admin"),
  orderController.getAllOrders
);

// Para el Chef: actualizar el estado de un pedido (por ejemplo, marcarlo como entregado)
router.put(
  "/chefpanel/orders/:orderId",
  verifyToken,
  allowRoles("chef"),
  orderController.updateOrderStatus
);

module.exports = router;
