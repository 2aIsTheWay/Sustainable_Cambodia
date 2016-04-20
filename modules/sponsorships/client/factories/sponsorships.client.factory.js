'use strict';
//NOTE:These are methods used to do HTTP requests
angular.module('sponsorships').factory('Sponsorship', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('/api/sponsorships/ui-grid');
      },

      getByUserId: function(id) {
        //console.log('The id is ' + id);
        return $http.get('/api/' + id + '/sponsor/sponsorships');
      },
      getByChildId: function(id) {
        //console.log('The child id is ' + id);
        return $http.get('/api/children/' + id);
      }
    };
    return methods;
  }]);
