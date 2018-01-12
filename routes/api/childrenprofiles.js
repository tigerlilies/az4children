var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');

//GET ALL
router.get('/', function(req, res) {
  knex('profiles')
  .then(profiles => res.send(profiles))
  .catch(err => res.send(err));
})

//GET MENTOR UNASSIGNED
router.get('/unassigned', function(req, res) {
  knex('profiles').where('assign_at', null)
  .then(profiles => res.send(profiles))
  .catch(err => res.send(err));
})

//POST
router.post('/', function(req, res, next) {
  knex('profiles').insert(req.body).then(function(profile){
    res.send(profile)
  })
})

//GET ONE
router.get('/:id', function(req, res, next) {
  knex('profiles').where('id', req.params.id).then(function(profile){
    
    res.send(profile);
  })
})

//PATCH
router.patch('/:id', function(req, res, next) {
  knex('profiles').where('id', req.params.id).update(req.body).then(function(profile){
    //Grab an update profile
    knex('profiles').where('id', req.params.id).then(function(profile){
      res.send(profile);
    })
  })
})

//DELETE
router.delete('/:id', function(req, res, next) {
  knex('profiles').where('id', req.params.id).del().then(function(profile){
    //Grab all data
    knex('profiles').then(function(profiles){
      res.send(profiles);
    })
  })
})


// Format of token
// Authorization: Bearer <access_token>

// Verify token
function verifyToken(req, res, next){


  // Get auth header value
  var bearerHeader = req.headers['authorization'];
  console.log('req.headers', bearerHeader)
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
  // Split at the space
  const bearer = bearerHeader.split(' ');
  // Get token from array
  const bearerToken = bearer[1];
  // Set the token
  req.token = bearerToken;
  // Next middleware
  next();
  } else {
  // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
