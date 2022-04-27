c
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

app.post("/student/get",(req,res) =>{
    connection.execute("SELECT * from student where student_id = ?",[req.body.username],(err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/admin/get",(req,res) =>{
    connection.execute("SELECT * from admin where username = ?",[req.body.username],(err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/professor/get",(req,res) =>{
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
    connection.execute("DELETE FROM STUDIES WHERE STUDENT_ID=?", [req.body.student_id], (err, results, fields) => {
        if(err) console.log(err);
        connection.execute("DELETE from student where student_id=?",[req.body.student_id],(err1,results1,fields1) => {
            if(err1) console.log(err1);
            res.json({abc:""});
        });
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

app.post('/professor/sections', (req, res) => {
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

app.post("/section/allInfo", (req, res) => {

    let info = {
        profList: [],
        courseName: "",
        course_id:"",
        loading:false
    }

    connection.execute("SELECT * FROM TEACHES T JOIN PROFESSOR P ON T.PROFESSOR_ID=P.PROFESSOR_ID WHERE SECTION_ID=? AND COURSE_ID=?",[req.body.section_id, req.body.course_id], (err, results, fields) => {
        if(err) console.log(err);
        info.profList = results;

        connection.execute("SELECT course_id,course_name  FROM COURSE WHERE COURSE_ID=?",[req.body.course_id], (err1, results1, fields1) => {
            info.courseName = results1[0].course_name;
            info.course_id = results1[0].course_id;
            if(err1) console.log(err1);
            res.json(info)
        });
    });
});

app.post("/section/topics", (req, res) => {
    connection.execute("SELECT * FROM TOPIC WHERE SECTION_ID=? AND COURSE_ID=?",[req.body.section_id, req.body.course_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/section/topicInfo", (req, res) => {
    connection.execute("SELECT * FROM TOPIC WHERE TOPIC_ID=?", [req.body.topic_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results[0]);
    });
});

app.post("/section/topics/item", (req, res) => {
    connection.execute("SELECT * FROM ITEM WHERE TOPIC_ID=?", [req.body.topic_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/section/topic/add", (req, res) => {
    connection.execute("INSERT INTO TOPIC(TYPE, HEADING, SECTION_ID, COURSE_ID) VALUES(?, ?, ?, ?)", [req.body.type, req.body.heading, req.body.section_id, req.body.course_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/section/topic/item/add", (req, res) => {
    connection.execute("INSERT INTO ITEM(TOPIC_ID, DESCRIPTION, FILE_LINK) VALUES (?, ?, ?)", [req.body.topic_id, req.body.description, req.body.fileLink], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/section/topic/item/delete", (req, res) => {
    connection.execute("DELETE FROM ITEM WHERE ITEM_ID=?",[req.body.item_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/section/topic/delete", (req, res) => {
    connection.execute("DELETE FROM ITEM WHERE TOPIC_ID=?", [req.body.topic_id], (err, results, fields) => {
        if(err) console.log(err);
        connection.execute("DELETE FROM TOPIC WHERE TOPIC_ID=?",[req.body.topic_id], (err1, results1, fields1) => {
            if(err1) console.log(err1);
            res.json(results1);
        });
    });
});


app.post("/section/delete", (req, res) => {
    connection.execute("DELETE FROM ITEM WHERE TOPIC_ID IN (SELECT TOPIC_ID FROM TOPIC WHERE SECTION_ID=? AND COURSE_ID=?)", [req.body.section_id, req.body.course_id], (err1, results1, fields1) => {
        if(err1) console.log(err1);
        connection.execute("DELETE FROM TOPIC WHERE SECTION_ID=? AND COURSE_ID=?", [req.body.section_id, req.body.course_id], (err2, results2, fields2) => {
            if(err2) console.log(err2);
            connection.execute("DELETE FROM STUDIES WHERE SECTION_ID=? AND COURSE_ID=?", [req.body.section_id, req.body.course_id], (err3, results3, fields3) => {
                if(err3) console.log(err3);
                connection.execute("DELETE FROM TEACHES WHERE SECTION_ID=? AND COURSE_ID=?", [req.body.section_id, req.body.course_id], (err5, results5, fields5) => {
                    if(err5) console.log(err5);
                    connection.execute("DELETE FROM SECTION WHERE SECTION_ID=? AND COURSE_ID=?", [req.body.section_id, req.body.course_id], (err4, results4, fields4) => {
                        if(err4) console.log(err4);
                        res.json(results4);
                    })
                });
            });
        });
    });
});


app.post("/course/delete", (req,res) => {
    connection.execute("DELETE FROM STUDIES WHERE COURSE_ID=?", [req.body.course_id], (err, results, fields) => {
        if(err) console.log(err);
        connection.execute("DELETE FROM TEACHES WHERE COURSE_ID=?", [req.body.course_id], (err1, results1, fields1) => {
            if(err1) console.log(err1);
            connection.execute("DELETE FROM ITEM WHERE TOPIC_ID IN ( SELECT TOPIC_ID FROM TOPIC WHERE COURSE_ID=? )", [req.body.course_id, req.body.course_id], (err2, results2, fields2) => {
                if(err2) console.log(err2);
                connection.execute("DELETE FROM TOPIC WHERE COURSE_ID=?", [req.body.course_id], (err3, results3, fields3) => {
                    if(err3) console.log(err3);
                    connection.execute("DELETE FROM SECTION WHERE COURSE_ID=?", [req.body.course_id], (err4, results4, fields4) => {
                        if(err4) console.log(err4);
                        connection.execute("DELETE FROM COURSE WHERE COURSE_ID=?", [req.body.course_id], (err5, results5, fields5) => {
                            if(err5) console.log(err5);
                            res.json(results5);
                        });
                    });
                });
            });
        });
    });
});


app.post("/professor/delete", (req, res) => {
    connection.execute("SELECT COUNT(*) AS count FROM COURSE WHERE IC=?", [req.body.professor_id], (err,results,fields) => {
        if(err) console.log(err);
        if(results[0].count > 0)
        {
            res.json({msg:"Delete Courses"});
        }
        else
        {
            connection.execute("SELECT COUNT(*) AS count FROM TEACHES WHERE PROFESSOR_ID=?", [req.body.professor_id], (err1, results1, fields1) => {
                if(err1) console.log(err1);

                if(results1[0].count > 0)
                {
                    res.json({msg:"Delete Sections"});
                }
                else
                {
                    connection.execute("DELETE FROM PROFESSOR WHERE PROFESSOR_ID=?",[req.body.professor_id], (err2, results2, fields2) => {
                        if(err2) console.log(err2);
                        res.json(results2);
                    });
                }
            });
        }
    });
});

app.post("/student/section/unenrol", (req, res) => {
    connection.execute("DELETE FROM STUDIES WHERE STUDENT_ID=? AND SECTION_ID=? AND COURSE_ID=?", [req.body.student_id, req.body.section_id, req.body.course_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/student/updatePassword", (req, res) => {
    connection.execute("UPDATE STUDENT SET PASSWORD=? WHERE STUDENT_ID=?", [req.body.newPassword, req.body.student_id], (err, results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/professor/updatePassword", (req, res) => {
    connection.execute("UPDATE PROFESSOR SET PASSWORD=? WHERE PROFESSOR_ID=?", [req.body.newPassword, req.body.professor_id], (err,results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/professor/mobile/add",(req,res) => {
    connection.execute("INSERT INTO PROF_MOBNO VALUES (?,?)",[req.body.professor_id,req.body.mobile_number], (err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    })
});

app.post("/professor/mobile",(req,res) => {
    connection.execute("SELECT * FROM PROF_MOBNO WHERE USERNAME = ?",[req.body.professor_id], (err,results,fields) => {
        if(err) console.log(err);
        res.json(results);
    })
});

app.post("/admin/updatePassword", (req, res) => {
    connection.execute("UPDATE ADMIN SET PASSWORD=? WHERE USERNAME=?", [req.body.newPassword, req.body.username], (err,results, fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/student/search", (req, res) => {
    connection.execute("SELECT * FROM STUDENT WHERE STUDENT_ID LIKE ? OR FIRST_NAME LIKE ? OR LAST_NAME LIKE ?", [req.body.query,req.body.query,req.body.query], (err, results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/professor/search", (req, res) => {
    connection.execute("SELECT * FROM PROFESSOR WHERE PROFESSOR_ID LIKE ? OR FIRST_NAME LIKE ? OR LAST_NAME LIKE ?", [req.body.query,req.body.query,req.body.query], (err, results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});

app.post("/course/search", (req, res) => {
    connection.execute("SELECT * FROM COURSE WHERE COURSE_ID LIKE ? OR COURSE_NAME LIKE ?", [req.body.query,req.body.query], (err, results,fields) => {
        if(err) console.log(err);
        res.json(results);
    });
});


