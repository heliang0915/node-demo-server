var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var bodyParser = require('body-parser');

var fs=require('fs');
var app = express();

// view engine setup
//
// app.engine('html', ejs.__express);
// app.set('view engine', 'html');
// app.set('pages', path.join(__dirname, 'html'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'wellcome')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/pc', express.static(path.join(__dirname, 'pc')));
app.use('/wap', express.static(path.join(__dirname, 'wap')));
app.use('/blog', express.static(path.join(__dirname, 'blog')));
app.use('/shop', express.static(path.join(__dirname, 'shop')));
app.use(express.static(path.join(__dirname, 'data'),{
    setHeaders:function(res, path){
        res.setHeader('Content-Type','application/json;charset=UTF-8');
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
}));

// app.use("*",function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// })

app.use('/rank_:type.json',function(req, res, next){
    console.log(12213);
    var pathName=path.join(__dirname,'data')+"/ranks.json";
    var type=req.params.type;
    // console.log(path);
    // next();
    fs.readFile(pathName,function(err,data){
        data=data.toString();
        if(err){
            next(err);
        }else{

             data= JSON.parse(data).filter(function(item){
                return  item.type==type;
            })
            console.log(">>>>"+JSON.stringify(data));
             if(data.length){
                 res.send(JSON.stringify(data[0].list))
             }else{
                 res.send([]);
             }

        }
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // next(err);
    res.send(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  res.send(500);
});

module.exports = app;
