"use strict";
//  index.js
// set up ======================================================================
// get all the tools we need
require('dotenv-safe').config();
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// configuration ===============================================================
mongoose.connect(process.env.MONGODB_URL); // connect to our database
require('./configs/passport')(passport); // pass passport for configuration
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// routes ======================================================================
require('./routes/api')(app, passport); // load our routes and pass in our app and fully configured passport
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
//# sourceMappingURL=index.js.map