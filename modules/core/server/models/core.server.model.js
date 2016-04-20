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
  amount:       { type: Number, required: true },
  userEmail:    { type: String, required: true },
  dateDonated:  { type: Date, required: true },
  country:      { type: String },
  address1:     { type: String },
  address2:     { type: String },
  city:         { type: String },
  state:        { type: String },
  zip:          { type: String }
});

mongoose.model('Donations', DonationSchema);