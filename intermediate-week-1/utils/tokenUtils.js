const jwt = require('jsonwebtoken');

const generateToken = (payload, privateKey, expiresIn) => jwt.sign(payload, privateKey, { expiresIn });

exports.generateAccessToken = (_id, email, name) => {
  return generateToken(
    {
      _id,
      email,
      name,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    process.env.JWT_ACCESS_TOKEN_EXPIRES
  );
};

exports.generateRefreshToken = (_id, email, name) => {
  return generateToken(
    {
      _id,
      email,
      name,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    process.env.JWT_REFRESH_TOKEN_EXPIRES
  );
};

const verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: true };
  }
};

exports.verifyAccessToken = (token) => {
  return verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET);
};

exports.verifyRefreshToken = (token) => {
  return verifyToken(token, process.env.JWT_REFRESH_TOKEN_SECRET);
};
