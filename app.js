var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var waypoints = require('./routes/waypoints');
var races = require('./routes/races');
var users = require('./routes/users');
var locations = require('./routes/locations');

var app = express();

// // view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'jade');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Data Access Layer
//mongoose.connect('mongodb://localhost:27017/restrace');

// Models
// require('./models/race')(mongoose);
// require('./models/user')(mongoose);
// require('./models/waypoint')(mongoose);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/waypoints', waypoints);
app.use('/races', races);
app.use('/users', users);
app.use('/locations', locations);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

// google API id: AIzaSyBZitnuOYBULr-V2UOhsfhmtfOpI7zvpqw