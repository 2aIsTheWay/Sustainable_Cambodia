'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Children = mongoose.model('Children'),
  _ = require('lodash');

/**
 * Create a 
 */
exports.create = function (req, res) {

};

/**
 * Show the current 
 */
exports.read = function (req, res) {
  res.json(req.child);

};

/**
 * Update a 
 */
exports.update = function (req, res) {

};

/**
 * Delete an 
 */
exports.delete = function (req, res) {

};

/**
 * List of 
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

