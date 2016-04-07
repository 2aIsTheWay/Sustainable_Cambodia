'use strict';

//angular.module('core', ['ngAnimate', 'ui.bootstrap']);
angular.module('app', ['ui.bootstrap'])
.controller('CollapseController', function($scope){
  $scope.date = new Date();
});