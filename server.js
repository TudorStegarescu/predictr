'use strict'

// Set default environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_CONFIG_DIR = __dirname + '/config/';

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/predictAPI');

var User = require('./server/user/userModel');

var Fixture = require('./server/fixtures/fixtureModel');

var app = express();

var port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

userRouter = require('./server/user/userRoutes.js')(User);

fixtureRouter = require('./server/fixtures/fixtureRoutes.js')(Fixture);

app.use('/api/users', userRouter);
app.use('/api/fixtures', fixtureRouter);

app.listen(port, function(req, res) {
  console.log('Running on port ' + port);
});

app.use(express.static(__dirname + "/src"));
