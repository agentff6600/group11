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
       $rootScope.artist_name=$rootScope.songs[0].artists[0].name;    

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
      $rootScope.show=1;
      console.log("songs",$rootScope.show);
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
        $rootScope.selected = selectedItem;
      }, function () {
        $log.info('Album Closed');
      });
      $rootScope.img=album.images[0].url
      $rootScope.name=album.name;
    };

    $scope.playAll = function(songs)
    {           
      for (var i = 0; i < songs.length; i++) {        
        $rootScope.queue.push(songs[i]);
      };
    }

    $scope.openArtists = function (artist, size) {     

          //$rootScope.artistModal = artist;          
          console.log(artist);
          //Data is retrieved only from Swedesh Market (if other country required change 'SE' string)
          //Limited to 20 Albums (can be extended to maximum 50 - just add in {limit: 50})
          Spotify.getArtistAlbums(artist.id, {
            country: 'SE'
          }).then(function (data) {         
            $rootScope.albumsOfArtist = data.items;             

            var modalInstance = $modal.open({
              templateUrl: '/views/ModalAlbum.html',
              controller: 'ModalAlbumInstanceCtrl',
              size: size,
              resolve: {
                items: function () {                
                  return $rootScope.albumsOfArtist;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) { 
              $rootScope.selected = selectedItem;
            }, function () {
              $log.info('Modal Closed');
            });                   
          });           
        };
  	
  })


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
.controller('ModalSongInstanceCtrl', function ($scope, $rootScope, $modalInstance, items) {

  $rootScope.songs = items;
  $rootScope.selected = {
    item: $rootScope.songs[0]
  };
});
