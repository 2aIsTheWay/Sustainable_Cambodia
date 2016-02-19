/* Dependencies */
var mongoose = require('mongoose'), 
    Child = require('../models/child.model.js');

/* Retreive all the children, sorted alphabetically by name */
exports.list = function(req, res) {
  Child.find({}).sort('name').exec(function(err, children) {
	if (err) throw err;
	res.json(children);
  });
};

/* Display a child */
exports.read = function(req, res) {
  /* send back the child as json from the request */
  res.json(req.child);
};