'use strict';
var app=angular.module('myApp', []);

angular.module('children').controller('ChildrenController', ['$scope', '$location', '$stateParams', '$state', 'Children',
  function($scope, $location, $stateParams, $state, Children){
    $scope.find = function() {
      Children.getAll().then(function(response) {
        $scope.children = response.data;
      }, function(error) {
        $scope.error = 'Unable to retrieve children\n' + error;
      });
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

    //StartFrom filter
    app.filter('startFrom', function() {
      return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
      };
    });
  }]);