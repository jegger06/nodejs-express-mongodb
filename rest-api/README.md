# REST API

This is a REST API project which is built by mongodb, express, nodejs.
It also uses the GeoLocation of mongoose so we can save the coordinates in a proper way in our db. This API can be used in any frameworks but now we are currently using the React library.

If you only want the REST API then feel free to do that by deleting the line number `23-25` of the `app.js` file.
<br>
See below for details.

```javascript
// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

```

You can also delete the `public` folder. The files in there are just for the UI of this project which is the React library.

## Development

Install the dependencies and you are good to go.

```javascript
npm install
```

## Running the Application

Just run application with npm start or if you have nodemon installed in your system you can use nodemon.

`npm start` or `nodemon`