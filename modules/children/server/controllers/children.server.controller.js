'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Children = mongoose.model('Children'),
  _ = require('lodash');

/**
 * Create a child function
 */
exports.create = function (req, res) {
  var child = new Children(req.body);
  child.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(child);
    }
  });
};

/**
 * Show the current child
 */
exports.read = function (req, res) {
  res.json(req.child);

};

/**
 * Update a child
 */
exports.update = function (req, res) {
  console.log(req.body.firstName);
  var child = req.child;
  /* Replace child properties */
  child.firstName = req.body.firstName;
  child.lastName = req.body.lastName;
  child.biography = req.body.biography;
  child.gender = req.body.gender;
  child.eligibleForSponsorship = req.body.eligibleForSponsorship;
  child.dob = req.body.dob;

  /* Save */
  child.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.json(child);
    }
  });
};

/**
 * Delete an child
 */
exports.delete = function (req, res) {
  var child = req.child;

  /* Remove Child */
  child.remove(function(err) {
    if(err){
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  });
};

/**
 * List of children
 */
exports.list = function (req, res) {
  Children.find().exec(function(err, Children) {
    if(err) {
      return res.status(400).send(err);
    } else {
      res.json(Children);
    }
  });
};

exports.childrenByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Child is invalid'
    });
  }

  Children.findById(id).populate('user', 'displayName').exec(function (err, child) {
    if (err) {
      return next(err);
    } else if (!child) {
      return res.status(404).send({
        message: 'No child with that identifier has been found'
      });
    }
    req.child = child;
    next();
  });
};
