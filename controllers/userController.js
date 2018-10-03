var db=require("./db");

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
    }
}