
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user.js');
const jwtOptions = {secretOrKey: "asdfgh"};
const authController = { 
    login: async (req, res) => {
      const { username, password } = req.body;
  
      try {
        const user = await User.findOne({ where: { username } });
  
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
  
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }
  
        const payload = { sub: user.id };
        const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '2m' }); //change token expiry time
  
        return res.json({ message: 'Authentication successful', token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    register: async (req, res) => {
        const { username, password } = req.body;
    
        try {
          // Check if the username is already taken
          const existingUser = await User.findOne({ where: { username } });
          if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken.' });
          }
    
          // Hash the password before saving it to the database
          const hashedPassword = await bcrypt.hash(password, 10);
    
          // Create a new user
          const newUser = await User.create({ username, password: hashedPassword });
    
          return res.status(201).json({ message: 'User registration successful', user: newUser });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
      },
      
  };

  module.exports = authController;


  