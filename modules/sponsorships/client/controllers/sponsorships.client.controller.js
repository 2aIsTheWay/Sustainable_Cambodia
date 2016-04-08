'use strict';

angular.module('sponsorships').controller('SponsorshipController', ['$scope','$http','$stateParams','$state','Authentication' ,'Sponsorship','Children',
  function($scope,$http, $stateParams,$state,Authentication ,Sponsorship, Children){

    $scope.validUser = function(){
      var id = Authentication.user._id;

      if(id == undefined){
        $state.go('login');
      }
      
    }

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
      var childId;
      console.log(id);
      Sponsorship.getByUserId(id).then(function(response) {
        $scope.filteredOut = response.data;
        childId = response.data.child_id;//this doesnt work?  Whats that for
        console.log('THE STUFFY IS '+childId);
      }, function(error) {

        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
      console.log('CHILD ID IS CONSIDERED TO BE '+ childId);
      Sponsorship.getByChildId(childId).then(function(response) {
        $scope.filteredOutChild = response.data;
      }, function(error) {

        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };

    $scope.createsponsorship = function(isValid) {
      $scope.error = null;
      if(!isValid){
        $scope.broadcast('show-errors-check-validity','articleForm');
        return false;
      }
      var beginDate = new Date();
      var childId = $stateParams.childrenId;//This is undefined but why?
      var childFirstName = $stateParams.childrenFirstName;
      var childLastName = $stateParams.childrenLastName;
      console.log('Children ID is '+ childId);
      console.log('The childs first name is '+childFirstName);
      console.log('The childs last name is '+childLastName);
      var id = Authentication.user._id;
      var sponsorshipLength = $scope.sponsorshipTemp.sponsorshipType;

      if(sponsorshipLength == 'full'){
        $scope.sponsorship.endDate = new Date(beginDate.getFullYear() + 1, beginDate.getMonth(),beginDate.getDay());
      }else if(sponsorshipLength == 'half'){
        $scope.sponsorship.endDate = new Date(beginDate.getFullYear(), beginDate.getMonth() + 6,beginDate.getDay());
      }
      else{
        console.log('something happened?')
        return false;
      }
      $scope.sponsorship.user_id = id;//sets the id of sponsorship to that
      $scope.sponsorship.child_id = childId;
      $scope.sponsorship.beginDate = beginDate;
      //TODO:Before I post I need to get the chilrdenID somehow.

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
