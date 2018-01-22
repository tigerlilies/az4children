var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config');

var passportService = require('../../services/passport');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });

//GET ALL
router.get('/', requireAuth, function(req, res) {

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
router.post('/', requireAuth, function(req, res, next) {
  console.log("POST", req.body)
  knex('profiles').insert(req.body).then(function(profile){
    res.send(profile)
  })
})

//GET ONE
router.get('/:id', requireAuth, function(req, res, next) {
  knex('profiles').where('id', req.params.id).then(function(profile){

    res.send(profile);
  })
})

//PATCH
router.patch('/:id', requireAuth, function(req, res, next) {
  knex('profiles').where('id', req.params.id).update(req.body).then(function(profile){
    //Grab an update profile
    knex('profiles').where('id', req.params.id).then(function(profile){
      res.send(profile);
    })
  })
})

//DELETE
router.delete('/:id', requireAuth, function(req, res, next) {
  knex('profiles').where('id', req.params.id).del().then(function(profile){
    //Grab all data
    knex('profiles').then(function(profiles){
      res.send(profiles);
    })
  })
})


module.exports = router;
