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

        console.log(album);         

        for (var i = 0; i < $scope.songs.length; i++) {
          getAlbumImage(i, album);
        };  

        //$scope.$apply();      
      });
    }

    function getAlbumImage(i, albumId){    
    	Spotify.getAlbum(albumId).then(function (data) {      		
  			$scope.songs[i]["images"] = data.images[0];
        //$scope.$apply();			
  			//console.log(image);
        console.log($scope.songs);
		});
    }
  	
  });
