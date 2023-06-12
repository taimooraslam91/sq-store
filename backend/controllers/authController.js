const { User } = require('../models');
const jwt = require('jsonwebtoken');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'secretKey');

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to signin' });
  }
};

const signup = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, password } = req.body;

    // Create a new user in the database
    const user = await User.create({ name, email, password });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = {
  signin,
  signup,
};
