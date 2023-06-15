const jwtSecretKey = process.env.JWT_SECRET || 'your-secret-key';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('token', token);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    console.log(user);

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
