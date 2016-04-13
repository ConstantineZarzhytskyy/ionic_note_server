var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var routesAPI = require('./route/route');

var port = Number(process.env.PORT || 8000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

  next();
});

app.use('/api', routesAPI);

app.listen(port, function () {
  console.log('Server started on ' + port + ' port');
});