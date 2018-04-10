require("dotenv").config();

// Load the NPM Package inquirer
var inquirer = require("inquirer");

// load up the request NPM pckg
var request = require('request');

// not sure
var fs = require("fs");

// identify keys.js for official API validation info
var keys = require("./keys.js");

// load the spotify npm pckg
var Spotify = require('node-spotify-api');

// load the twitter npm pckg
var Twitter = require('twitter');

// establish variables to combine API keys with NPM node pckgs
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var filmSearch = "fantasia";

inquirer
    .prompt([
        {
            type: 'list',
            name: "userChoice",
            message: "Please select a CLIRI option:",
            choices: ['my-tweets', 'spotify-this-song', 'movie-this', new inquirer.Separator(), 'do-what-it-says']
        }
        // when : function( answers )
        
    ])
    .then(function (resp) {

        // prints my tweets
        if (resp.userChoice === 'my-tweets') {
            var params = { screen_name: 'ctv409' };
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    console.log("\n" + "Here are your latest Tweets, " + tweets[0].user.screen_name + "\n")
                    for (var i = 0; i < tweets.length; i++) {
                        console.log("DATE: " + tweets[i].created_at + "\n" + "CTV TWEET: " + tweets[i].text);
                        console.log("----------------");
                    }
                }
            });
        }

        // does the spotify thing
        else if (resp.userChoice === 'spotify-this-song') {
            // spotify search function?
            spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else { console.log(data); }
            });
        }

        // does the OMDb thing 
        else if (resp.userChoice === 'movie-this') {
            request("http://www.omdbapi.com/?t=" + filmSearch + "&apikey=4d39a539", function (error, response, body) {
                // If the request was successful...
                if (!error && response.statusCode === 200) {

                    // throw the OMDb request string into an object variable and print out movie data to console
                    data = JSON.parse(body);
                    console.log("-----------------------------");
                    console.log("Movie Title: " + data.Title );
                    console.log("Release Year: " + data.Year );
                    console.log("IMDb Rating: " + data.imdbRating );
                    console.log("Rotten Tomatoes Rating: " + data.metaScore );
                    console.log("Production Locations: " + data.Country );
                    console.log("Language: " + data.Language );
                    console.log("Plot: " + data.Plot );
                    console.log("Acotrs: " + data.Actors );
                    console.log("-----------------------------");
                }
            });
        }
    });