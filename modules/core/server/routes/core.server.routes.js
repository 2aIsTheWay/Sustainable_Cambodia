'use strict';

module.exports = function (app) {
  // Root routing
  var donationPolicy = require('../policies/core.server.policy'), core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/about').get(core.renderAbout);
  app.route('/contact').get(core.renderContact);
  app.route('/donations/ui-grid').all(donationPolicy.isAllowed).get(core.donationGridList);
  app.route('/donate').get(core.renderDonate);
  app.route('/sctest').get(core.renderSCtest);
  app.route('/dashboard').get(core.renderDashboard);
  app.route('/*').get(core.renderIndex);
};
