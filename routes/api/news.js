const express = require("express");
const router = express.Router();
const newsCtrl = require("../../controllers/api/news");

router.all("/", newsCtrl.index);

module.exports = router;
