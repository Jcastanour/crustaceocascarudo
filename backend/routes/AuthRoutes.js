const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/AuthMiddleware");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/captcha", authController.captcha);

module.exports = router;
