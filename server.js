var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var cors = require('cors');
var logger = require('morgan');
var knex = require('./db/knex');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('index', { title: 'DBConfig' });
})
//GET ALL
app.get('/profiles', function(req, res) {
  knex.select().from('profiles').then(function(profiles){
    res.send(profiles)
  })
})

//GET ONE
app.get('/profiles/:id', function(req, res) {
  res.send('get-one route')
})

//POST
app.post('/profiles', function(req, res) {
  res.send('add-one route')
})

//PATCH
app.put('/profiles/:id', function(req, res) {
  res.send('change/update-one route')
})

//DELETE
app.delete('/profiles/:id', function(req, res) {
  res.send('delete/remove-one route')
})



app.listen(port, function() {
console.log("listening on port: ", port);
})
