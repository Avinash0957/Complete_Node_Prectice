const conn = require("../config/dbconfigure");

class authmodel {

    getUserByEmail(email){
        return new Promise((resolve,reject)=>{
            conn.query(`SELECT id,NAME,email,password,access_token FROM tbllogin where email = ?`,[email],(err,user)=>{
                if(err){
                    reject(err);
                }
                resolve(user[0]);
            });
        })
    }

    emailexistornot(email){
        return new Promise((resolve,reject)=>{
            conn.query(`SELECT count(*) as emailexist FROM tbllogin where email = ?`,[email],(err,user)=>{
                if(err){
                    reject(err);
                }
                resolve(user[0].emailexist);
            });
        })
    }
    
    addnewuser(data){
        console.log("data",data);
        
        return new Promise((resolve,reject)=>{
            const insertquery = `
                INSERT INTO tbllogin(name,email,password) VALUES (?, ?, ?)
            `;
            conn.query(insertquery,[data.name,data.email,data.password],(err,insertdata)=>{
                if(err){console.log(err); reject(err)}
                resolve(insertdata)
            })
        })
    }

    updatetoken(data)
    {
        return new Promise((resolve,reject)=>{
            const updatequery = ` UPDATE tbllogin SET access_token = ? , token_expired = ? WHERE id = ? `;
             conn.query(updatequery,[data.token,data.token_expired,data.id],(err,updateresult)=>{
                if(err){console.log(err); reject(err)}
                resolve(updateresult)
             })      
        })
    }

}

module.exports = new authmodel();