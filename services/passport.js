var passport = require('passport');
var passport = require('passport-jwt');

// var User = require('');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup options for JWT Strategy
var jwtOptions = {}

//Create JWT Strategy
//"payload" is decoded jwttoken. "done" is call back function
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // See if the user ID in the payload exists in our database
  // If it does, call "done" with that other
  // otherwise, call "done" without a user object


})

//Tell passport to use this Strategy
