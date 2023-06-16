const { User } = require('../models');
const Helper = require('../utils/helper');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not exist with this email' });
    }

    // Check if the password is correct
    const passwordMatch = await Helper.verifyPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    // Generate a JWT token in cookies
    Helper.generateToken(res, userData);

    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to signin' });
  }
};

const signup = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, password } = req.body;

    // Check if user already exist
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await Helper.generateHash(password);

    // Create a new user in the database
    const user = await User.create({ name, email, password: hashedPassword });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    // Generate a JWT token in cookies
    Helper.generateToken(res, userData);

    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const profile = async (req, res) => {
  try {
    // Get the authenticated user from the request object
    const user = req.user;

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  signin,
  signup,
  profile,
  logoutUser,
};
