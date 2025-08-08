const jwt = require('jsonwebtoken');
const Responsehelper = require('../helper/helper');
const authmodel = require('../models/authmodel');

async function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("token",token);
    
    if (!token) {
        return Responsehelper.respond(401, false, { error: 'Unauthorized' }, null, res);
    }
    
    try {
        const decodetoken = jwt.verify(token , process.env.SECRATE_KEY)
        const user = await authmodel.getUserByEmail(decodetoken.email);

        if(!user){
            return Responsehelper.respond(401,false,{ error: 'Unauthorized' }, null, res)
        }
        if(user && user.access_token !== token){
            return Responsehelper.respond(401,false,{ error: 'token expired !' }, null, res)
        }
        console.log("user",user);
        req.usser = user;
        next();
    } catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            return Responsehelper.respond(
                401,
                false,
                { error: 'Your session has expired. Please log in again to continue' },
                null,
                res
            );
        }
        return Responsehelper.respond(401, false, { error: 'Unauthorized' }, null, res);
    }
}

module.exports = authenticateToken;