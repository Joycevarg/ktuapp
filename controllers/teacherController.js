var db=require("./db"),
formidable=require("formidable"),
fs=require("fs"),
csvParser=require('csv-parse');



module.exports={

    teacherLogin:function(req,res){
        if(!req.session.ID)
        res.render("Teacherlogin");
        else{
            var getcourse='SELECT CourseID,Batch FROM Teaching WHERE Teacher="'+req.session.ID+'";';
            console.log(getcourse);
            db.query(getcourse, function (err, result) {
               console.log(result);
               res.render("teacherview",{teaching:result,message:"Welcome back "+req.session.ID});
            });
        }
    },
    teacherLoggedin:function(req,res){
        var findpass="SELECT Password FROM Teacher WHERE UserName='"+req.body.name+"';";
        console.log(req.body.name);
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
                res.redirect("/teacherLogin");
            }
            else
            res.render("teacherview",{message:"Wrong password",teaching:[]});}
            else
            res.render("teacherview",{message:"No user exists",teaching:[]});
          });
          
          
    },
    
    fileUpload:function(req,res,next){
        var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = '/home/joyce/Projects/ktuapp/uploads/' + files.filetoupload.name;
        fs.copyFile(oldpath, newpath, function (err) {
          if (err) throw err;
          fs.readFile(newpath, {
            encoding: 'utf-8'
          }, function(err, csvData) {
            if (err) {
              console.log(err);
            }
          
            csvParser(csvData, {
              delimiter: ','
            }, function(err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(data);
                var i;
                for(i=1;i<data.length;i++){
                    var insertstu="INSERT INTO Enrollment VALUES('"+data[i][0]+"','"+data[i][1]+"','"+data[i][2]+"');";
                    db.query(insertstu, function (err, result) {
                      if (err) throw err;
                      console.log("1 record inserted");
                  });}
              }
            });
          });


          res.render("teacherview",{message:"File Uploaded",teaching:[]});
    });
    });
    },
    fileUploadForm:function(req,res,next){
        res.render('fileUpload');
    }

}