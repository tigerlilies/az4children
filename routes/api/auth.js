var knex = require('../../db/knex');
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../../config');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(5);



// delete it later
// function tokenForUser(user) {
//   const timestamp = new Date().getTime();
//   return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
// }

// Post users
router.post('/signup', function(req, res, next){
  //encrypt the password
  var password = bcrypt.hashSync(req.body.password, salt)

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

router.post('/signin', function(req, res, next){
  var submitted_email = req.body.email;
  var submitted_password = req.body.password;

  //check email and password match to database
  knex('users').where({
    'email': submitted_email
  }).then(function(user){
    if (user.length > 0) {
      //store user data
      var userData = user[0];

      // submitted_password come first and password from database come to second
      var isVerified = bcrypt.compareSync(submitted_password, userData.password);

      //User authenticated, provide a token
      var token = jwt.encode(userData, config.secret)

      if (isVerified) {
        res.json({
          userData: userData,
          token: token
        });
      } else {
          res.status(400).send("User entered the wrong password.")
      }
    }

  }).catch(
    function(err){
      res.status(500).send("Unable to process the request.")
    }
  );
})

module.exports = router;
