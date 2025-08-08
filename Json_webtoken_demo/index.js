const express = require('express');
var jwt = require('jsonwebtoken');
const authenticateToken = require('./authenticateToken');
const Databasefile = require('./Databasefile');
const dotenv = require('dotenv')
require('dotenv').config();
const app = express();
const Port = process.env.PORT;

app.get('/login',(req,res)=>{

    // this data come from login form or front side
    const userData = {
        id: 25,
        name: "Avinash",
        email: "avinashsingh0957@gmail.com"
        };

const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "15m" });
console.log("token",token);
res.send(200,{token : token},res);
});

app.get('/Get-details',authenticateToken,(req,res)=>{
    console.log("res",res);
    
    res.send(200,{messege : "data"})
});

app.listen(Port,()=>{console.log(`Server started ! ${Port}`);
})