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
        res.render('login');
    },
    loggedIn:function(req,res,next){
        var findpass="SELECT Password FROM user WHERE Name='"+req.body.name+"';";
        console.log(req.body.name);
        db.query(findpass, function (err, result) {
            if(result.length!=0)
            {
          //  if (err) throw err;
            console.log(result);
            if(result[0].Password==req.body.password)
            {
                req.session.userId=req.body.name;

                
                var selectstat="SELECT subjects";                                                           //TODO
                db.query(selectstat, function (err, subjects) {
                if (err) throw err;
                    console.log(subjects);
                    res.render("studentview",{name:req.body.name,subjects:subjects});
            });}
            else
            res.send("Wrong password");}
            else
            res.send("No user exists");
          });
    },
    markview:function(req,res){
        var selectstat="SELECT Series_1, Series_2, Assignment, Attendance FROM Enrollment WHERE student='"+rollno+"'";                                                           //TODO
                db.query(selectstat, function (err, marks) {
                if (err) throw err;
                    console.log(marks);
                    res.render("marks",{marks:marks});
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
    }
}