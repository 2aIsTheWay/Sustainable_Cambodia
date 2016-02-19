'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Children Schema
 */
var ChildrenSchema = new Schema({
  firstName:                          { type: String, required: true },
  lastName:                           { type: String, required: true },
  gender:                             { type: String, required: true },
  biography:                          { type: String },
  fullySponsored:                     { type: Boolean },
  dob:                                { type: Date, required: true },  
  dateCreated:                        { type: Date },
  dateUpdated:                        { type: Date },
  biographyUpdated:                   { type: Date },
  deleted:                            { type: Boolean },
  eligibleHomeSponsor:                { type: Boolean },
  eligibleSchoolSponsor:              { type: Boolean },
  eligibleScholarshipSponsor:         { type: Boolean },
  legacySponsored:                    { type: Boolean }
});

mongoose.model('Children', ChildrenSchema);
