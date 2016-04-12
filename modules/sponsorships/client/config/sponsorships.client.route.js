'use strict';

// Setting up route
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
        templateUrl: 'modules/sponsorships/client/views/sponsorships.client.view.html'
      })
      .state('sponsorship.create', {
        url: '/create',
        templateUrl: 'modules/sponsorships/client/views/createsponsorship.client.view.html'
      })
      ;
  }
]);
