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
router.get('/profiles/:id', function(req, res) {
  knex('profiles').where('id',req.params.id).then(function(profile){
    res.send(profile);
  })
})

//POST
router.post('/profiles', function(req, res) {
  res.send('add-one route')
})

//PATCH
router.put('/profiles/:id', function(req, res) {
  res.send('change/update-one route')
})

//DELETE
router.delete('/profiles/:id', function(req, res) {
  res.send('delete/remove-one route')
})

module.exports = router;
