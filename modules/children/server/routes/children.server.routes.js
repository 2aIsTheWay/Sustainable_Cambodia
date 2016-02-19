'use strict';

module.exports = function(app) {
  // Routing logic   
  // ...
  var children = require('../controllers/children.server.controller');

  app.route('/children')
  .get(children.list);
};
