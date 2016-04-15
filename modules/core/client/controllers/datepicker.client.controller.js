'use strict';

//angular.module('core', ['ngAnimate', 'ui.bootstrap']);
angular.module('app', ['ui.bootstrap'])
.controller('DateController', function($scope){
  $scope.date = new Date();
});