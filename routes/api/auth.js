var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(5);
var jwt = require('jwt-simple');
var config = require('../../config');

var Authentication = require('../../db/controllers/authentication');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

// Post users
router.post('/signup', function(req, res, next){
  //encrypt the password
  var password = bcrypt.hashSync(req.body.password, salt)

  // when email is not used, register email and salted(encrypted) password to database
    knex('users').insert({
      email: req.body.email,
      password: password
    }).then(function(user){
      res.status(200).send("Success!")
      res.send(user)
      res.json({ token: tokenForUser(user) })
    })
    // if email is used, throw an error message
    .catch(
      function(err){
        res.status(500).send("Email is in used!")
      }
    );
})

router.post('/signin', function(req,res,next){


})

module.exports = router;
