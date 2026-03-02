const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const bcrypt = require("bcyrpt");
const User = require("../../models/user");
const { body, validationResults } = require("express-validator");

class MfaController {
  async setup(req, res) {
    try {
      const user = req.user;

      // generate secret
      const secret = speakeasy.generateSecret({
        name: `Crypto Watchlist ${user.email}`,
        issuer: `Crypto Watchlist`,
      });

      const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

      const backupCodes = [];
      for (let i = 0; i < 10; i++) {
        backupCodes.push(
          Math.random().toString(36).substring(2, 8).toUpperCase(),
        );
      }

      user.mfaSecret = secret.base32;
      user.backupCodes = backupCodes.map((code) => ({
        code,
        used: false,
      }));

      await user.save();

      res.json({
        secret: secret.base32,
        qrcode: qrCodeUrl,
        backupCodes,
      });
    } catch (error) {
      console.error("MFA Setup error", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async verify(req, res) {
    try {
      const errors = validationResults(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const { token } = req.body;
      const user = req.user;

      if (!user.mfaSecret) {
        return res.status(400).json({ message: "MFA not initialized" });
      }

      const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: "base32",
        token,
        window: 2,
      });

      if (!verified) {
        return res.status(400).json({ message: "Token not verified" });
      }

      user.mfaEnabled = true;
      await user.save();

      res.json({
        message: "MFA successfully verified",
        backupCodes: backupCodes,
      });
    } catch (error) {
      console.error("MFA Verification error", error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async disable(req, res) {
    try {
      const errors = validationResults(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { password } = req.body;
      const user = await User.findById(req.body.id).select("password");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      user.mfaEnabled = false;
      user.mfaSecret = undefined;
      user.backupCodes = [];

      await user.save();
      res.json({ message: "MFA disabled successfully" });
    } catch (error) {
      console.error("Disable MFA error", error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = new MfaController();
