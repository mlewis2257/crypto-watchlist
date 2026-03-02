const express = require("express");
const rateLimit = require("express-rate-limit");
const body = require("express-validator");
const authController = require("../../controllers/api/auth");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many authentication attempts, please try again later.",
});

router.post(
  "/login",
  [
    authLimiter,
    body("email").isEmail().normalizeemail(),
    body("password").notEmpty,
  ],
  authController.login,
);

router.post(
  "/verify-mfa",
  [
    authLimiter,
    body("tempToken").notEmpty(),
    body("mfaToken").isLength({ min: 6, max: 6 }),
  ],
  authController.verifyMfa,
);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);
// router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
