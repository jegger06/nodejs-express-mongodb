const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Article model
require('../models/article');
const Article = mongoose.model('articles');

// Load User model
require('../models/user');
const User = mongoose.model('users');

// Add Route
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add_article', {
    title: 'Add Article'
  });
});

// Add Submit POST Route
router.post('/add', (req, res) => {
  req.checkBody('title', 'Title is required').notEmpty();
  // req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('add_article', {
      title: 'Add Article',
      errors: errors
    });
  } else {
    const article = {
      title: req.body.title,
      author: req.user._id,
      body: req.body.body
    };
    new Article(article)
      .save()
      .then((article) => {
        req.flash('success', 'Article added');
        res.redirect('/');
      })
      .catch((err) => console.log(err));
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article.author != req.user._id) {
        req.flash('danger', 'Not Authorized');
        res.redirect('/');
      }
      res.render('edit_article', {
        title: 'Edit Article',
        article: article
      });
    })
    .catch((err) => console.log(err));
});

// Update Submit POST Route
router.post('/edit/:id', (req, res) => {
  // console.log(req.params.id);
  Article.findOne({
    _id: req.params.id
  })
    .then((article) => {
      // new values for the article
      article.title = req.body.title;
      article.author = req.body.author;
      article.body = req.body.body;

      article.save()
        .then((updatedArticle) => {
          req.flash('success', 'Article Updated')
          res.redirect('/');
        })
        .catch((err) => console.log('Error on saving the updated Article: ', err))
    })
    .catch((err) => console.log('Error on finding article to be updated: ', err));
});

// Delete Article
router.delete('/:id', (req, res) => {
  if (!req.user._id) {
    res.status(500).send();
  }

  Article.findById(req.params.id)
    .then((article) => {
      if (article.author != req.user._id) {
        res.status(500).send();
      } else {
        Article.remove({
          _id: req.params.id
        }).then(() => {
          res.send('Success');
        }).catch((err) => console.log('Error on deleting article: ', err));
      }
    })
});

// Get Single Article
router.get('/:id', (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      User.findById(article.author)
        .then((user) => {
          res.render('article', {
            article: article,
            author: user.name
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;