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

module.exports = router;
