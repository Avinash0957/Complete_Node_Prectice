const express = require('express');
const autrouter = require('./routes');
require('dotenv').config();
const app = express();
const PORT = process.env.APPPORT || 3000 ;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(autrouter)


app.listen(PORT,()=>{console.log(`Server Started on ${PORT} `);
})