"use strict";
//  index.ts
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv-safe').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// mongodb setup
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, function (err) {
    if (err) {
        throw err;
    }
    console.log("Database created!");
});
// passport setup
require('./passport/init')(passport);
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());
// setup routes
require('./routes/api')(app, passport); // load our routes and pass in our app and fully configured passport
// socket io
const server = require('http').createServer(app);
server.listen(3030);
const io = require('socket.io')(server);
io.on('connection', function (client) {
    console.log('Client connected...');
    client.on('join', function (data) {
        console.log(data);
        client.emit('messages', 'Hello from server');
    });
});
// launch
app.listen(port);
console.log('The magic happens on port ' + port);
//# sourceMappingURL=index.js.map