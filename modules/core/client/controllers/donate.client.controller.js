'use strict';

angular.module('core').controller('DonateController', ['$scope', '$http', '$stateParams', 'Authentication',
  function($scope, $http, $stateParams, Authentication){
    $scope.collapsedCC = true;
    $scope.collapsedPP = true;
    $scope.collapsedCheck = true;

    $scope.setMoney = function(value) {
      $scope.donation = value;
    };

    // $scope.stripeCallback = function (code, result) {
    //   if (result.error) {
    //     window.alert('it failed! error: ' + result.error.message);
    //   } else {
    //     window.alert('success! token: ' + result.id);
    //   }
    // };

    $scope.createChild = function(isValid) {
      console.log($scope.children);
      $scope.childtocreate = {
        donationAmount:                 $scope.donation,
        dayDonated:                     current,
        donationType:                   $scope.,
        country:                        $scope.,
        address1:                       $scope.
        address2:                       $scope.
        city:                           $scope.
        state:                          $scope.
        postal:                         $scope.

      };
      $scope.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'childrenForm');
        return false;
      }
      $http.post('/api/children', $scope.childtocreate)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('children.list', { successMessage: 'Child succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save child!\n' + error;
              });
    };

    $scope.createdonation = function(isValid) {
      $scope.error = null;
      if(!isValid){
        $scope.broadcast('show-errors-check-validity','articleForm');
        return false;
      }
      var dateDonated = new Date();
      var id = Authentication.user._id;

      $scope.donation.user_id = id;
      $scope.donation.dateDonated = dateDonated;

      $scope.donation.donationAmount = $scope.donation

      $scope.donation.country = $scope.country;
      $scope.donation.address1 = $scope.addr1;
      $scope.donation.address2 = $scope.addr2;
      $scope.donation.city = $scope.city;
      $scope.donation.state = $scope.state;
      $scope.donation.postal = $scope.zip;

      $scope.donation.userEmail = Authentication.user.username;

      //post to the donation API
      console.log('working?');
        $http.post('/api/'+id+'/donation', $scope.donation)
                .then(function(response) {
                  $state.go('home', { successMessage: 'Donation recieved! Thank you!' });
                }, function(error) {
                  //otherwise display the error
                  $scope.error = 'Unable to process donation!\n' + error;
                });
    };

  }]);
