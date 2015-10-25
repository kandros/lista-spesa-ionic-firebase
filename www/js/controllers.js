angular.module("listControllersModule", [])

.controller("listController", ['$scope','ListArray','$ionicModal', function($scope, ListArray, $ionicModal) {
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  // $scope.list = [];
  // _.times(40, function (index) {
  //   $scope.list.push({
  //     name: "Product "+ index
  //   });
  // });
  $scope.resetUi = function() {
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
  };
  $ionicModal.fromTemplateUrl('templates/add-item-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.list = ListArray;
  $scope.addItem = function() {
      $scope.resetUi();
      $scope.list.$add({
        name: this.name,
        important: this.checked,
        completed: false
      });
      this.name = "";
      this.checked = false;
      $scope.closeModal();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // $scope.addDummy = function() {
  //   _.times(10, function (index) {
  //     var completed = false;
  //     if (index % 4 === 0) {
  //       completed = true;
  //     }
  //     $scope.list.$add({
  //       name: "Product "+ index,
  //       completed: completed,
  //       important: false
  //     });
  //   });
  // };
  $scope.toggleComplete = function (item) {
    item.completed = !item.completed;
  };
  $scope.removeItem = function (item) {
    $scope.list.$remove(item);
  };
  $scope.reorderItem = function(item, fromIndex, toIndex) {
    $scope.list.splice(fromIndex, 1);
    $scope.list.splice(toIndex, 0, item);
  };
}]);
