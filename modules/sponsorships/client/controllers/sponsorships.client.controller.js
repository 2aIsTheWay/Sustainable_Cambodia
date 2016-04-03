'use strict';

angular.module('sponsorships').controller('SponsorshipController', ['$scope','$http','$stateParams','$state','Authentication' ,'Sponsorship',
  function($scope,$http, $stateParams,$state,Authentication ,Sponsorship){
    $scope.find = function() {
      Sponsorship.getAll().then(function(response) {
        $scope.sponsorship = response.data;
        $scope.findbyUserId();
      }, function(error) {

        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };

    $scope.findbyUserId = function() {
      var id = Authentication.user._id;//Authentication object gets the user stuff
      console.log(id);
      //id = '56f206b053c114d712d6c6fa';
      Sponsorship.getByUserId(id).then(function(response) {
        $scope.filteredOut = response.data;
      }, function(error) {

        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };

    $scope.createsponsorship = function(isValid) {
      $scope.error = null;
      console.log('Appa is hype');
      if(!isValid){
        $scope.broadcast('show-errors-check-validity','articleForm');
        return false;
      }
      var id = Authentication.user._id;//Authentication object gets the user stuff
      //post to the sponsorship API
      console.log('I do go here!');
      $http.post('/api/'+id+'/sponsor/sponsorships', $scope.sponsorship)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('sponsorship.list', { successMessage: 'Sponsorship succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save sponsorship!\n' + error;
              });
    };


  }
]);
