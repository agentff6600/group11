/**
 * @ngdoc function
 * @name musicPlayerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp')
  .controller('MainCtrl', function ($scope) {
  	console.log("main controller");

  	$scope.page = 'home';
  	$scope.sidebar = true;

  	$scope.toggleSidebar = function() {
  		$scope.sidebar = !$scope.sidebar;
  	}
});
