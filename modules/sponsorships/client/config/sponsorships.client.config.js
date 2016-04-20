'use strict';

// Configuring the Sponsorships module
//This is part of the nav bar.  It contains options a sponsor or admin has.
angular.module('sponsorships').run(['Menus',
  function (Menus) {
    // Add the sponsorship dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Sponsorships',
      state: 'sponsorship',//changing this mess with display
      type: 'dropdown',
      roles: ['user']
    });
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'sponsorship', {
      title: 'List Sponsorships',
      state: 'sponsorship.list'
    });

  }
]);
