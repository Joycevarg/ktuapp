var express = require('express'),
 path = require('path'),
 favicon = require('static-favicon'),
 logger = require('morgan'),
 cookieParser = require('cookie-parser'),
session = require("express-session"),
 bodyParser = require('body-parser'),
 multer=require('multer'),
 storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  }),
 upload=multer({ dest: 'uploads/',storage: storage })



var app = express();
app.use(express.static(__dirname+'/static'));
app.use(bodyParser.urlencoded({ extended: false ,uploadDir:'./uploads'}));
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 200000 }}));

// view engine setup
app.set('view engine', 'ejs');
var notImplemented=function(req,res){
    res.sendStatus(404);
};


var userControl=require('./controllers/userController');
var teachControl=require('./controllers/teacherController');


app.get("/newStudent",userControl.newUser);
app.get("/",userControl.loginForm);
app.post("/newStudent",userControl.createUser);
app.post("/",userControl.loggedIn);
app.get("/logout",userControl.logout);


app.get("/teacherLogin",teachControl.teacherLogin);
app.get("/teacherview",teachControl.teacherLoggedin);
app.post("/teacherview",teachControl.teacherLoggedin);
app.get("/uploadFile/:courseID/:batch",teachControl.fileUploadForm);
app.post("/uploadFile", upload.single('filetoupload'),teachControl.fileUpload);
app.get("/editMark/:courseID/:batch",teachControl.editMark);
app.post("/editMark/:courseID/:batch",teachControl.submitEditMark);

app.listen(8080);