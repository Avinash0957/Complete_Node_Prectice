const todoappmodule = require("../models/todoappmodule");

class todocontroller 
{

async getalltodos(req,res){
    const id = req.query.id;;
    const tododata = await todoappmodule.getalltodo(id);
    res.status(200).json({success : true , Data : tododata})
}

async getalltodoscount(req,res){
    const id = req.query.id;;
    const tododata = await todoappmodule.getalltodocount(id);
    res.status(200).json({success : true , Data : tododata})
}

async addtodos(req,res){
    const {title } = req.body;
    if(!title || title==""){
        res.status(400).json({success : false , messege : 'pls enter todo title !'})
    }
    try {
        const todoadd = await todoappmodule.addtodo(title);
        res.status(200).json({success : true , messege : 'Todo Created !'});
    } catch (error) {
         res.status(400).json({success : false , messege : error})
    }
}

async updatetodos(req,res){
    const {id , status } = req.body;
    if(!id || id==""){
        res.status(400).json({success : false , messege : 'Invalied todo id !'})
    }
    try {
        const todoadd = await todoappmodule.updatetodo(status,id);
        res.status(200).json({success : true , messege : 'Todo Updated !'});
    } catch (error) {
         res.status(400).json({success : false , messege : error})
    }
}

async Deletetodos(req,res){
    const {id} = req.body;
    if(!id || id==""){
        res.status(400).json({success : false , messege : 'Invalied todo id !'})
    }
    try {
        const todoadd = await todoappmodule.deletetodo(id);
        res.status(200).json({success : true , messege : 'Todo Deleted !'});
    } catch (error) {
         res.status(400).json({success : false , messege : error})
    }
}

}

module.exports = new todocontroller();