const { Router } = require('express');
const { productsModel } = require('../models/products.model')

const router = Router();

router.get("/", async(req,res)=>{
    try{
       let products = await productsModel.find()
       res.send({resut:"success", payload: products })
    } catch(error){
       console.log(error)
    }
   
   })
   
   
   router.post("/", async (req,res)=>{
       let { nombre, precio, cantidad, caracteristica, category } = req.body
   
       if(!nombre || !precio || !cantidad || !caracteristica || !category){ 
           res.send({status: "error", error: "Missing data"})
       }
       let result =  await productsModel.create({ nombre, precio, cantidad, caracteristica, category})
       res.send({result: "success", payload: result})
   })
   
   
   router.put("/:pid", async(req,res)=>{
   let { pid } = req.params 
   
   let productsToReplace= req.body
   if(!productsToReplace.nombre || !productsToReplace.precio || !productsToReplace.cantidad || !productsToReplace.caracteristica || !productsToReplace.category){
       res.send({status: "error", error:"no data on parameters"})
   }
   
   let result = await productsModel.updateOne({_id: pid}, productsToReplace)
   res.send({result: "success", payload: result})
   })
   
   
   router.delete("/:pid", async(req, res)=>{
   let { pid } = req.params
   
   let result = await productsModel.deleteOne({_id: pid})
   res.send({result: "success", payload: result})
   })
   
   module.exports = router