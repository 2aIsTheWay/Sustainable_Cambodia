'use strict';

angular.module('sponsorships').factory('Sponsorship', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('/api/sponsorships/ui-grid');
      }
    };
    return methods;
  }]);
