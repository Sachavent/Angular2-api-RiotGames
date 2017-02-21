// server.js
const express = require('express');
const app = express();
const path = require('path');

/**
 * Resolving the problem of "No Access allow origin"
 */
var sess = {
  secret: 'keyboard cat',
  proxy: true,
  resave: false,
  saveUninitialized: false
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
 // sess.cookie.secure = true // serve secure cookies
}

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(session(sess))
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});


// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);