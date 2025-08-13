const express = require('express');
const todocontroller = require('./controllers/todocontroller');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.set('view engine','ejs')

require('dotenv').config();


app.get('/all-todo',todocontroller.getalltodos)
app.get('/all-todo-counts',todocontroller.getalltodoscount)
app.post('/addtodos',todocontroller.addtodos)
app.post('/updatetodos',todocontroller.updatetodos)
app.post('/deletetodos',todocontroller.Deletetodos)

app.get('/',(req,res)=>{

    res.render("todoapp")
})
app.listen(800,()=>{
    console.log(`Server started on port number 800`);
    
})