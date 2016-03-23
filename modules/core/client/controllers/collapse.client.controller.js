'use strict';

angular.module('core', ['ngAnimate', 'ui.bootstrap']);
angular.module('core').controller('CollapseController', function ($scope) {
    $scope.isCollapsed = false;
  }
]);