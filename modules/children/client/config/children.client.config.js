'use strict';

// Configuring the Children module

//NOTE:Used for organization in terms of placing different module states on the nav bar
angular.module('children').run(['Menus',
  function (Menus) {
    // Add the children dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Sponsor a child',
      state: 'children',
      type: 'dropdown',
      roles: ['*']
    });
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'children', {
      title: 'Choose a child',
      state: 'children.list'
    });
    Menus.addSubMenuItem('topbar', 'children', {
      title: 'Add a new child',
      state: 'children.create',
      roles: ['admin']
    });
  }
]);
