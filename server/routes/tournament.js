/**
 * tournament.js
 *
 * Due Date: Mar 18, 2022
 *
 * @link   tournament.js
 * @file   This is a routing file to include CRUD methods.
 * @author  DevSports 
 * @since  1.0.0
 */

// modules required for routing 
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the tournament model
let tournament = require('../models/tournament');

/* GET tournament List page. READ */
router.get('/', (req, res, next) => {
  // find all tournaments in the tournaments collection
  tournament.find( (err, tournament) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('tournament/list', {
        title: 'Tournament',
        tournament: tournament
      });
    }
  });

});

//  GET the tournament Details page in order to add a new tournament
router.get('/add', (req, res, next) => {
  // Redirects user to Details Page
  res.render('tournament/details', {
    title: 'Add Tournament',
    tournament: '',
    action: '/tournament/add'
  });
});

// POST process the tournament Details page and create a new tournament - CREATE
router.post('/add', (req, res, next) => {
 // Gets data from the form
  let data = req.body;
  // Formats data accordinly 
  const newTournament = {
    Name: data.name,
    Sports: data.sports,
    Details: data.details,
    Matches: parseInt(data.matches),
    Prizepool: parseInt(data.prizepool),
  }
  // Creates the tournament on MongoDB
  tournament.create(newTournament, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/tournament');
    }
  });
});

// GET the tournament Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  tournament.findById( req.params.id , (err, tournament) => {
    if (err) {
      return console.error(err);
    }
    else {
      // Redirects user to Details Page
      res.render('tournament/details', {
        title: 'Edit Tournament',
        tournament: tournament,
        action: ''
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    // Gets data from the form
    let data = req.body;
    // Formats data accordinly 
    const upsertData = {
        Name: data.name,
        Sports: data.sports,
        Details: data.details,
        Matches: parseInt(data.matches),
        Prizepool: parseInt(data.prizepool),
  }
  tournament.updateMany( {_id: req.params.id} , upsertData, {upsert: true}, (err, result) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.redirect('/tournament');
      }
    });


});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  tournament.remove( {_id: req.params.id} , (err) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.redirect('/tournament');
    }
  });
   
});


module.exports = router;
