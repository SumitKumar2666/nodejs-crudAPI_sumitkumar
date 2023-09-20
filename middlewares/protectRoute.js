
const jwt = require('jsonwebtoken');

const jwtOptions = {secretOrKey: "asdfgh"};
module.exports = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, jwtOptions.secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // If the token is valid, access the user's information in decoded
    req.user = decoded;
    next();
  });
};