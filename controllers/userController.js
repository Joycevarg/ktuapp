var db=require("./db"),
formidable=require("formidable"),
fs=require("fs");
module.exports={

    newUser:function(req,res,next){
        res.sendFile('/home/joyce/Projects/ktuapp/static/newuser.html');
    },
    createUser:function(req,res,next){
        var insertstu="INSERT INTO user VALUES('"+req.body.name+"','"+req.body.password+"',"+req.body.semester+",'"+req.body.department+"','"+req.body.rollno+"');";
        db.query(insertstu, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        
        
        res.send(req.body.name+" is added");
    },
    loginForm:function(req,res,next){
        if(req.session&&req.session.userId)
        res.send(req.session.userId+ " is logged in");
        else
        res.sendFile('/home/joyce/Projects/ktuapp/static/login.html');
    },
    loggedIn:function(req,res,next){
        var findpass="SELECT Password FROM user WHERE Name='"+req.body.name+"';";
        db.query(findpass, function (err, result) {
            if(result.length!=0)
            {
          //  if (err) throw err;
            console.log(result);
            if(result[0].Password==req.body.password)
            {
                req.session.userId=req.body.name;
                res.redirect("/");
            }
            else
            res.send("Wrong password");}
            else
            res.send("No user exists");
          });
          
    },
    logout:function(req,res,next){
        if(req.session&&req.session.userId){console.log(req.session.userId);
            req.session.destroy(function(err){
                if(err) return next(err);
                else{
                    res.redirect("/");
                }
            })
        }
        else{
            res.send("Already logged out");
        }
    },
    fileUploadForm:function(req,res,next){
        res.sendFile('/home/joyce/Projects/ktuapp/static/fileUpload.html');
    },
    fileUpload:function(req,res,next){
        var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = '/home/joyce/Projects/UploadedFromForm/' + files.filetoupload.name;
        fs.copyFile(oldpath, newpath, function (err) {
          if (err) throw err;
          res.send("File Uploaded");
    });
    });
}

}