'use strict';

angular.module('children').factory('Children', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('/api/children');
      },
      createChild: function() {
        return $http.post('/api/children');
      },
      read: function(id) {
        return $http.get('/api/children/' + id);
      },
      deleteChild: function(id) {
        return $http.delete('/api/children/' + id);
      }
    };
    return methods;
  }]);
