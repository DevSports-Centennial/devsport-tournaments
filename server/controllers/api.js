/**
 * api.js
 *
 * Due Date: Mar 29, 2022
 *
 * @link   api.js
 * @file   This is a controller file to include api.
 * @author  DevSports 
 * @since  1.0.0
 */

 let express = require('express');
 let router = express.Router();
 let mongoose = require('mongoose');
 let passport = require('passport');

// define the tournament model
let tournament = require('../models/tournament');

/* GET tournaments wildcard */
module.exports.getTournaments = (req, res, next) => {
    let tokenizer = req.query.tokenizer;
    if(tokenizer == process.env.TOKENIZER)
    {
        console.log("todo ok");
        // find all tournaments in the tournaments collection
        tournament.find( (err, tournamentList) => {
        if (err) 
        {
            return console.error(err);
        }
        else 
        {
            res.json(tournamentList);
        }
        }).sort({"name":1})
    }
    else
    {
        console.log("Retorna Unauthorized access");
        res.send({
            ok: false,
            message: "Unauthorized access"
        })
    }
}
