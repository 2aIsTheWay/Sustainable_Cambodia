'use strict';

module.exports = function (app) {
  // Root routing
  var donationPolicy = require('../policies/core.server.policy'), core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);
  //NOTE: Please keep the app.routes in this order.  At least make app.route('/*') last on the list to not get any rendering errors
  // Define application route
  //.get(function name) function name can be found in core.server.controller.js
  app.route('/about').get(core.renderAbout);
  app.route('/contact').get(core.renderContact);
  app.route('/donations/ui-grid').all(donationPolicy.isAllowed).get(core.donationGridList);
  app.route('/donate').get(core.renderDonate);
  app.route('/sctest').get(core.renderSCtest);//this route is part of the debugging process
  app.route('/dashboard').get(core.renderDashboard);
  app.route('/*').get(core.renderIndex);
};
