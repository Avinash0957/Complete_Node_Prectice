const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        //return ResponseHelper.respond(401, false, { error: 'Unauthorized' }, null, res);
        res.status(401,false,{ error: 'Unauthorized' }, null, res)
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.users = decodedToken;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {            
           return res.status(401).json( {msg :'token expired'})
        }

    }
}

module.exports = authenticateToken;

