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
        //console.log($scope.songs);        

        console.log($scope.getAlbumImage(album));             

        for (var i = 0; i < $scope.songs.length; i++) {
            $scope.songs[i]["images"] = $scope.getAlbumImage(album);
            //console.log($scope.songs[i]);
        };  
      });
    }

    $scope.getAlbumImage = function(albumId){    
		var image;
    	Spotify.getAlbum(albumId).then(function (data) {      		
  			image = data.images[0];			
  			//console.log(image);
		});

		return image;
    }
  	
  });
