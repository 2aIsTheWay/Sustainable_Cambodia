'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Sponsorships Schema
 */
var SponsorshipsSchema = new Schema({
  child_id:   String,
  user_id:    String,
  beginDate:  Date,
  endDate:    Date,
  paymentType:  Number,
  userEmail:  String,
  childFirstName: String,
  childLastName: String,
  monthlySubscription:  Boolean

});

mongoose.model('Sponsorships', SponsorshipsSchema);
