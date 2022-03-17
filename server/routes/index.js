
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

/* GET home page. wildcard */
router.get('/1', (req, res, next) => {
  res.render('content/index2', {
    title: 'Home',
    books: ''
   });
});


module.exports = router;
