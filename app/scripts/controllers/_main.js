/**
 * @ngdoc function
 * @name musicPlayerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp')
  .controller('MainCtrl', function ($scope, $rootScope, Spotify) {
  	console.log("main controller");

  	$scope.page = 'home';
  	$scope.sidebar = true;

  	$scope.toggleSidebar = function() {
  		$scope.sidebar = !$scope.sidebar;
  	}

  	$rootScope.passSrc = function(url){
  		$("#iframe").attr('src', url);
      console.log($("#iframe").attr('src', url));
 	  }  	

    $rootScope.removeSrc = function(){
        $("#iframe").attr('src', '');
    } 

    $rootScope.setFocusToTextBox = function(){
      
      //document.getElementById("#focus").focus();

      $( "#focus" ).click(function() {  
        $( "#focusing" ).focus();
      });
    }  

  	$scope.topsongs=[];
  	$scope.topalbums=[];
  	$scope.topartists=[];

  	var artistq=["Coldplay","Maroon 5","Rihanna","Beyonce","Buble","Taylor Swift","Sia","Hozier","One Direction","Fall out boy"];
  	var albumsq=["In the lonely hour","rebel heart","x","chasing yesterday","wanted on voyage","a perfect contradiction","lady sings the blues","1989","royal blood","sweet soul music"];
  	var songsq=["Uptown Funk!","sugar","thinking out loud","love me like you do","FourFiveSeconds","Earned it","Style","Lay me down","Time of our lives","Trap queen"];
	
  	for (var i = 0; i < 10; i++) {
 

		Spotify.search(artistq[i],'artist', {limit:'1'}).then(function (data) {     
        if(data.artists.items.length >0){
         $scope.topartists.push(data.artists.items[0]);
       }
    });  

		Spotify.search(albumsq[i],'album', {limit:'1'}).then(function (data) {     
        if(data.albums.items.length >0){
         $scope.topalbums.push(data.albums.items[0]);
       }
    
    });

		Spotify.search(songsq[i],'track', {limit:'1'}).then(function (data) {     
        if(data.tracks.items.length >0){
         $scope.topsongs.push(data.tracks.items[0]);
       }
    
    });

  	};
});