const jwt = require('jsonwebtoken');
const User = require('../models/regiModel');

const verifyToken = async (req, res, next) => {
  let token;
  if (req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1];
    console.log('Authorization:', token); // add this line
    try {
      if(token){
        const decoded = jwt.verify(token,'mysecret');
        console.log(decoded);
        const user = await User.findById(decoded.userId);
        console.log(user);
        req.user = user;
        next();
      }
    } catch (error) {
      // throw new Error("not authorization token expired, please login again");
      console.log("not authorization token expired, please login again");
    }
  } else {
    throw new Error("there no token attached in header");
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
