'use strict';

var sponsorshipPolicy = require('../policies/sponsorships.server.policy'),
  sponsorship = require('../controllers/sponsorships.server.controller');

module.exports = function(app) {
  app.route('/api/sponsorships').all(sponsorshipPolicy.isAllowed)
    .get(sponsorship.list)
    .post(sponsorship.create);
    //.delete(sponsorship.delete);
  app.route('/api/sponsorships/active').all(sponsorshipPolicy.isAllowed)
    .get(sponsorship.listActive);

  app.route('/api/sponsorships/:sponsorshipId').all(sponsorshipPolicy.isAllowed)
    .get(sponsorship.read);

  app.route('/api/:userId/sponsor/sponsorships').all(sponsorshipPolicy.isAllowed)//use this to get it all the sponsorships from a user
    .get(sponsorship.listSponsored);

  app.param('sponsorshipId', sponsorship.sponsorshipsByID);
  app.param('userId', sponsorship.sponsorshipUserID);//Need to edit this to get the id to stateparams
};
