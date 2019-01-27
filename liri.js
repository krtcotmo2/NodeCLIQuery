require("dotenv").config();
require("node-spotify-api");

let myKeys = require("./key.js");
let axios = require("axios");

//let spotify = new Spotify(myKeys.spotify);

let getConcert = arg => {
  console.log(`Concert: `,arg);
};
let getSong = arg => {
  console.log(`Song: `,arg);
};
let getMovie = arg => {
  console.log(`Movie: `,arg);
  axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(function(response) {
    // Then we print out the imdbRating
    let rating = response.data.Ratings.filter(function(e){
         return e.Source =="Rotten Tomatoes";
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
  console.log(`Action: `,arg);
};

module.exports = {
     getConcert,
     getAction,
     getMovie,
     getSong
};
