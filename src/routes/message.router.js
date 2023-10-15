const { Router } = require('express');
const { messagesModel } = require('../models/messages.model')

const router = Router();

router.get("/", async(req,res)=>{
    try{
       let messages = await messagesModel.find()
       res.send({resut:"success", payload: messages })
    } catch(error){
       console.log(error)
    }
   
   })
   
   
   router.post("/", async (req,res)=>{
       let { user, message } = req.body
   
       if(!user || !message){ 
           res.send({status: "error", error: "Missing data"})
       }
       let result =  await messagesModel.create({ user, message})
       res.send({result: "success", payload: result})
   })
   
   
   router.put("/:mid", async(req,res)=>{
   let { mid } = req.params 
   
   let messagesToReplace= req.body
   if(!messagesToReplace.user|| !messagesToReplace.message ){
       res.send({status: "error", error:"no data on parameters"})
   }
   
   let result = await messagesModel.updateOne({_id: mid}, messagesToReplace)
   res.send({result: "success", payload: result})
   })
   
   
   router.delete("/:mid", async(req, res)=>{
   let { mid } = req.params
   
   let result = await messagesModel.deleteOne({_id: mid})
   res.send({result: "success", payload: result})
   })
   
   module.exports = router