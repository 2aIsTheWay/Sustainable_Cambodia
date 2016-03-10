'use strict';

// Setting up route
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