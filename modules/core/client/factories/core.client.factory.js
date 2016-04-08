'use strict';

angular.module('donations').factory('Donations', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('/donations/ui-grid');
      }
    };
    return methods;
  }]);
