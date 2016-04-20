'use strict';
//NOTE:Methods used to do HTTP requests.  To use an HTTP request listed here just call the method
angular.module('children').factory('Children', ['$http',
  function($http) {
    var methods = {
      getAllEligible: function() {
        return $http.get('/api/eligiblechildren');
      },
      getAll: function() {
        return $http.get('/api/children');
      },
      getCarousel: function() {
        return $http.get('api/children/carousel');
      },
      read: function(id) {
        return $http.get('/api/children/' + id);
      },
      deleteChild: function(id) {
        return $http.delete('/api/children/' + id);
      },
      updateChild: function(id, children) {
        return $http.put('/api/children/' + id, children);
      },
      updateFunding: function(id, funds) {
        return $http.put('/api/children/fundinglevel/' + id, funds);
      },
    };
    return methods;
  }]);
