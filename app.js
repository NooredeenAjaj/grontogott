const express = require('express');
const mysql  = require('mysql')
require('dotenv').config();
const cors = require('cors');
app  = express(); 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,  
    database: 'logintest'
});
app.use(cors());
db.connect((err)=>
{
    if(err){
        console.log(err)
    }
    else{
        console.log("my sql connect")
    }
}
)


app.get("/", (req,res)=>{
    res.send("<hi> home view </h1>")
})

app.get("/users", (req, res) => {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


app.listen(5001,()=> console.log("server started att 5000"))
