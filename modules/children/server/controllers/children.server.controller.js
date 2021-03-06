'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Children = mongoose.model('Children'),
  path = require('path'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  fs = require('fs'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a child function
 */
exports.create = function (req, res) {
  var child = new Children(req.body);
  child.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(child);
    }
  });
};

/**
 * Show the current child
 */
exports.read = function (req, res) {
  res.json(req.child);

};

/**
 * Update a child
 */
exports.update = function (req, res) {
  var child = req.child;
  /* Replace child properties */
  child.firstName = req.body.firstName;
  child.lastName = req.body.lastName;
  child.biography = req.body.biography;
  child.gender = req.body.gender;
  child.eligibleForSponsorship = req.body.eligibleForSponsorship;
  child.dob = req.body.dob;

  /* Save */
  child.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.json(child);
    }
  });
};

/**
 * Update a child's sponsorship levels
 * if he/she is fully sponsored 
 * make him/her ineligbible
 */
exports.updateFunding = function (req, res) {
  var child = req.child;
  var sponsorshipType = req.body.sponsorshipType;
  var currentSponsorship = child.sponsorshipType;
  if (child.eligibleForSponsorship) {
    if(sponsorshipType === 'full'){
      currentSponsorship = currentSponsorship + 2;
    }
    if(sponsorshipType === 'half'){
      currentSponsorship = currentSponsorship + 1;
    }
    child.sponsorshipType = currentSponsorship;
    if (child.sponsorshipType <= 2) {
      if (child.sponsorshipType === 2) {
        child.eligibleForSponsorship = false;
      }
      child.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        }
        else {
          res.json(child);
        }
      });
    } else {
      res.status(400).send({
        message: 'Cannot fund this as child would be oversponsored'
      });
    }
  } else {
    res.status(400).send({
      message: 'child not eligible for sponsorships'
    });
  }
};

/**
 * Delete an child
 */
exports.delete = function (req, res) {
  var child = req.child;

  /* Remove Child */
  child.remove(function(err) {
    if(err){
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  });
};

/**
 * List of children
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

/**
 * List of children for carousel (presently all for testing)
 */
exports.carouselList = function (req, res) {
  Children.find().limit(5).exec(function(err, Children) {
    if(err) {
      return res.status(400).send(err);
    } else {
      res.json(Children);
    }
  });
};

//Only lists eligible children
exports.listEligible = function (req, res) {
  Children.find({ eligibleForSponsorship: true }).exec(function(err, Children) {
    if(err) {
      return res.status(400).send(err);
    } else {
      res.json(Children);
    }
  });
};

//changes a child's primary photo to the one selected for upload
exports.changePrimaryPhoto = function (req, res) {
  var child = req.child;
  var message = null;
  var upload = multer(config.uploads.primaryUpload).single('newPrimaryPicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;
  if (child) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading primary photo'
        });
      } else {
        if (child.primaryPhoto){
          child.additionalPhotos.push(child.primaryPhoto);
        }
        child.primaryPhoto =req.file.filename+','+req.body.dateTaken;
        child.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            res.json(child);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'child does not exist'
    });
  }
};

//Removes the selected addtional photo based on the array index and name
exports.removeAdditionalPhoto = function (req, res) {
  var child = req.child;
  var message = null;
  var index = req.body.photoindex;
  var image = req.body.photoimage;
  var imagePath = config.uploads.primaryUpload.dest+image;
  if (child) {
    child.additionalPhotos.splice(index, 1);
    if(image){
      fs.stat(imagePath, function (err, stats) {
        if (err) {
          return console.error('Cannot find file so no deletion');
        }
        else {
          fs.unlink(imagePath,function(err){
            if(err) {
              return console.log('Attempted to delete nonexistant file');
            }
            else {
              console.log('file deleted successfully');
            }
          }); 
        } 
      });
    }
    child.save(function (saveError) {
      if (saveError) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(saveError)
        });
      } else {
        res.json(child);
      }
    });
  } else {
    res.status(400).send({
      message: 'child does not exist'
    });
  }
};

//If an id is passed in the api endpoint, automatically makes a req.child object from the id
exports.childrenByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Child is invalid'
    });
  }

  Children.findById(id).populate('user', 'displayName').exec(function (err, child) {
    if (err) {
      return next(err);
    } else if (!child) {
      return res.status(404).send({
        message: 'No child with that identifier has been found'
      });
    }
    req.child = child;
    next();
  });
};
