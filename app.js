var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var bodyParser = require('body-parser');

var app = express();

// view engine setup

app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('pages', path.join(__dirname, 'html'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'wellcome')));

app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/pc', express.static(path.join(__dirname, 'pc')));
app.use('/wap', express.static(path.join(__dirname, 'wap')));

app.use(express.static(path.join(__dirname, 'data'),{
    setHeaders:function(res, path){
        res.setHeader('Content-Type','application/json;charset=UTF-8');
    }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
