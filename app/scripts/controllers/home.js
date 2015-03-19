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
  		for (var i=0; i<data.artists.items.length; i++){
  			$scope.artists.push(data.artists.items[i]);
  		}
		for (var i=0; i<data.albums.items.length; i++){
  			$scope.albums.push(data.albums.items[i]);
  		}
  		for (var i=0; i<data.tracks.items.length; i++){
  			$scope.songs.push(data.tracks.items[i]);
  		}
  		console.log($scope.artists);
  		console.log($scope.albums);
  		console.log($scope.songs);
  	});
  	}
	
});
