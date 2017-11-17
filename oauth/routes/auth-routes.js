const router = require('express').Router();
const passport = require('passport');

// Check if user is already logged in and redirect to profile page
const authCheck = (req, res, next) => {
  if (req.user) {
    res.redirect('/profile');
  } else {
    next();
  }
};

// Auth Login
router.get('/login', authCheck, (req, res) => {
  res.render('login', {
    user: req.user
  });
});

// Auth logout
router.get('/logout', (req, res) => {
  // Handle with passport
  req.logout();
  res.redirect('/');
});

// Auth with google
router.get('/google', authCheck, passport.authenticate('google', {
  scope: ['profile']
}));

// Callback route for google to redirect to
router.get('/google/redirect', authCheck, passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
  });

module.exports = router;