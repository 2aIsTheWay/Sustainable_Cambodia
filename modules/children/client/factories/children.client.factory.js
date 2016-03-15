'use strict';

angular.module('children').factory('Children', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('/api/children');
      },

      read: function(id) {
        return $http.get('/api/children/' + id);
      }
    };
    return methods;
  }]);
