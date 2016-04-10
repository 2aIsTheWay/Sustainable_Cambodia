'use strict';
var childrenPolicy = require('../policies/children.server.policy'),
  children = require('../controllers/children.server.controller');

module.exports = function(app) {

  app.route('/api/children').all(childrenPolicy.isAllowed)
    .get(children.list)
    .post(children.create);

  app.route('/api/children/:childrenId').all(childrenPolicy.isAllowed)
    .get(children.read)
    .delete(children.delete)
    .put(children.update);

  app.route('/api/children/picture/:childrenId').all(childrenPolicy.isAllowed)
    .post(children.changePrimaryPhoto);

  app.route('/api/children/additionalpictures/:childrenId').all(childrenPolicy.isAllowed)
    .put(children.removeAdditionalPhoto);

  app.param('childrenId', children.childrenByID);

};
