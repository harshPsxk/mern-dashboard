const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path to your User model as necessary
const router = express.Router();

const AVAILABLE_SCOPES = [
  'dashboard',
  'alerts:list',
  'alerts:manage',
  'access-control:list',
  'access-control:manage',
];

// User registration
router.post('/register', async (req, res) => {
  try {
    if (!Array.isArray(req.body.scopes)) {
      throw new Error('scopes should be provided as a list');
    }

    const grantedScopes = [];
    for(const scope of req.body.scopes) {
      if (AVAILABLE_SCOPES.includes(scope.trim())) {
        grantedScopes.push(scope.trim());
      } else {
        throw new Error('invalid scope provided - ' + scope);
      }
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Creating a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      scopes: grantedScopes,
      companyId: req.body.companyId
    });

    // Saving the user in the database
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error in registration " + err.message);
  }
});

// User login
// router.post('/login', async (req, res) => {
//   try {
//     // Checking if the user exists
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     // Comparing provided password with the hashed password
//     const isValid = await bcrypt.compare(req.body.password, user.password);
//     if (!isValid) {
//       return res.status(401).send("Invalid credentials");
//     }

//     // Creating a token
//     const token = jwt.sign({ id: user._id, scopes: user.scopes }, process.env.SECRET_KEY);

//     // Sending the token to the user
//     res.status(200).json({ token: token, user: { id: user._id, scopes: user.scopes } });
//   } catch (err) {
//     res.status(500).send("Error in login");
//   }
// });




// User login
router.post('/login', async (req, res) => {
  try {
    // Checking if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Comparing provided password with the hashed password
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).send("Invalid credentials");
    }

    // Creating a token with additional companyId
    const token = jwt.sign({ 
      id: user._id, 
      scopes: user.scopes, 
      companyId: user.companyId  // include the companyId in the JWT token
    }, process.env.SECRET_KEY);

    // Sending the token to the user
    res.status(200).json({ 
      token: token, 
      user: { 
        id: user._id, 
        scopes: user.scopes, 
        companyId: user.companyId  // include the companyId in the response for frontend
      }
    });
  } catch (err) {
    res.status(500).send("Error in login " + err.message);
  }
});


module.exports = router;
