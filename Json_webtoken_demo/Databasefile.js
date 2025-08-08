const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.HOST);
const conn = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    port : process.env.DBPORT
});

conn.connect((err)=>{
    if(err) {console.log('err',err)}
    console.log('connected !');
    
})