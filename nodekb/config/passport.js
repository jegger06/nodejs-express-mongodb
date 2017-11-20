const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Load User Model
const User = mongoose.model('users');

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'username'
  }, (username, password, done) => {
    // Check if the user is match
    User.findOne({
      username: username
    }).then((user) => {
      if (!user) {
        return done(null, false, {message: 'No User Found'});
      }

      // Check if the password match on the db
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Password Incorrect'});
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}