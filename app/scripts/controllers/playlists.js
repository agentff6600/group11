/**
 * @ngdoc function
 * @name musicPlayerApp.controller:PlaylistsCtrl
 * @description
 * # PlaylistsCtrl
 * Controller of the musicPlayerApp
 */
 angular.module('musicPlayerApp')
 .directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
})
 .controller('PlaylistsCtrl', function ($scope, $rootScope, Spotify, Playlist) {
   console.log("playlists controller");

   Spotify.getAlbumTracks('2G4AUqfwxcV1UdQjm2ouYr').then(function (data) {
    $scope.temporary = data.items; 

    $scope.addNewPlaylist("NewPlaylist");       

    for (var i = 0; i < data.items.length; i++) {
     $scope.addSongToPlaylist(1,$scope.temporary[i]);
   }; 		   

 });

   $scope.playlists = {};    

   $scope.queue = [];     

   $scope.setCurrentPlist = function(id) {
    $rootScope.plId = id;
   }

   $scope.addNewPlaylist = function(name){          
    //$scope.playlists.push(new Playlist(name)); 
    
    var plId = _.uniqueId();

    var playlist = {
      id: plId,
      name: name,
      playlist: new Playlist(name)
    };

    $scope.playlists[plId] = playlist;
    $rootScope.plId = plId;
  }
  
$("#thumbnail").remove();

  $scope.addSongToPlaylist = function(id, song){

    $scope.playlists[id].playlist.songs.push(song);

    //console.log($scope.playlists[2].playlist.songs[0].album.images[0].url);
 }


 $scope.addSongToTheQueue = function(song){

   $scope.queue.push(song);
 }

 $scope.removeSongFromPlaylist = function(playlist, song){    

 }

$scope.removeSongFromQueue = function(song){     
  for (var i = 0; i < $scope.queue.length; i++) {    
    if($scope.queue[i] === song)
    {                    
      var index = $scope.queue.indexOf($scope.queue[i]);
      $scope.queue.splice(index, 1);
    } 
  };

  $rootScope.removeSrc();
  if($scope.queue.length != 0)
  {
    $rootScope.passSrc($scope.queue[0].preview_url);  
  }
}

$scope.removePlaylist = function(playlistid)
{  
  delete $scope.playlists[playlistid];
}

$scope.getArtistsAlbum = function(artistId){     
  Spotify.getArtistAlbums(artistId).then(function (data) {
    console.log(data);
  });
}


  // Limit items to be dropped in playlist1
  $scope.optionsList1 = {
    accept: function(dragEl) {
      if ($scope.playlist1.length >= 5) {
        return false;
      } else {
        return true;
      }
    }
  };
});
