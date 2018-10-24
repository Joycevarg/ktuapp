var express = require('express'),
 path = require('path'),
 favicon = require('static-favicon'),
 logger = require('morgan'),
 cookieParser = require('cookie-parser'),
session = require("express-session"),
 bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ extended: false ,uploadDir:'./uploads'}));
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 200000 }}));
// view engine setup
app.set('view engine', 'ejs');

var notImplemented=function(req,res){
    res.sendStatus(404);
};


var userControl=require('./controllers/userController');
app.get("/newStudent",userControl.newUser);
app.get("/",userControl.loginForm);
app.post("/newStudent",userControl.createUser);
app.post("/",userControl.loggedIn);
app.post('/logout',userControl.logout);
app.get("/uploadFile",userControl.fileUploadForm);
app.post("/uploadFile",userControl.fileUpload);
app.listen(8080);