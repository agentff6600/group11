/**
 * @ngdoc function
 * @name musicPlayerApp.controller:SongsCtrl
 * @description
 * # SongsCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp')
  .controller('SongsCtrl', function ($scope, $rootScope, $modal, $log, Spotify) {
  	console.log("SongsCtrl");        

    $scope.getSongsFromAlbum = function(album){          
      Spotify.getAlbumTracks(album).then(function (data) {
        $rootScope.songs = data.items;         

        for (var i = 0; i < $rootScope.songs.length; i++) {
          getAlbumImage(i, album);
        };        
      });
    }

    function getAlbumImage(i, albumId){    
    	Spotify.getAlbum(albumId).then(function (data) {            		
  			$rootScope.songs[i]["images"] = data.images[0];
		});
    }

    $scope.open = function (album, size) {

      setTimeout(function(){ 

      $scope.getSongsFromAlbum(album.id);

      }, 200);      

      var modalInstance = $modal.open({
        templateUrl: '/views/ModalSongs.html',
        controller: 'ModalSongInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $rootScope.songs;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Album Closed');
      });
    };
  	
  })


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
.controller('ModalSongInstanceCtrl', function ($scope, $rootScope, $modalInstance, items) {

  $rootScope.songs = items;
  $scope.selected = {
    item: $rootScope.songs[0]
  };
});
