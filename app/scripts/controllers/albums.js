/**
 * @ngdoc function
 * @name musicPlayerApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp') 	
  .controller('AlbumsCtrl', function ($scope, $rootScope, AlbumsModal,Spotify) {
    console.log("albums controller");   		
    $scope.getAlbumsFromArtist = function(artist){      
      //Data is retrieved only from Swedesh Market (if other country required change 'SE' string)
      //Limited to 20 Albums (can be extended to maximum 50 - just add in {limit: 50})
  	
      Spotify.getArtistAlbums(artist,{country:'SE'}).then(function (data) {     
      $scope.albums = data.items;         
      $rootScope.albumsOfArtist = data.items; 

      console.log($rootScope.albumsOfArtist);
      //console.log("albums", $rootScope.albumsOfArtist);       
  });
    }

    var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'Delete Customer',
            headerText: 'Delete ',
            bodyText: 'Are you sure you want to delete this customer?'
        };
    $scope.modalService.showModal({}, modalOptions).then(function () {
            console.log("Albums");
        });
  });

