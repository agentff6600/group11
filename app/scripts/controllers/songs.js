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
      console.log("woho");
      Spotify.getAlbumTracks(album).then(function (data) {
        $scope.songs = data.items;          

        for (var i = 0; i < $scope.songs.length; i++) {
          getAlbumImage(i, album);
        };        
      });
    }

    function getAlbumImage(i, albumId){    
    	Spotify.getAlbum(albumId).then(function (data) {      		
  			$scope.songs[i]["images"] = data.images[0];
		});
    }
  	
  })



.controller('ModalSongsCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: '/views/ModalSongs.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
})



// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
