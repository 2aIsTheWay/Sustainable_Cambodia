'use strict';

// Setting up route

//NOTE: State is the name used to reference a certain webpage
//NOTE: abstract means that all states that fall under this module will start with the url '/children'
//NOTE: templateUrl is the file heirarchy in respect to a web developer
//NOTE: url is the website heirarchy in respect to a user
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
      .state('children.create', {
        url: '/create',
        templateUrl: 'modules/children/client/views/child.client.create.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('children.view', {
        url: '/:childrenId',
        templateUrl: 'modules/children/client/views/child.client.view.html'
      })
      .state('children.picture', {
        url: '/picture/:childrenId',
        templateUrl: 'modules/children/client/views/child.client.edit.picture.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('children.edit', {
        url: '/edit/:childrenId',
        templateUrl: 'modules/children/client/views/child.client.edit.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
