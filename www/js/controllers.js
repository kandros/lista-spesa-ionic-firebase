angular.module("listControllersModule", [])

.controller("listController", ['$scope','ListArray', function($scope, ListArray) {
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  // $scope.list = [];
  // _.times(40, function (index) {
  //   $scope.list.push({
  //     name: "Product "+ index
  //   });
  // });

  $scope.list = ListArray;
  $scope.addMessage = function() {
      $scope.list.$add({
        name: "dsds"
      });
    };
  _.times(10, function (index) {
    $scope.list.$add({
      name: "Product "+ index
    });
  });
  $scope.removeItem = function (item) {
    $scope.list.$remove(item);
  };
  $scope.reorderItem = function(item, fromIndex, toIndex) {
    $scope.list.splice(fromIndex, 1);
    $scope.list.splice(toIndex, 0, item);
  };
}]);
