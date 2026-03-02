const express = require("express");
const rateLimit = require("express-rate-limit");
const { body } = require("express-validator");
const { authenticateToken } = require("../../src/Utilities/jwt");
const userController = require("../../controllers/api/user");

const router = express.Router();

router.post(
  "/",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    body("firstName").trim().notEmpty(),
    body("lastName").trim().notEmpty(),
  ],
  userController.singup,
);

router.get("/me", authenticateToken, userController.getProfile);

router.put(
  "/update-profile",
  [
    authenticateToken,
    body("firstName").optional().trim().notEmpty(),
    body("firstName").optional().trim().notEmpty(),
  ],
  userController.updateProfile,
);

module.exports = router;
