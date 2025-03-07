const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/AuthMiddleware");
const allowRoles = require("../middlewares/roleMiddleware");

router.get(
  "/usuarios",
  verifyToken,
  allowRoles("admin"),
  userController.getAllUsers
);

router.put(
  "/usuarios/:id",
  verifyToken,
  allowRoles("admin"),
  userController.updateUser
);

router.delete(
  "/usuarios/:id",
  verifyToken,
  allowRoles("admin"),
  userController.deleteUser
);

router.post(
  "/usuarios",
  verifyToken,
  allowRoles("admin"),
  userController.createUser
);
module.exports = router;
