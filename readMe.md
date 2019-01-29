# Command line interface for Node

This is a knock off attempt to replicate asking the computer about a movie, song or music group. A fourth option exists where the user can ask for a random event. In this case the tool choses from one of the three other options and performs the action for a predefined variable.

### To look up information about a movie, the user should type in the following:
> node index movie-this "[NAME OF MOVIE]"

note that the name of the movie should be enclosed in quotation marks
<hr/>

### To look up information about a song, the user should type in the following:
> node index spotify-this-song "[NAME OF SONG]"

note that the name of the song should be enclosed in quotation marks
<hr/>


### To look up information about an upcoming concerts, the user should type in the following:
> node index concert-this "[NAME OF BAND]"

note that the name of the artist should be enclosed in quotation marks
<hr/>


### To choose a random option, the user should type in the following:
> node index do-what-it-says


I wrote this piece with two parts. The liri.js file acts as a module with the functions inside of it. The index.js uses the liri.jas file to execute the main functions. Inside the random file I added two there options. This required an additional split of the string into an initial array and then split the parts of an individual record to get the action and search item. The log file has numerous entries per record and I tried to set up spacing and breaks between records.
