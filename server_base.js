// This file defines the server setup that applies to dev, test and prod envs
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const app = express();
// const passport = require('./server/passport');

app.use(bodyParser.json());
app.use(cookieParser());
// app.use(session({secret: 'b90ece1d0b932d745a3f27bc6b2bb714',
//                  resave: false,
//                  saveUninitialized: false}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/health', function(req, res, next) {
    res.status(200).json({success: 'pong!'});
});

module.exports = app;
