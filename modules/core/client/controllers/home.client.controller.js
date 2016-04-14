'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'ui.grid',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);
