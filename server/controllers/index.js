/**
 * index.js
 *
 * Due Date: Mar 29, 2022
 *
 * @link   index.js
 * @file   This is a controller file to include home page, registration page and login page.
 * @author  DevSports 
 * @since  1.0.0
 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

function isEmail(value) {
    var er = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return er.test(value);
}

function isUsername(value) {
    var er = /^[A-Za-z0-9_-]{4,16}$/;
    return er.test(value);
}

/* GET home page. wildcard */
module.exports.displayHomePage = (req, res, next) => {
    res.render('content/index', {
      title: 'Home',
      displayName: req.user ? req.user.displayName : ''
     });
}
  
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
        if(!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

            return res.redirect('/tournament');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    if(isUsername(req.body.username) == false || isEmail(req.body.email) == false)
    {
        req.flash(
            'registerMessage',
            'Registration Error: Register validation failed!'
        );
        console.log('Error: Register validation failed!')

        return res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else{

        User.register(newUser, req.body.password, (err) => {
            if(err)
            {
                console.log("Error: Inserting New User");
                if(err.name == "UserExistsError")
                {
                    req.flash(
                        'registerMessage',
                        'Registration Error: User Already Exists!'
                    );
                    console.log('Error: User Already Exists!')
                }
                return res.render('auth/register',
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
            }
            else
            {
                // if no error exists, then registration is successful

                // redirect the user and authenticate them

                return passport.authenticate('local')(req, res, () => {
                    res.redirect('/tournament')
                });
            }
        });
    }
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}