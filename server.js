const express    = require ('express');
const bodyParser = require ('body-parser');
const session    = require('express-session');
const cookie     = require('cookie-parser');
const path       = require ('path');
const app        = express ();
const morgan     = require('morgan');

require ('./app/Config/constant');
require ('./app/Config/config');
require ('./app/Config/connection');


var apiRoutes = require('./app/Routes/admin');

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use (bodyParser.json ());
app.use(morgan('dev'));
app.use(cookie());
app.use (bodyParser.urlencoded ({extended: true}));
app.use(session({
 secret: 'Mynamesabjit',
 resave: true,
 saveUninitialized: true,
 cookie: {maxAge: 24*60*60*1000}
}));
app.use (API_URL_PREFIX, apiRoutes);

app.listen (PORT, console.log (`server is started at port ${PORT}`));
