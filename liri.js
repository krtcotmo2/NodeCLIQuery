require("dotenv").config();
require("node-spotify-api");
let file = require("fs");
let moment = require('moment');
let myKeys = require("./key.js");
let axios = require("axios");

//let spotify = new Spotify(myKeys.spotify);

let getConcert = (arg, fileName) => {
     logData(fileName, `${moment.utc(moment.utc().format())}\nCall: getConcert\n`);
     console.log(`Concert: `, arg);
     axios.get("https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp")
     .then(function (response) {
          let theShows = response.data;
          theShows.forEach(function (o) {
               let venueInfo = arg.split(" ").map((word) => {
                    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
               }).join(" ") + " => "+ o.venue.name+ " in "+ o.venue.city;
               let concertTime = moment(o.datetime).format("MM/DD/YYYY, h:mm:ss a");
               console.log(venueInfo);
               console.log(concertTime);
               console.log();
               logData(fileName, venueInfo+"\n     " + concertTime +"\n");
          });
          logData(fileName, "\n")
     })
};
let getSong = (arg, fileName) => {
     console.log(`Song: `, arg);
};
let getMovie = (arg, fileName) => {
     logData(fileName, `${moment.utc(moment.utc().format())}\nCall: getMovie\n`);
     axios.get("http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy").then(function (response) {
          let rating = response.data.Ratings.filter(function (e) {
               return e.Source == "Rotten Tomatoes";
          });
          let title = response.data.Title+ " "+ response.data.Year;
          let rottenRating = rating.length === 0 ? ``: `Rotten Tomatoes: ${rating[0].Value}  `;
          let IMDBRating = response.data.imdbRating == "N/A" ? "N/A" : `IMBD rating: ${response.data.imdbRating} out of 10`
          debugger;
          let fullRating =`${rottenRating}${IMDBRating}`;
          let country = `${response.data.Country}, ${response.data.Language}`;
          let cast = "Cast:" + response.data.Actors;
          let plot = "Plot:" + response.data.Plot;
          console.log(title);
          console.log(fullRating);
          console.log(country);
          console.log(cast);
          console.log(plot);          
          logData(fileName, `${title}\n${fullRating}\n${country}\n${cast}\n${plot}\n\n`);
     });
};
let getAction = (arg, fileName) => {
     console.log(`Action: `, arg);
};

let logData = (fileName, str) =>{
     file.appendFile(fileName, str, function(err){
          if(err){
               console.log(err);
          }
     });
}

module.exports = {
     getConcert,
     getAction,
     getMovie,
     getSong
};
