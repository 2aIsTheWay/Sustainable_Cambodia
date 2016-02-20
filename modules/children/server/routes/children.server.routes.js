'use strict';

module.exports = function(app) {
  // Routing logic
  // ...
  var children = require('../controllers/children.server.controller');

  app.route('/api/children')
    .get(children.list);

  app.route('/api/children/:childrenId')
    .get(children.read);
};
