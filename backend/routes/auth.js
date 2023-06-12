const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const AuthMiddleware = require('../middleware/auth');

// Signup route
router.post('/signup', AuthController.signup);

// Signin route
router.post('/signin', AuthController.signin);

// Protected route - example
router.get(
  '/profile',
  AuthMiddleware.authenticateToken,
  UserController.profile,
);

module.exports = router;
