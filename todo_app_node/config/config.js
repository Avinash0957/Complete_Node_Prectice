const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.DBHOST);

const conn =  mysql.createConnection({
    host : process.env.DBHOST,
    user : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DBDATABASE,
    port : process.env.DBPORT
})

conn.connect((err)=>{
    if(err){
        console.log('Database Error' , err);
    }
    else
    {
        console.log('Database Connected !');
        
    }
})

module.exports = conn;