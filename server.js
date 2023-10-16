const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());
const ensureLoggedIn = require("./config/ensureLoggedIn");

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

app.use("/api/users", require("./routes/api/users"));

app.use("/api/cryptoCurrency", require("./routes/api/cryptoCurrency"));
app.use("/api/news", require("./routes/api/news"));

app.listen(port, function () {
  console.log(`Express running on port: ${port}`);
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
