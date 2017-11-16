const router = require('express').Router();
const passport = require('passport');

// Auth Login
router.get('/login', (req, res) => {
  res.render('login');
});

// Auth logout
router.get('/logout', (req, res) => {
  // Handle with passport
  res.send('logging out');
});

// Auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// Callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.send('now working...');
  });

module.exports = router;