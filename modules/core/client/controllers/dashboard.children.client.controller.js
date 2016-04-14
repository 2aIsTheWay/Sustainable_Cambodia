'use strict';

// The line below is where the injection happens to access Children. Note how the controller now has square brackets that open here and close at the end.
// This means we are registering dependencies for the controller. Dragon warnings: $scope need to come first. Always. Also, the first time you see the word
// Children it is a dependency injection and requires single quotes. It appears the second time as parameter being passed into he anonymous function and 
// does not require single quotes.
angular.module('core').controller('DashboardChildrenCtrl', ['$scope', 'Children', 'uiGridConstants', function ($scope,Children,uiGridConstants) {

  // Now that we hqve access to the Children API, we need a function to call response.data to access it and populate a variable with the results.
  // That's what this function does. It calls the getCarousel factory which calls an $http query to route /api/children/carousel and checks authoization
  // policy. Then the route calls the children server controller for carouselList. To understand how it all wires together, I like this notation:
  // findCarousel --> factory --> route --> authorization policy --> server controller --> response.data --> populated var for our use (we called it children)
  $scope.initChildren = function() {
    Children.getAll().then(function(response) {
      $scope.childrenGridOptions.data = response.data;
    }, function(error) {
      $scope.error = 'Unable to retrieve children\n' + error;
    });
  };

  $scope.childrenGridOptions = {
    enableSorting: true,
    enableFiltering: true,
    enableHorizontalScrollbar: 1,
    enableVerticalScrollbar: 1, 
    showGridFooter: true,
    columnDefs: [
      { displayName:'First Name', field: 'firstName', cellTemplate: '<a href="/children/edit/{{row.entity._id}}">{{COL_FIELD}}</a>' },
      { displayName:'Last Name', field: 'lastName', cellTemplate: '<a href="/children/edit/{{row.entity._id}}">{{COL_FIELD}}</a>' },
      { displayName:'Gender', field: 'gender', filter: {
        type: uiGridConstants.filter.SELECT,
        selectOptions: [ { value: 'F', label: 'F' }, { value: 'M', label: 'M' } ]
      } },
      { displayName:'DOB', field: 'dob' },
      { displayName:'Bio', field: 'biography' },
      { displayName:'Bio Updated', field: 'biographyUpdated' },
      { displayName:'Sp Eligible', field: 'eligibleForSponsorship', filter: {
        type: uiGridConstants.filter.SELECT,
        selectOptions: [ { value: 'true', label: 'true' }, { value: 'false', label: 'false' } ]
      } },
      { displayName:'Funding Type', field: 'fundingType' },
      { displayName:'Funding Level', field: 'fundingLevel' },
      { displayName:'Updated', field: 'dateUpdated' },
      //{ name:'Edit', cellTemplate: '<span align="center"><a class="btn btn-primary" href="/children/edit/{{row.entity._id}}">Edit</a></span>' }
    ],
    enableGridMenu: true,
    enableSelectAll: true,
    exporterMenuPdf: false,
    exporterCsvFilename: 'SC_Children.csv',
    exporterCsvLinkElement: angular.element(document.querySelectorAll('.custom-csv-link-location')),
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
    }
  };

}]);
// Don't forget the closing square bracket on the line above to close the dependency injection.