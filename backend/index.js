
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

const PORT = process.env.PORT || 3000; //Acess the PORT variable in the .env

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
