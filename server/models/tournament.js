/**
 * tournament.js
 * Due Date: March 18, 2022
 *
 * @link   tournament.js
 * @file   This file creating mongoose model.
 * @author DevSports
 * @since  1.0.0
 */



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
 