var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');

/* Starts the server on the portnumber in config.js and initializes through express.js */
module.exports.start = function() {
  var app = express.init();
  app.listen(config.port, function() {
    console.log('App listening on port', config.port);
  });
};