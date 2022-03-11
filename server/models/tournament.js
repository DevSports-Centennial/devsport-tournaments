let mongoose = require('mongoose');

// create a model class
let Tournament = mongoose.Schema({
    Name: String,
    Sports: String,
    Details: String,
    Matches: Number,
    Prizepool: Number,
},
{
  collection: "tournament"
});

module.exports = mongoose.model('Tournament', Tournament);
