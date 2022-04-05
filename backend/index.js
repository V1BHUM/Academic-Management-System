
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
    connection.execute("SELECT * from Student where student_id = ?",[req.body.username],(err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});


