'use strict';

// Configuring the Sponsorships module
angular.module('sponsorships').run(['Menus',
  function (Menus) {
    // Add the sponsorship dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Sponsorships',
      state: 'sponsorship',
      type: 'dropdown',
      roles: ['*']
    });
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'sponsorship', {
      title: 'List Sponsorships',
      state: 'sponsorships'
    });
  }
]);
