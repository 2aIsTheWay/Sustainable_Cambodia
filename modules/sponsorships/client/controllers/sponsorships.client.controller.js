'use strict';

angular.module('sponsorships').controller('SponsorshipController', ['$scope','$stateParams', 'Sponsorship',
  function($scope,$stateParams, Sponsorship){
    $scope.find = function() {
      Sponsorship.getAll().then(function(response) {
        $scope.sponsorship = response.data;
        $scope.findbyUserId();
      }, function(error) {

        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };

    $scope.findbyUserId = function() {
      var id = $stateParams.userId;//StateParams currently gets the right id.  The problem is filtering
      console.log(id);
      id = '56f206b053c114d712d6c6fa';
      Sponsorship.getByUserId(id).then(function(response) {
        $scope.filteredOut = response.data;
      }, function(error) {

        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };

  }
]);
