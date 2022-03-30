/**
 * tournament.js
 *
 * Due Date: Mar 18, 2022
 *
 * @link   tournament.js
 * @file   This is a controller file to include CRUD methods.
 * @author  DevSports 
 * @since  1.0.0
 */

// modules required for routing 
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let jwt = require('jsonwebtoken');

// define the tournament model
let tournament = require('../models/tournament');


function isInt(value) {
  var er = /^-?[0-9]+$/;
  return er.test(value);
}


/* GET tournament List page. READ */
module.exports.displayTournamentList = (req, res, next) => {
  // find all tournaments in the tournaments collection
  tournament.find( (err, tournamentList) => {
    if (err) 
    {
      return console.error(err);
    }
    else 
    {
      res.render('tournament/list', 
        {title: 'Tournament',
        tournamentList: tournamentList,
        displayName: req.user ? req.user.displayName : ''});
    }
  }).sort({"name":1})

}

//  GET the tournament Details page in order to add a new tournament
module.exports.displayAddPage = (req, res, next) => {
  // Redirects user to Details Page
  res.render('tournament/details', {
    title: 'Add Tournament',
  
    messages: '',
    displayName: req.user ? req.user.displayName : ''})
}

// POST process the tournament Details page and create a new tournament - CREATE
module.exports.processAddPage = (req, res, next) => {

  if(isInt(req.body.prizepool) == false || isInt(req.body.matches) == false)
  {
    req.flash(
        'createTournamentMessage',
        'Add Tournament Form Error: Tournament validation failed!'
    );
    console.log('Error: Tournament validation failed!')

    return res.render('tournament/details',
    {
        title: 'Add Tournament',
        messages: req.flash('createTournamentMessage'),
        displayName: req.user ? req.user.displayName : ''
    });
  }
  else{

    // Gets data from the form
    let newTournament = tournament({

      "Name": req.body.name,
      "Sports": req.body.sports,
      "Details": req.body.details,
      "Matches": parseInt(req.body.matches),
      "Prizepool" : parseInt(req.body.prizepool)
    });

    // Creates the tournament on MongoDB
    tournament.create(newTournament, (err, tournament) => {
      if (err) 
      {
        console.log("Error: Inserting New Tournament");
        //console.log(err);

        req.flash(
            'createTournamentMessage',
            'Add Tournament Form Error: Tournament validation failed!'
        );
        console.log('Error: Tournament validation failed!')

        return res.render('tournament/details',
        {
            title: 'Add Tournament',
            messages: req.flash('createTournamentMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
      } 
      else 
      {
        res.redirect('/tournament');
      }
    });
    
  }
};

// GET the tournament Details page in order to edit an existing Book
module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  tournament.findById( id, (err, tournamentToEdit) => {
    if (err)
     {
        console.log(err);
        res.end(err);
    }
    else {
      // Redirects user to Details Page
      res.render('tournament/edit', 
      {
        title: 'Edit Tournament',
        tournament: tournamentToEdit,
        messages: '',
        displayName: req.user ? req.user.displayName : ''});
    }
  });
}

// POST - process the information passed from the details form and update the document
module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id

  // Gets data from the form
  let updatetournament = tournament ({
    // Formats data accordinly 
      "_id": id,
      "Name": req.body.name,
      "Sports": req.body.sports,
      "Details": req.body.details,
      "Matches": parseInt(req.body.matches),
      "Prizepool": parseInt(req.body.prizepool)
  })

  if(isInt(req.body.prizepool) == false || isInt(req.body.matches) == false)
  {
    console.log("Error: Updating Tournament");
    req.flash(
        'editTournamentMessage',
        'Edit Tournament Form Error: Tournament validation failed!'
    );
    
    res.render('tournament/edit', 
    {
      title: 'Edit Tournament',
      tournament: updatetournament,
      messages: req.flash('editTournamentMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  }
  else
  {

    tournament.updateOne( {_id: id} , updatetournament, (err) => {
      if (err) 
      {
        console.log("Error: Updating Tournament");
        console.log(err);
        req.flash(
            'editTournamentMessage',
            'Edit Tournament Form Error: Tournament validation failed!'
        );
        
        res.render('tournament/edit', 
        {
          title: 'Edit Tournament',
          tournament: updatetournament,
          messages: req.flash('editTournamentMessage'),
          displayName: req.user ? req.user.displayName : ''
        });
      }
      else
      {
        console.log("OK: Updating Tournament");
        res.redirect('/tournament');
      }
    });
  }
}

// GET - process the delete by user id
module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  tournament.remove( {_id: id} , (err) => {
    if (err) 
    {
        console.log(err);
        res.end(err);
    }
    else 
    {
      res.redirect('/tournament');
    }
  });
   
};
