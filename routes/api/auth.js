var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(5);

var passportService = require('../../services/passport');
var passport = require('passport');

var requireSignin = passport.authenticate('local', { session: false });

// Post users
router.post('/signup', function(req, res, next){
  //encrypt the password
  var password = bcrypt.hashSync(req.body.password, salt)
  // console.log("SignUp", req.body)
  // when email is not used, register email and salted(encrypted) password to database
    knex('users').insert({
      email: req.body.email,
      password: password
    }).then(function(user){
      res.send(user)
    })
    // if email is used, throw an error message
    .catch(
      function(err){
        res.status(500).send("Email is in used!")
      }
    );
})

router.post('/signin', requireSignin, function(req, res, next){
  // User has already had their email and password auth'd
  // Provide a token
  console.log('in signin: ', req.body);
  var timestamp = new Date().getTime();
  var token = jwt.sign({user: req.body, iat: timestamp}, config.secret)

  res.send({ token: token })
})

module.exports = router;
