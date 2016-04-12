'use strict';

angular.module('sponsorships').factory('Sponsorship', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('/api/sponsorships/ui-grid');
      },

      getByUserId: function(id) {
        console.log('The id is ' + id);
        return $http.get('/api/' + id + '/sponsor/sponsorships');//what is the purpose of this?
          //I think it gets the data but idk how currently

      }
    };
    return methods;
  }]);
