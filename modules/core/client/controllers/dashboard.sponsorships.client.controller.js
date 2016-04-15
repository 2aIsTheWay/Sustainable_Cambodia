'use strict';

// The line below is where the injection happens to access Children. Note how the controller now has square brackets that open here and close at the end.
// This means we are registering dependencies for the controller. Dragon warnings: $scope need to come first. Always. Also, the first time you see the word
// Children it is a dependency injection and requires single quotes. It appears the second time as parameter being passed into he anonymous function and 
// does not require single quotes.
angular.module('core').controller('DashboardSponsorshipsCtrl', ['$scope', 'Sponsorship', 'uiGridConstants', function ($scope,Sponsorship,uiGridConstants) {

  // Now that we have access to the Children API, we need a function to call response.data to access it and 
  // populate a variable with the results. That's what this function does. It calls the getCarousel factory 
  // which calls an $http query to route /api/children/carousel and checks authoization policy. 
  // Then the route calls the children server controller for carouselList. To understand how it all wires 
  // together, I like this notation:
  // findCarousel --> factory --> route --> authorization policy --> server controller --> response.data --> 
  // populated var for our use (we called it children)
  $scope.initSponsorships = function() {
    Sponsorship.getAll().then(function(response) {
      $scope.sponsorshipGridOptions.data = response.data;
    }, function(error) {
      $scope.error = 'Unable to retrieve sponsorships\n' + error;
    });
  };

  $scope.sponsorshipGridOptions = {
    enableSorting: true,
    enableFiltering: true,
    enableHorizontalScrollbar: 1,
    enableVerticalScrollbar: 1, 
    showGridFooter: true,
    columnDefs: [
      { displayName:'First Name', field: 'childFirstName' },
      { displayName:'Last Name', field: 'childLastName' },
      { displayName:'Sponsor Username', field: 'userEmail' },
      { displayName:'Begin Date', field: 'beginDate' },
      { displayName:'End Date', field: 'endDate' },
      { displayName:'Monthly', field: 'monthlySubscription', filter: {
        type: uiGridConstants.filter.SELECT,
        selectOptions: [ { value: 'true', label: 'true' }, { value: 'false', label: 'false' } ] 
      } },
      { displayName:'Payment Type', field: 'paymentType' },
    ],
    enableGridMenu: true,
    enableSelectAll: true,
    exporterMenuPdf: false,
    exporterCsvFilename: 'SC_Sponsorships.csv',
    exporterCsvLinkElement: angular.element(document.querySelectorAll('.custom-csv-link-location')),
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
    }
  };

}]);
// Don't forget the closing square bracket on the line above to close the dependency injection.