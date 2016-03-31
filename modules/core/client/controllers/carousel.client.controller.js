'use strict';

angular.module('core').controller('CarouselCtrl', ['$scope', 'Children', function ($scope,Children) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.findCarousel = function() {
      Children.getCarousel().then(function(response) {
        $scope.children = response.data;
      }, function(error) {
        $scope.error = 'Unable to retrieve children\n' + error;
      });
    };


  $scope.addSlide = function(slideChildPhotoID) {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '/modules/children/client/img/uploads/' + slideChildPhotoID + '.jpg',
      text: ['My name is Phy Peach. This year 2015, I plan to begin my university studies in Management at UME in Pursat Town. Earlier Profile from 2014: I am in grade 12 at Tea Chom Rat High School. I live in Svay Att Village. Both my mother and father are farmers. I have one brother and 2 sisters. In my free time I do my homework. I want to attend school at Sustainable Cambodia because I will be able to learn computer skills, Khmer and English. Physics is my favorite subject. When I am older I want to be an electrician because I can make a lot of money and install lights in town.',
      'My name is Ravy. I am a boy in grade 6 at Sthany Primary School. My father is a security guard and my mother is a housewife. I have one brother and one sister. rnrnI like to help my parents with the housework and play with my friends in my spare time. I want to attend school at Sustainable Cambodia because I want to gain knowledge and I don&rsquo;t pay for school. What I like most about school is reading story books. My favorite subject is Math. When I grow up I want to be a teacher.',
      'My name is Sopheaktra. I am a student in grade 8 at Pursat Secondary School. I live with my parents and my 2 brothers. My father is a policeman and my mother is a housewife.rnrnSome of my favorite activities are playing sports, doing homework and reading books. I attend school at Sustainable Cambodia because I want to get better knowledge to support my studies at state school.&nbsp;rnIn the future, I want to become a policeman because I want to help protect my nation.',
      'My name is Sreyroth. I am in the twelfth grade at Teachomrat High School. Both of my parents are farmers and I have three sisters and five brothers. I like to read books in my spare time. I want to attend school at Sustainable Cambodia because I do not have to spend money and I want to gain more knowledge and study English. What I like most about Sustainable Cambodia is the library and the gardens. My favorite subject is English because I want to be able to speak with foreigners. When I grow up I want to be a teacher because I want to teach children.'][slides.length % 4],
      id: currIndex++
    });
  };

  //for (var i = 0; i < 4; i++) {
  //  var childPhotoID = 4490;
  //  $scope.addSlide(childPhotoID);
  //  childPhotoID = childPhotoID + 10;
  //}

  $scope.addSlide(4489);
  $scope.addSlide(4499);
  $scope.addSlide(4510);
  $scope.addSlide(4520);
  $scope.addSlide(4530);


}]);