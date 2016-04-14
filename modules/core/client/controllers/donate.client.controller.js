'use strict';

angular.module('core').controller('DonateController', ['$scope', '$http', '$stateParams',
  function($scope, $http, $stateParams){
    $scope.collapsedCC = true;
    $scope.collapsedPP = true;
    $scope.collapsedCheck = true;

    $scope.setMoney = function(value) {
      $scope.donation = value;
    };

    $scope.stripeCallback = function (code, result) {
      if (result.error) {
        window.alert('it failed! error: ' + result.error.message);
      } else {
        window.alert('success! token: ' + result.id);
      }
    };
  }]);
