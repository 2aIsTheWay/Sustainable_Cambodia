'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Sponsorships Schema
 */
 //Although it is very bad to mix schemas together it was used to easily display children names on
 //the sponsorships pages based on user id
 //In programming practices this is mixed-role cohesion which is typically bad
 //It is unavoidable since Mongo is a nonSQL database so we cannot use foreign keys.
var SponsorshipsSchema = new Schema({
  child_id:   String,
  user_id:    String,
  beginDate:  Date,
  endDate:    Date,
  paymentType:  Number,
  sponsorshipType: String,
  userEmail:  String,
  childFirstName: String,
  childLastName: String,
  monthlySubscription:  Boolean

});

mongoose.model('Sponsorships', SponsorshipsSchema);
