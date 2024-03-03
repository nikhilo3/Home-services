const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'mysecret', { expiresIn: '1h' });
}

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   const { userId } = jwt.verify(token.split(' ')[1], 'mysecret');

//   if (!token || !userId) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   req.userId = userId;
//   next();
// };

// const getUserFromToken = (token) => {
//   const { userId } = jwt.verify(token, 'mysecret');
//   return userId;
// };

module.exports = { generateToken }