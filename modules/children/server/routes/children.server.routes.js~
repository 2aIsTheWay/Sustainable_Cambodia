'use strict';
var childrenPolicy = require('../policies/children.server.policy'),
  children = require('../controllers/children.server.controller');

module.exports = function(app) {
  // Routing logic
  // ...
  var children = require('../controllers/children.server.controller');


  app.route('/api/children').all(childrenPolicy.isAllowed)
    .get(children.list)
    .post(children.create);

  app.route('/api/children/:childrenId').all(childrenPolicy.isAllowed)
    .get(children.read)
    .delete(children.delete)
    .put(children.update);

  app.param('childrenId', children.childrenByID);

};
