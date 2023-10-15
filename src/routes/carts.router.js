const { Router } = require('express');
const { cartsModel } = require('../models/carts.model')

const router = Router();

router.get("/", async(req,res)=>{
    try{
       let carts = await cartsModel.find()
       res.send({resut:"success", payload: carts })
    } catch(error){
       console.log(error)
    }
   
   })
   
   
   router.post("/", async (req,res)=>{
       let { producto, precio, cantidad } = req.body
   
       if(!producto|| !precio || !cantidad ){ 
           res.send({status: "error", error: "Missing data"})
       }
       let result =  await cartsModel.create({ producto, precio, cantidad})
       res.send({result: "success", payload: result})
   })
   
   
   router.put("/:cid", async(req,res)=>{
   let { cid } = req.params 
   
   let cartsToReplace= req.body
   if(!cartsToReplace.producto || !cartsToReplace.precio || !cartsToReplace.cantidad){
       res.send({status: "error", error:"no data on parameters"})
   }
   
   let result = await cartsModel.updateOne({_id: cid}, cartsToReplace)
   res.send({result: "success", payload: result})
   })
   
   
   router.delete("/:cid", async(req, res)=>{
   let { cid } = req.params
   
   let result = await cartsModel.deleteOne({_id: cid})
   res.send({result: "success", payload: result})
   })
   
   module.exports = router