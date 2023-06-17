const Helper = require('../utils/helper');

const protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const verificationResult = await Helper.verifyToken(token);

  if (verificationResult.success) {
    const user = verificationResult.user;
    // Token is valid, continue with the user data
    req.user = user.user;
    next();
  } else {
    // Token is invalid, handle the error
    return res.status(401).json({ error: verificationResult.error });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ error: 'Not authorized as an admin' });
  }
};

module.exports = {
  protect,
  admin,
};
