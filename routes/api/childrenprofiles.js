var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();

//GET ALL
router.get('/profiles', function(req, res) {
  knex('profiles').then(function(profiles){
    res.send(profiles);
  })
})

//GET ONE
router.get('/profiles/:id', function(req, res, next) {
  knex('profiles').where('id',req.params.id).then(function(profile){
    res.send(profile);
  })
})

//POST
router.post('/profiles', function(req, res, next) {
  knex('profiles').insert(req.body).then(function(profile){
    res.send(profile)
  })
})

//PATCH
router.put('/profiles/:id', function(req, res, next) {
  knex('profiles').where('id',req.params.id).update(req.body).then(function(profile){
    //Grab an update profile
    knex('profiles').where('id',req.params.id).then(function(profile){
      res.send(profile);
    })
  })
})

//DELETE
router.delete('/profiles/:id', function(req, res, next) {
  knex('profiles').where('id',req.params.id).del().then(function(profile){
    //Grab all data
    knex('profiles').then(function(profiles){
      res.send(profiles);
    })
  })
})

module.exports = router;
