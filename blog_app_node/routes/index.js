const express = require('express');
const authrouter = require('./authroutes');
const autrouter = express.Router();

autrouter.use('/auth',authrouter)

module.exports = autrouter;