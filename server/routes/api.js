/**
 * api.js
 * Due Date: Apr 13, 2022
 *
 * @link   api.js
 * @file   This file defines the routes to navigate the API.
 * @author DevSports
 * @since  1.0.0
 */

// modules required for routing
let express = require('express');
let router = express.Router();
const apiKeyAuth = require('api-key-auth');

let apiController = require('../controllers/api');

/* GET tournaments */
router.get('/tournaments', apiController.getTournaments);

module.exports = router;
