angular.module('musicPlayerApp')
.factory('Playlist', function() {    
    
    var Playlist = function(name) {
        this.name = name;
        this.songs = [];
    };

    Playlist.prototype.getName = function() {
        var _this = this;        
        
        return _this.name;
    };

    Playlist.prototype.getSongs = function() {
        var _this = this;

        _this.songs.push("Something");
        
        return _this.songs;
    };


    return Playlist;
})