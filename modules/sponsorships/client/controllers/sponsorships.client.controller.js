'use strict';

angular.module('sponsorships').controller('SponsorshipController', ['$scope', 'Sponsorship',
  function($scope, Sponsorship){
    $scope.find = function() {
      Sponsorship.getAll().then(function(response) {
        $scope.sponsorship = response.data;
      }, function(error) {

        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };


  }
]);
