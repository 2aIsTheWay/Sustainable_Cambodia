'use strict';

var mongoose = require('mongoose'),
  Donations = mongoose.model('Donations');

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  res.render('modules/core/server/views/index', {
    user: req.user || null
  });
};

exports.renderAbout = function (req, res) {
  res.render('modules/core/server/views/about', {
    user: req.user || null
  });
};

exports.renderContact = function (req, res) {
  res.render('modules/core/server/views/contact', {
    user: req.user || null
  });
};

exports.renderDonate = function (req, res) {
  res.render('modules/core/server/views/donate', {
    user: req.user || null
  });
};

exports.renderDashboard = function (req, res) {
  res.render('modules/core/server/views/dashboard', {
    user: req.user || null
  });
};

exports.renderSCtest = function (req, res) {
  res.render('modules/core/server/views/sctemplate', {
    user: req.user || null
  });
};
/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};


exports.create = function (req, res) {
  //create a new sponsorships
  var donation = new Donations(req.body);

  donation.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(donation);
    }
  });
};

exports.donationGridList = function (req, res) {
  Donations.find().exec(function(err, Donations) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(Donations);
    }
  });
};