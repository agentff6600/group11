/**
 * @ngdoc function
 * @name musicPlayerApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the musicPlayerApp
 */
  angular.module('musicPlayerApp')
  .controller('HomeCtrl', function ($scope, Spotify) {
  	$scope.query;
  	$scope.artists=[];
  	$scope.albums=[];
  	$scope.songs=[];

  	$scope.searchFor = function(){  		
  		Spotify.search($scope.query,'artist,album,track', {limit:'5'}).then(function (data) {  		
  		$scope.artists=[];
  		$scope.albums=[];
  		$scope.songs=[];
  		$scope.artists.push(data.artists.items);
  		$scope.albums.push(data.albums.items);
  		$scope.songs.push(data.tracks.items); 
  		console.log($scope.artists);
  		console.log($scope.albums);
  		console.log($scope.songs);
  	});
  	}
	
});
