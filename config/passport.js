const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/oauth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        user = await User.findOne({ email: profile.emails[0].value });
        // Checks if user exist with same email
        if (user) {
          user.googleId = profile.id;
          user.avatar = profile.photos[0]?.value;
          user.emailVerified = true;
          await user.save();
          return done(null, user);
        }

        // Else create new user
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          avatar: profile.photos[0]?.value,
          emailVerified: true,
          password: undefined,
        });

        await user.save();
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

module.exports = passport;
