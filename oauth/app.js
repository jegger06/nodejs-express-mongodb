const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

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

// Set up auth routes
app.use('/auth', authRoutes);

// create the home route
app.get('/', (req, res) => {
  res.render('home');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is starting in port ${port}...`);
});
