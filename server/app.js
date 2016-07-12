'use strict';

// Set default environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_CONFIG_DIR = __dirname + '/config/';

var express = require('express');
var config = require('config');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/**
 * MongoDB configurations
 */
var mongodbUrl = 'mongodb://' + config.DB_HOST + ':' + config.DB_PORT + '/' + config.DB_NAME;

// Database options
var dbOptions = {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  },
  auto_reconnect: true
};

mongoose.connection.on('error', function(err) {
  console.error('MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err);
});
// Auto reconnect on disconnected
mongoose.connection.on('disconnected', function() {
  mongoose.connect(mongodbUrl, dbOptions);
});
// Connect to db
mongoose.connect(mongodbUrl, dbOptions);

/**
 * Express app configurations
 */
var app = express();
var User = require('./user/userModel');
var Fixture = require('./fixtures/fixtureModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var userRouter = require('./user/userRoutes.js')(User);

var fixtureRouter = require('./fixtures/fixtureRoutes.js')(Fixture);

// Enable CORS
app.use(cors());

// Bootstrap routes
app.use('/api/users', userRouter);
app.use('/api/fixtures', fixtureRouter);

// Static files
app.use(express.static(__dirname + "/src"));

// Once database open, start server
mongoose.connection.once('open', function callback() {
  console.log('Connection with database succeeded.');
  app.listen(config.APP_PORT, function() {
    console.log('app listening on port %d in %s mode', this.address().port, app.settings.env);
  });
});

module.exports = app;
