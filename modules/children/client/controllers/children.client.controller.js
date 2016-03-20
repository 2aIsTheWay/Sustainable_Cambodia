'use strict';
var app=angular.module('myApp', []);

angular.module('children').controller('ChildrenController', ['$scope', '$stateParams', '$state', '$filter', 'Children',
  function($scope, $stateParams, $state, $filter, Children){
    $scope.find = function() {
      Children.getAll().then(function(response) {
        $scope.children = response.data;
        $scope.buildPager();
      }, function(error) {
        $scope.error = 'Unable to retrieve children\n' + error;
      });
    };

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.children, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };

    $scope.findOne = function() {
      var id = $stateParams.childrenId;
      Children.read(id)
              .then(function(response) {
                $scope.children = response.data;
              }, function(error) {
                $scope.error = 'Unable to retrieve child with id "' + id + '"\n' + error;
              });
    };
    $scope.pagination = function() {
      $scope.currentPage = 0;
      $scope.pageSize = 20;
      $scope.numberOfPages=function(){
        return Math.ceil($scope.children.length/$scope.pageSize);   
      };
    };

    $scope.deleteChild = function() {
      $scope.error = null;
      Children.deleteChild($stateParams.childId).then(function(response) {
        $state.go('children.list', { successMessage: 'Child successfully removed!' });
      }, function(error) {
        $scope.error = 'Unable to update the child!\n' + error;
      });
    };

    $scope.updateChild = function(isValid) {
      $scope.error=null;
      console.log($stateParams.childrenId);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');
        return false;
      }
      Children.updateChild($stateParams.childrenId, $scope.children)
        .then(function(response) {
          $state.go('children.list', { successMessage: 'Child succesfully updated!' });
        }, function(error) {
          $scope.error = 'Unable to update child!\n' + error;
        });
    };

    $scope.createChild = function(isValid) {
      $scope.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');
        return false;
      }
      /* Create the child object */
      var child = {
        firstName:			                $scope.firstName,
        lastName:                       $scope.lastName,
        gender:                         $scope.gender,
        biography:                      $scope.biography,
        eligibleForSponsorship:         $scope.eligibleForSponsorship,
        //sponsorshipType :               $scope.,
        //fundingType:                    $scope.,
        //fundingLevel:                   $scope.,
        dob:                            $scope.dob  
        //dateCreated:                    $scope.,
        //createdBy:                      $scope.,
        //dateUpdated:                    $scope.,
        //updatedBy:                      $scope.,
        //biographyUpdated:               $scope.,
        //deleted:                        $scope.,
        //legacySponsored:                $scope. 
      };

      /* Save the article using the Listings factory */
      Children.createChild(child)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('children.list', { successMessage: 'Child succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save child!\n' + error;
              });
    };
  }]);
