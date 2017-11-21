# Article KnowledgeBase Application

A simple crud application with a login system using passport and passport-local strategy. Also uses some express dependencies such as express-messages, express-session and express-validator. This application uses the pug template engine with bootstrap and jquery via bower.

## Development

You need to install bower in your system as a global.

`npm install -g bower`

Then after that you need to create a .bowerrc file in the root of our app and just set the directory on it where we want to install the bower components, in our case it will be on the public folder.

We will then install bootstrap via bower into our application.

`bower install bootstrap`

## Running the Application

Install the npm dependencies.

`npm install`

Follow the instructions in the Development.

Then run it via nodemon if you have nodemon installed in your system.

`npm start` or `nodemon`