const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Article Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

mongoose.model('articles',  ArticleSchema);