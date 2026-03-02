const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrypt = require("bcrypt");

const SALT_ROUNDS = 12;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 3,
      required: function () {
        // Password required unless OAuth user
        return !this.googleId;
      },
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    // Account verification
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,

    // OAuth Fields
    googleId: String,
    avatar: String,

    mfaEnabled: {
      type: Boolean,
      default: false,
    },
    mfaSecret: {
      type: String,
      select: false,
    },
    backupCodes: [
      {
        code: String,
        used: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Security
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
    lastLogin: Date,
    // watchlist: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bycrypt.hash(this.password, SALT_ROUNDS);
  return next();
});
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

module.exports = mongoose.model("User", userSchema);
