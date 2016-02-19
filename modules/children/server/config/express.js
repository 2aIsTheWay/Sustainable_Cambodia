var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    childrenRouter = require('../routes/child.server.routes'), 
    config = require('./config');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize through app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  // api for children
  app.use('/api/children', childrenRouter);

  /* go to template to route */ 
  app.all('/*', function(req, res) {
    res.sendFile(path.resolve('client/template.html'));
  });

  return app;
};  