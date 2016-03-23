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
  child_id:   Schema.Types.ObjectId,
  user_id:    Schema.Types.ObjectId,
  beginDate:  Date,
  endDate:    Date,
  paymentType:  Number,
  monthlySubscription:  Boolean  
});

mongoose.model('Sponsorships', SponsorshipsSchema);
