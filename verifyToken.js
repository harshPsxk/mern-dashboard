const jwt = require('jsonwebtoken');
const User = require('./models/user');  


async function verifyToken(req, res, next) {
  // Get the token from the request header
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {

    console.log('============>', token);
    const removeSpaceinToken = token.replace('Bearer ', '');
    console.log('============>', removeSpaceinToken);
    // Verify the token using your secret key
    const decoded = jwt.verify(removeSpaceinToken, process.env.SECRET_KEY);
    const fetchUser = await User.findOne({
      _id : decoded.id
    });
    console.log('+++++++++>', fetchUser);

    if(!fetchUser){
      throw new Error('user not found');
    }

    // Attach the user's information to the request object
    req.user = fetchUser;

    next();
  } catch (ex) {
    // If token is invalid, respond with 400
    console.log('------------>', ex)
    res.status(400).send('Invalid token.');
  }
}

module.exports = verifyToken;
