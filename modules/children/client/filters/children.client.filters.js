'use strict';

//Filter to split the primary and additonal photo variables
angular.module('children')
  .filter('split', function() {
    return function(input, splitChar, splitIndex) {
      // do some bounds checking here to ensure it has that index
      return input.split(splitChar)[splitIndex];
    };
  });
