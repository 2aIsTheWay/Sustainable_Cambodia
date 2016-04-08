'use strict';

angular.module('children').controller('ChildrenPictureController', ['$scope', '$timeout', '$window', '$http', '$stateParams', '$state', '$filter', 'Children', 'Authentication', 'FileUploader',
  function($scope, $timeout, $window, $http, $stateParams, $state, $filter, Children, Authentication, FileUploader){

    $scope.findOne = function() {
      var id = $stateParams.childrenId;
      Children.read(id)
              .then(function(response) {
                $scope.children = response.data;
                $scope.imageURL = $scope.children.primaryPhoto;
              }, function(error) {
                $scope.error = 'Unable to retrieve child with id "' + id + '"\n' + error;
              });
    };

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/children/picture/'+$stateParams.childrenId,
      method: 'POST',
      alias: 'newPrimaryPicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate child object
      $scope.findOne();

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change child primary picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.children.primaryPhoto;
    };

    $scope.uploader.onBeforeUploadItem = onBeforeUploadItem;
    function onBeforeUploadItem(item) {
      item.formData.push({ dateTaken: $scope.dateTaken });
    }

  }]);
