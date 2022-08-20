const { application, query } = require("express");
const express = require("express");
const app = express();
const mysql = require("mysql2");
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "crud_projects",
});
//See All the class's
app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM `schooldetails` WHERE id =?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        // console.log("Result", result);
        res.send(result);
    })

})
//add new school
app.post("/addNewlogin", function (req, res) {
    console.log("Server started", req.body);
    let sql = "INSERT INTO `schooldetails` (`schoolname`,`address`,`password`) VALUES ";
    sql += "('" + req.body.schoolname + "',";
    sql += "'" + req.body.address + "',";
    sql += "'" + req.body.password + "')";
    console.log(sql);
    db.query(sql, function (err) {
        if (err) throw err;
        console.log("success");
        res.send("sucseefull added data");
    });
})
//Update school details
app.put("/updateuser/:id", (req, res) => {
    console.log("Server started",req.body);
    var sql="UPDATE `schooldetails` SET ";
    sql+="`schoolname`='"+req.body.schoolname+"',";
    sql+="`address`='"+req.body.address+"',";
    sql+="`password`='"+req.body.password+"' ";
    sql+="WHERE `schooldetails`.`id`='"+req.params.id+"'";
  console.log(sql);
  db.query(sql,function(err){
  if(err) throw err;
  console.log("success");
  res.send("sucseefull Updated data")
  });

})
//Delete School details
app.get("/deleteuser/:id", (req, res) => {
    let id = req.params.id;
    console.log("id", id);
    let sql = "DELETE FROM `schooldetails` WHERE id='" + id + "'";
    db.query(sql, function (err, rows) {
        if (err) {
            console.log("somthing error in the query");
        }
         else {
            console.log("success");
            res.json(rows);
        }
    });
})
//Login of school name
app.get("/api/login/:schoolname/:password", (req, res) => {
    console.log("Server Sarted");
    let sqlLogin = "SELECT  `schoolname`,`address`  FROM `schooldetails` WHERE schoolname=? AND password = ?";
    db.query(sqlLogin, [req.params.schoolname, req.params.password], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})
app.get("/allclass/:schoolname", function(req,res){
    console.log("category list according to email id");
    var sql= "SELECT  * FROM `classtable` WHERE schoolname =?";
    db.query(sql,[req.params.schoolname],(error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})
//classtable add
app.post("/insertclasstable/:schoolname",function(req,res){
    console.log("Server started");
    
    let categories = "SELECT * FROM `classtable` WHERE schoolname=? AND classname=? AND sec=?";
    db.query(categories, [req.params.schoolname, req.body.classname ,req.body.sec], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        if (result.length === 0) {
            let sql = "INSERT INTO `classtable` (`schoolname`,`classname`,`sec` ,`teachersname`) VALUES ";
            sql += "('" + req.params.schoolname + "',";
            sql += "'" + req.body.classname + "',";
            sql += "'" + req.body.sec + "',";
            sql += "'" + req.body.teachersname + "')";
            console.log(sql);
            db.query(sql, function (err) {
                if (err) throw err;
                console.log("success");
                res.send("sucseefull added data");
            });
        }
        else {
            res.send (" classname Already exist");
        }
    })
    
})
//class table update
app.put("/updateclass/:id/:schoolname", function(req,res){
    console.log("UpdateClass", req.body.classname, req.body.sec, req.body.teachersname,req.params.id);

    var sql = "UPDATE `classtable` SET ? WHERE id = ? AND schoolname =? ";
    db.query(sql, [{ classname: req.body.classname,sec: req.body.sec,teachersname: req.body.teachersname }, req.params.id,req.params.schoolname], (error, result) => {
        if (error) {
            console.log(error);
        }
        else{
           
            console.log("Result", result);
            res.send(result);
            
        }

    })

 })
 //delete class
 app.get("/deleteclass/:schoolname/:classname", (req, res) => {
    let schoolname = req.params.schoolname;
    let classname = req.params.classname;
    console.log("classname", classname);
    let sql = "DELETE FROM `classtable` WHERE schoolname='" + schoolname + "' AND classname='"+classname+"'";
    db.query(sql, function (err, rows) {
        if (err) {
            console.log("somthing error in the query");
        }
         else {
            let sql2 ="DELETE FROM `studenttable` WHERE schoolname='" + schoolname + "' AND classname='"+classname+"'";
            db.query(sql2, function (err, rows){
                if(err){
                    console.log("somthing error in the query222");
                }
                else{
                    console.log("succesfull");
                    res.json(rows);
                }
            })
            
        }
    });
})
//all student according to the schoolname class
app.get("/allstudents/:schoolname/:classname", function(req,res){
    console.log("category list according to schoolname");
    var sql= "SELECT  * FROM `studenttable` WHERE schoolname =? AND classname =?";
    db.query(sql,[req.params.schoolname,req.params.classname],(error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})
//Add student
app.post("/insertstudent/:schoolname/:classname", function(req,res){
    console.log("Trisha");
    console.log("Server started", req.body.studentname);
    
    let todos = "SELECT * FROM `studenttable` WHERE schoolname=? AND classname=?AND studentname=? AND studentage= ?  ";
    db.query(todos, [req.params.schoolname,req.params.classname, req.body.studentname, req.body.studentage], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        //res.send(result);
        if (result.length === 0) {
            let sql = "INSERT INTO `studenttable` ( `classname`,`studentname`,`studentage`,`schoolname`) VALUES ";
            sql += "('" + req.params.classname + "',";
            sql += "'" + req.body.studentname + "',";
            sql += "'" + req.body.studentage + "',";
            sql += "'" + req.params.schoolname + "')";
            console.log(sql);
            db.query(sql, function (err) {
                if (err) throw err;
                console.log("success");
                res.send("sucseefull added data");
            });
        }
        else {
            res.send ("Already exist");
        }
    
    })
    
})
//Update Student list
app.put("/updatestudent/:id/:schoolname", (req, res) => {
    console.log("Update Student", req.params.id, req.params.schoolname, req.body.studentname,req.body.studentage );
    let sql = "UPDATE `studenttable` SET ? WHERE id = ?  AND schoolname= ?";
    db.query(sql, [{ studentname: req.body.studentname ,studentage:req.body.studentage}, req.params.id, req.params.schoolname], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        res.send(result);

    })

})
//Delete Student
app.get("/deletestudent/:id/:schoolname", (req, res) => {
    let id = req.params.id;
    let schoolname = req.params.schoolname;
    console.log("id", id);
    let sql = "DELETE FROM `studenttable` WHERE id='" + id + "' AND schoolname='" + schoolname + "'";
    db.query(sql, function (err, rows) {
        if (err) {
            console.log("somthing error in the query");
        }
         else {
            console.log("success");
            res.json(rows);
        }
    });
})
app.get("/classdetails/:id",(req,res)=>{
    let id =req.params.id;
    let sql = "SELECT * FROM `classtable` WHERE id ='"+ id +"'";
    db.query(sql, function (err, rows) {
        if (err) {
            console.log("somthing error in the query");
        }
         else {
            console.log("success");
            res.json(rows);
        }
    });
})
app.get("/studentdetails/:id",(req,res)=>{
    let id =req.params.id;
    let sql = "SELECT * FROM `studenttable` WHERE id ='"+ id +"'";
    db.query(sql, function (err, rows) {
        if (err) {
            console.log("somthing error in the query");
        }
         else {
            console.log("success");
            res.json(rows);
        }
    });
})

app.listen(5001, () => {
    console.log("server is running ");
    
})












