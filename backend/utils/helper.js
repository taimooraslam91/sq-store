const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET;

function generateToken(res, user) {
  const token = jwt.sign({ user }, jwtSecretKey, {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
}

const verifyToken = async (token) => {
  try {
    const user = await jwt.verify(token, jwtSecretKey);
    return { success: true, user };
  } catch (err) {
    return { success: false, error: 'Invalid token' };
  }
};

const verifyPassword = async (enteredPassword, hashPassword) => {
  return await bcrypt.compare(enteredPassword, hashPassword);
};

const generateHash = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

const getAuthTokenFromHeaders = (headers) => {
  const authHeader = headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Extract the token from the "Bearer" scheme
    const authToken = authHeader.split(' ')[1];
    return authToken;
  }

  return null;
};

module.exports = {
  generateToken,
  verifyToken,
  verifyPassword,
  generateHash,
  getAuthTokenFromHeaders,
};
