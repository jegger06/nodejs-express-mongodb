const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    // options for the google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in our db
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        // already have a user
        console.log(`User is: ${currentUser}`);
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url
        }).save().then((newUser) => {
          console.log(`New User Created: ${newUser}`);
          done(null, newUser);
        });
      }
    });
  })
);