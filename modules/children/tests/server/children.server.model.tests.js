'use strict';

/**
 * Module dependencies.
 * The first two are needed for every Mocha test, the third changes based on what module you are testing.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Children = mongoose.model('Children');

/**
 * Globals
 * the child var below is set before the start of every test.
 * feel free to add more variables for more complex tests here or inside the test.
 */
var child;

/**
 * Unit tests
 * The unit tests are grouped by the describe call. 'Children Model and CRUD Unit Tests:' are what
 * is output to the console during a test.
 *
 * Describe() itself appears to be just a console.log tied to a callback.
 */
describe('Children Model and CRUD Unit Tests:', function() {
  
  /**
   * the beforeEach statement runs before each it() function. in this case it initializes the child variable
   * to the data listed below.
   */
  beforeEach(function() {
    child = {
      firstName:                          'this',
      lastName:                           'child',
      gender:                             'F',
      fundingLevel:                       0,
      dob:                                Date.now()
    };

  });

  describe('Method Save', function() {

    /*
     * The it statement is a unit test. the first parameter is a console log, followed by a callback
     * Testing is done within.
     */
    it('should begin with no children', function (done) {
      Children.find({}, function (err, childrens) {
        // I really had no idea that .should.have.length was a thing. I just pulled it out of the user test
        childrens.should.have.length(0);
        // also not sure what done is for, but apparently its passed in as a parameter.
        done();
      });
    });

    it('should be able to save without problems', function(done) {
      var _child = new Children(child);
      _child.save(function (err) {
        //these function calls speak for themselves.
        should.not.exist(err);
        _child.remove(function (err) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('should be able to show an error when trying to save without first name', function (done) {
      var _child = new Children(child);

      _child.firstName = '';
      _child.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when trying to save without last name', function (done) {
      var _child = new Children(child);

      _child.lastName = '';
      _child.save(function (err) {
        //not to be confused with should.not.exist(). this does the opposite.
        should.exist(err);
        done();
      });
    });
    it('should be able to update an existing child with a new fundingLevel with no problems', function (done) {
      var _child = new Children(child);

      _child.save(function (err) {
        should.not.exist(err);
        _child.fundingLevel = 1;
        _child.save(function (err) {
          should.not.exist(err);
          _child.remove(function (err) {
            should.not.exist(err);
            done();
          });
        });
      });
    });
  });
  /*
   * Like beforeEach(), afterEach runs for every unit test. The difference is that afterEach runs AFTER the 
   * unit test is finished, regardless of whether it passed or not (i think)
   */
  afterEach(function(done) { 
    Children.remove().exec();
    done();
  });
  
});
