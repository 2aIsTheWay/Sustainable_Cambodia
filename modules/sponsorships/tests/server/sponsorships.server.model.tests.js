'use strict';

/**
 * Module dependencies.
 * The first two are needed for every Mocha test, the third changes based on what module you are testing.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Sponsorships = mongoose.model('Sponsorships');

/**
 * Globals
 * the sponsorship var below is set before the start of every test.
 * feel free to add more variables for more complex tests here or inside the test.
 */
var sponsorship;

/**
 * Unit tests
 * The unit tests are grouped by the describe call. 'Sponsorships Model and CRUD Unit Tests:' are what
 * is output to the console during a test.
 *
 * Describe() itself appears to be just a console.log tied to a callback.
 */
describe('Sponsorship Model and CRUD Unit Tests:', function() {
  
  /**
   * the beforeEach statement runs before each it() function. in this case it initializes the sponsorship variable
   * to the data listed below.
   */
  beforeEach(function() {
    sponsorship = {
      'sponsorship_id': '56ef04541895f2f81d10964e',
      'user_id': '56c76619cb94902803a88de5',
      'beginDate': 'Sat Jul 12 1975 07:58:32 GMT-0400',
      'endDate': 'Fri Jun 11 1999 13:59:59 GMT-0400',
      'paymentType': 1,
      'monthlySubscription': true
    };

  });

  describe('Method Save', function() {

    /*
     * The it statement is a unit test. the first parameter is a console log, followed by a callback
     * Testing is done within.
     */
    it('should begin with no sponsorships', function (done) {
      Sponsorships.find({}, function (err, sponsorships) {
        // I really had no idea that .should.have.length was a thing. I just pulled it out of the user test
        sponsorships.should.have.length(0);
        // also not sure what done is for, but apparently its passed in as a parameter.
        done();
      });
    });

    it('should be able to save and remove without problems', function(done) {
      var _sponsorship = new Sponsorships(sponsorship);
      _sponsorship.save(function (err) {
        //these function calls speak for themselves.
        should.not.exist(err);
        _sponsorship.remove(function (err) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('should be able to update an existing sponsorship with a new paymentType with no problems', function (done) {
      var _sponsorship = new Sponsorships(sponsorship);

      _sponsorship.save(function (err) {
        should.not.exist(err);
        _sponsorship.paymentType = 2;
        _sponsorship.save(function (err) {
          should.not.exist(err);
          _sponsorship.remove(function (err) {
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
    Sponsorships.remove().exec();
    done();
  });
  
});