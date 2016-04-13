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
      Sponsorship.getAll().then(function(response) {
        $scope.sponsorship = response.data;
        console.log(response.data);
        $scope.findbyUserId();
      }, function(error) {

        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };

    $scope.childFind = function(sponsorships) {
      var i = 0;
      $scope.filteredOutSponsorships = [];
      while(i<sponsorships.length){
        var filteredOutSponsorship = sponsorships[i];
        var id = sponsorships[i].child_id;
        console.log(filteredOutSponsorship.child_id);
        //console.log('ID ISSSSSSSS'+sponsorships[i]);
        $scope.getChild(id,filteredOutSponsorship);
        i++;
      }

    };

    $scope.getChild = function(id,filteredOutSponsorship){
      Sponsorship.getByChildId(id).then(function(response) {
        var child = response.data;
        filteredOutSponsorship.firstName = child.firstName;
        filteredOutSponsorship.lastName = child.lastName;
        filteredOutSponsorship.childId = id;
        filteredOutSponsorship.primaryPhoto = child.primaryPhoto;
        //append stuff if needed to add on to the sponsorship object to get stuff back
        $scope.filteredOutSponsorships.push(filteredOutSponsorship);
        console.log('I hope this works '+filteredOutSponsorship._id);
        //console.log('THIS IS '+ filteredOutSponsorship);
        //console.log(response.data);
      }, function(error) {
        $scope.error = 'Unable to retrieve sponsorships\n' + error;
      });
    };


    $scope.findbyUserId = function() {
      var id = Authentication.user._id;//Authentication object gets the user stuff
      var childId;
      Sponsorship.getByUserId(id).then(function(response) {
        $scope.childFind(response.data);
        console.log(response.data);
        //$scope.filteredOut = response.data;
        //console.log(response.data[1]);
        //childId = response.data.child_id;//this doesnt work?  Whats that for

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
      //var childId = $stateParams.childrenId;//This is undefined but why?
      //var childFirstName = $stateParams.childrenFirstName;
      //var childLastName = $stateParams.childrenLastName;

      var id = Authentication.user._id;
      var sponsorshipLength = $scope.sponsorshipTemp.sponsorshipType;

      if(sponsorshipLength === 'full'){
        $scope.sponsorship.endDate = new Date(beginDate.getFullYear() + 1, beginDate.getMonth(),beginDate.getDay());
      }else if(sponsorshipLength === 'half'){
        var halfYear = 366/2;//Assuming leap year?  Benefit of the doubt
        //Adding 6 months is not neccesarily accurate by the date as half a year
        $scope.sponsorship.endDate = new Date(beginDate.getFullYear(), beginDate.getMonth(),beginDate.getDay() +halfYear);
        //Although half sponsorship is +6 months MEAN stack as of April 2016 has an offset of 3 days
      }
      else{
        console.log('something happened?');
        return false;
      }
      $scope.sponsorship.user_id = id;//sets the id of sponsorship to that
      $scope.sponsorship.child_id = $stateParams.childrenId;
      $scope.sponsorship.beginDate = beginDate;
      //TODO:Before I post I need to get the chilrdenID somehow.

      //post to the sponsorship API
      console.log('I do go here!');
      $scope.sponsorshipType = {
        sponsorshipType:$scope.sponsorshipTemp.sponsorshipType
      }; 
      Children.updateFunding($stateParams.childrenId,$scope.sponsorshipType)
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
