const bcyrpt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { generateToken } = require("../../src/Utilities/jwt");
const User = require("../../models/user");
const user = require("../../models/user");

class UserController {
  async singup(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      const { email, password, firstName, lastName } = req.body;
      const user = await User.findOne({ email: user.email });

      if (user) {
        return res.status(401).json({ message: "User email already exists" });
      }

      user = new User({
        email,
        password,
        firstName,
        lastName,
      });

      await user.save();

      const { accessToken } = generateToken(user);
      res.status(201).json({
        message: "Successfully signed up",
        token: accessToken,
      });
    } catch (error) {
      console.log("Signup Error", error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async getProfile(req, res) {
    try {
      const user = req.user;
      res.json({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        emailVerified: user.emailVerified,
        mfaEnabled: user.mfaEnabled,
      });
    } catch (error) {
      console.log("Get profile error");
      res.status(500).json({ message: "Server Error" });
    }
  }

  async updateProfile(req, res) {
    try {
      const { firstName, lastName } = req.body;
      const user = req.user;

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = firstName;

      await user.save();

      res.json({
        message: "Profile successfully updated",
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        emailVerified: user.emailVerified,
        mfaEnabled: user.mfaEnabled,
      });
    } catch (error) {
      console.error("Update profile error", error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = new UserController();
