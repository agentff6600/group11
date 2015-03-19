/**
 * @ngdoc function
 * @name musicPlayerApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the musicPlayerApp
 */
 angular.module('musicPlayerApp')
 .controller('HomeCtrl', function ($scope, $rootScope, Spotify, $location) {
  console.log("home controller");

  $rootScope.query;
  $rootScope.artists=[];
  $rootScope.albums=[];
  $rootScope.songs=[];

  $scope.searchFor = function(){  
    //console.log($rootScope.query);
    $location.path('home'); 
    if($rootScope.query != "")
    {
      Spotify.search($rootScope.query,'artist', {limit:'6'}).then(function (data) {     
        $rootScope.artists=[];

        console.log(data);

        for (var i=0; i < data.artists.items.length; i++){
         $rootScope.artists.push(data.artists.items[i]);
       }

     });  

      Spotify.search($rootScope.query,'album', {limit:'6'}).then(function (data) {           
        $rootScope.albums=[];      

        
        for (var j=0; j < data.albums.items.length; j++){
         $rootScope.albums.push(data.albums.items[j]);
         console.log($rootScope.albums);  

       }

     }); 
      
      Spotify.search($rootScope.query,'track', {limit:'6'}).then(function (data) {     
        $rootScope.songs=[];

        

        for (var h=0; h < data.tracks.items.length; h++){
         $rootScope.songs.push(data.tracks.items[h]);
         //console.log($rootScope.songs[h].artists[0].name);
       }     
     }); 

     //console.log($scope.artists);
     //console.log($scope.albums);
     //console.log($scope.songs);
   }	
 }

});
