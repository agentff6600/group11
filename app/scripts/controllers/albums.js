/**
 * @ngdoc function
 * @name musicPlayerApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp') 	
  .controller('AlbumsCtrl', function ($scope, $rootScope, Spotify) {
    console.log("albums controller");   		
    $scope.getAlbumsFromArtist = function(artist){      
      //Data is retrieved only from Swedesh Market (if other country required change 'SE' string)
      //Limited to 20 Albums (can be extended to maximum 50 - just add in {limit: 50})
  	
      Spotify.getArtistAlbums(artist,{country:'SE'}).then(function (data) {     
      $scope.albums = data.items;         
      $rootScope.albumsOfArtist = data.items; 
      //console.log("albums", $rootScope.albumsOfArtist);       
  });
    }
    
  });

