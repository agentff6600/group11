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

    $scope.addNewPlaylist("My cool Playlist");       

    for (var i = 0; i < $scope.topsongs.length; i++) {
     $scope.addSongToPlaylist(1, $scope.topsongs[i]);
   }; 		   

 });

   $scope.playlists = {};    

   $rootScope.queue = [];     

   $scope.setCurrentPlist = function(id) {
    $rootScope.plId = id;    
    $rootScope.totalSongs = totalSongs(id);
   }

   function totalSongs(playlistId)
   {
      var total = $scope.playlists[playlistId].playlist.songs.length;
      $rootScope.totalSongs = total;

      return total;

   }

   $scope.playAll = function(playlistId)
   {           
      for (var i = 0; i < $scope.playlists[playlistId].playlist.songs.length; i++) {
        $scope.addSongToTheQueue($scope.playlists[playlistId].playlist.songs[i]);
      };
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

   $rootScope.queue.push(song);

   //$rootScope.handlePlayer(true, song.preview_url);  
 }

 $scope.removeSongFromPlaylist = function(playlistId, song){      
    var index = $scope.playlists[playlistId].playlist.songs.indexOf(song);     
    $scope.playlists[playlistId].playlist.songs.splice(index, 1);

    totalSongs(playlistId);


 }

$rootScope.removeSongFromQueue = function(song){  
  for (var i = 0; i < $rootScope.queue.length; i++) {    
    if($rootScope.queue[i] === song)
    {                    
      var index = $rootScope.queue.indexOf($rootScope.queue[i]);
      $rootScope.queue.splice(index, 1);
    } 
  };

  $rootScope.handlePlayer(false);
  if($rootScope.queue.length != 0)
  {
    $rootScope.handlePlayer(true, $rootScope.queue[0].preview_url);  
  }

  console.log($rootScope.queue);
}

$rootScope.removeFirstSongFromQueue = function(){     
  $rootScope.queue.shift();

  if($rootScope.queue.length != 0)
  {
      $rootScope.handlePlayer(true, $rootScope.queue[0].preview_url, true);
  }
  else
  {
       $rootScope.handlePlayer(false);
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

});
