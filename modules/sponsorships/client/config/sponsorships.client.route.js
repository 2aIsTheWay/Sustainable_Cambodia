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
      .state('sponsorships', {
        url: '/sponsorships',
        templateUrl: 'modules/sponsorships/client/views/sponsorships.client.view.html'
      })
      /*.state('sponsorships.view', {
        url: '/:sponsorshipviews',
        templateUrl: 'modules/sponsorships/client/views/sponsorships.client.view.html'
      })*/
      ;
  }
]);
