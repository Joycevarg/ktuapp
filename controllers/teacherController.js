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
            db.query(getcourse, function (err, result) {
               console.log(result);
               res.render("teacherview",{teaching:result,message:"Welcome back "+req.session.ID});
            });
        }
    },
    teacherLoggedin:function(req,res){
        var findpass="SELECT Password FROM Teacher WHERE UserName='"+req.body.name+"';";
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
        
          fs.readFile(req.file.path, {
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
                    var insertstu="UPDATE Enrollment SET " +req.body.exam + "='"+data[i][1]+"' where student='"+data[i][0]+"' and CourseID='"+req.body.courseID+"';";           //TODO
                    console.log(insertstu);
                    db.query(insertstu, function (err, result) {
                      if (err) throw err;
                      console.log("1 record inserted");
                  });}
              }
            });
          });


          res.render("teacherview",{message:"File Uploaded",teaching:[]});
    
    },
    fileUploadForm:function(req,res,next){
      console.log(req.params);
        res.render('markupload',{batch:req.params.batch,courseID:req.params.courseID});
    },
    markChange:function(req,res,next){
      var selctstat="UPDATE Enrollment SET ___ ='"+mark+"' WHERE student='"+roll_no+"';";          //TODO                                                       //TODO
      db.query(selctstat, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('changemark',{classes:[],subjects:[],rollno:1});                                       //TODO
    });
      
    },
    submitEditMark:function(req,res,next){
      var insertstu="UPDATE Enrollment SET Series_1="+req.body.Series1+",Series_2="+req.body.Series2+",Assignment="+req.body.Assignment+",Attendance="+req.body.Attendence+" where student='"+req.body.Student+"' and CourseID='"+req.params.courseID+"';";           //TODO
      console.log(insertstu);
      db.query(insertstu, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect(req.url)
    });
    },
   
    editMark:function(req,res,next){
      var selctstat="SELECT * FROM Enrollment WHERE CourseID='"+req.params.courseID+"';";                                                       //TODO
      db.query(selctstat, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('teachertable',{data:result});                                                              //TODO
    }); 
    }
    
}