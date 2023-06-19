const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const AuthMiddleware = require('../middlewares/auth');

// Signup route
router.post('/signup', AuthController.signup);

// Signin route
router.post('/signin', AuthController.signin);

// Logout route
router.post('/logout', AuthController.logoutUser);

// Protected route - example
router.get('/profile', AuthMiddleware.protect, AuthController.profile);

module.exports = router;
