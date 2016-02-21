'use strict';

angular.module('children').controller('ChildrenController', ['$scope', '$stateParams', '$location', 'Childrens',
  function ($scope, $stateParams, $location, Childrens) {
    $scope.findOne = function() {
      console.log(Childrens);
      $scope.children = Childrens.get({
        _id: $stateParams.childrenId
      });
    };
  }
]);
