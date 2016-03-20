'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
/**
 * Children Schema
 */

var SchemaTypes = mongoose.Schema.Types;



var ChildrenSchema = new Schema({
  firstName:                          { type: String, required: true },
  lastName:                           { type: String, required: true },
  gender:                             { type: String, required: true },
  primaryPhotos:                      { type: String},
  additionalPhotos:                   [String],
  biography:                          { type: String },
  eligibleForSponsorship:             { type: Boolean },
  sponsorshipType :                   { type: Number },
  fundingType:                        { type: Number },
  fundingLevel:                       { type: SchemaTypes.Double },
  dob:                                { type: Date, required: true },  
  dateCreated:                        { type: Date },
  createdBy:                          { type: String },
  dateUpdated:                        { type: Date },
  updatedBy:                          { type: String },
  biographyUpdated:                   { type: Date },
  deleted:                            { type: Boolean },
  legacySponsored:                    { type: Boolean }
});

mongoose.model('Children', ChildrenSchema);
