const express = require("express");
const router = express.Router();
const cryptosCtrl = require("../../controllers/api/cryptoCurrency");

router.get("/", cryptosCtrl.index);
router.get("/:id", cryptosCtrl.show);

module.exports = router;
