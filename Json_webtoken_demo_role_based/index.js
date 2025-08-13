const express = require('express');
var jwt = require('jsonwebtoken');
const authenticateToken = require('./authenticateToken');
const Databasefile = require('./Databasefile');
const dotenv = require('dotenv')
require('dotenv').config();
const app = express();
const Port = process.env.PORT;
app.use(express.json());
app.post('/login',(req,res)=>{
const Userlogin = [
    {id: 25,  name: "Avinash", email: "avinashsingh0957@gmail.com", password : 'Admin@1234' , roles : 'Admin' },
    {id: 30,  name: "AvinshU", email: "avinashu0957@gmail.com", password : 'User@1234' , roles : 'User' }
]
const {email , password } = req.body;
const userData = Userlogin.find(x=>x.email === email && x.password === password);

if(!userData){

    return res.status(403).json({messege : 'Invalid Login Details'})
}

console.log(JSON.stringify(userData));

const token = jwt.sign( userData, process.env.JWT_SECRET, { expiresIn: "15m" });
console.log("token",token);
//res.send(200,{token : token},res);
return res.status(200).json({access_token : token})
});

app.get('/Get-details',authenticateToken,(req,res)=>{
    console.log("res",res);
    
    res.send(200,{messege : "data"})
});
function checkRole(allowedRoles) {
  return (req, res, next) => {
    console.log("req",req.users);
    
    if (!allowedRoles.includes(req.users.roles)) {
      return res.status(403).json({ message: 'You do not have permission' });
    }
    next();
  };
}
app.get('/users-list',authenticateToken,checkRole(['Admin']),(req,res)=>{
    
    return res.status(200).json({messege : 'Admin Acess'})
})

app.get('/users-lists',authenticateToken,checkRole(['Admin','User']),(req,res)=>{
    return res.status(200).json({messege : 'Admin and user both of Acess'})
})

app.listen(Port,()=>{console.log(`Server started ! ${Port}`);
})