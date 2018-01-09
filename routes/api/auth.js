var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();

var Authentication = require('../../db/controllers/authentication');

// var errormessage = "Email address is in used!"

// Post users
router.post('/signup', function(req, res, next){

  // Check if there is email and password are entered
  // Need to modify for if statements

  // if (!req.email || !req.password) {
  //   return res.status(422).send({ error: "You must provide email and password" })
  // }

  // when email is not used, register email and password to database
    knex('users').insert(req.body).then(function(user){
      res.send(user)
    })
    // if email is used, throw an error message
    .catch(
      res.status(422).send({ error: "Email is in used!" })
    );
})


//Check users -- Delete it later
// router.get('/users', function(req, res, next) {
//   knex('users').select('Email').then(function(users){
//     console.log(users)
//     res.send(users)
//   })
// })


module.exports = router;
