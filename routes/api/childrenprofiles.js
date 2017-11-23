var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();

//GET ALL
router.get('/', function(req, res) {
  knex('profiles').then(function(profiles){
    res.send(profiles);
  })
})

//GET BY GENDER
router.get('/:gender', function(req, res) {
  knex('profiles').where('gender', req.params.gender).then(function(profiles){
    res.send(profiles);
  })
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
router.put('/:id', function(req, res, next) {
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

module.exports = router;
