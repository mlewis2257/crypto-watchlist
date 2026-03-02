const express = require("express");
const { body } = requie("express-validators");
const mfaController = require("../../controllers/api/mfa");
const router = express.Router();

router.post("mfa-setup", mfaController.setup);
router.post("/mfa-verify", mfaController.verify);
router.post("mfa-disable", mfaController.disable);

module.exports = router;
