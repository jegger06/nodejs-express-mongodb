if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://jegger:jegger@ds251435.mlab.com:51435/vidjot-prod'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  }
}