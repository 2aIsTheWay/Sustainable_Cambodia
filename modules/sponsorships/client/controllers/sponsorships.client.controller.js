'use strict';

angular.module('sponsorships').controller('SponsorshipController', ['$scope','$http','$stateParams','$state','Authentication' ,'Sponsorship','Children',
  function($scope,$http, $stateParams,$state,Authentication ,Sponsorship, Children){

     //used to find the child
    $scope.loadChild = function() {
      var id = $stateParams.childrenId;
      Children.read(id)
              .then(function(response) {
                $scope.children = response.data;
              }, function(error) {
                $scope.error = 'Unable to retrieve child with id "' + id + '"\n' + error;
              });
    };

    $scope.find = function() {
      $scope.findbyUserId();
    };

    $scope.childFind = function(sponsorships) {
      var i = 0;
      $scope.filteredOutSponsorships = [];
      while(i<sponsorships.length){
        var filteredOutSponsorship = sponsorships[i];
        var id = sponsorships[i].child_id;
        $scope.getChild(id,filteredOutSponsorship);
        i++;
      }

    };
    //Used to get childrens first name and last name to display.  This was when
    //The sponsorship schema did not have child first name and last name
    //If you want to add anything from the children schema here follow the
    //steps metaphorically
    $scope.getChild = function(id,filteredOutSponsorship){
      Sponsorship.getByChildId(id).then(function(response) {
        var child = response.data;
        filteredOutSponsorship.firstName = child.firstName;
        filteredOutSponsorship.lastName = child.lastName;
        filteredOutSponsorship.childId = id;
        filteredOutSponsorship.primaryPhoto = child.primaryPhoto;
        $scope.filteredOutSponsorships.push(filteredOutSponsorship);
      }, function(error) {
        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };


    $scope.findbyUserId = function() {
      var id = Authentication.user._id;//Authentication object gets the user stuff
      Sponsorship.getByUserId(id).then(function(response) {
        $scope.childFind(response.data);
      }, function(error) {
        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };
    //used to create a sponsorship called from the createsponsorship.client.view.html
    $scope.createsponsorship = function(isValid) {
      $scope.error = null;
      if(!isValid){
        $scope.broadcast('show-errors-check-validity','articleForm');
        return false;
      }
      var beginDate = new Date();


      var id = Authentication.user._id;

      $scope.sponsorship.user_id = id;//sets the id of sponsorship to that
      $scope.sponsorship.child_id = $stateParams.childrenId;
      $scope.sponsorship.beginDate = beginDate;


      $scope.sponsorship.childFirstName = $scope.children.firstName;//$stateParams.childrenFirstName;

      $scope.sponsorship.childLastName = $scope.children.lastName;

      $scope.sponsorship.userEmail = Authentication.user.username;
      //Makes the end date a full year ahead of begin date
      //by default all sponsorships last one whole year
      $scope.sponsorship.endDate = new Date(beginDate.getFullYear()+1,beginDate.getMonth(), beginDate.getDate());

      $scope.sponsorshipType = {
        sponsorshipType: $scope.sponsorship.sponsorshipType
      };
      //post to the sponsorship API


      Children.updateFunding($stateParams.childrenId,$scope.sponsorshipType)//there is an error here idk what it is
        .then(function(response) {
          $http.post('/api/'+id+'/sponsor/sponsorships', $scope.sponsorship)
                  .then(function(response) {
                    //if the object is successfully saved redirect back to the list page
                    $state.go('sponsorship.list', { successMessage: 'Sponsorship succesfully created!' });
                  }, function(error) {
                    //otherwise display the error
                    $scope.error = 'Unable to save sponsorship!\n' + error;
                  });
        }, function(error) {
          //otherwise display the error
          $scope.error = 'Unable to sponsor child!\n' + error;
        });
    };

  }
]);
