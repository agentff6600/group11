/**
 * @ngdoc function
 * @name musicPlayerApp.controller:PlaylistsCtrl
 * @description
 * # PlaylistsCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp')
  .controller('PlaylistsCtrl', function ($scope, Spotify) {
  	console.log("playlists controller");

  	Spotify.getAlbumTracks('2G4AUqfwxcV1UdQjm2ouYr').then(function (data) {
        $scope.temporary = data.items;

        console.log($scope.temporary.length);
        
        for (var i = 0; i < $scope.temporary.length; i++) {
  			$scope.addSongToTheList($scope.temporary[i]);
  		};

  		console.log($scope.listOfSongs);
    });

  $scope.playlist1 = [];
  $scope.playlist2 = [];

  
  $scope.listOfSongs = [
  ];

  $scope.addSongToTheList = function(song){

  	$scope.listOfSongs.push(song);
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
