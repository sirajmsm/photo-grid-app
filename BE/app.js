var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware');

var indexRouter = require('./routes/index');
var photosRouter = require('./routes/photos');

var app = express();

app.use(cors('*'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');

// database setup
mongoose.connect('mongodb+srv://root:root@cluster0.9keqg.mongodb.net/photo-grid-db',{ useNewUrlParser: true }, ()=> console.log('connected to db'))
app.use('/', indexRouter);
app.use('/photos', photosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
