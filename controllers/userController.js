var db=require("./db"),
formidable=require("formidable"),
fs=require("fs");
module.exports={

    
    createUser:function(req,res,next){
        var insertstu="INSERT INTO user VALUES('"+req.body.name+"','"+req.body.password+"',"+req.body.semester+",'"+req.body.department+"','"+req.body.rollno+"');";
        db.query(insertstu, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        
        
        res.send(req.body.name+" is added");
    },
    loginForm:function(req,res,next){
        if(!req.session.ID)
        res.render("login");
        else{
            // var getcourse='SELECT CourseID,Batch FROM Teaching WHERE Teacher="'+req.session.ID+'";';
            // db.query(getcourse, function (err, result) {
            //    console.log(result);
            //    res.render("studentview",{teaching:result,message:"Welcome back "+req.session.ID});
            // });
            res.render("studentview",{message:"Hi "+req.session.ID});
        }
    },
    loggedIn:function(req,res,next){
        var findpass="SELECT Password FROM Student WHERE UserName='"+req.body.name+"';";
        db.query(findpass, function (err, result) {
            if(result.length!=0)
            {
          //  if (err) throw err;
            console.log(result);
            if(result[0].Password==req.body.password)
            {
                req.session.ID=req.body.name;
                console.log("Logged in");
                console.log(req.session.ID);
                res.redirect("/");
            }
            else
            res.render("teacherview",{message:"Wrong password",teaching:[]});}
            else
            res.render("teacherview",{message:"No user exists",teaching:[]});
          });
    },
    markview:function(req,res){
        var selectstat="SELECT CourseID,Series_1, Series_2, Assignment, Attendance FROM Enrollment WHERE student='"+req.session.ID+"'";                                                           //TODO
                db.query(selectstat, function (err, marks) {
                if (err) throw err;
                    console.log(marks);
                    res.render("tableview",{marks:marks});
            });
       
    },
    logout:function(req,res,next){
        if(req.session&&req.session.ID)
        {console.log(req.session.userId);
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