const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const { generateToken, verifyToken } = require("../../src/Utilities/jwt");

class AuthController {
  async login(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, mfaToken } = req.body;

      const user = await User.findOne({ email: email }).select(
        "password +mfaSecret",
      );

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, user.password);
      console.log(match);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (user.mfaEnabled) {
        if (!mfaToken) {
          return res.json({
            requiredMfa: true,
            tempToken: generateToken(user).accessToken,
          });
        }
        const verified = speakeasy.totp.verify({
          secret: user.mfaSecret,
          encoding: "base32",
          token: mfaToken,
          window: 2,
        });

        if (!verified) {
          return res.status(401).json({ message: "Invalid MFA token" });
        }
      }
      const { accessToken, refreshToken } = generateToken(user);

      user.lastLogin = new Date();
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Login Successful",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          emailVerifies: user.emailVerified,
          mfaEnabled: user.mfaEnabled,
        },
        accessToken,
      });
    } catch (error) {
      console.error("Login Error", error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async verifyMfa(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { tempToken, mfaToken } = req.body;

      // verify temp token and get user
      const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user.id).select("+mfaSecret");

      if (!user || !user.mfaEnabled) {
        return res.status(400).json({ message: "Invalid request" });
      }

      const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: "base32",
        token: mfaToken,
        window: 2,
      });

      if (!verified) {
        return res.status(401).json({ message: "Invalid MFA token" });
      }

      const { accessToken, refreshToken } = generateToken(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "MFA verification successful",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          emailVerified: user.emailVerified,
          mfaEnabled: user.mfaEnabled,
        },
        accessToken,
      });
    } catch (error) {
      console.error("MFA Verification Error", error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async refreshToken() {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({ message: "Refresh Token Required" });
      }
      const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const { accessToken } = generateToken(user);
      res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: "Invalid refresh token" });
    }
  }

  logout(req, res) {
    res.clearCookies("refreshToken");
    res.json({ message: "Logged out successfully" });
  }
}

// async create(req, res) {
//   try {
//     console.log("req.body", req.body);
//     const user = await User.create(req.body);
//     console.log(user);
//     const token = createJWT(user);

//     res.json(token);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// }

module.exports = new AuthController();
