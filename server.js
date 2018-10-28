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

app.use(express.static(__dirname+'/static'));

var userControl=require('./controllers/userController');
var teachControl=require('./controllers/teacherController');


app.get("/newStudent",userControl.newUser);
app.get("/",userControl.loginForm);
app.post("/newStudent",userControl.createUser);
app.post("/",userControl.loggedIn);
app.get("/logout",userControl.logout);


app.get("/teacherview",teachControl.teacherLoggedin);
app.post("/teacherview",teachControl.teacherLoggedin);
app.get("/uploadFile",teachControl.fileUploadForm);
app.post("/uploadFile",teachControl.fileUpload);
app.get("/teacherLogin",teachControl.teacherLogin);


app.listen(8080);