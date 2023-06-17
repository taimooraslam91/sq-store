const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middleware/auth');

// Create a new user
router.post('/', UserController.createUser);

// Get all users
router.get(
  '/',
  AuthMiddleware.protect,
  AuthMiddleware.admin,
  UserController.getAllUsers,
);

// Get a single user by ID
router.get('/:id', UserController.getUserById);

// Update a user by ID
router.put('/:id', UserController.updateUser);

// Delete a user by ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
