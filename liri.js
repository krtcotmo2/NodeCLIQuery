require("dotenv").config();
require("node-spotify-api");
let moment = require('moment');
let myKeys = require("./key.js");
let axios = require("axios");

//let spotify = new Spotify(myKeys.spotify);

let getConcert = arg => {
     console.log(`Concert: `, arg);
     axios.get("https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp").then(function (response) {
          debugger;
          let theShows = response.data;
          theShows.forEach(function (o) {
               console.log(arg.split(" ").map((word) => {
                    debugger;
                    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
               }).join(" "), "=>", o.venue.name, "in", o.venue.city);
               console.log(moment(o.datetime).format("MM/DD/YYYY, h:mm:ss a"));
               console.log();
          });
     })
};
let getSong = arg => {
     console.log(`Song: `, arg);
};
let getMovie = arg => {
     axios.get("http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy").then(function (response) {
          let rating = response.data.Ratings.filter(function (e) {
               return e.Source == "Rotten Tomatoes";
          });
          console.log(response.data.Title, " ", response.data.Year);
          console.log(`Rotten Tomatoes: ${rating[0].Value}  IMBD rating: ${response.data.imdbRating} ot of 10`);
          console.log(`${response.data.Country}, ${response.data.Language}`);
          console.log("Cast:", response.data.Actors);
          console.log("Plot:", response.data.Plot);
          process.exit();
     });
};
let getAction = arg => {
     console.log(`Action: `, arg);
};

module.exports = {
     getConcert,
     getAction,
     getMovie,
     getSong
};
