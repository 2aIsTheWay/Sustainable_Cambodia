'use strict';

// Configuring the Children module
angular.module('children').run(['Menus',
  function (Menus) {
    // Add the children dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Ways to Donate',
      state: 'children',
      type: 'dropdown',
      roles: ['*']
    });
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'children', {
      title: 'List Children',
      state: 'children.list'
    });
  }
]);
