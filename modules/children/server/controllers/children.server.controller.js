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
