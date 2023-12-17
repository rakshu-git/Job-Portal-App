const { validationResult } = require("express-validator")
const Employer = require("../models/EmployerProfile")

const employerController = {}

employerController.create = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{    
        const body=req.body
        const userId=req.user.id
        const employerObj=new Employer(body)
        employerObj.userId=userId          
        const employer=await employerObj.save()
        res.json(employer)
    }catch(e){
        res.status(500).json(e)
    }
    
}

employerController.list = async (req, res) =>{
    try{
        const userId = req.user.id
        const employer = await Employer.find({userId:userId})
        res.json(employer)
    }catch(e){
        res.status(500).json(e)
    }
}

employerController.update = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }else{
    try{
        const body = req.body
        const id = req.params.id
        const employer = await Employer.findByIdAndUpdate(id,body,{new:true, runValidators:true})
        res.json(employer)
    }catch(e){
        res.status(500).json(e)
    }   
}
}

employerController.destroy = async(req, res) =>{
    try{
        const id = req.params.id
        const employer = await Employer.findByIdAndDelete(id)
        res.json(employer)
    }catch(e){
        res.status(500).json(e)
    }
}


module.exports = employerController