var knex = require('../db/knex');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');


// Create local Strategy
var localOptions = {
  usernameField: 'email'
};

var localLogin = new LocalStrategy(localOptions, function(email, password, next){
  // Verify this email and password, call next with user
  // if it is the correct email and password
  // otherwise, call next with false.
  console.log("localLogin", email)
  console.log("localLogin", password)

  knex('users').where({
    'email': email
  }).then(function(user){
    if (!user) { return (null, user); }
    if (user) { return (null, false); }

    //compare passwords - is `is password` equal to user password
    
  })

})






//Setup options for JWT Strategy
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy
//"payload" is decoded jwttoken. "done" is call back function
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, next){
  // See if the user ID in the payload exists in our database
  // If it does, call "next" with that other
  // otherwise, call "false" without a user object

  knex('users').where({
    'id': payload.user[0].id
  }).then(function(user){
    if (user) {
      next(null, user)
    } else {
      next(null, false)
    }
  })
})

//Tell passport to use this Strategy
passport.use(jwtLogin);
