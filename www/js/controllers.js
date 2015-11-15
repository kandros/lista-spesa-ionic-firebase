angular.module("listControllersModule", [])

.controller("listController", ['$scope','ListArray','$ionicModal','$ionicPopup','$ionicListDelegate', function($scope, ListArray, $ionicModal, $ionicPopup, $ionicListDelegate) {
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.list = ListArray;

  $scope.showDeleteAllConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Svuota presi',
      template: 'Sei sicuro di volere cancellare gli elementi presi?'
    });
    confirmPopup.then(function(res) {
      if (res) {
        $scope.removeCompleted();
      } else {
        return false;
      }
    });
  };

  $scope.resetUi = function() {
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
  };
  $ionicModal.fromTemplateUrl('templates/add-item-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function(item) {
    $ionicListDelegate.closeOptionButtons();
    $scope.itemInForm = item || {
      important: false,
      completed: false
    };
    console.log($scope.itemInForm);
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();

  };

  $scope.submitForm = function() {
    if ($scope.itemInForm.hasOwnProperty('$id')) {
        $scope.updateItemInFirebase($scope.itemInForm);
    } else {
      $scope.addItem();
    }
    $scope.closeModal();
    $scope.resetUi();
  };

  $scope.addItem = function() {
      $scope.list.$add($scope.itemInForm);
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.toggleComplete = function(item) {
    item.completed = !item.completed;
    $scope.updateItemInFirebase(item);
    console.log(item);
  };
  $scope.removeItemInFirebase = function(item) {
    $scope.list.$remove(item);
  };

  $scope.updateItemInFirebase = function(item) {
    $scope.list.$save(item);
  };

  $scope.removeCompleted = function() {
    $scope.list.forEach(function(item) {
      if (item.completed) {
        $scope.removeItemInFirebase(item);
      }
    });
  };
  $scope.reorderItem = function(item, fromIndex, toIndex) {
    $scope.list.splice(fromIndex, 1);
    $scope.list.splice(toIndex, 0, item);
  };
}]);
