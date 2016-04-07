'use strict';

//angular.module('core', ['ngAnimate', 'ui.bootstrap']);
angular.module('app', ['ui.bootstrap'])
.controller('CollapseController', function($scope){
  $scope.collapsedCC = "true";
  $scope.collapsedPP = true;
  $scope.collapsedCheck = true;
});