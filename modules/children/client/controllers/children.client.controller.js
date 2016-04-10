'use strict';

angular.module('children').controller('ChildrenController', ['$scope', '$http', '$stateParams', '$state', '$filter', 'Children', 'Authentication',
  function($scope, $http, $stateParams, $state, $filter, Children, Authentication){
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
        firstName: $scope.search,
        gender: $scope.genderSearch
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
                $scope.managePhotos($scope.children.primaryPhoto, $scope.children.additionalPhotos);
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
      $http.post('/api/children', $scope.children)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('children.list', { successMessage: 'Child succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save child!\n' + error;
              });
    };

    $scope.remove = function() {
      $scope.error = null;
      Children.deleteChild($stateParams.childrenId)
      .then(function(response) {
        $state.go('children.list', { successMessage: 'Child removed from database' });
      }, function(error) {
        $scope.error = 'Unable to remove child!\n' + error;
      });
    };

    $scope.managePhotos = function(primary, additional) {
      $scope.primaryPhoto = {
        image : primary.split(',')[0],
        date : primary.split(',')[1]
      };
      $scope.additionalPhotos = [];
      var i = 0;
      while (i<additional.length){
        console.log(Date.parse(additional[i].split(',')[1]));
        var additionalPhoto = {
          image : additional[i].split(',')[0],
          date : additional[i].split(',')[1]
        };
        $scope.additionalPhotos.push(additionalPhoto);
        i++;
      }
    };

    $scope.removephoto = function(photo) {
      $scope.error = null;
      var id = $stateParams.childrenId;
      var index = $scope.children.additionalPhotos.indexOf(photo);
      $scope.photoinfo = {
        photoimage: photo.image,
        photoindex: index
      };
      $http.put('/api/children/additionalpictures/' + id, $scope.photoinfo)
      .then(function(response) {
        $scope.findOne();
      }, function(error) {
        $scope.error = 'Unable to remove additional photo!\n' + error;
      });

    };

    $scope.isAdmin = function() {
      $scope.roles=Authentication.user.roles;
      if(Authentication.user) {
        var indexOfRole = $scope.roles.indexOf('admin');
        if (indexOfRole !== -1) {
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    };

  }]);
