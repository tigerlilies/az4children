// Users must be authenticated to access this route

var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// var config = require('../../config');

var passportService = require('../../services/passport');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });

// GET ALL - profiles data for authenticated users
router.get('/', requireAuth, function(req, res) {
  knex('profiles')
  .then(profiles => res.send(profiles))
  .catch(err => res.send(err));
})

// GET - profiles data that have no mentor assigned yet
router.get('/unassigned', function(req, res) {
  knex('profiles').where('assign_at', null)
  .then(profiles => res.send(profiles))
  .catch(err => res.send(err));
})

// POST - create new profile
router.post('/', requireAuth, function(req, res, next) {
  knex('profiles').insert(req.body)
  .then(function(profile) {
    res.send(profile)
  })
  .catch(err => res.send(err));
})

// GET ONE - get the profile data for a selected child
router.get('/:id', requireAuth, function(req, res, next) {
  knex('profiles').where('id', req.params.id)
  .then(function(profile) {
    res.send(profile);
  })
  .catch(err => res.send(err));
})

// UPDATE - the profile data for a selected child
router.patch('/:id', requireAuth, function(req, res, next) {
  knex('profiles').where('id', req.params.id).update(req.body)
  .then(function(profile) {
    knex('profiles').where('id', req.params.id)
    .then(function(profile) {
      res.send(profile);
    })
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
})

// DELETE - the profile data for a selected child
router.delete('/:id', requireAuth, function(req, res, next) {
  knex('profiles').where('id', req.params.id).del()
  .then(function(profile) {
    knex('profiles')
    .then(function(profiles) {
      res.send(profiles);
    })
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
})


module.exports = router;
