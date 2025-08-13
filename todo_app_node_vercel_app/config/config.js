const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.DBHOST);

const conn =  mysql.createConnection({
            host: process.env.MYSQLHOST,
            port: parseInt(process.env.MYSQLPORT) || 3306,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE,
            connectTimeout: 60000,
            acquireTimeout: 60000,
            timeout: 60000,
            ssl: { rejectUnauthorized: false }, // For Railway SSL
            multipleStatements: true
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