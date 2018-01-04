var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();

// GET ALL
router.get('/', function(req, res) {
  res.send(["waterbottle","phone",'papar'])
})

module.exports = router;
