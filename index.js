//js
let liri = require("./liri.js");
let command = process.argv[2];
let request = process.argv[3];
let logFile = "log.txt";
switch (command) {
     case `concert-this`:
          liri.getConcert(request, logFile);
          break;
     case `spotify-this-song`:
          liri.getSong(request, logFile);
          break;
     case `movie-this`:
          if(request == null){
               request = "Mr.Nobody";
          }
          liri.getMovie(request, logFile);
          break;
     case `do-what-it-says`:
          liri.getAction(request, logFile);
          break;
     default:
          break;
}
