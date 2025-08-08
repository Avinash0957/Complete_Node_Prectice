const Responsehelper = require("../helper/helper")
const authmodel = require("../models/authmodel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class authcontroller {


    async login(req,res)
    {
        const {email , password } = req.body;
        if(!email){
            return Responsehelper.respond(401,false,{error : {email : "email is required !"}},null,res)
         }
        const userdata = await authmodel.getUserByEmail(email);
        if(!userdata){
            return Responsehelper.respond(401, false, { error: { email: 'Please enter registered email address' } }, null, res);
        }
        console.log("usrdata 1",userdata);

        let passwordmatch = await bcrypt.compare(password,userdata.PASSWORD);
        console.log("passwordmatch",passwordmatch);
        
        if(!await bcrypt.compare(password,userdata.PASSWORD))
        {
             return Responsehelper.respond(401, false, { error: { password: 'password is not match !' } }, null, res);
        }
        const payload = {
           id : userdata.id,
           name : userdata.NAME,
           email : userdata.email 
        }
        console.log(payload);
        const token_expired = Responsehelper.calculateTokenExpiration();
        console.log("t expired",token_expired);
        
        const access_token = await jwt.sign(payload,process.env.SECRATE_KEY,{expiresIn : "30m" });
        
        payload.token = access_token;
        payload.token_expired = token_expired;
        console.log("payload",payload);

        const updatedtoken = await authmodel.updatetoken(payload)

        return Responsehelper.respond(200, true, { user: updatedtoken }, 'Login Success !', res);
    }

    async register(req,res){

     const {name,email,password} = req.body ;   

      if(!name){
            return Responsehelper.respond(401, false, { error: { email: 'Please enter name' } }, null, res)
      }

      if(!email){
            return Responsehelper.respond(401, false, { error: { email: 'Please enter email address' } }, null, res)
      }

      if(!password){
            return Responsehelper.respond(401, false, { error: { email: 'Please enter password' } }, null, res)
      }

      const emailexist = await authmodel.emailexistornot(email);
      console.log("email exist",emailexist);
      
      if (emailexist > 0) {
         return Responsehelper.respond(401, false, { error: { email: 'email address exist' } }, null, res)
      } 

      if(!Responsehelper.validateemail(email)){
         return Responsehelper.respond(401, false, { error: { email: 'pls enter valid email address' } }, null, res)
      }
      const hasedpassword = await bcrypt.hash(password , 10);
      const newusers = {
         name : name,
         email : email,
         password : hasedpassword         
      }
      const inserteduser = await authmodel.addnewuser(newusers);

       return Responsehelper.respond(200, true, { user: inserteduser }, 'User registered successfully! An email has been sent to your registered email address', res);
    }

    async addblog(req,res){


         return Responsehelper.respond(200, true, { user: [] }, 'User registered successfully! An email has been sent to your registered email address', res);
    }


}

module.exports = new authcontroller();