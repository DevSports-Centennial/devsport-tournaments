
var tournamentData = require( './tournaments.json' )

/* REGISTER SOME Tournaments */

// get refs to the models we defined above
const Tournament = require('../models/tournament');

// clear all existing documents from the collections
Tournament.deleteMany({}).then(function(){
   console.log("Data deleted"); // Success
}).catch(function(error){
   console.log(error); // Failure
});

// populate the tournament collection from json data
// nothing fancy here as tournament documents do not reference anything else
for( var i = 0; i < tournamentData["tournaments"].length; i++ ) {
   new Tournament( tournamentData["tournaments"][ i ] ).save();
}
console.log("Data saved"); // Success
