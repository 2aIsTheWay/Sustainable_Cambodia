'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin','superadmin'],
    allows: [{
      resources: '/api/eligiblechildren',
      permissions: '*'
    }, {
      resources: '/api/children',
      permissions: '*'
    }, {
      resources: '/api/children/picture/:childrenId',
      permissions: '*'
    }, {
      resources: '/api/children/additionalpictures/:childrenId',
      permissions: '*'
    }, {
      resources: '/api/children/:childrenId',
      permissions: '*'
    }, {
      resources: '/api/children/fundinglevel/:childrenId',
      permissions: '*'
    }]
  }, {
    roles: ['user','guest'],
    allows: [{
      resources: '/api/eligiblechildren',
      permissions: ['get']
    }, {
      resources: '/api/children',
      permissions: ''
    }, {
      resources: '/api/children/picture/:childrenId',
      permissions: ''
    }, {
      resources: '/api/children/additionalpictures/:childrenId',
      permissions: ''
    }, {
      resources: '/api/children/:childrenId',
      permissions: ['get']
    }, {
      resources: '/api/children/carousel',
      permissions: ['get']
    }, {
      resources: '/api/children/fundinglevel/:childrenId',
      permissions: '*'

    }]
  }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
