const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Employer = require("../models/EmployerProfile")
const Seeker = require("../models/SeekerProfile")
const JobPost = require("../models/JobPost")
const {validationResult} = require('express-validator')
require('dotenv').config()

const usersController = {}

usersController.register = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
        try{
            const body = req.body
            const userObj = new User(body)
            userObj.email=userObj.email.toLowerCase()
            const salt = await bcryptjs.genSalt()
            const hashPass = await bcryptjs.hash(body.password, salt)
            userObj.password = hashPass
            const user = await userObj.save()
            res.json(user)
        }catch(e){
            res.status(500).json(e)
        }
    
}

usersController.login = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }else{
        try{
            const body = req.body
            const user  = await User.findOne({email:body.email})
            if(user){
                const result = await bcryptjs.compare(body.password, user.password)
                if(result){
                    const tokenData = {
                        id:user._id,
                        role:user.role
                    }
                    const token = jwt.sign(tokenData, process.env.JWT_SECRET)
                    res.json({
                       token:`Bearer ${token}`,
                    })
                
                }else{
                    res.json({
                        error:"Invalid email / password"
                    })
                }
            }else{
                res.json({
                    error:"Invalid email / password"
                })
            }
        }catch(e){
            res.status(500).json(e)
        }
    }
}

usersController.account = async(req, res)=>{
   res.json(req.user)
}

usersController.isAdmin =async(req,res)=>{
    try{
        const user = await User.countDocuments()
        res.json(user)
    }
    catch(e){
        res.status(500).json(e)
    }
}

usersController.destroy=async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findByIdAndDelete(id)
        res.json(user)
    }catch(e){
        res.status(500).json(e)
    }
}

usersController.list  = async(req, res)=>{
    try{
        const user = await User.aggregate([
            { 
                $match:{role:{$ne:"admin"}}
            },
            {
                $project:{
                    username:"$username",
                    email:"$email",
                    mobile:"$mobile",
                    role:"$role"
                }
            }
        ])
        res.json(user)        
    }catch(e){
        res.status(500).json(e)
    }
}  

usersController.admindata = async (req, res) => {
    try {
      const adminUsers = await User.aggregate([
        {
          $match: { role: "admin" }
        },
        {
          $project: {
            username: "$username",
            email: "$email",
            mobile: "$mobile",
            role: "$role"
          }
        }
      ]);
  
      res.json(adminUsers);
    } catch (e) {
        res.status(500).json(e)
    }
  };
  
  usersController.search = async (req, res) =>{
    const { search } = req.query
    try{
        if(search.length==0){
            const users = await User.find()
            res.json({items:users})
        }else{
            const regex = new RegExp(search, 'i');
            const items = await User.find({
                $or: [
                  { username: { $regex: regex } },
                  { mobile: { $regex: regex } }
                ]
              }).exec();
          
              res.json({ items });
        }
       
    }catch(e){
        res.status(500).json(e)
    }
}

usersController.destroyAll=async(req,res)=>{
    try{
        const seekers = await Seeker.deleteMany();
        const users = await User.deleteMany();
        const employers = await Employer.deleteMany();
        const jobPosts = await JobPost.deleteMany();
        res.json({ seekers, users, employers, jobPosts });
    }catch(e){
        
        res.status(500).json(e)
   }
}

usersController.jobSeekers = async(req,res) =>{
    try{
        const jobSeekers = await User.find({role:'jobseeker'})
        res.json(jobSeekers)
    }
    catch(e){
        res.status(500).json(e)
    }
}
module.exports = usersController
