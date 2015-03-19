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
 .controller('PlaylistsCtrl', function ($scope, Spotify, Playlist) {
   console.log("playlists controller");

   Spotify.getAlbumTracks('2G4AUqfwxcV1UdQjm2ouYr').then(function (data) {
    $scope.temporary = data.items;        

    for (var i = 0; i < data.items.length; i++) {
     $scope.addSongToTheList($scope.temporary[i]);
   }; 		
 });

   $scope.playlists = []; 

   $scope.queue = []; 

   $scope.listOfSongs = [];

   var i = 0;

   $scope.addNewPlaylist = function(name){          
    $scope.playlists.push(new Playlist(name));

    console.log($scope.playlists);
    console.log($scope.queue);
  }

  $scope.addSongToPlaylist = function(playlist, song){
    for (var i = 0; i < $scope.playlists.length; i++) {    

      if($scope.playlists[i].name === playlist)
      {      
       $scope.playlists[i].songs.push($scope.temporary[0]);
     }
   };    
 }

 $scope.addSongToTheList = function(song){

   $scope.listOfSongs.push(song);   
 }

 $scope.addSongToTheQueue = function(song){

   $scope.queue.push(song);

   console.log($scope.queue);
 }

 $scope.removeSongFromPlaylist = function(playlist, song){    

  for (var i = 0; i < $scope.playlists.length; i++) {    

    if($scope.playlists[i].name === playlist)
    { 
      for (var j = 0; j < $scope.playlists[i].songs.length; j++) {
        console.log($scope.playlists);
        if($scope.playlists[i].songs[j] === song)
        {            
          var index = $scope.playlists[i].songs.indexOf(song);
          $scope.playlists[i].songs.splice(index, 1);
        } 
      };
    }
  };
}

$scope.removeSongFromQueue = function(song){     
  for (var i = 0; i < $scope.queue.length; i++) {    
    if($scope.queue[i] === song)
    {                    
      var index = $scope.queue.indexOf($scope.queue[i]);
      $scope.queue.splice(index, 1);
    } 
  };
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
