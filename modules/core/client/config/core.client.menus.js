'use strict';

/* Initially added the dashboard as a discrete menu item, but it does not look nice.
** So, moving it to the Admin menu, as Chris initially suggested

angular.module('core').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Dashboard',
      state: 'dashboard',
      type: 'item',
      roles: ['admin', 'superadmin'],
      position: 5
    });   
  }
]);

*/