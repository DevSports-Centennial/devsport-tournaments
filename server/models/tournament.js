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
let Tournament = mongoose.Schema
(
  {
    Name: 
    {
      type: String,
      default: '',
      trim: true,
      required: 'Name is required'
    },
    Sports: 
    {
      type: String,
      default: '',
      trim: true,
      required: 'Sports is required'
    },
    Details: 
    {
      type: String,
      default: '',
      trim: true
    },
    Matches: 
    {
      type: Number,
      default: '',
      required: 'Matches is required'
    },
    Prizepool: 
    {
      type: Number,
      default: '',
      required: 'Prizepool is required'
    },
  },
  {
    collection: "tournament"
  }
);
 
 module.exports = mongoose.model('Tournament', Tournament);
 