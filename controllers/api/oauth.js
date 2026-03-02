const { generateToken } = require("../../src/Utilities/jwt");
const passport = require("passport");
const User = require("../../models/user");
const axios = require("axios");

class OAuthController {
  initiateGoogle(req, res, next) {
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res, next);
  }

  async handleGoogleCallback(req, res, next) {
    passport.authenticate("google", { session: false }, async (err, user) => {
      try {
        if (err) {
          const frontendURL = process.env.CLIENT_URL || "http://localhost:3000";
          return res.redirect(`${frontendURL}/login?error=oauth_failed`);
        }
        if (!user) {
          return res.redirect(`${frontendURL}/login?error=oauth_failed`);
        }
        const { refreshToken, accessToken } = generateToken(user);
        user.lastLogin = new Date();
        await user.save();

        //  Set refresh token as HTTP-Only
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV || "test",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.redirect(`${frontendUrl}/oauth-callback?token=${accessToken}`);
      } catch (error) {
        console.error("Google OAuth callback error:", error);
        res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
      }
    })(req, res, next);
  }

  //   Handle oauth callback from the frontend
  async handleCallback(req, res) {
    try {
      const { code, provider = "google" } = req.body;

      if (!code) {
        return res.status(400).json({ message: "Authorization code required" });
      }
      let userProfile;

      if (provider == "google") {
        userProfile = await this.exhangeGoogleCode(code);
      } else {
        return res.status(400).json({ message: "Invalid OAuth provider" });
      }

      //   Find or create user
      let user = await this.findOrCreateUser(userProfile, provider);

      const { accessToken, refreshToken } = generateToken(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV || "test",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({
        message: "OAuth login successful",
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
      console.error("OAuth callback error", error);
      res.status(500).json({ message: "OAuth authentication failed" });
    }
  }

  //   Helper: Exchange google auth code for user profile
  async exchangeGoogleCode(code) {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.SERVER_URL}/api/oauth/google/callback`,
      grant_type: "authorization",
    });

    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`,
        },
      },
    );
    return userResponse;
  }

  async findOrCreateUser(profile, provider) {
    const oauthId = provider === "google" ? "googleId" : "facebookId";
    const oauthField = { [oauthId]: profile.id };

    let user = await User.findOne(oauthField);
    if (user) {
      return user;
    }

    user = await User.findOne({ email: profile.email });

    if (user) {
      user[oauthId] = profile.id;
      user.avatar = profile.picture || profile.avatar;
      user.emailVerified = true;
      await user.save();
      return user;
    }

    user = new User({
      email: profile.email,
      firstName: profile.givenName || profile.firstName,
      lastName: profile.familyName || profile.lastName,
      avatar: profile.picture || profile.avatar,
      emailVerified: true,
      password: undefined,
    });

    user[oauthField] = profile.id;
    await user.save();

    return user;
  }
}

module.exports = new OAuthController();
