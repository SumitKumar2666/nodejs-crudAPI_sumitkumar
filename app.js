const express = require('express');


const passport = require('passport');
const passportJWT = require('passport-jwt');
const sequelize = require('./config/postgres');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// using routes
app.use('/auth', require('./routes/auth'));
app.use('/crud', require('./routes/crud.js'));




// Sync the model with the database
(async () => {
  await sequelize.sync();
  console.log('Connected to PostgreSQL and synchronized models');
})();

// Passport.js setup for JWT authentication
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'asdfgh',
};
const jwtStrategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  User.findByPk(jwt_payload.sub)
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err, false);
    });
});
passport.use(jwtStrategy);
app.use(passport.initialize());


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//admin user:
// {
//   "username": "SumitK",
//   "password": "qwerty"
// }