'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Sponsorships = mongoose.model('Sponsorships'),
  Users = mongoose.model('User'),
  _ = require('lodash');

/**
 * Create a sponsorship
 */
exports.create = function (req, res) {
  //create a new sponsorships
  var sponsorship = new Sponsorships(req.body);

  console.log(sponsorship);
  sponsorship.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(sponsorship);
    }
  });
};

/**
 * Show the sponsorship selected
 */
exports.read = function (req, res) {
  //read an individual sponsorship
  res.json(req.sponsorship);
};



//NOTE:This is not used at all nor is it actually created
exports.delete = function (req, res) {
  //not sure if this one is needed.
};

//Gets a list of all sponsorhips
exports.list = function (req, res) {
  Sponsorships.find().exec(function(err, Sponsorships) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(Sponsorships);
    }
  });
};

//lists active sponsorships
exports.listActive = function (req, res) {
  //will list all active sponsorships
  //Is NOT currently being used anywhere 
  var currentDate = new Date();
  Sponsorships.find().$where(this.beginDate <= currentDate && this.endDate >= currentDate).exec(function(err, Sponsorships) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(Sponsorships);
    }
  });
};

//Lists sponsorships of the user logged in
exports.listSponsored = function (req, res) {
  //will list sponsorships that an individual sponsor has sponsored (has to be a better way to say that)
  Sponsorships.find({ user_id: req.user_id }, function (err, sponsorships) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(sponsorships);
    }
  });
};

//When an id is passed down, it will automatically create a req.sponorship from that id
exports.sponsorshipsByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'sponsorship is invalid'
    });
  }

  Sponsorships.findById(id).populate('child_id', 'user_id', 'paymentType').exec(function (err, sponsorship) {
    if (err) {
      return next(err);
    } else if (!sponsorship) {
      return res.status(404).send({
        message: 'No sponsorship with that identifier has been found'
      });
    }
    req.sponsorship = sponsorship;
    next();
  });
};

//When an id is passed down, it will automatically create a req.user from that id
//NOTE: Conflicts with sponsorshipsByID need to rename id
exports.sponsorshipUserID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'userID is invalid'
    });
  }
  Users.findById(id).populate('_id').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.status(404).send({
        message: 'No user with that identifier has been found'
      });
    }
    req.user_id = user._id;//Problem here?
    next();
  });
};

//Lists all the sponsorships in the database for the dashboard
exports.gridList = function (req, res) {
  Sponsorships.find().exec(function(err, Sponsorships) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(Sponsorships);
    }
  });
};
