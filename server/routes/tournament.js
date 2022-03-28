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


let jwt = require('jsonwebtoken');

let passport = require('passport');

// define the tournament model
let tournament = require('../controllers/tournament');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


/* GET Route for the Business List page - READ Operation */
router.get('/', tournament.displayTournamentList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', tournament.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', tournament.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', tournament.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', tournament.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', tournament.performDelete);

module.exports = router;