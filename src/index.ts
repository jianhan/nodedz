//  index.js

// set up ======================================================================
// get all the tools we need
require('dotenv-safe').config();

const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// configuration ===============================================================
mongoose.connect(process.env.MONGODB_URL); // connect to our database

require('./configs/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// routes ======================================================================
require('./routes/api')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
