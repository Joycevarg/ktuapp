var express = require('express'),
 path = require('path'),
 favicon = require('static-favicon'),
 logger = require('morgan'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('view engine', 'ejs');

var notImplemented=function(req,res){
    res.sendStatus(404);
};


var userControl=require('./controllers/userController');
app.get("/newStudent",userControl.newUser)
app.post("/newStudent",userControl.createUser)
app.listen(8080);