'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Sponsorships Schema
 */
var DonationSchema = new Schema({
  _id:          { type: Schema.Types.ObjectId, required: true },
  user_id:      { type: Schema.Types.ObjectId, required: true },
  donationType: { type: String, required: true },
  amount:       { type: Number, required: true }
});

mongoose.model('Donations', DonationSchema);