const mysql = require('mysql2');
require('dotenv').config();

/*

HOST = 'localhost'
USER = 'root'
PASSWORD = '1234'
DATABASE = ''

*/

const conn = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

conn.connect((err)=>{
    if(err){
        console.log(err);        
    }else 
    {
        console.log('Database Connected');
        
    }
});

module.exports = conn;