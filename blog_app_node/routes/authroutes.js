const express = require('express');
const authcontroller = require('../controllers/authcontroller');
const authenticateToken = require('../middleware/authentications');

const authrouter = express();

authrouter.post('/login',authcontroller.login);
authrouter.post('/register',authcontroller.register);
authrouter.post('/add-blog',authenticateToken,authcontroller.addblog)

module.exports = authrouter;