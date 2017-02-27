// server.js
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {

    fs.readFile(__dirname + '/dist/index.html', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);