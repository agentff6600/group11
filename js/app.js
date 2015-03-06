app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
  $scope.click = function() {
        $scope.boolChangeClass = !$scope.boolChangeClass;
        $scope.$apply();
    };
});
