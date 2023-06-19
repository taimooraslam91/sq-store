const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middlewares/auth');

// Create a new user
router.post(
  '/',
  AuthMiddleware.protect,
  AuthMiddleware.admin,
  UserController.createUser,
);

// Get all users
router.get(
  '/',
  AuthMiddleware.protect,
  AuthMiddleware.admin,
  UserController.getAllUsers,
);

// Get a single user by ID
router.get(
  '/:id',
  AuthMiddleware.protect,
  AuthMiddleware.admin,
  UserController.getUserById,
);

// Update a user by ID
router.put(
  '/:id',
  AuthMiddleware.protect,
  AuthMiddleware.admin,
  UserController.updateUser,
);

// Delete a user by ID
router.delete(
  '/:id',
  AuthMiddleware.protect,
  AuthMiddleware.admin,
  UserController.deleteUser,
);

module.exports = router;
