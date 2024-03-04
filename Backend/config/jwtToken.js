const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'mysecret', { expiresIn: '3d' });
}

module.exports = { generateToken }