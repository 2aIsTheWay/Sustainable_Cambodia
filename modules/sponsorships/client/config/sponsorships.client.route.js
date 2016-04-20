'use strict';

// Setting up route
//These are all the routes for sponsorship module
angular.module('sponsorships').config(['$stateProvider',
  function ($stateProvider) {
    // Sponsorhips state routing
    $stateProvider
      .state('sponsorship', {
        abstract: true,
        url: '/sponsorship',
        template: '<ui-view/>'
      })
      .state('sponsorship.list', {
        url: '',
        templateUrl: 'modules/sponsorships/client/views/sponsorships.client.view.html',

        data: {
          roles: ['user']
        }
      })
      .state('sponsorship.create', {
        url: '/create/:childrenId/:childrenFirstName/:childrenLastName',
        templateUrl: 'modules/sponsorships/client/views/createsponsorship.client.view.html',

        data: {
          roles: ['user']
        }

      })
      ;
  }
]);
