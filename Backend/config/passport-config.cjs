const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.cjs'); // Import the User model

// Configure the local strategy
passport.use(
  'local',
  new LocalStrategy({ usernameField: 'pernum', passwordField: 'pernum' },
    (pernum, password, done) => {
      User.findOne({ pernum })
        .then(user => {
          done(null, user);
        })
        .catch(err => {
          console.log(err);
          return done(err, null);
        });
    }
  )
);

// Serialize user to store in the session
passport.serializeUser((user, cb) => {
  console.log('Serializing user: ', user);
  cb(null, { id: user.id, isManager: user.isManager });
});

// Deserialize user to retrieve from the session
passport.deserializeUser((user, done) => {
  console.log('Deserializing user: ', user.id);
  User.findById(user.id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      console.log(err);
      return done(err, null);
    });
});

module.exports = passport;