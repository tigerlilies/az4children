var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var cors = require('cors');
var logger = require('morgan');
var knex = require('./db/knex');

var childrenprofiles = require('./routes/api/childrenprofiles');
var utils = require('./routes/api/utils');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', function(req, res) {
//   res.render('index', { title: 'DBConfig' });
// })

app.use('/api/profiles', childrenprofiles);
app.use('/api/utils', utils);

app.listen(port, function() {
  console.log("listening on port: ", port);
})
