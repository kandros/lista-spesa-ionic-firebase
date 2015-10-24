angular.module("listControllersModule", [])

.controller("listController", ['$scope', function($scope) {
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;
  $scope.list = [];
  _.times(40, function (index) {
    $scope.list.push({
      name: "Product "+ index
    });
  });
}]);
