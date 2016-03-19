'use strict';

// Setting up route
angular.module('children').config(['$stateProvider',
  function ($stateProvider) {
    // Children state routing
    $stateProvider
      .state('children', {
        abstract: true,
        url: '/children',
        template: '<ui-view/>'
      })
      .state('children.list', {
        url: '',
        templateUrl: 'modules/children/client/views/children.client.view.html'
      })
      .state('children.view', {
        url: '/:childrenId',
        templateUrl: 'modules/children/client/views/child.client.view.html'
      })
      .state('children.createChild', {
        url: '/createChild',
        templateUrl: 'modules/children/client/views/createChild.client.view.html'
      });
  }
]);
