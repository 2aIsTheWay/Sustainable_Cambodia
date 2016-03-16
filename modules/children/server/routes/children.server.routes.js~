'use strict';

module.exports = function(app) {
  // Routing logic
  // ...
  var children = require('../controllers/children.server.controller');


  app.route('/api/children')
    .get(children.list)
    .post(children.create);

  app.route('/api/children/:childrenId')
    .get(children.read)
    .delete(children.delete)
    .put(children.update);

  app.param('childrenId', children.childrenByID);

};
