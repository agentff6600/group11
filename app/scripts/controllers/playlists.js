/**
 * @ngdoc function
 * @name musicPlayerApp.controller:PlaylistsCtrl
 * @description
 * # PlaylistsCtrl
 * Controller of the musicPlayerApp
 */
 angular.module('musicPlayerApp')
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
    i++;
    $scope.playlists.push(new Playlist(name + i));

    console.log($scope.playlists);
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
