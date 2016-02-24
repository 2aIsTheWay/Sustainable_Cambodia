'use strict';

angular.module('children').factory('Children', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:3000/api/children');
      },

      read: function(id) {
        return $http.get('http://localhost:3000/api/children/' + id);
      }
    };
    return methods;
  }]);
