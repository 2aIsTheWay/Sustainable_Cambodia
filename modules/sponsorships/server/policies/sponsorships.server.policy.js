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
      resources: '/api/sponsorships',
      permissions: '*'
    }, {
      resources: '/api/sponsorships/:sponsorshipId',
      permissions: '*'
    }, {
      resources: '/api/:userId/sponsor/sponsorships',
      permissions: '*'
    }, {
      resources: '/api/sponsorships/active',
      permissions: '*'
    }]
  }, {
    roles: ['sponsor'],
    allows: [{
      resources: '/api/sponsorships',
      permissions: ''
    }, {
      resources: '/api/sponsorships/:sponsorshipId',
      permissions: ''
    }, {
      resources: '/api/:userId/sponsor/sponsorships',
      permissions: 'get'
    }, {
      resources: '/api/sponsorships/active',
      permissions: ''
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
