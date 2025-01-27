const express = require('express');
const mysql  = require('mysql')
require('dotenv').config();

app  = express(); 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,  
    database: 'logintest'
});
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
app.listen(5001,()=> console.log("server started att 5000"))
