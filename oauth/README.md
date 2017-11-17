# Google oAuth

A simple google authentication and protecting/guarding routes. This simple authentication uses ejs, cookie-session, mongoose. Can be used to your existing application and extract the code.

## Development

Create a google application at [Google Developers Console](https://console.developers.google.com/) then enable the Google+ API and then go through the set up process. Copy the Client ID and Client secret and create a file:


`config/keys_dev.js`
```javascript
  module.exports = {
    google: {
      clientID: 'YOUR GOOGLE CLIENT ID',
      clientSecret: 'YOUR GOOGLE CLIENT SECRET'
    },
    mongodb: {
      dbURI: 'YOUR MLAB DB URI OR YOUR LOCAL MONGODB'
    },
    session: {
      cookieKey: 'RANDOM STRING'
    }
  }
```

## Running the application

Run npm install to install all the dependencies for this application. Then run the application after you have installed the application and created the `keys_dev.js` file.

```
npm install
npm start
```

