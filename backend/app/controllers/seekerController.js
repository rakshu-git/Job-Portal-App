const { validationResult } = require("express-validator")
const Seeker = require("../models/SeekerProfile")


const seekerController = {}

seekerController.create = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{    
        const body=req.body
        console.log(body)
        const userId=req.user.id
        const seekerObj=new Seeker(body)
        seekerObj.userId=userId           
        const seeker=await seekerObj.save()
        res.json(seeker)
    }catch(e){
        res.status(500).json(e)
    }
}

seekerController.list = async (req, res) =>{
    try{
        const userId=req.user.id
        const seeker = await Seeker.find({userId:userId})
        res.json(seeker)
    }catch(e){
        res.status(500).json(e)
    }
}

seekerController.update = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{
        const body = req.body
        const id = req.params.id
        const seeker = await Seeker.findByIdAndUpdate(id,body,{new:true, runValidators:true})
        res.json(seeker)
    }catch(e){
        res.status(500).json(e)
    }   
}

seekerController.destroy = async(req, res) =>{
    try{
        const id = req.params.id
        const seeker = await Seeker.findByIdAndDelete(id)
        res.json(seeker)
    }catch(e){
        res.status(500).json(e)
    }
}



module.exports = seekerController