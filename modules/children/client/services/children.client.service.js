'use strict';

//Children service used for communicating with the children REST endpoints
angular.module('children').factory('Children', ['$resource',
  function ($resource) {
    return $resource('api/children/:childrenId', {
      childrenId: '@_id'
    });
  }
]);
