'use strict';

//angular.module('core', ['ngAnimate', 'ui.bootstrap']);
angular.module('core').controller('CarouselCtrl', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;
  $scope.whb = 'Warren Hypnotoad Brown';

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      //image: 'http://lorempixel.com/' + newWidth + '/300',
      image: 'http://www.sustainablecambodia.org/shared/resize.asp?img=%2Fshared%2Fimages%2Fuploaded%2F4489%2EJPG&w=195&h=250',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }

  
});