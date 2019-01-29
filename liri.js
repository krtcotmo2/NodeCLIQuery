require("dotenv").config();

let file = require("fs");
let moment = require('moment');
let axios = require("axios");
let Spotify = require("node-spotify-api");
let keys = require("./key.js");
let spotify = new Spotify(keys.spotify);


let getConcert = (arg, fileName) => {
     logData(fileName, `${moment.utc(moment.utc().format())}\nCall: getConcert\n`);
     console.log(`Concert: `, arg);     
     axios.get("https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp")
          .then(function (response) {
               let theShows = response.data;
               theShows.forEach(function (o) {
                    let venueInfo = arg.split(" ").map((word) => {
                         return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
                    }).join(" ") + " => " + o.venue.name + " in " + o.venue.city;
                    let concertTime = moment(o.datetime).format("MM/DD/YYYY, h:mm:ss a");
                    console.log(venueInfo);
                    console.log(concertTime);
                    console.log();
                    logData(fileName, venueInfo + "\n     " + concertTime + "\n");
               });
               logData(fileName, "\n")
          }).catch(function(err){
               console.log(err);
          })
};
let getSong = (arg, fileName) => {
     let file = fileName
     spotify.search({ type: 'track', query: arg }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          if(data.tracks.items.length == 0){
               getSong("The Sign Ace of Base", file);
               return;
          }       
          debugger; 
          logData(fileName, `${moment.utc(moment.utc().format())}\nCall: getSong\n`);
          let track = data.tracks.items[0];
          let artists = track.artists.map(function(o){return o.name;}).join(",");
          let songName = track.name;
          let preview = track.preview_url;
          let album = track.album.name;
             
          console.log(`${songName} by ${artists}`);
          console.log(`   Album: ${album}`);
          console.log(`   Preview link: ${preview}`);
          logData(fileName, `${songName} by ${artists}\nAlbum: ${album}\nPreview link: ${preview}\n\n`);
     });
};
let getMovie = (arg, fileName) => {
     if(arg == undefined){
          arg ='Mr. Nobody';
     }
     logData(fileName, `${moment.utc(moment.utc().format())}\nCall: getMovie\n`);
     axios.get("http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy")
          .then(function (response) {
               if(response.data.Error){
                    console.log(response.data.Error)
                    return;
               }
               let rating = response.data.Ratings.filter(function (e) {
                    return e.Source == "Rotten Tomatoes";
               });
               let title = response.data.Title + " " + response.data.Year;
               let rottenRating = rating.length === 0 ? `` : `Rotten Tomatoes: ${rating[0].Value}  `;
               let IMDBRating = response.data.imdbRating == "N/A" ? "N/A" : `IMBD rating: ${response.data.imdbRating} out of 10`
               
               let fullRating = `${rottenRating}${IMDBRating}`;
               let country = `${response.data.Country}, ${response.data.Language}`;
               let cast = "Cast:" + response.data.Actors;
               let plot = "Plot:" + response.data.Plot;
               console.log(title);
               console.log(fullRating);
               console.log(country);
               console.log(cast);
               console.log(plot);
               logData(fileName, `${title}\n${fullRating}\n${country}\n${cast}\n${plot}\n\n`);
          })
          .catch(function(err){
               console.log(err);
          });
          
    
};
let getAction = (fileName) => {
     file.readFile("./assets/random.txt", "utf8", function (err, data) {
          if (err) {
               console.log(err);
          } else {
               let options = data.split(";");
               let ind = Math.floor(Math.random() * options.length);
               let pickedOption = options[ind].split(",");
               console.log("picked", data)
               pickedOption[1] = pickedOption[1].replace(/\"/g, "");
               logData(fileName, `${moment.utc(moment.utc().format())}\nCall: Random Option - Redirecting\n`);
               switch (pickedOption[0]) {
                    case 'concert-this':
                         getConcert(pickedOption[1], fileName);
                         break;
                    case 'movie-this':
                         getMovie(pickedOption[1], fileName);
                         break;
                    case 'spotify-this-song':
                         getSong(pickedOption[1], fileName);
                         break;
                    default:
                         break;
               }
          }
     })
};

let logData = (fileName, str) => {
     file.appendFile(fileName, str, function (err) {
          if (err) {
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
