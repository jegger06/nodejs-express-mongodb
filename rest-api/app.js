const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Load Keys
const keys = require('./config/keys');

// Load Routes
const apiRoutes = require('./routes/api');

// Initialize express
const app = express();

// Set the mongoose Promise to global Promise cause its deprecated
mongoose.Promise = global.Promise;
// Connect to mongodb
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
}).then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Use Routes
app.use('/api', apiRoutes);

// Error handling Middleware
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(422).send({error: err.message});
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});