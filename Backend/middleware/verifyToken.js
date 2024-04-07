const jwt = require('jsonwebtoken');
const User = require('../models/regiModel');

const verifyToken = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);

  // Check for token in Authorization header (optional, for future use)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1];
    console.log('Authorization:', token); // add this line
  }

  // If not in header, check cookies (optional)
  if (!token && req.cookies) {
    token = req.cookies.auth_token;
    console.log("Cookie:", token); // add this line
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, 'mysecret');
      console.log(decoded);
      const user = await User.findById(decoded.userId);
      console.log(user);
      req.user = user;
      next();
    } catch (error) {
      console.log("not authorization token expired, please login again");
    }
  } else {
    res.status(401).send( {message :"No token provided"} );
  }
};

module.exports = verifyToken;


// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   const { userId } = jwt.verify(token.split(' ')[1], 'mysecret');

//   if (!token || !userId) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   req.userId = userId;
//   next();
// };

// module.exports = verifyToken;
