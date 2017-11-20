const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const config = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise
mongoose.connect(config.database, {
  useMongoClient: true
}).then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// Init App
const app = express();

// Load Article model
require('./models/article');
const Article = mongoose.model('articles');

// Load User model
require('./models/user');
const User = mongoose.model('users');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware for form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);

// Passport middleware (should be after the express-session middleware)
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

// Home Route
app.get('/', (req, res) => {
  Article.find({}).then((articles) => {
    res.render('index', {
      title: 'Articles',
      articles: articles
    });
  }).catch((err) => console.log(err));
});

// Route Files
const articles = require('./routes/articles');
const users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);


// Start Server
app.listen(3000, () => {
  console.log('Server is running in port 3000...');
});