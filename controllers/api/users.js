const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create,
  login,
};

async function create(req, res) {
  try {
    console.log("req.body", req.body);
    const user = await User.create(req.body);
    console.log(user);
    const token = createJWT(user);

    res.json(token);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("user", user);
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log(match);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch (error) {
    res.status(400).json("Bad Credentials");
  }
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}
