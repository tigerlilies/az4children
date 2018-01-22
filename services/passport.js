var knex = require('../db/knex');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');


// Create local Strategy
var localOptions = {
  usernameField: 'email'
};

var localLogin = new LocalStrategy(localOptions, function(email, password, done){

  // Verify this email and password, call next with user
  // if it is the correct email and password
  // otherwise, call next with false.

  //check email and password match to database
  knex('users').where({
    'email': email
  }).then(function(user){
    if (user.length > 0){
      //store user data
      var userData = user[0]

      // check password is correct from database
      var isVerified = bcrypt.compareSync(password, userData.password);

        if (isVerified) {
          //delete password for being not knowing the hash
          delete userData.password;
          done(null, userData)
        } else {
          done(null,false)
        }
    } else {
      done(null,false)
    }
  })
})

//Setup options for JWT Strategy
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy ... This is used for checking route
//"payload" is decoded jwttoken. "done" is call back function
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, next){
  // console.log("Jwt Login DECODED", payload.user.email)
  // See if the user ID in the payload exists in our database
  // If it does, call "next" with that other
  // otherwise, call "false" without a user object
  // console.log("JWT LOGIN", payload)
  knex('users').where({
    'email': payload.user.email
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
passport.use(localLogin);
