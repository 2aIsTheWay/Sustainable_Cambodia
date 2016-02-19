/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Child Schema */
var childSchema = new Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  }, 
  gender: {
    type: String, 
    required: true 
  }, 
  biography: String,
  fullySponsored: Boolean,
  dob: {
    type: Date,
    required: true
  }
  dateCreated: Date,
  dateUpdated: Date,
  biographyUpdated: Date,
  deleted: Boolean,
  eligibileHomeSponsor: Boolean,
  eligibleSchoolSponsor: Boolean,
  eligibleScholarshipSponsor: Boolean,
  legacySponsored: Boolean
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
childSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Instantiates a Mongoose model */
var Child = mongoose.model('Child', childSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Child
