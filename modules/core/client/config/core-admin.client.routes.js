'use strict';

// Setting up route
//if you are an admin it sends you to the admin state or the landing page of admin site
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      });
  }
]);
//if you are a sponsor it sends you to the sponsor state or the landing page of the sponsor site
angular.module('core.sponsor.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('sponsor', {
        abstract: true,
        url: '/sponsor',
        template: '<ui-view/>',
        data: {
          roles: ['sponsor']
        }
      });
  }
]);
