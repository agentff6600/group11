/**
 * @ngdoc function
 * @name musicPlayerApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the musicPlayerApp
 */
 angular.module('musicPlayerApp')
 .controller('HomeCtrl', function ($scope, Spotify, $location) {
  console.log("home controller");

  $scope.query;
  $scope.artists=[];
  $scope.albums=[];
  $scope.songs=[];

  $scope.searchFor = function(){  

    //$location.path('home'); 
    if($scope.query != "")
    {
      Spotify.search($scope.query,'artist', {limit:'5'}).then(function (data) {     
        $scope.artists=[];

        console.log(data);

        for (var i=0; i < data.artists.items.length; i++){
         $scope.artists.push(data.artists.items[i]);
       }

     });  

      Spotify.search($scope.query,'album', {limit:'5'}).then(function (data) {           
        $scope.albums=[];      

        console.log(data);  

        for (var j=0; j < data.albums.items.length; j++){
         $scope.albums.push(data.albums.items[j]);
       }

     }); 
      
      Spotify.search($scope.query,'track', {limit:'5'}).then(function (data) {     
        $scope.songs=[];

        console.log(data);

        for (var h=0; h < data.tracks.items.length; h++){
         $scope.songs.push(data.tracks.items[h]);
       }     
     }); 

     //console.log($scope.artists);
     //console.log($scope.albums);
     //console.log($scope.songs);
   }	
 }

});
