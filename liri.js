require("dotenv").config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');
const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var argv2 = process.argv[2];
var query = process.argv[3];
var toAppend1 = [process.argv[2]];
var toAppend2 = [process.argv[2], process.argv[3]];

var commandTwitter = `my-tweets`;
var commandSpotify = `spotify-this-song`;
var commandOmdb = `movie-this`;
var commandFs = `do-what-it-says`;

var twitterSearch = function() {
    var params = {screen_name: 'laurenfv8'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++){
                console.log(`"${tweets[i].text}" created on ${tweets[i].created_at}`);
            }
        }
    });
}

var spotifySearch = function(query) {
    spotify.search({ type: 'track', query: query, limit: 1 }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log(`Artist: ${data.tracks.items[0].album.artists[0].name},\nSong: ${data.tracks.items[0].name},\nAlbum: ${data.tracks.items[0].album.name},\nListen: ${data.tracks.items[0].external_urls.spotify}`); 
    });
}

var omdbSearch = function (query){
    if (query === undefined){
        query = "Mr. Nobody"
    }
    
    request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error) {
            // Parse the body of the site
            console.log(`Title: ${JSON.parse(body).Title}`);
            console.log(`Year Released: ${JSON.parse(body).Year}`);
            console.log(`IMDB rating: ${JSON.parse(body).imdbRating}`);
            console.log(`Rotten Tomatoes rating: ${JSON.parse(body).Ratings[1].value}`);
            console.log(`Country: ${JSON.parse(body).Country}`);
            console.log(`Language: ${JSON.parse(body).Language}`);
            console.log(`Plot: ${JSON.parse(body).Plot}`);
            console.log(`Actors: ${JSON.parse(body).Actors}`);
        }
    });
}

var readRandom = function() {
    fs.readFile("random.txt", "utf8", function(error, data) { 
        if (error) { 
            return console.log(error); 
        } 
        var dataArr = data.split(","); 
        var queryRead = dataArr[1];
        spotifySearch(queryRead);
    });
}

var appendLog1 = function() {
    fs.appendFile("log.txt", toAppend1 + "," + "\n", function(err) {  
        if (err) { 
          console.log(err); 
        } 
    });
}

var appendLog2 = function() {
    fs.appendFile("log.txt", toAppend2 + "," + "\n", function(err) { 
        if (err) { 
          console.log(err); 
        } 
    });
}

if (argv2 === commandTwitter){
    twitterSearch();
    appendLog1();
}
else if (argv2 === commandSpotify){
    //SPOTIFY `spotify-this-song`
    spotifySearch(query);
    appendLog2();
}
else if (argv2 === commandOmdb){
    //OMDB `movie-this`
    if (query === undefined){
        query = "Mr. Nobody"
    }
    omdbSearch(query);
    appendLog2();
}
else if (argv2 === commandFs){
    //FS RANDOM.TXT `do-what-it-says`
    readRandom();
    appendLog1();

}


