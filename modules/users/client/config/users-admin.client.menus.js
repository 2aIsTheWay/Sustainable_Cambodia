'use strict';

// Configuring the Articles module
//This adds a tab to the nav bar if you are an admin and provides its respective options
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Dashboard',
      state: 'dashboard'
    });
  }
]);
