var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();

//GET ALL publicly accessible profile data
router.get('/', function (req, res) {
  knex.select(
    'id',
    'age',
    'gender',
    'assign_at',
    'summary',
    'characteristic1',
    'characteristic2',
    'characteristic3',
    'need1',
    'need2',
    'need3')
  .from('profiles')
  .where('assign_at', null)
  .then(profiles => res.send(profiles))
  .catch(err => res.send(err));
});

module.exports = router;
