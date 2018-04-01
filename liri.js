require("dotenv").config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');
const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var argv2 = process.argv[2];

var commandTwitter = `my-tweets`;
var commandSpotify = `spotify-this-song`;
var commandOmdb = `movie-this`;
var commandFs = `do-what-it-says`;

if (argv2 === commandTwitter){
    //TWITTER `my-tweets`
    // client.get('favorites/list', function(error, tweets, response) {
    //     if(error) throw error;
    //     console.log(`${tweets[0].user.name}: ${tweets[0].text}`);
    //     // console.log(tweets[0].text);  // The favorites. 
    //     // console.log(response);  // Raw response object. 
    // });
    var params = {screen_name: 'laurenfv8'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++){
                console.log(`"${tweets[i].text}" created on ${tweets[i].created_at}`);
            }
            //console.log(tweets);
            // console.log(`"${tweets[0].text}" created at ${tweets[0].created_at}`);
    }
});
}
else if (argv2 === commandSpotify){
    //SPOTIFY `spotify-this-song`
    spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
    
    console.log(data.tracks.items[0].album.artists[0].name); 
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].external_urls.spotify);
    });
}
else if (argv2 === commandOmdb){
    var query = process.argv[3];

    //OMDB `movie-this`
    if (query === undefined){
        query = "Mr. Nobody"
    }
    
    request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}
// else if (argv2 === commandFs){
// //FS RANDOM.TXT `do-what-it-says`
//     //TO DO: read from random.txt
// }


