'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/index.client.view.html'
      //NOTE:This is the landing page when the URL localhost:3000 is typed
      //templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'modules/core/client/views/about.client.view.html'
      //templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'modules/core/client/views/contact.client.view.html'
      //templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('donate', {
      url: '/donate',
      templateUrl: 'modules/core/client/views/donate.client.view.html'
      //templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('gifts', {
      url: '/gifts',
      templateUrl: 'modules/core/client/views/gifts.client.view.html'
      //templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('waysToDonate', {
      url: '/waysToDonate',
      templateUrl: 'modules/core/client/views/waystodonate.client.view.html'
      //templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'modules/core/client/views/login.client.view.html'
      //templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('differentHome', {
      url: '/home',
      //templateUrl: 'modules/core/client/views/index.html'
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('dashboard', {
      url: '/dashboard',
      //templateUrl: 'modules/core/client/views/index.html'
      templateUrl: 'modules/core/client/views/dashboard.client.view.html',
      data: {
        roles: ['admin', 'superadmin']
      }
    })
    .state('sctest', {
      url: '/sctest',
      //templateUrl: 'modules/core/client/views/index.html'
      templateUrl: 'modules/core/client/views/index.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('childPage', {
      url: '/childPage',
      templateUrl: 'modules/core/client/views/child.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('childrenPage', {
      url: '/childrenPage',
      templateUrl: 'modules/core/client/views/children.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
