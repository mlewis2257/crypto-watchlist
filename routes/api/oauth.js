const express = require("express");
const oauthController = require("../../controllers/api/oauth");
const router = express.Router();

// Initiate Google OAuth
router.get("/google", oauthController.initiateGoogle);
router.get("/google/callback", oauthController.handleGoogleCallback);
router.post("/callback", oauthController.handleCallback);

module.exports = router;
