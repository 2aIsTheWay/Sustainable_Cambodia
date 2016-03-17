'use strict';
var childrenPolicy = require('../policies/children.server.policy'),
  children = require('../controllers/children.server.controller');

module.exports = function(app) {
  // Routing logic   
  // ...
  
  app.route('/api/children').all(childrenPolicy.isAllowed)
    .get(children.list);

  app.route('/api/children/:childrenId').all(childrenPolicy.isAllowed)
    .get(children.read);

  app.param('childrenId', children.childrenByID);

};
