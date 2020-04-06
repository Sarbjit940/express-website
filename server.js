const express    = require ('express');
const bodyParser = require ('body-parser');
const path       = require ('path');
const app        = express ();

require ('./app/Config/constant');
require ('./app/Config/connection');
require ('./app/Config/config');

var apiRoutes = require('./app/Routes/admin');


app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: false}));
app.use (API_URL_PREFIX, apiRoutes);

app.listen (PORT, console.log (`server is started at port ${PORT}`));
