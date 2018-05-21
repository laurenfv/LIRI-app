# LIRI-app
> Language Interpretation and Recognition CLI that queries Twitter API, Spotify API, and OMDB API for data based on command line arguments using Node.js

![](header.png)

## Technologies Used

- Node.js
- JavaScript
- Inquirer.js NPM Package
- Spotify NPM Package
- Twitter NPM Package
- Request NPM Package

## How to Use

To use clone repo and simply run: `npm install`

And the run `node liri.js` with any of the following commands:

1. `my-tweets`

  * Displays my last 20 tweets and when they were created in terminal/bash window.

2. `spotify-this-song <song name>`

  * Shows the following information about the song in terminal/bash window.
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

  * Or if no song is passed through, it will default to
    *"Florescent Adolescent" by Arctic Monkeys

3. `movie-this <movie name>`

  * Shows the following information in terminal/bash.

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.

  * Or if no movie is passed through, it will default to "Mr. Nobody"

4. `do-what-it-says`

  * Takes the text from random.txt and runs the song through spotify-this-song command
