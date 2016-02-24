'use strict';

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
  }
]);