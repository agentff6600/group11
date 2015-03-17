/**
 * @ngdoc function
 * @name musicPlayerApp.controller:SongsCtrl
 * @description
 * # SongsCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp')
  .controller('SongsCtrl', function ($scope, Spotify) {
  	console.log("songs controller");  	    

    $scope.getSongsFromAlbum = function(album){
      Spotify.getAlbumTracks(album).then(function (data) {
        $scope.songs = data.items;        
      });
    }
  	
  });
