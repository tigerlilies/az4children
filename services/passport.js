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

      console.log("Password", password);
      console.log("Password from database", userData.password)
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
passport.use(localLogin);
