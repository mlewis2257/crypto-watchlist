const jwt = require("jsonwebtoken");

export const generatToken = (user) => {
  const payload = {
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      mfaEnabled: user.mfaEnabled,
    },
  };

  const accessToken = jwt.sign(payload, proccess.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token, secret) => {
  return jwt.sign(token, secret);
};
