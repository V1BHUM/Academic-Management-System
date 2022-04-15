
const express = require('express');
const dotenv = require('dotenv');   //Used to access environment variables in env
const cors = require('cors');   //Enables frontend to send requests to backend
const mysql = require('mysql2');
const res = require('express/lib/response');

const app = express();
dotenv.config({path:__dirname+"/../.env"});    //Configure backend by getting the .env file
//Configure MYSQL module

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME
});

app.use(cors());    //Enable CORS
app.use(express.urlencoded({extended: true})); // Enables accessing request parameters
app.use(express.json());

const PORT = process.env.PORT || 3010; //Acess the PORT variable in the .env

app.listen(PORT,() => {
    console.log("Server running at port "+PORT);
})

app.post("/login/student",(req,res) =>{
    connection.execute("SELECT * from student where student_id = ?",[req.body.username],(err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/login/admin",(req,res) =>{
    connection.execute("SELECT * from admin where username = ?",[req.body.username],(err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/login/professor",(req,res) =>{
    connection.execute("SELECT * from professor where professor_id = ?",[req.body.username],(err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.get("/student/all",(req,res) => {
    connection.execute("SELECT * from student",(err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/student/delete",(req,res) =>{
    connection.execute("DELETE from student where student_id=?",[req.body.student_id],(err,results,fields) => {
        if(err) console.log(err);
        res.json({abc:""});
    });
});

app.get("/course/all", (req,res) => {
    connection.execute("SELECT * FROM COURSE", (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.get("/professor/all", (req, res) => {
    connection.execute("SELECT * FROM PROFESSOR", (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/student/add", (req, res) => {
    connection.execute("INSERT INTO STUDENT VALUES(?, ?, ?, ?)", [req.body.student_id, req.body.first_name, req.body.last_name, req.body.password], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/professor/add", (req, res) => {
    connection.execute("INSERT INTO PROFESSOR VALUES(?, ?, ?, ?, ?)",[req.body.professor_id, req.body.password, req.body.email, req.body.first_name, req.body.last_name], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/course/add", (req, res) => {
    connection.execute("INSERT INTO COURSE VALUES(?, ?, ?)",[req.body.course_id, req.body.ic, req.body.course_name],(err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/course/ic", (req,res) => {
    connection.execute("SELECT * FROM COURSE WHERE IC=?",[req.body.ic], (err,results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/course/sections", (req, res) => {
    connection.execute("SELECT * FROM SECTION WHERE COURSE_ID=?",[req.body.course_id], (err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/course/info", (req, res) => {
    connection.execute("SELECT first_name,last_name,course_name,ic,course_id FROM COURSE C JOIN PROFESSOR P ON C.IC=P.PROFESSOR_ID WHERE COURSE_ID=?",[req.body.course_id], (err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/course/section/add",(req, res) => {
    connection.execute("INSERT INTO SECTION VALUES(?,?)",[req.body.section_id, req.body.course_id], (err,results,fields) => {
        if(err) console.log(err);
        req.body.profList.map(p => {
            connection.execute("INSERT INTO TEACHES VALUES(?, ?, ?)",[p, req.body.section_id, req.body.course_id], (err1, results1, fields1) => {
               
            });
        });
        res.json(results);
    });
});

app.post("/section/item", (req, res) => {
    var response = {profList:[],courseInfo:{}};
    connection.execute("SELECT * FROM PROFESSOR P WHERE PROFESSOR_ID IN (SELECT PROFESSOR_ID FROM TEACHES T WHERE SECTION_ID=? AND COURSE_ID=?)",[req.body.section_id,req.body.course_id], (err, results, fields) => {
        if(err) console.log(err);
        connection.execute("SELECT * FROM COURSE WHERE COURSE_ID=?",[req.body.course_id], (err1, results1, fields1) => {
            response.profList = results;
            response.courseInfo = results1[0];
            res.json(response);
        });
    });
});

app.post('/section/professor', (req, res) => {
    connection.execute("SELECT * FROM TEACHES WHERE PROFESSOR_ID=?",[req.body.professor_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/student/registerSection", (req, res) => {
    connection.execute("INSERT INTO STUDIES VALUES(?, ?, ?)", [req.body.student_id, req.body.section_id, req.body.course_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/student/sections", (req, res) => {
    connection.execute("SELECT * FROM STUDIES WHERE STUDENT_ID=?", [req.body.student_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

