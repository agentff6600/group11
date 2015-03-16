/**
 * @ngdoc function
 * @name musicPlayerApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp')
  .controller('ArtistsCtrl', function ($scope, Spotify) {
  	console.log("artist controller");

	Spotify.getArtists('4gzpq5DPGxSnKTe4SA8HAU,04gDigrS5kc9YWfZHwBETP').then(function (data) {
  		$scope.artists = data.artists;  		
	});
  });
