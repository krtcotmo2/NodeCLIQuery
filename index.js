//js
let liri = require("./liri.js");
let command = process.argv[2];
let request = process.argv[3];

switch (command) {
     case `concert-this`:
          liri.getConcert(request);
          break;
     case `spotify-this-song`:
          liri.getSong(request);
          break;
     case `movie-this`:
          liri.getMovie(request);
          break;
     case `do-what-it-says`:
          liri.getAction(request);
          break;
     default:
          break;
}
