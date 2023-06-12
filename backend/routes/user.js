const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Create a new user
router.post('/users', UserController.createUser);

// Get all users
router.get('/users', UserController.getAllUsers);

// Get a single user by ID
router.get('/users/:id', UserController.getUserById);

// Update a user by ID
router.put('/users/:id', UserController.updateUser);

// Delete a user by ID
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
