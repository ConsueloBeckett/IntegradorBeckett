const { Router } = require("express")
const { userModel } = require('../models/user.model')

//router
const router = Router()

router.get("/", async(req,res)=>{
 try{
    let users = await userModel.find()
    res.send({resut:"success", payload: users })
 } catch(error){
    console.log(error)
 }

})


router.post("/", async (req,res)=>{
    let { name, lastName, email } = req.body

    if(!name || !lastName || !email){ 
        res.send({status: "error", error: "Missing data"})
    }
    let result =  await userModel.create({name, lastName, email})
    res.send({result: "success", payload: result})
})


router.put("/:uid", async(req,res)=>{
let { uid } = req.params 

let userToReplace= req.body
if(!userToReplace.name || !userToReplace.lastName || !userToReplace.email){
    res.send({status: "error", error:"no data on parameters"})
}

let result = await userModel.updateOne({_id: uid}, userToReplace)
res.send({result: "success", payload: result})
})


router.delete("/:uid", async(req, res)=>{
let { uid } = req.params

let result = await userModel.deleteOne({_id: uid})
res.send({result: "success", payload: result})
})

module.exports = router