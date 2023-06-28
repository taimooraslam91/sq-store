const { User } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

const createUser = asyncHandler(async (req, res) => {
  // Extract user data from request body
  const { name, email, password } = req.body;

  // Create a new user in the database
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(500);
    throw new Error('Invalid user data');
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  // Retrieve all users from the database
  const users = await User.findAll();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500);
    throw new Error('Failed to retrieve users');
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find a user by ID in the database
  const user = await User.findByPk(id);

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, isAdmin } = req.body;

  // Find a user by ID in the database
  const user = await User.findByPk(id);

  // If the user doesn't exist, return an error
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update the user's information
  await User.update({ name, email, password, isAdmin }, { where: { id } });

  // Fetch the updated user
  const updated_user = await User.findByPk(id);

  res.json({
    id: updated_user.id,
    name: updated_user.name,
    email: updated_user.email,
    isAdmin: updated_user.isAdmin,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find a user by ID in the database
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  // Delete the user
  const isDeleted = await User.destroy({
    where: {
      id: id,
    },
  });
  if (isDeleted) {
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(500);
    throw new Error('Failed to delete user');
  }
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
