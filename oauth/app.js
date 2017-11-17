const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Setting up the cookie session and will encryp the data that has been set in the passport setup serialize
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  keys: [keys.session.cookieKey]
}));

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Map to global Promise
mongoose.Promise = global.Promise;
// Connect to mongodb
mongoose.connect(keys.mongodb.dbURI, {
  useMongoClient: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch((err) => {
  console.log(err);
});

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create the home route
app.get('/', (req, res) => {
  res.render('home', {
    user: req.user
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is starting in port ${port}...`);
});
