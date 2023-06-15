const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSecretKey = process.env.JWT_SECRET || 'your-secret-key';

function generateToken(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
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

function verifyToken(token) {
  return jwt.verify(token, jwtSecretKey);
}

const verifyPassword = async (enteredPassword, hashPassword) => {
  return await bcrypt.compare(enteredPassword, hashPassword);
};

const generateHash = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

module.exports = { generateToken, verifyToken, verifyPassword, generateHash };
